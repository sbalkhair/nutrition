"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignout = () => {
  const router = useRouter();
  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Success Logout");
          router.push("/");
        },
        onError: () => {
          toast.error("Something went wrong when you sign out");
        },
      },
    });
  };
  return handleSignout;
};
