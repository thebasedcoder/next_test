import QueryProvider from "@/providers/TanstackQuery";
import { Inter, Roboto_Mono } from 'next/font/google';
import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto_mono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="app-layout">
            <main className="main-content">
              <StoreProvider>
                <QueryProvider>
                  <AuthProvider>
                    <div className="container main-container">
                      {children}
                      <Toaster position="bottom-center" richColors />
                    </div>
                  </AuthProvider>
                </QueryProvider>
              </StoreProvider>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}