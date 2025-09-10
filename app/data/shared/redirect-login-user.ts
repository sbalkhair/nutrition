import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    if (session.user.role?.toLowerCase() === "admin") {
      return redirect("/admin");
    } else if (session.user.role?.toLowerCase() === "client") {
      return redirect("/client");
    }
  }
}
