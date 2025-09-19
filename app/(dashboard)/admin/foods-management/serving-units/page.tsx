import { getServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/data/get-serving-units";
import { Suspense } from "react";
import ButtonAddServingUnit from "./_component/button-add-serving-unit";
import { DataTableServingUnit } from "./_component/data-table-serving-unit";
import ServingUnitLoadingSkeleton from "./_component/serving-unit-skeleton";

const page = async () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1>Serving Unit</h1>
        <ButtonAddServingUnit />
      </div>

      <Suspense fallback={<ServingUnitLoadingSkeleton />}>
        <RenderDataTableServingUnits />
      </Suspense>
    </div>
  );
};

export default page;

const RenderDataTableServingUnits = async () => {
  const data = await getServingUnits();
  return <DataTableServingUnit data={data} />;
};
