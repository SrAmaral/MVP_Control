import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface GenericConfirmDialogProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  bodyChildren?: React.ReactNode;
  textConfirm?: string;
  textCancel?: string;
  title: string;
  description: string;
}

export default function GenericConfirmDialog({
  open,
  setOpen,
  onConfirm,
  bodyChildren,
  textConfirm,
  textCancel,
  title,
  description,
  onCancel,
}: GenericConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title ?? "Titulo"}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {bodyChildren && <div className="grid gap-4 py-4">{bodyChildren}</div>}
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            {textCancel ?? "Cancelar"}
          </Button>
          <Button type="submit" onClick={onConfirm}>
            {textConfirm ?? "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
