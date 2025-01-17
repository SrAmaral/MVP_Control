"use client";
import { Suspense } from "react";
import LoginFormComponent from "~/components/Login/loginComponent";

export default function SigninPage() {
  return (
    <Suspense>
      <div className="flex h-screen items-center justify-center bg-gray-300">
        <LoginFormComponent />
      </div>
    </Suspense>
  );
}
