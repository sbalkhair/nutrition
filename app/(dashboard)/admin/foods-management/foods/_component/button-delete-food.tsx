"use client";

import { deleteFood } from "@/app/(dashboard)/admin/foods-management/foods/data/delete-food";
import type { FoodType } from "@/app/(dashboard)/admin/foods-management/foods/data/get-foods";
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

const ButtonDeleteFood = ({ food }: { food: FoodType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteFood = () => {
    startTransition(async () => {
      const { status, message } = await deleteFood(food);
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
        <Trash2 className="text-destructive" />
        Delete
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure delete food?</AlertDialogTitle>
            <AlertDialogDescription>
              You will Delete {food.name} Permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={handleDeleteFood}
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

export default ButtonDeleteFood;
