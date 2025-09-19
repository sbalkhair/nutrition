"use client";

import { addServingUnit } from "@/app/(dashboard)/admin/foods-management/serving-units/data/add-serving-unit";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { servingUnitSchema, type ServingUnitSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ButtonAddServingUnit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ServingUnitSchemaType>({
    resolver: zodResolver(servingUnitSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (servingUnit: ServingUnitSchemaType) => {
    startTransition(async () => {
      const { status, message } = await addServingUnit(servingUnit);
      if (status === "Success") {
        toast.success(message);
        form.reset();
        setIsOpen(false);
      } else if (status === "Fail") {
        toast.error(message);
      }
    });
  };
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button type="button">
            <PlusCircle />
            Add Serving Unit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Serving Unit</AlertDialogTitle>
            <AlertDialogDescription>
              Add new Serving Unit
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" autoCorrect="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <Button type="submit">
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Save
                    </>
                  ) : (
                    <>Save</>
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ButtonAddServingUnit;
