import clsx from "clsx";

const AnalyzeButton = ({ handleAnalyze, loading }) => (
  <div className="px-3 my-8">
    <button
      onClick={handleAnalyze}
      type="button"
      disabled={loading}
      className="h-9 w-full p-[1px] rounded-md bg-gradient-to-l from-emerald-400 via-fuchsia-400 to-blue-300"
    >
      <div
        className={clsx(
          "m-0 h-full flex items-center justify-center text-xs bg-neutral-900/90 transition-all text-neutral-200 rounded-md",
          {
            "hover:bg-neutral-900": !loading,
          }
        )}
      >
        {loading ? "Analyzing..." : "Analyze This Page"}
      </div>
    </button>
  </div>
);

export default AnalyzeButton;
