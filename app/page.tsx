import { redirectUser as routingLoginUser } from "@/app/(dashboard)/shared/redirect-login-user";
import AppIcon from "@/components/app-icon";
import { buttonVariants } from "@/components/ui/button";
import { Application } from "@/lib/constant";
import Link from "next/link";

export default async function Home() {
  //
  await routingLoginUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <AppIcon className="size-42" />
      <h1 className="text-primary text-5xl font-bold">{Application.title}</h1>
      <div className="grid min-w-sm grid-cols-1 gap-2 md:grid-cols-2 md:flex-row">
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "default" })}
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          className={buttonVariants({ variant: "outline" })}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
