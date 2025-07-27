import { useId } from "react";
import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const schema = z.object({
  email: z.string().email("Please enter a valid email.")
});
type FormValues = z.infer<typeof schema>;

export default function WaitlistDialog({ children }: PropsWithChildren) {
  const id = useId();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = (values: FormValues) => {
    // TODO: replace with your API
    alert(`Submitted: ${values.email}`);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Join the waitlist</DialogTitle>
        <DialogDescription>Be first to know when we launch.</DialogDescription>
        <form className="mt-4 flex gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            id={`${id}-email`}
            type="email"
            placeholder="you@company.com"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
          />
          <Button type="submit">Join</Button>
        </form>
        {form.formState.errors.email && (
          <p className="mt-2 text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
        <div className="mt-3">
          <DialogClose asChild>
            <button className="text-sm text-muted-foreground hover:underline">Close</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
