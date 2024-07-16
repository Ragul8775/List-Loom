import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust the import path as necessary
import { Header } from "@/components/Header";

interface ProtectedRouteProps {
  children: ReactNode;
}

const Layout = ({ children }: ProtectedRouteProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Header />
        <main className="flex-1 overflow-y-auto  bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
