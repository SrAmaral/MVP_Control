import { cn } from "~/lib/utils"; // Certifique-se de usar sua função 'cn' para classe condicional
import { Loader2 } from "lucide-react"; // Icone Loader2 do ShadCN (Lucide Icons)

const LoadingSpinner = ({ className }: { className?: string }) => (
  <div className={cn("flex justify-center items-center py-4", className)}>
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
);

 

export default LoadingSpinner;
