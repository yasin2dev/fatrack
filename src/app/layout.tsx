import type { Metadata } from "next";
import {Roboto} from "next/font/google"
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import Header from "@/app/header";
import SidePanel from "@/components/sidepanel";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Fatrack",
  description: "Fatrack: Tracking bills and payments from one screen",
};

const f_roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={f_roboto.className}
      >
      <Header/>
      <div className={"flex"}>
          <SidePanel/>
        <div className={"w-full overflow-x-auto bg-gray-800"}>
          <div className={"sm:[calc(99vh-60px)] overflow-auto"}>
            <div className={"w-full flex justify-center mx-auto overflow-auto h-[calc(100vh-120px)] overflow-y-auto relative"}>
              <div className={"w-full mt-3"}>{children}</div>
            </div>
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}
