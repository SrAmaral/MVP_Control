import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const  resolveOsStatus =  (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'pendingApproval':
    return 'Pendente de Aprovação';
    case 'approved':
      return 'Aprovado';
    case 'repproved':
      return 'Rejeitado';
    default:
      return 'Pendente';
  }
}