import { getCategories } from "@/app/(dashboard)/admin/foods-management/categories/data/get-categories";
import { getFoods } from "@/app/(dashboard)/admin/foods-management/foods/data/get-foods";
import { getServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/data/get-serving-units";
import { Suspense } from "react";
import ButtonAddFood from "./_component/button-add-food";
import FoodLoadingSkeleton from "./_component/food-loding-skeleton";
import FoodsClientPage from "./_component/foods-client-page";

const page = async () => {
  return (
    <Suspense fallback={<FoodLoadingSkeleton />}>
      <RenderFoodsClientPage />
    </Suspense>
  );
};

export default page;

const RenderFoodsClientPage = async () => {
  const [data, servingUnits, categories] = await Promise.all([
    getFoods(),
    getServingUnits(),
    getCategories(),
  ]);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1>Foods</h1>
        <ButtonAddFood categories={categories} />
      </div>
      <FoodsClientPage
        data={data}
        servingUnits={servingUnits}
        categories={categories}
      />
    </div>
  );
};
