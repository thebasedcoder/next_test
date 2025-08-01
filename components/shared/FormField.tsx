import type { ComponentProps } from 'react';

interface FormFieldProps extends ComponentProps<'input'> {
  id: string;
  label: string;
}

export default function FormField({ id, label, type = 'text', ...props }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        {...props}
      />
    </div>
  );
}