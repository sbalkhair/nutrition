import { getDashboardStats } from "@/app/(dashboard)/admin/data/get-dashboard-stats";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCategory } from "@tabler/icons-react";
import { Beef, ForkKnife, User } from "lucide-react";

export async function SectionCards() {
  const { foodCount, categoryCount, mealsCount, userCount } =
    await getDashboardStats();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="flex flex-col items-center justify-center">
          <Beef className="text-primary size-7" />
          <CardDescription>Total Foods</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {foodCount}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-col items-center justify-center">
          <ForkKnife className="text-primary size-7" />
          <CardDescription>Total Meals</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {mealsCount}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-col items-center justify-center">
          <IconCategory className="text-primary size-7" />
          <CardDescription>Total Categories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {categoryCount}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-col items-center justify-center">
          <User className="text-primary size-7" />
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {userCount}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
