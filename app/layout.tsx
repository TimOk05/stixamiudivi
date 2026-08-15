import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Стихами удиви — авторские стихи и подарки",
  description: "Авторские стихи, поздравления и предметы декора по личным историям от Екатерины Саутиной.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Стихами удиви — слова, в которых узнают себя",
    description: "Авторские стихи, поздравления и подарки по личным историям.",
    images: ["/og.png"],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
