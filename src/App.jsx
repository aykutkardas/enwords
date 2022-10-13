import { useEffect, useState } from "react";

import { deserializeDB, serializeDB } from "./utils/parseDB";
import wordCounter from "./utils/word-counter";
import Collapse from "./components/Collapse";
import executeScript from "./utils/executeScript";
import Info from "./components/Info";
import Header from "./components/Header";
import AnalyzeButton from "./components/AnalyzeButton";
import Footer from "./components/Footer";

const App = () => {
  const oldData = deserializeDB(localStorage.getItem("words"));
  const [words, setWords] = useState(oldData);
  const [pageWords, setPageWords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlyPage, setOnlyPage] = useState(true);
  const [analyze, setAnalyze] = useState(false);
  const [pageLang, setPageLang] = useState(null);

  const handleAnalyze = () => {
    setLoading(true);

    executeScript(["getPageText.js"], ([data]) => {
      const parsedWords = wordCounter(data.result);
      const words = Object.entries(parsedWords).map(([word, count]) => ({
        word,
        count,
        known: false,
        findCount: 1,
      }));

      setPageWords(words.map(({ word }) => word));

      const lastWords = localStorage.getItem("lastWords");
      const serializeWords = serializeDB(words);

      if (serializeWords === lastWords) {
        setTimeout(() => {
          setLoading(false);
          setAnalyze(true);
        }, 1000);
        return;
      }

      words.forEach((item) => {
        const oldItem = oldData.find((oldItem) => oldItem.word === item.word);
        if (oldItem) {
          oldItem.findCount += 1;
          oldItem.count += item.count;
        } else {
          oldData.push(item);
        }
      });

      localStorage.setItem("lastWords", serializeDB(words));

      setTimeout(() => {
        setWords(oldData.sort((a, b) => b.count - a.count));
        setLoading(false);
        setAnalyze(true);
      }, 1000);
    });
  };

  useEffect(() => {
    executeScript(["getPageLang.js"], ([data]) => {
      setPageLang(data.result);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("words", serializeDB(words));
  }, [words]);

  const handleSearch = ({ target }) => setSearch(target.value);

  const handleKnown = (word, known) => {
    const newWords = words.map((item) => ({
      ...item,
      known: item.word === word ? known : item.known,
    }));

    setWords(newWords);
  };

  const filteredWords = words.filter((item) =>
    onlyPage ? pageWords.includes(item.word) : true
  );

  const newWords = filteredWords.filter(
    (word) => !word.known && word.findCount === 1
  );
  const familiarWords = filteredWords.filter(
    (word) => !word.known && word.findCount !== 1
  );
  const knownWords = filteredWords.filter((word) => word.known);

  const searchWords = filteredWords.filter((item) =>
    item.word.includes(search.toLowerCase())
  );

  const isEnglish = pageLang && pageLang?.startsWith("en");

  return (
    <div className="bg-neutral-900 py-[52px] h-[500px] w-[300px] ml-auto overflow-y-scroll">
      <Header handleSearch={handleSearch} />

      {analyze && (
        <Info
          familiarWords={familiarWords}
          newWords={newWords}
          knownWords={knownWords}
          filteredWords={filteredWords}
          onlyPage={onlyPage}
        />
      )}

      {!analyze && isEnglish && (
        <AnalyzeButton loading={loading} handleAnalyze={handleAnalyze} />
      )}

      {!isEnglish && (
        <div className="px-3 py-8 m-1 text-center select-none text-xs border border-dashed border-neutral-600">
          <p className="text-neutral-400">This page is not in English</p>
        </div>
      )}

      <div className="p-3 flex">
        <label className="inline-flex items-center justify-center text-neutral-300 select-none">
          <input
            type="checkbox"
            checked={onlyPage}
            onChange={() => setOnlyPage(!onlyPage)}
            className="mr-2"
          />
          Show the results for this page only
        </label>
      </div>

      {search ? (
        <Collapse
          title="Search Results"
          initialOpen={true}
          data={searchWords}
          handleKnown={handleKnown}
          loading={loading}
        />
      ) : (
        <>
          <Collapse
            title="New Words"
            data={newWords}
            handleKnown={handleKnown}
            loading={loading}
          />
          <Collapse
            title="Familiar Words"
            data={familiarWords}
            handleKnown={handleKnown}
            loading={loading}
          />
          <Collapse
            title="Words You Know"
            data={knownWords}
            handleKnown={handleKnown}
            loading={loading}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;
