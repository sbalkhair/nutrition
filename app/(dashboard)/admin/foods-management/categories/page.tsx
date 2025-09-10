import { getCategories } from "@/app/data/admin/categories/get-categories";
import ButtonAddCategory from "../_component/button-add-category";
import { DataTableCategory } from "../_component/data-table-categories";

const page = async () => {
  const data = await getCategories();
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1>categories</h1>
        <ButtonAddCategory />
      </div>

      <DataTableCategory data={data} />
    </div>
  );
};

export default page;
