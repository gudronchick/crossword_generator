import React, { useContext, useEffect } from "react";
import { context } from "../../context";
import * as s from "./StyledWarning";

const Warning = () => {
  const {
    warning,
    isModalClosed,
    setWarningClosed,
    setIsModalClosed,
    startGenerate,
  } = useContext(context);

  useEffect(() => {
    if (startGenerate) {
      setIsModalClosed(true);
      return;
    }

    let t;
    if (!isModalClosed) {
      t = setTimeout(() => {
        setWarningClosed(true);
      }, 1500);
    }
    return () => {
      clearTimeout(t);
    };
  }, [setWarningClosed, isModalClosed, startGenerate, setIsModalClosed]);

  const closeWarning = (e) => {
    setIsModalClosed(true);
  };

  return (
    <>
      <s.Warning isModalClosed={isModalClosed}>
        {warning.text}
        <s.Cross onClick={closeWarning}>✖</s.Cross>
      </s.Warning>
    </>
  );
};

export default Warning;
