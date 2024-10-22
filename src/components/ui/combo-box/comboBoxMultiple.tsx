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

// Definindo o tipo para suportar múltiplos valores
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
  state: (string | number)[] | undefined;
};

export function ComboBoxMultiple<T>({
  options,
  className = "",
  placeholder = "",
  setState,
  state,
}: ComboBoxType<T>) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<(number | string)[]>(state ?? []);

  React.useEffect(() => {
    const users = options?.filter((option) => values.includes(option.value));
    setState?.(users?.map((user) => user.id) as T);
  }, [setState, values]);

  React.useEffect(() => {
    const users = options?.filter((option) => state?.includes(option.id));
    const newValues = users?.map((user) => user.value) ?? [];
    if (JSON.stringify(newValues) !== JSON.stringify(values)) {
      setValues(newValues);
    }
  }, [state, options]);

  const handleSelect = (currentValue: string | number) => {
    const selectedValue =
      typeof currentValue === "number" ? Number(currentValue) : currentValue;
    setValues((prevValues) =>
      prevValues.includes(selectedValue)
        ? prevValues.filter((value) => value !== selectedValue)
        : [...prevValues, selectedValue],
    );
  };

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
            {values?.length > 0
              ? values.length + " - Funcioanrios selecionados"
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Procurar item..."></CommandInput>
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toString()}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        values?.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0",
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
