import { Inter } from "next/font/google";
import "@/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cars FARM",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className={`flex-1 flex flex-col ${inter.className}`}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
