import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust the import path as necessary
import { Header } from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="bg-white  my-1 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
