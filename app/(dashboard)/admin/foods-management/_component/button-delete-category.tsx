"use client";

import { deleteCategory } from "@/app/data/admin/categories/delete-category";
import type { CategoryType } from "@/app/data/admin/categories/get-categories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const ButtonDeleteCategory = ({ category }: { category: CategoryType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDeleteCategory = () => {
    startTransition(async () => {
      const { status, message } = await deleteCategory(category);
      if (status === "Success") {
        toast.success(message);
        setIsOpen(false);
      } else if (status === "Fail") {
        toast.error(message);
      }
    });
  };
  return (
    <div>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Trash2 />
        Delete
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              You will Delete {category.name} Permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={handleDeleteCategory}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Continue
                </>
              ) : (
                <>Continue</>
              )}
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ButtonDeleteCategory;
