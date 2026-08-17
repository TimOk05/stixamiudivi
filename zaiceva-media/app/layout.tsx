import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "zaiceva-media-demo.himaloka.chatgpt.site";
  const protocol = host.startsWith("localhost") ? "http" : "https";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "Zaiceva Media — видео-продакшн и подкаст-студия в Минске",
    description:
      "Подкасты, Reels, YouTube, реклама, курсы и видео для бизнеса — production полного цикла от Zaiceva Media.",
    openGraph: {
      title: "Zaiceva Media — идеи, которые звучат и выглядят профессионально",
      description:
        "Подкасты, Reels, YouTube, реклама и курсы — production полного цикла в Минске.",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Zaiceva Media" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zaiceva Media — видео-продакшн и подкаст-студия",
      description: "Видео, которое делает идею заметной.",
      images: ["/og.png"],
    },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
