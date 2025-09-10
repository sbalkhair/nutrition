import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async (userType: "Admin" | "Client") => {
  {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      if (session.user.role?.toLowerCase() !== userType.toLowerCase()) {
        return redirect("/note-allow");
      }
    } else {
      return redirect("/sign-in");
    }
  }
});

// TODO:remove this code
// export const requireUser = async (userType: "Admin" | "Client") => {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (session) {
//     if (session.user.role?.toLowerCase() !== userType.toLowerCase()) {
//       return redirect("/note-allow");
//     }
//   } else {
//     return redirect("/sign-in");
//   }
// };
