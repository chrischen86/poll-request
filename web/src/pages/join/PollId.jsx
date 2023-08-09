const PollId = ({ id }) => {
  return (
    <div className="text-8xl lg:text-9xl flex gap-9 justify-center text-slate-900 dark:text-white">
      {[0, 1, 2, 3].map((v) => (
        <div key={`digit-${v}`} className="w-20 text-center">
          {v >= id.length ? "\u00A0" : id[v]}
        </div>
      ))}
    </div>
  );
};

export default PollId;
