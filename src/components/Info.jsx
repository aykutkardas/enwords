import { PieChart } from "react-minimal-pie-chart";

import toPercetage from "../utils/toPercentage";

const Info = ({
  newWords,
  familiarWords,
  knownWords,
  filteredWords,
  onlyPage,
}) => {
  return (
    <div className="p-3 flex items-center">
      <div className="text-neutral-300 flex-1">
        <h4 className="text-neutral-100 font-bold">
          {onlyPage ? "This Page" : "All-Time"}
        </h4>
        <div>
          You've seen{" "}
          <span className="text-emerald-300">
            {toPercetage(filteredWords.length, familiarWords.length)}%
          </span>{" "}
          of the words before.
        </div>
        {knownWords.length > 0 && (
          <div>
            You know{" "}
            <span className="text-sky-300">
              {toPercetage(filteredWords.length, knownWords.length)}%
            </span>
            of them.
          </div>
        )}
        {newWords.length > 0 && (
          <div>
            You encounter{" "}
            <span className="text-fuchsia-300">
              {toPercetage(filteredWords.length, newWords.length)}%.
            </span>{" "}
            of them for the first time.
          </div>
        )}
      </div>
      <div className="w-12 h-12 ml-2">
        <PieChart
          key={onlyPage.toString()}
          animate
          data={[
            {
              title: "New Words",
              value: newWords.length,
              color: "#e879f9",
            },
            {
              title: "Familir Words",
              value: familiarWords.length,
              color: "#34d399",
            },
            {
              title: "Words You Know",
              value: knownWords.length,
              color: "#3b82f6",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Info;
