import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";

interface FormFieldBaseProps<T extends FieldValues> {
  label: string;
  formControl: Control<T>;
  name: Path<T>;
  formControlRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  classNameInput?: string;
  typeInput?: string;
  disabled?: boolean;
}

function FormFieldBase<T extends FieldValues>({
  label,
  formControl,
  name,
  placeholder,
  formControlRef,
  classNameInput,
  typeInput,
  disabled = false,
}: FormFieldBaseProps<T>) {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl ref={formControlRef}>
            <Input
              placeholder={placeholder}
              {...field}
              className={classNameInput}
              type={typeInput}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldBase;
