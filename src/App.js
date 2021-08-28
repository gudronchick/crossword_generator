import React, { useState } from "react";
import { Provider } from "./context";
import Modal from "./components/Modal/Modal";
import Warning from "./components/Warning/Warning";
import Crossword from "./components/Crossword/Crossword";
import { getRandomNum, setFieldSize, throttle } from "./utilities";

const App = () => {
  const [words, setWords] = useState([]);

  const [startGenerate, setStartGenerate] = useState(false);
  const [warning, setWarning] = useState({
    text: "",
  });
  const [isModalClosed, setIsModalClosed] = useState(true);

  const setWarningClosed = (value) => {
    setTimeout(() => {
      setIsModalClosed(value);
    }, 600);
  };

  const setWarningText = (text) => {
    setWarning({ text });
    setIsModalClosed(false);
  };

  const addNewWord = (word) => {
    setWords((prev) => [...prev, word]);
  };

  return (
    <Provider
      value={{
        words,
        addNewWord,
        startGenerate,
        setStartGenerate,
        setFieldSize,
        getRandomNum,
        warning,
        setWarning,
        isModalClosed,
        setWarningClosed,
        setWarningText,
        setIsModalClosed,
        throttle,
      }}
    >
      <Warning />
      <Modal />
      <Crossword />
    </Provider>
  );
};

export default App;
