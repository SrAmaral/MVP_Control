import { type NextRequest, NextResponse } from 'next/server';
import s3 from '../../../lib/awsS3';

interface UploadRequest {
  files: {
    file: string; // O conteúdo do arquivo em base64
    filename: string; // O nome do arquivo
    type: string; // O tipo MIME do arquivo
  }[]; // Um array de arquivos
}

async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    const { files } = await req.json() as UploadRequest;
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      return NextResponse.json({ error: 'AWS_BUCKET_NAME is not defined' }, { status: 500 });
    }
    const uploadedFiles = [];

    try {
      for (const fileData of files) {
        const { file, filename, type } = fileData;
        const fileContent = Buffer.from(file, 'base64');

        const params = {
          Bucket: bucketName,
          Key: filename, // Nome do arquivo no bucket
          Body: fileContent,
          ContentEncoding: 'base64', // Indica que o conteúdo está em base64
          ContentType: type // Tipo MIME do arquivo
        };

        // Faz o upload do arquivo
        const data = await s3.putObject(params);
        const url = `https://${bucketName}.s3.amazonaws.com/${filename}`;
        uploadedFiles.push({ filename, url, type});
      }
      return NextResponse.json({ files: uploadedFiles }, {status: 200});
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, {status: 500})
    }
  } 
  else if(req.method === 'DELETE') {
    const { filename } = await req.json() as { filename: string };
    console.log("FileName", filename)
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      return NextResponse.json({ error: 'AWS_BUCKET_NAME is not defined' }, { status: 500 });
    }
    const params = {
      Bucket: bucketName,
      Key: filename
    };
    try {
      await s3.deleteObject(params);
      return NextResponse.json({ message: 'File deleted' }, {status: 200});
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, {status: 500})
    }
  } else{
    return NextResponse.json({error: 'Method not allowed' }, {status: 405})
  }
}

export { handler as DELETE, handler as POST };

