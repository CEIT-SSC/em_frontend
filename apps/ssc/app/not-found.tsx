import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-6 text-center">
        <div className="relative flex justify-center items-center mb-20 sm:mb-30 pointer-events-none">
          <span className="absolute z-1 text-[200px] sm:text-[400px] font-bold opacity-15">
            404
          </span>
          <span className="absolute z-2 text-8xl sm:text-[160px] font-bold">
            ۴۰۴
          </span>
        </div>
        <h2 className="text-4xl font-bold text-whiteText">صفحه پیدا نشد!</h2>
        <Link className="text-2xl text-gradient font-bold" href="/">
          برگشت به خانه
        </Link>
      </div>
    </div>
  );
}
