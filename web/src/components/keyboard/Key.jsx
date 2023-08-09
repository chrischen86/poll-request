const Key = ({ children, value, onClick }) => {
  const handleOnClick = (event) => {
    if (onClick) {
      onClick(value);
    }

    event.currentTarget.blur();
  };

  return (
    <button
      onClick={handleOnClick}
      className="flex w-28 h-14 items-center justify-center rounded mx-0.5 text-2xl font-bold cursor-pointer select-none text-slate-900 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:text-white dark:bg-slate-600"
    >
      {children || value}
    </button>
  );
};

export default Key;
