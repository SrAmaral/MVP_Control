import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { type UseFormSetValue } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { Button } from "./button";
import { Input } from "./input";

type fileType = {
  id?: number;
  url?: string;
  filename?: string;
  type?: string;
};

type UploadedFileProps<
  T = { files?: { type?: string; filename?: string; url?: string }[] } | [],
> = {
  filesList: FileList | null;
  setFilesList: React.Dispatch<React.SetStateAction<FileList | null>>;
  setFormValue: UseFormSetValue<{
    files: { type?: string; filename?: string; url?: string }[];
  }>;
  getFormValue: (
    name: string,
  ) => { type?: string; filename?: string; url?: string }[];
  anyData: T;
};
export default function UploadFilesComponent({
  filesList,
  setFormValue,
  getFormValue,
  setFilesList,
  anyData,
}: UploadedFileProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (fileInputRef.current) {
        const updatedFiles = new DataTransfer();
        Array.from(fileInputRef.current.files ?? [])
          .filter((file) => file.name !== filename)
          .forEach((file) => updatedFiles.items.add(file));
        fileInputRef.current.files = updatedFiles.files;
      }
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
          ...((
            anyData as {
              files?: { type?: string; filename?: string; url?: string }[];
            }
          ).files ?? []),
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
    <>
      <div className="mt-10 flex flex-col">
        <div className="relative flex h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-500 text-center hover:bg-gray-100">
          <Input
            ref={fileInputRef}
            className="pointer-events-auto absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            type="file"
            name="file"
            multiple
            draggable
            onChange={(event) => {
              if (event.target.files) {
                setFilesList((prevFiles) => {
                  const updatedFiles = new DataTransfer();
                  if (prevFiles) {
                    Array.from(prevFiles).forEach((file) =>
                      updatedFiles.items.add(file),
                    );
                  }
                  Array.from(event.target.files ?? []).forEach((file) =>
                    updatedFiles.items.add(file),
                  );
                  return updatedFiles.files;
                });
              }
            }}
          />
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="rounded-full border-2 border-dashed border-gray-500 p-[12px]">
              <Upload className="h-[28px] w-[28px]" />
            </div>
            <span className="pointer-events-none font-bold">
              Arraste arquivos aqui, ou clique para fazer upload
            </span>
          </div>
        </div>

        <div>
          {filesList &&
            fileInputRef.current?.files &&
            fileInputRef.current.files.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-medium">Arquivos selecionados:</h3>
                <ul className="mt-2 space-y-2">
                  {Array.from(filesList).map((file, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={50}
                        height={50}
                        alt={file.name}
                        className="mr-2 h-[80px] w-[60px] rounded-lg border-[1px] border-gray-500 object-cover"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-normal">Nome:</span>
                        <p
                          className="max-w-[200px] truncate font-extralight"
                          title={file.name}
                        >
                          {file.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-normal">Tamanho:</span>
                        <p className="font-extralight">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Trash2
                        className="h-[20px] w-[20x] cursor-pointer"
                        color="#dc2626"
                        onClick={() => {
                          void handleFileDelete(file.name);
                        }}
                      />
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  className="mt-16"
                  onClick={() => handleFilesUploaded()}
                >
                  Armazenar Arquivos
                </Button>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
