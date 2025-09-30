import Image from "next/image";
import React from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-5xl font-bold">اطلاعات من</h2>
      <div className="py-8 md:px-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2.5">
          <Image
            width={128}
            height={128}
            src={session.user.image ?? "/default-profile.png"}
            alt="profile photo"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col md:flex-row pt-3 gap-3 pointer-events-none">
          <TextField
            id="first-name"
            name="info"
            label="نام"
            value={session.user.firstName}
            readonly
          />
          <TextField
            id="last-name"
            name="info"
            label="نام خانوادگی"
            value={session.user.lastName}
            readonly
          />
        </div>
        {/* <div className="flex flex-col md:flex-row pt-3 gap-3">
          <TextField id="first-name" name="info" label="مقطع تحصیلی" />
          <TextField id="university" name="info" label="دانشگاه" />
        </div>
        <div className="pt-3">
          <TextField
            id="student-number"
            name="info"
            type="number"
            label="شماره دانشجویی"
          />
        </div> */}
      </div>
      <Link
        href={"/dashboard/edit-account"}
        className="flex justify-center py-6 md:px-32"
      >
        <Button
          className="bg-(--MainGray) text-whiteText w-full"
          size={ButtonSize.SMALL}
          label="ویرایش اطلاعات"
        />
      </Link>
    </div>
  );
};

export default page;
