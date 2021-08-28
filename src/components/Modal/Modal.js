import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context";
import * as s from "./StyledModal";

const Modal = (props) => {
  const [value, setValue] = useState("");

  const { addNewWord, startGenerate, setStartGenerate, setWarningText, words } =
    useContext(context);

  const inputField = useRef();

  useEffect(() => {
    inputField.current.focus();
  }, []);

  const changeValue = (e) => {
    const inputValue = e.target.value;
    if (inputValue.match(/[0-9]/gi)?.length) {
      setWarningText("Only alphabet letters are allowed");
      return;
    }
    setValue(inputValue);
  };

  const addWord = () => {
    if (value.trim()?.length) addNewWord(value.trim());
    setValue("");
    inputField.current.focus();
  };

  const submitForm = (e) => {
    e.preventDefault();
    addWord();
  };

  const checkWordsAmount = () => {
    if (words.length < 2) {
      setWarningText("Must be at least 2 words");
      return true;
    }
    return false;
  };

  const generateCrossword = () => {
    if (checkWordsAmount()) return;
    addWord();
    setStartGenerate(true);
  };

  const generateFunc = (e) => {
    if (e.key !== " ") {
      return;
    } else {
      e.preventDefault();
    }
    if (checkWordsAmount()) return;
    addWord();
    generateCrossword();
  };

  return (
    <s.ModalWrap startGenerate={startGenerate}>
      <s.Modal startGenerate={startGenerate}>
        <form onSubmit={submitForm}>
          <s.Input
            type="text"
            ref={inputField}
            onChange={changeValue}
            value={value}
            onKeyPress={generateFunc}
          />
        </form>
        <s.Buttons>
          <s.Add onClick={addWord}>Add</s.Add>
          <s.Generate onClick={generateCrossword}>Generate</s.Generate>
        </s.Buttons>
      </s.Modal>
    </s.ModalWrap>
  );
};

export default Modal;
