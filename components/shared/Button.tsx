import { ComponentProps } from "react";

export default function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}