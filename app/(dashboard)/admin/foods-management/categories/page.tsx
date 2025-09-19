import { getCategories } from "@/app/(dashboard)/admin/foods-management/categories/data/get-categories";
import { Suspense } from "react";
import ButtonAddCategory from "./_component/button-add-category";
import CategoryLoadingSkeleton from "./_component/category-skeleton";
import { DataTableCategory } from "./_component/data-table-categories";

const page = async () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1>categories</h1>
        <ButtonAddCategory />
      </div>

      <Suspense fallback={<CategoryLoadingSkeleton />}>
        <RenderDataTableCategories />
      </Suspense>
    </div>
  );
};

export default page;

const RenderDataTableCategories = async () => {
  const data = await getCategories();
  return <DataTableCategory data={data} />;
};
