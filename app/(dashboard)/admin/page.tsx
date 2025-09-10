import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import { requireUser } from "@/app/data/shared/require-user";
import data from "./data.json";

export default async function Page() {
  await requireUser("Admin");
  return (
    <>
      <SectionCards />
      <div>
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
