"use client";
import { Button } from "@/components/ui/button";

import type { CategoryType } from "@/app/(dashboard)/admin/foods-management/categories/data/get-categories";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { filterFoodScheme, type FilterFoodSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconFilter2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AdvanceFilter = ({
  onFilter,
  categories,
  onReset,
  resetSignal,
}: {
  onFilter: (filters: FilterFoodSchemaType) => void;
  categories: CategoryType[];
  onReset: () => void;
  resetSignal: number;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FilterFoodSchemaType>({
    resolver: zodResolver(filterFoodScheme),
    defaultValues: {
      categoryId: "",
      carbohydrateRange: [0, 9999],
      caloriesRange: [0, 9999],
      fatRange: [0, 9999],
      fiberRange: [0, 9999],
      proteinRange: [0, 9999],
      sugarRange: [0, 9999],
    },
  });
  const onSubmit = (values: FilterFoodSchemaType) => {
    onFilter(values);
    setOpen(false);
  };

  useEffect(() => {
    form.reset();
  }, [resetSignal, form]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <IconFilter2 className="text-primary" /> Advance Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="p-10">
        <SheetHeader>
          <SheetTitle>Advance Fitter</SheetTitle>
          <SheetDescription>
            Customize your food search critical
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-scroll">
          <Form {...form}>
            <form
              className="flex flex-col space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
              <FormField
                control={form.control}
                name="caloriesRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        {/* Slider */}
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        {/* Inputs for min & max */}
                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proteinRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbohydrateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbohydrate</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fatRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fats</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fiberRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fibers</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sugarRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugar</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={0}
                          max={9999}
                          value={field.value}
                          onValueChange={field.onChange}
                          step={1}
                        />

                        <div className="flex items-center justify-between gap-7">
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Min</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[0] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  Number(e.target.value),
                                  field.value?.[1] ?? 0,
                                ])
                              }
                            />
                          </div>
                          <div className="relative flex w-full items-center justify-between">
                            <Label className="absolute start-0 px-2">Max</Label>
                            <Input
                              className="w-32 text-end"
                              type="number"
                              min={0}
                              max={9999}
                              value={field.value?.[1] ?? ""}
                              onChange={(e) =>
                                field.onChange([
                                  field.value?.[0] ?? 0,
                                  Number(e.target.value),
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                  onClick={() => {
                    onReset();
                    form.reset();
                    setOpen(true);
                  }}
                >
                  Reset
                </Button>
                <Button type="submit">Apply Filter</Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvanceFilter;
