import clsx from "clsx";
import Icon from "./Icon";

const getLevel = (count, levelPeriod) => {
  if (count < levelPeriod) return 1;
  if (count < levelPeriod * 2) return 2;
  if (count < levelPeriod * 3) return 3;
  if (count < levelPeriod * 4) return 4;
  if (count >= levelPeriod * 4) return 5;
};

const WordCard = ({ word, count, levelPeriod, isNew = false, handleKnown }) => (
  <div className="py-2 flex items-center justify-between font-medium hover:bg-neutral-700/20 cursor-normal px-3">
    <div className="flex items-center">
      <Icon
        icon={`signal-${getLevel(count, levelPeriod)}`}
        size={16}
        className="mr-2"
      />
      {word}
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
        onClick={() => handleKnown(word, !!isNew)}
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

export default WordCard;
