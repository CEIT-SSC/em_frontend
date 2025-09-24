import { TextField } from "@ssc/ui";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-5xl font-bold">اکانت اسکای روم</h2>
      <div className="flex flex-col gap-2.5">
        <p className="text-[20px]/[150%] font-bold opacity-60">
          از این اکانت جهت شرکت در کلاس ها و ارائه هایی که در بستر اسکای روم
          تشکیل می شوند استفاده نمایید.
        </p>
        <TextField
          id="sky_username"
          name="sky_username"
          label="نام کاربری"
          value={session.user.skyUsername}
          readonly
        />
        <TextField
          id="sky_password"
          name="sky_password"
          label="رمز عبور"
          value={session.user.skyPassword}
          readonly
        />
      </div>
    </div>
  );
};

export default page;
