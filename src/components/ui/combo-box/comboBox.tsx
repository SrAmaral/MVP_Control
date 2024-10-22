import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

// Definindo o tipo para suportar valores numéricos e strings
type ComboBoxType<T> = {
  options:
    | {
        id: number | string;
        value: number | string;
        label: number | string;
      }[]
    | undefined;
  className?: string;
  placeholder?: string;
  setState?: React.Dispatch<React.SetStateAction<T>>;
  state: string | number | undefined;
};

export function ComboBoxComponent<T>({
  options,
  className = "",
  placeholder = "",
  setState,
  state,
}: ComboBoxType<T>) {
  // Ajustar o tipo do estado para `number | string`
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | string | undefined>(
    options?.find((option) => option.id === state)?.value,
  );

  React.useEffect(() => {
    setState?.(options?.find((option) => option.value === value)?.id as T);
  }, [setState, value]);

  React.useEffect(() => {
    setValue(options?.find((option) => option.id === state)?.value);
  }, [state, options]);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Procurar item..." />
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toString()} // Passar `value` como string para garantir a comparação correta
                    onSelect={(currentValue) => {
                      // Converter `currentValue` para o tipo correto (number ou string)
                      const selectedValue =
                        typeof option.value === "number"
                          ? Number(currentValue)
                          : currentValue;
                      setValue(selectedValue === value ? "" : selectedValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
