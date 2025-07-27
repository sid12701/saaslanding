import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, ...props }: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 grid w-full max-w-lg gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  );
}
export const DialogTitle = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 {...p} className={cn("text-xl font-semibold", p.className)} />
);
export const DialogDescription = (p: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...p} className={cn("text-muted-foreground", p.className)} />
);
