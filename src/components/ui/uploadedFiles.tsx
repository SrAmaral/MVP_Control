import { ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { type UseFormSetValue } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";

type fileType = {
  id?: number;
  url?: string;
  filename?: string;
  type?: string;
};

type UploadedFileProps = {
  files: fileType[];
  filesList: FileList | null;
  setFilesList: React.Dispatch<React.SetStateAction<FileList | null>>;
  setFormValue: UseFormSetValue<{
    files: { type?: string; filename?: string; url?: string }[];
  }>;
  getFormValue: (
    name: string,
  ) => { type?: string; filename?: string; url?: string }[];
};

export default function UploadedFileComponent({
  files,
  filesList,
  setFilesList,
  setFormValue,
  getFormValue,
}: UploadedFileProps) {
  const { toast } = useToast();

  const handleFileDelete = async (filename: string) => {
    const res = await fetch("/api/uploadS3", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: filename }),
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Arquivo deletado com sucesso!",
        variant: "success",
      });
      setFilesList((prevFiles) => {
        if (prevFiles) {
          const updatedFiles = new DataTransfer();
          Array.from(prevFiles)
            .filter((f) => f.name !== filename)
            .forEach((f) => updatedFiles.items.add(f));
          return updatedFiles.files;
        }
        return null;
      });

      setFormValue(
        "files",
        getFormValue("files")?.filter((f) => f.filename !== filename) ?? [],
      );
    } else {
      toast({
        title: `Erro ao deletar arquivo! ${data.error}`,
        variant: "error",
      });
    }
  };

  const handleFilesUploaded = async () => {
    if (filesList?.length === 0) return;
    const filePromises = Array.from(filesList ?? []).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64File = reader.result?.toString().split(",")[1]; // Remove o prefixo base64
          resolve(base64File!);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
      });
    });

    try {
      const base64Files = await Promise.all(filePromises);

      const fileData = Array.from(filesList ?? []).map((file, index) => ({
        file: base64Files[index],
        filename: file.name,
        type: file.type,
      }));

      const res = await fetch("/api/uploadS3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: fileData }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Arquivos armazenados com sucesso!",
          variant: "success",
        });
        setFilesList(null);
        setFormValue("files", [
          ...(getFormValue("files") ?? []),
          ...data.files,
        ] as {
          type?: string;
          filename?: string;
          url?: string;
        }[]);
      } else {
        toast({
          title: `Erro ao armazenar arquivos! ${data.error}`,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: `Erro ao armazenar arquivos! ${String(error)}`,
        variant: "success",
      });
    }
  };

  return (
    <div className="mt-10 rounded-[10px] border-[1px] border-gray-500 p-5">
      <span className="font-bold">Arquvios armazenados</span>
      <p className="font-light">Veja os arquivos armazenados aqui</p>
      <div className="">
        {(files ?? []).length > 0 ? (
          <div className="mt-5 flex flex-col rounded-[10px] border-[1px] border-gray-500 p-16">
            <ul className="mt-2 space-y-2">
              {files?.map((file, index) => (
                <li
                  key={index}
                  className="flex max-w-fit items-center space-x-2 rounded-lg border-[1px] border-white p-2 hover:border-gray-500"
                >
                  <a
                    target="_blank"
                    href={file.url ?? ""}
                    className="flex gap-3"
                  >
                    <Image
                      src={file?.url ?? ""}
                      width={50}
                      height={50}
                      alt={file.filename ?? ""}
                      className="mr-2 h-[100px] w-[80px] rounded-lg border-[1px] border-gray-500 object-cover"
                    />
                    <div className="mr-3 flex items-center justify-center gap-2">
                      <span className="font-normal">Nome:</span>
                      <p
                        className="max-w-[300px] truncate font-extralight"
                        title={file.filename ?? ""}
                      >
                        {file.filename ?? ""}
                      </p>
                    </div>
                  </a>

                  <Trash2
                    className="h-[20px] w-[20px] cursor-pointer hover:scale-125"
                    color="#dc2626"
                    onClick={() => {
                      if (file.filename) {
                        void handleFileDelete(file.filename);
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center rounded-[10px] border-[1px] border-gray-500 p-16">
            <div className="mb-5 rounded-full border-2 border-dashed border-gray-500 p-[12px]">
              <ImageIcon className="h-[28px] w-[28px]" />
            </div>
            <span className="font-bold">Nenhum arquivo foi armazenado</span>
            <p className="font-light">
              Apenas arquivos armazenados aparecem aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
