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
import { ResponsiveRow } from "@/lib/responsive-row";
import { foodSchema, type FoodSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const ButtonAddFood = ({ categories }: { categories: CategoryType[] }) => {
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
        <AlertDialogContent className="h-[90vh] w-[95vw] max-w-lg overflow-y-auto rounded-xl p-6 sm:max-w-2xl md:max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Food</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details of the food item below.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
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

              {/* Category */}
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

              {/* Nutrition fields - grid for responsiveness */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories (kcal)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Calories"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
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
                    <FormItem>
                      <FormLabel>Carbohydrates (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Carbohydrates"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fat (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Fat"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
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
                    <FormItem>
                      <FormLabel>Sugar (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Sugar"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Protein"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
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
                    <FormItem>
                      <FormLabel>Fiber (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Fiber"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Serving Units */}
              <div className="space-y-4 rounded-2xl border p-4">
                <h3 className="font-semibold">Serving Units</h3>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="gap-3 rounded-2xl border bg-slate-50/80 p-4 dark:bg-slate-50/10"
                  >
                    <ResponsiveRow>
                      <FormItem className="w-full">
                        <FormLabel>Food Serving Unit</FormLabel>
                        <FormControl className="w-full">
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="g">Gram</SelectItem>
                              <SelectItem value="ml">Milliliter</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Grams</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" />
                        </FormControl>
                      </FormItem>

                      <div className="flex items-end">
                        <Button
                          onClick={() => remove(index)}
                          type="button"
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash2 className="mr-2" />
                        </Button>
                      </div>
                    </ResponsiveRow>
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

              {/* Footer */}
              <AlertDialogFooter className="flex justify-end gap-2">
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
