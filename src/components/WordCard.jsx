import clsx from "clsx";
import Icon from "./Icon";

import { useState } from "react";

const getLevel = (count, levelPeriod) => {
  if (count < levelPeriod) return 1;
  if (count < levelPeriod * 2) return 2;
  if (count < levelPeriod * 3) return 3;
  if (count < levelPeriod * 4) return 4;
  if (count >= levelPeriod * 4) return 5;
};

const WordCard = ({
  word,
  count,
  types,
  levelPeriod,
  isNew = false,
  handleKnown,
}) => {
  const [animate, setAnimate] = useState(false);

  const handleKnownClick = (e) => {
    e.stopPropagation();

    setAnimate(true);

    setTimeout(() => {
      handleKnown(word, !!isNew);
    }, 300);
  };

  return (
    <div
      className={clsx(
        "flex items-center h-10 relative justify-between overflow-hidden font-medium transition-all duration-300 hover:bg-neutral-700/20 cursor-normal py-2 px-3 cursor-pointer",
        animate ? "-right-[100%]" : "right-0"
      )}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <Icon
            icon={`signal-${getLevel(count, levelPeriod)}`}
            size={16}
            className="mr-2"
          />
          {word}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {types.filter(Boolean).map((type) => (
            <span className="px-1 opacity-70 h-4 whitespace-nowrap inline-flex items-center text-[10px] bg-purple-800 border border-purple-500 text-purple-300 rounded-xl">
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="select-none inline-flex items-center">
        <span
          className={clsx(
            "mr-2 w-6 text-right text-[10px] inline-block font-medium !text-fuchsia-300 select-none"
          )}
        >
          x{count > 999 ? "999+" : count}
        </span>
        <Icon
          onClick={handleKnownClick}
          icon={isNew ? "check" : "minus-circle"}
          size={20}
          className={clsx(
            "mx-1 cursor-pointer hover:opacity-70",
            isNew ? "text-green-400" : "text-neutral-400"
          )}
        />
        <a
          href={`https://sentence.yourdictionary.com/${word}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="text"
            size={20}
            className="mx-1 cursor-pointer text-teal-400"
          />
        </a>
        <a
          href={`https://www.dictionary.com/browse/${word}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="book"
            size={20}
            className="mx-1 cursor-pointer text-emerald-400"
          />
        </a>
      </div>
    </div>
  );
};

export default WordCard;
