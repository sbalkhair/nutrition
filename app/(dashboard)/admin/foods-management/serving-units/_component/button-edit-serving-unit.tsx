"use client";
import { editServingUnit } from "@/app/(dashboard)/admin/foods-management/serving-units/data/edit-serving-unit";
import type { ServingUnitType } from "@/app/(dashboard)/admin/foods-management/serving-units/data/get-serving-units";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
import { Edit2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ButtonEditServingUnit = ({
  servingUnit,
}: {
  servingUnit: ServingUnitType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ServingUnitSchemaType>({
    resolver: zodResolver(servingUnitSchema),
    defaultValues: { id: servingUnit.id, name: servingUnit.name },
  });

  const onSubmit = (values: ServingUnitSchemaType) => {
    startTransition(async () => {
      const { status, message } = await editServingUnit(values);
      if (status === "Success") {
        toast.success(message);
        form.reset();
      } else if (status === "Fail") {
        toast.error(message);
      }
    });
  };
  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Edit2 className="text-primary mr-2" />
        Edit
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Serving Unit</AlertDialogTitle>
            <AlertDialogDescription>
              You can edit Serving Unit name
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
                    onClick={() => {
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
                      Save Change
                    </>
                  ) : (
                    <>Save Change</>
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ButtonEditServingUnit;
