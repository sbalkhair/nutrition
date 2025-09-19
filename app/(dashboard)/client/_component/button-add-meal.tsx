"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MealSchemaType, mealSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { addMeal } from "../data/add-meal";

import { type FoodType } from "../../admin/foods-management/foods/data/get-foods";

import { type ServingUnitType } from "../../admin/foods-management/serving-units/data/get-serving-units";

type ButtonAddMealProps = {
  foods: FoodType[];
  servingUnits: ServingUnitType[];
  onMealAdded: () => void;
};

const ButtonAddMeal = ({
  foods,
  servingUnits,
  onMealAdded,
}: ButtonAddMealProps) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<MealSchemaType>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      dateTime: new Date(),
      mealFoods: [{ foodId: "", servingUnitId: "", amount: 0 }],
    },
  });
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "mealFoods",
  });

  const onSubmit = (meal: MealSchemaType) => {
    const validData = {
      ...meal,
      mealFoods: meal.mealFoods.filter(
        (meal) => meal.servingUnitId && meal.foodId && meal.amount,
      ),
    };

    startTransition(async () => {
      const { status, message } = await addMeal(validData);
      if (status === "Success") {
        toast.success(message);
        form.reset();
        setIsOpen(false);
        if (onMealAdded) {
          onMealAdded();
        }
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
            Add Meal
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Meal</AlertDialogTitle>
            <AlertDialogDescription>Customize your meal</AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex items-center justify-between">
            <h2 className="font-bold">Foods ({fields.length})</h2>
          </div>
          <div className="flex h-100 flex-col overflow-scroll">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-6 rounded-xl border p-4">
                  {fields.length === 0 && (
                    <div className="text-center text-slate-500">
                      No food added yet
                    </div>
                  )}
                  {fields.map((field, index) => {
                    const foodId = form.watch(`mealFoods.${index}.foodId`);
                    const selectedFood = foods.find((f) => f.id === foodId);
                    const allowedUnitIds =
                      selectedFood?.foodServingUnits.map(
                        (fsu) => fsu.servingUnit.id,
                      ) || [];
                    const filteredServingUnits = servingUnits.filter((su) =>
                      allowedUnitIds.includes(su.id),
                    );

                    return (
                      <div key={field.id} className="flex items-end gap-3">
                        <FormField
                          control={form.control}
                          name={`mealFoods.${index}.foodId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Food</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select Food" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {foods.map((food) => (
                                      <SelectItem
                                        key={food.id}
                                        value={food.id}
                                      >
                                        {food.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`mealFoods.${index}.servingUnitId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="">
                                    <SelectValue placeholder="Select Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {(filteredServingUnits.length > 0
                                      ? filteredServingUnits
                                      : servingUnits
                                    ).map((unit) => (
                                      <SelectItem
                                        key={unit.id}
                                        value={unit.id}
                                      >
                                        {unit.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`mealFoods.${index}.amount`}
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({ servingUnitId: "", foodId: "", amount: 0 })
                    }
                  >
                    <PlusCircle />
                    Add Food To Meal
                  </Button>
                </div>

                <AlertDialogFooter className="px-1">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        form.reset();
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <Button type="submit">
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ButtonAddMeal;
