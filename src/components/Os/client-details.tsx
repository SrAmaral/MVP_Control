import { OSType } from "~/app/(modules)/os/module/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { cn } from "~/lib/utils"; // Utility to handle conditional classes
import AddressComponent from "./address.-details";

interface ClientDataAccordionProps {
  client: OSType["client"];
}

const ClientDataAccordion: React.FC<ClientDataAccordionProps> = ({
  client,
}) => {
  return (
    <div className="col-span-12 mb-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Dados do cliente associado a OS</AccordionTrigger>
          <AccordionContent className="pl-3">
            <div className="col-span-12 mt-5 grid grid-cols-3 gap-2 rounded-lg">
              <div
                className={cn(
                  "col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2",
                  "bg-secondary", // Use theme color instead of fixed slate-100
                )}
              >
                <Label>Nome Fantasia:</Label>
                <div>{client.fantasyName}</div>
              </div>
              <div className="col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2">
                <Label>Razão Social:</Label>
                <div>{client.companyName}</div>
              </div>

              <div
                className={cn(
                  "col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2",
                  "bg-secondary",
                )}
              >
                <Label>Email de contato principal:</Label>
                <div>{client.contactEmail}</div>
              </div>

              <div className="col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2">
                <Label>Número de contato principal:</Label>
                <div>{client.contactNumber}</div>
              </div>

              <div
                className={cn(
                  "col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2",
                  "bg-secondary",
                )}
              >
                <Label>CNPJ:</Label>
                <div>{client.cnpj}</div>
              </div>
              <div className="col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2">
                <Label>Endereço:</Label>
                <div>
                  <AddressComponent address={client.clientAddress} />
                </div>
              </div>

              <div
                className={cn(
                  "col-span-3 flex items-center gap-2 rounded-lg pb-2 pl-2 pt-2",
                  "bg-secondary",
                )}
              >
                <Label>Data de abertura:</Label>
                <div>{client.openedData}</div>
              </div>

              <div className="col-span-3 flex flex-col gap-2 rounded-lg pb-2 pl-2 pt-2">
                <Label>Contatos cadastrados:</Label>
                {client.contacts.map((contact, id) => (
                  <div
                    key={contact.id}
                    className={cn(
                      "ml-5 rounded-lg pl-2",
                      id % 2 === 0 ? "bg-secondary" : "bg-muted",
                    )}
                  >
                    contato {id + 1}: {contact.name} - {contact.email} -{" "}
                    {contact.phoneNumber}
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ClientDataAccordion;
