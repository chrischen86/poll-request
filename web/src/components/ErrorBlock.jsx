import ReturnButton from "./ReturnButton";

const ErrorBlock = ({ message }) => {
  return (
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center dark:text-white">
        {message}
      </h1>
      <div className="max-w-xl mx-auto px-4">
        <ReturnButton />
      </div>
    </div>
  );
};

export default ErrorBlock;
