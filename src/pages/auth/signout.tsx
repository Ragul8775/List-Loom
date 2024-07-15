import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signout() {
  const router = useRouter();

  useEffect(() => {
    // Automatically sign out the user and redirect to the homepage
    signOut({ callbackUrl: "/" });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Signing you out...</h1>
    </div>
  );
}
