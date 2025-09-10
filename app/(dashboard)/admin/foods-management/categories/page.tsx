import { requireUser } from "@/app/data/shared/require-user";

const page = async () => {
  await requireUser("Admin");
  return <div>categories</div>;
};

export default page;
