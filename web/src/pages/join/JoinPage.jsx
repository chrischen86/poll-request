import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Numpad from "../../components/keyboard/Numpad";
import PollId from "./PollId";

const POLL_ID_LENGTH = 4;

const JoinPage = () => {
  const [pollId, setPollId] = useState("");
  const navigate = useNavigate();

  const handleChar = (c) => {
    if (pollId.length < POLL_ID_LENGTH) {
      setPollId((p) => p + c);
    }
  };

  const handleDelete = () => {
    setPollId((p) => p.slice(0, p.length - 1));
  };

  const handleEnter = () => {
    if (pollId.length !== POLL_ID_LENGTH) {
      return;
    }
    navigate(`/vote?pollId=${pollId}`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center pb-6 mt-8 lg:mt-16">
        <h2 className="text-slate-900 font-extrabold text-xl sm:text-lg lg:text-3xl tracking-tight text-center dark:text-white">
          Enter Poll Id
        </h2>
        <PollId id={pollId} />
      </div>
      <div className="absolute top-[100vh] translate-y-[-110%] w-full">
        <Numpad
          onChar={handleChar}
          onDelete={handleDelete}
          onEnter={handleEnter}
        />
      </div>
    </div>
  );
};

export default JoinPage;
