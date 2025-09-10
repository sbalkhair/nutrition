import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { SectionCards } from "@/components/section-cards";

import { requireUser } from "@/app/data/shared/require-user";

export default async function Page() {
  await requireUser("Admin");
  return (
    <>
      <SectionCards />
      <div>
        <ChartAreaInteractive />
      </div>
    </>
  );
}
