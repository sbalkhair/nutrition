"use client";

import { Suspense, useState } from "react";

import type { CategoryType } from "@/app/(dashboard)/admin/foods-management/categories/data/get-categories";
import type { FoodType } from "@/app/(dashboard)/admin/foods-management/foods/data/get-foods";
import type { ServingUnitType } from "@/app/(dashboard)/admin/foods-management/serving-units/data/get-serving-units";
import { Button } from "@/components/ui/button";
import { FilterFoodSchemaType } from "@/lib/schemas";
import { IconFilter2X } from "@tabler/icons-react";
import { ColumnFiltersState } from "@tanstack/react-table";
import React from "react";
import AdvanceFilter from "./advance-filter";
import { DataTableFoods } from "./data-table-foods";

const FoodsClientPage = ({
  data,
  servingUnits,
  categories,
}: {
  data: FoodType[];
  servingUnits: ServingUnitType[];
  categories: CategoryType[];
}) => {
  const [resetSignal, setResetSignal] = React.useState(0);
  const [filters, setFilters] = useState<FilterFoodSchemaType | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const filteredFoods = React.useMemo(() => {
    if (!filters) return data;
    return data.filter((food) => {
      const inRange = (value: number, [min, max]: [number, number]) =>
        value >= min && value <= max;

      const categoryMatch = filters.categoryId
        ? food.categoryId === filters.categoryId
        : true;

      return (
        categoryMatch &&
        inRange(food.calories ?? 0, filters.caloriesRange) &&
        inRange(food.protein ?? 0, filters.proteinRange) &&
        inRange(food.fat ?? 0, filters.fatRange) &&
        inRange(food.carbohydrates ?? 0, filters.carbohydrateRange) &&
        inRange(food.fiber ?? 0, filters.fiberRange) &&
        inRange(food.sugar ?? 0, filters.sugarRange)
      );
    });
  }, [data, filters]);

  const handleResetFilter = () => {
    setFilters(null);
    setColumnFilters([]);
    setResetSignal((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-end gap-2">
        <AdvanceFilter
          onFilter={(newFilters) => setFilters(newFilters)}
          categories={categories}
          onReset={handleResetFilter}
          resetSignal={resetSignal}
        />
        <Button variant="outline" onClick={handleResetFilter}>
          <IconFilter2X className="text-destructive" />
          Reset All Filters
        </Button>
      </div>
      <Suspense fallback={<div>Loading table...</div>}>
        <DataTableFoods
          data={filteredFoods}
          servingUnits={servingUnits}
          categories={categories}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          resetSignal={resetSignal}
        />
      </Suspense>
    </div>
  );
};

export default FoodsClientPage;
