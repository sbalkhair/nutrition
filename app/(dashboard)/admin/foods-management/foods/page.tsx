import { requireUser } from "@/app/data/shared/require-user";

const page = async () => {
  await requireUser("Admin");
  return <div>foods</div>;
};

export default page;
