import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const schema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(3, "Senha invalida"),
});

type FormData = z.infer<typeof schema>;

export default function LoginFormComponent() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const params = useSearchParams();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 rounded-[15px] border-[1px] border-gray-400 bg-neutral-50 p-16 antialiased shadow-lg"
      >
        <div className="flex justify-center">
          <Image src="/logo_marca.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            className="min-w-[300px]"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            {...register("password")}
            id="password"
            className="min-w-[300px]"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {!!params.get("error") && (
          <div>
            <p className="text-red-500">*Email ou Senha incorreto</p>
          </div>
        )}

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
