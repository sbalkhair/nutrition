import { SectionCards } from "@/components/section-cards";

import { requireUser } from "@/app/(dashboard)/shared/require-user";

export default async function Page() {
  await requireUser("Admin");
  return (
    <>
      <SectionCards />
    </>
  );
}
