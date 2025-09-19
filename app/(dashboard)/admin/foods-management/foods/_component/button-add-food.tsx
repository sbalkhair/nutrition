"use client";

import type { CategoryType } from "@/app/(dashboard)/admin/foods-management/categories/data/get-categories";
import { addFood } from "@/app/(dashboard)/admin/foods-management/foods/data/add-food";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { foodSchema, type FoodSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const ButtonAddFood = ({
  servingUnits,
  categories,
}: {
  servingUnits: { id: string; name: string }[];
  categories: CategoryType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FoodSchemaType>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      calories: null,
      carbohydrates: null,
      fat: null,
      fiber: null,
      protein: null,
      sugar: null,
      servings: [{ servingUnitId: "", grams: 0 }],
    },
  });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "servings",
  });

  const onSubmit = (food: FoodSchemaType) => {
    const validData = {
      ...food,
      servings: food.servings.filter(
        (serving) => serving.servingUnitId && serving.grams > 0,
      ),
    };

    startTransition(async () => {
      const { status, message } = await addFood(validData);
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
            <PlusCircle className="mr-2" />
            Add new Food
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-180 overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Food</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details of the food item below.
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
                      <Input
                        placeholder="Food Name"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem value={category.id} key={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Calories(kcal)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Calories Kcal"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carbohydrates"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Carbohydrates (g)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Carbohydrates grams"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name="fat"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Fat (g)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fat grams"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sugar"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Sugar (g)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sugar grams"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name="protein"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Protein grams"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fiber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Fiber (g)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fiber grams"
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4 rounded-2xl border p-4">
                <h3 className="font-semibold">Serving Units</h3>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-end justify-between"
                  >
                    {/* Select servingUnitId */}
                    <div className="flex items-center justify-between gap-3">
                      <FormField
                        control={form.control}
                        name={`servings.${index}.servingUnitId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food Servicing Unit</FormLabel>
                            <FormControl className="w-fit">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Select Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  {servingUnits.map((unit) => (
                                    <SelectItem key={unit.id} value={unit.id}>
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
                        name={`servings.${index}.grams`}
                        render={({ field }) => (
                          <FormItem className="w-32">
                            <FormLabel>Grams Per Unit</FormLabel>
                            <FormControl className="w-fit">
                              <Input
                                type="number"
                                step="0.1"
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
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="text-white" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ servingUnitId: "", grams: 0 })}
                >
                  <PlusCircle /> Add Unit
                </Button>
              </div>
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
                      <span className="ml-2">Saving...</span>
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

export default ButtonAddFood;
