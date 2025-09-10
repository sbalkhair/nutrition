"use client";
import { editCategory } from "@/app/data/admin/categories/edit-category";
import type { CategoryType } from "@/app/data/admin/categories/get-categories";
import {
  AlertDialog,
  AlertDialogCancel,
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
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

const ButtonEditCategory = ({ category }: { category: CategoryType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: { id: category.id, name: category.name },
  });

  const onsSubmit = (values: z.infer<typeof categorySchema>) => {
    startTransition(async () => {
      const { status, message } = await editCategory(values);
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
        <Edit2 />
        Edit
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onsSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
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
                <AlertDialogCancel
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ButtonEditCategory;
