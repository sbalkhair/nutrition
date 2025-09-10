import { requireUser } from "@/app/data/shared/require-user";

const page = async () => {
  await requireUser("Client");
  return <div>Client</div>;
};

export default page;
