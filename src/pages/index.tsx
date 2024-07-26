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
        <div className="mx-2 border border-gray-200 rounded-lg font-sans flex justify-around gap-8 py-4 px-8">
          <div className="flex justify-start flex-col items-start">
            <div className="border-l-4 border-yellow-400 flex flex-col px-2">
              <h1 className="text-lg font-semibold">Total Project</h1>
              <p className="font-medium">All</p>
            </div>
            <div className="flex gap-1 items-end justify-center mx-2">
              <h1 className="text-2xl">37</h1>
              <p className="text-green-600">12%</p>
            </div>
          </div>
          <div className="flex justify-start flex-col items-start">
            <div className="border-l-4 border-purple-400 flex flex-col px-2">
              <h1 className="text-lg font-semibold">Total Task</h1>
              <p className="font-medium">All</p>
            </div>
            <div className="flex gap-1 items-end justify-center mx-2">
              <h1 className="text-2xl">87</h1>
              <p className="text-green-600">32%</p>
            </div>
          </div>
          <div className="flex justify-start flex-col items-start">
            <div className="border-l-4 border-orange-400 flex flex-col px-2">
              <h1 className="text-lg font-semibold">Assigned Task</h1>
              <p className="font-medium">All</p>
            </div>
            <div className="flex gap-1 items-end justify-center mx-2">
              <h1 className="text-2xl">17</h1>
              <p className="text-red-600">14%</p>
            </div>
          </div>
          <div className="flex justify-start flex-col items-start">
            <div className="border-l-4 border-cyan-400 flex flex-col px-2">
              <h1 className="text-lg font-semibold">Completed Task</h1>
              <p className="font-medium">All</p>
            </div>
            <div className="flex gap-1 items-end justify-center mx-2">
              <h1 className="text-2xl">54</h1>
              <p className="text-green-600">12%</p>
            </div>
          </div>
          <div className="flex justify-start flex-col items-start">
            <div className="border-l-4 border-red-600 flex flex-col px-2">
              <h1 className="text-lg font-semibold">Overdue Task</h1>
              <p className="font-medium">All</p>
            </div>
            <div className="flex gap-1 items-end justify-center mx-2">
              <h1 className="text-2xl">14</h1>
              <p className="text-green-600">12%</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
