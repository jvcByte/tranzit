import type { Metadata } from "next";
import { ThemeProvider } from "@/context/theme-provider"
import { Toaster } from "sonner"
import "@/app/styles/globals.css"

// Using system fonts to avoid network dependency on Google Fonts
// Can be replaced with local font files if needed
const fontSans = {
  variable: '--font-sans',
  style: 'normal',
  weight: '400',
  src: 'local("system-ui"), local("-apple-system"), local("Segoe UI"), local(Roboto), local(Helvetica), local(Arial), local(sans-serif)',
  display: 'swap',
};

const fontMono = {
  variable: '--font-mono',
  style: 'normal',
  weight: '400',
  src: 'local("Menlo"), local("Monaco"), local("Consolas"), local("Liberation Mono"), local("Courier New"), monospace',
  display: 'swap',
};

export const metadata: Metadata = {
  title: "Tranzit Mobility",
  description: "Africa's most trusted ride-sharing platform built for the next generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen w-full overflow-x-hidden`}
        style={{
          '--font-sans': fontSans.src,
          '--font-mono': fontMono.src,
        } as React.CSSProperties}
      >
        <ThemeProvider attribute="class">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
