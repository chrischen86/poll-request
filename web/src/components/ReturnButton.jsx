import { Link } from "react-router-dom";

const ReturnButton = () => {
  return (
    <div className="text-center pt-8">
      <Link
        className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        to="/"
      >
        Return
      </Link>
    </div>
  );
};

export default ReturnButton;
