import { XIcon } from "lucide-react";

const NotAllow = () => {
  return (
    <div className="flex h-[550px] items-center justify-center">
      <div className="flex max-w-sm flex-col items-center justify-center space-y-6 rounded-2xl border border-red-200 bg-red-100 p-4">
        <div className="rounded-full border-6 border-red-400 bg-red-600 p-4">
          <XIcon className="size-12 font-bold text-white" />
        </div>
        <div className="text-md text-center font-bold text-red-700 md:text-2xl">
          You don't have permission to access to this page
        </div>
      </div>
    </div>
  );
};

export default NotAllow;
