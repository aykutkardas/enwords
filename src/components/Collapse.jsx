import { useState } from "react";
import WordCard from "./WordCard";
import Icon from "./Icon";
import clsx from "clsx";

const Collapse = ({
  data,
  title,
  icon,
  loading,
  initialOpen = false,
  handleKnown,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [showCount, setShowCount] = useState(30);

  const showMore = () => {
    setShowCount((prev) => prev + 30);
  };

  const levelPeriod = Math.floor(
    Math.max(...data.map(({ count }) => count)) / 5
  );

  return (
    <div>
      <h4
        className="sticky top-0 select-none p-3 z-30 cursor-pointer border-b flex items-center justify-between shadow-xl border-neutral-600 bg-neutral-900 text-neutral-300 text-sm font-bold"
        onClick={() => setOpen(!open)}
      >
        <div className="inline-flex items-center">
          {title}
          {icon && <Icon icon={icon} size={18} className="ml-2" />}
          <span className="ml-2 text-neutral-400 text-[10px] font-normal">
            {data.length}
          </span>
        </div>
        <Icon icon={open ? "arrow-up" : "arrow-down"} size={16} />
      </h4>
      <div
        className={clsx(
          "flex flex-col  text-neutral-300 text-sm",
          open ? "divide-y divide-neutral-800" : "h-0 overflow-y-hidden"
        )}
      >
        {!loading && data.length === 0 && (
          <div className="text-neutral-400 py-3 w-full h-11 flex items-center justify-center">
            There are no words here!
          </div>
        )}
        {loading && (
          <div className="text-neutral-400 py-3 w-full h-11 flex items-center justify-center">
            Loading...
          </div>
        )}
        {!loading &&
          data
            .slice(0, showCount)
            .map((item) => (
              <WordCard
                key={item.word}
                {...item}
                isNew={!item.known}
                handleKnown={handleKnown}
                levelPeriod={levelPeriod}
              />
            ))}
        {data.length > showCount && (
          <span
            className="w-full h-10 flex select-none items-center text-xs justify-center text-neutral-300 cursor-pointer hover:opacity-70"
            onClick={showMore}
          >
            Show More
          </span>
        )}
      </div>
    </div>
  );
};

export default Collapse;
