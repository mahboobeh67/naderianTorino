"use client";
import React, { ReactNode } from "react";
import { useGetUserData } from "../../../core/services/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { isPending, data } = useGetUserData();

  useEffect(() => {
    if (!isPending && !data?.data) router.push("/");
  }, [isPending]);

  if (isPending) return <p>Loading...</p>;

  return <div>{children}</div>;
}

export default AuthProvider;
