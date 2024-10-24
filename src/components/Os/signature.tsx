import Image from "next/image";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "~/hooks/use-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SignatureProps = {
  width: number;
  height: number;
  setSignature: (signature: string) => void;
  clasName?: string;
};

const Signature = ({
  width,
  height,
  setSignature,
  clasName,
}: SignatureProps) => {
  const [imageURL, setImageURL] = useState<string | null>(null); // Estado para armazenar a URL da imagem da assinatura
  const sigCanvas = useRef<SignatureCanvas>(null); // Referência para o canvas de assinatura

  const clear = () => {
    sigCanvas.current?.clear(); // Limpa o canvas
    setImageURL(null); // Limpa a imagem gerada
    setSignature("");
  };
  const save = () => {
    // Gera a imagem da assinatura em formato PNG
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const image: string = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageURL(image);
      setSignature(image);
    } else {
      toast({
        title:
          "Campo de assinatura está vazio! É necessario uma assinatura para gera-la!",
        variant: "error",
      });
    }
  };

  return (
    <div className={clasName}>
      <div className={`border w-[${width}px]`}>
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            width: width - 2,
            height: height,
            className: "signatureCanvas",
          }}
          backgroundColor="rgb(255,255,255)"
        />
      </div>
      <Separator className="mb-3 w-[500px] bg-black" />
      <h2>Assinatura do assinante</h2>
      <div className="mt-10 flex gap-5">
        <Button type="button" className="bg-green-500" onClick={() => save()}>
          Gerar Assinatura
        </Button>
        <Button type="button" className="bg-red-500" onClick={() => clear()}>
          Limpar
        </Button>
      </div>
      {imageURL && (
        <div className="mt-5">
          <h3>Assinatura Gerada:</h3>
          <Image
            src={imageURL}
            width={width}
            height={height}
            alt="Assinatura"
            style={{ border: "1px solid #000" }}
          />
        </div>
      )}
    </div>
  );
};

export default Signature;
