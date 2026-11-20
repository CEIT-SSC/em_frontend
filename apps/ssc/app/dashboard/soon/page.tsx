const page = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-2.5">
      <h2 className="text-3xl font-bold">داریم روی این بخش کار می‌کنیم</h2>
      <div className="flex flex-col gap-7 py-8 md:px-4">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">این بخش هنوز آماده نیست.</p>
          <p className="text-lg text-gray-500">
            کمی بعد دوباره سر بزنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
