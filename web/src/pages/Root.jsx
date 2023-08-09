import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

const Root = () => {
  return (
    <div className="dark:bg-gradient-to-t dark:from-slate-700 h-full">
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Root;
