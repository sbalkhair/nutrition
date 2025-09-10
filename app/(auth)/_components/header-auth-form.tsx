import AppIcon from "@/components/app-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Application } from "@/lib/constant";
import Link from "next/link";

const HeaderAuthForm = () => {
  return (
    <div className="mb-4 flex items-center justify-between border-b pb-2">
      <Link href="/">
        <div className="flex items-center justify-center gap-x-1">
          <div className="bg-primary rounded-full p-2">
            <AppIcon className="size-7 text-white" />
          </div>
          <div className="text-primary mb-2 text-2xl font-bold">
            {Application.title}
          </div>
        </div>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default HeaderAuthForm;
