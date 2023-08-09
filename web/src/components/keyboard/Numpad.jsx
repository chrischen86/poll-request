import { useEffect } from "react";
import Key from "./Key";
import EnterSvg from "../EnterSvg";
import DeleteSvg from "../DeleteSvg";

const Numpad = ({ onChar, onDelete, onEnter }) => {
  const onClick = (value) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toLocaleUpperCase();
        if (key.length === 1 && key >= "0" && key <= "9") {
          onChar(key);
        }
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="mb-1 flex justify-center">
        {["1", "2", "3"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {["4", "5", "6"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {["7", "8", "9"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key value="DELETE" onClick={onClick}>
          <DeleteSvg width={"1.5em"} />
        </Key>
        {["0"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
        <Key value="ENTER" onClick={onClick}>
          <EnterSvg width={"1em"} />
        </Key>
      </div>
    </div>
  );
};

export default Numpad;
