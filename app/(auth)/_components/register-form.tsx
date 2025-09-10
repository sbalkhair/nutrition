"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { registerAccountSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTransition, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import HeaderAuthForm from "./header-auth-form";

export function RegisterForm({ className, ...props }: ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerAccountSchema>>({
    resolver: zodResolver(registerAccountSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      // TODO: remove default password and confirm password
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  async function onSubmit({
    email,
    password,
    name,
    mobile,
  }: z.infer<typeof registerAccountSchema>) {
    startTransition(async () => {
      await authClient.signUp.email(
        { email, password, mobile, name, callbackURL: "/client" },
        {
          onSuccess: (ctx) => {
            toast.success("Success register new user");
            redirect("/client");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader>
          <HeaderAuthForm />
          <CardTitle>Register new account</CardTitle>
          <CardDescription>
            Enter all Information below to register account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Phone Number 05..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-start justify-start gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Sign Up</span>
                    </>
                  ) : (
                    <>Sign Up</>
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
