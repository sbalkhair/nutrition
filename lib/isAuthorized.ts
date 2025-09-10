import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const isAuthorize = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
};
