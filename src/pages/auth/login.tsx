import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to dashboard after login
    }
  }, [status]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md space-y-8 bg-white  p-8 rounded-lg shadow">
        <div className="flex justify-start gap-4">
          <img src="/assets/logo.png" alt="Logo" className="w-9 h-9" />
          <h1 className="font-Belfort text-4xl text-dark">List Loom</h1>
        </div>
        <h2 className="mt-6 text-left text-3xl font-bold text-gray-900 font-Belfort">
          Log in
        </h2>
        <div>
          <button
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
            onClick={() => signIn("google")}
          >
            <img
              src="/path/to/google-logo.png"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Continue with Google
          </button>

          <button
            className="w-full mt-2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
            onClick={() => signIn("github")}
          >
            <img
              src="/path/to/apple-logo.png"
              alt="Apple"
              className="w-6 h-6 mr-2"
            />
            Continue with Github
          </button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium  text-dark hover:text-dark">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Log in
            </button>
          </div>
          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="font-medium text-dark hover:text-dark"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
