const Header = ({ handleSearch }) => (
  <div className="bg-neutral-900 fixed top-0 z-50 flex flex-col">
    <div className="p-3 flex items-center h-12 border-b border-neutral-800">
      <h2 className="inline-flex items-baseline text-[22px] text-neutral-200 font-bold mr-4">
        enwords
      </h2>
      <input
        placeholder="Search word..."
        onChange={handleSearch}
        className="w-full py-2 px-4 text-neutral-200 bg-neutral-700/60 h-7 rounded-2xl text-xs placeholder:text-neutral-500"
      />
    </div>
    <div className="h-1 w-full bg-gradient-to-l from-emerald-400 via-fuchsia-400  to-blue-300" />
  </div>
);

export default Header;
