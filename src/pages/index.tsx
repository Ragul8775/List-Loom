import Image from "next/image";
import { Inter } from "next/font/google";

import { signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import Layout from "@/components/Layout";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white gap-6 z-20">
          <h1 className="text-4xl mb-4">Welcome to the Home Page</h1>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
          >
            Sign-Out
          </button>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
