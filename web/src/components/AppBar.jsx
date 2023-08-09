import { Link } from "react-router-dom";
import PollSvg from "./PollSvg";
import SearchSvg from "./SearchSvg";

const AppBar = () => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/25 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-slate-100 lg:px-8 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <Link className="mr-3 flex-none overflow-hidden md:w-auto text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400" to="/">
              <div className="flex font-bold text-xl">
                P
                <span className="-ml-1 -mt-0.5 -mr-1">
                  <PollSvg width={"1.5em"} height={"1.5em"} />
                </span>
                LL REQUEST
              </div>
            </Link>
            <div className="relative lg:flex items-center ml-auto">
              <nav className="hidden lg:block text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-8">
                  <li>
                    <Link
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                      to="/create"
                    >
                      Create Poll
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800 text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="hidden lg:flex space-x-8">
                  <li className="">
                    <Link
                      to="/join"
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      Find Poll
                    </Link>
                  </li>
                </ul>
                <Link className="lg:hidden" to="/join">
                  <SearchSvg width={"1.5em"} height={"1.5em"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
