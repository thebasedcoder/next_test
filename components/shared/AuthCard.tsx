export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-sm border border-border">
        {children}
      </div>
    </div>
  );
}

export function AuthCardHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AuthCardFooter({ prompt, linkText, linkHref }: { prompt: string; linkText: string; linkHref: string }) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt}{' '}
      <a href={linkHref} className="font-medium text-primary hover:text-primary/80 transition-colors">
        {linkText}
      </a>
    </p>
  );
}