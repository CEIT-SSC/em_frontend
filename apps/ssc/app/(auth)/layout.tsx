import portal from "~/assets/portal.png";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="h-[100vh] md:px-9 flex items-center justify-center">
      <div className="hidden absolute top-0 left-0 w-9/16 h-full py-4 px-6 md:block -z-1">
        <video
          className="h-full object-cover object-center rounded-2xl"
          autoPlay
          muted
          loop
        >
          <source src="/events/acpc.mp4" />
        </video>
      </div>
      <div className="relative w-full h-full md:max-w-[600px] max-h-[100vh] overflow-auto md:h-max bg-secondary-background md:rounded-3xl p-6 flex flex-col gap-4">
        <Image
          src={portal}
          alt="portal"
          className="top-0 left-0 w-d h-full absolute opacity-12 z-0 object-cover pt-4"
        />
        <div className="h-full w-full z-1">{children}</div>
      </div>
    </div>
  );
}
