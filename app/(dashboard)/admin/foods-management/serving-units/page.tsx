import { requireUser } from "@/app/data/shared/require-user";

const page = async () => {
  await requireUser("Admin");
  return <div>serving-units</div>;
};

export default page;
