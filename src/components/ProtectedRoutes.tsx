import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }

    if (!session) {
      // Redirect to login if not authenticated
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div>Loading...</div>; // Show a loading state or nothing while checking auth status
  }

  return <>{children}</>;
};

export default ProtectedRoute;
