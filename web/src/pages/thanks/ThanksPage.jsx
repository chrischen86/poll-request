import ReturnButton from "../../components/ReturnButton";

const ThanksPage = () => {
  return (
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Thanks for voting!
      </h1>

      <div className="max-w-xl mx-auto px-4">
        <ReturnButton />
      </div>
    </div>
  );
};

export default ThanksPage;
