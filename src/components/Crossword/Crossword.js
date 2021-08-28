import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context";
import * as s from "./StyledCrossword";

const Crossword = () => {
  const {
    setFieldSize,
    getRandomNum,
    words: w,
    startGenerate,
  } = useContext(context);

  const [render, setRender] = useState(0);
  const [autoWords, setAutoWords] = useState();
  const fieldRef = useRef();

  const regenerateFunc = (e) => {
    setRender((prev) => ++prev);
  };

  const autoGenerateFunc = (e) => {
    setAutoWords([
      "experience",
      "exuberance",
      "workflow",
      "teamlead",
      "microtask",
      "notebook",
      "failure",
    ]);
  };

  useEffect(() => {
    let words = autoWords ? [...autoWords] : [...w];

    const field = fieldRef.current;
    setFieldSize(field);
    const context = field.getContext("2d");

    if (!words.length || !startGenerate) return;

    let crossWordsArr = [];

    context.clearRect(0, 0, field.width, field.height);

    const crossWords = (word, dir, x, y) => {
      if (word) {
        let item = {
          word,
          dir,
          start: { x, y },
          end: {
            x: dir === "hor" ? word.length : x,
            y: dir === "vert" ? word.length : y,
          },
        };
        crossWordsArr = [...crossWordsArr, item];
      }
      return crossWordsArr;
    };

    const coords = {
      x: null,
      y: null,
    };

    let crosswordWords = [];

    const drawCrossword = () => {
      context.translate(-coords.x, -coords.y);

      crosswordWords.forEach(
        ({ word, direction, shiftX, shiftY, i, posX, posY }) => {
          word.split("").forEach((letter, index) => {
            if (+i === index) letter = "";
            direction === "hor" ? (shiftX += 25) : (shiftY += 25);

            letter = letter.toLowerCase();
            context.lineWidth = 2;
            context.beginPath();
            context.rect(posX + shiftX, posY + shiftY, 25, 25);
            context.stroke();
            context.font = "18px sans-serif";
            const { width } = context.measureText(letter);
            context.fillText(
              letter,
              posX + shiftX + 25 / 2 - width / 2,
              posY + shiftY + 25 / 2 + 5
            );
          });
        }
      );
    };

    const drawWord = ({ word, direction, shiftX = 0, shiftY = 0, i }) => {
      let items = crossWords(word, direction, shiftX, shiftY);
      shiftX = shiftX * 25;
      shiftY = shiftY * 25;
      let posX = field.width / 2,
        posY = field.height / 2;

      let disX = posX + shiftX;
      let disY = posY + shiftY;

      if (!word) {
        drawCrossword();
        return;
      }

      if (disX < coords.x || coords.x === null) {
        coords.x = disX;
      }
      if (disY < coords.y || coords.y === null) {
        coords.y = disY;
      }

      crosswordWords = [
        ...crosswordWords,
        { word, direction, shiftX, shiftY, i, posX, posY },
      ];

      return items;
    };

    const createTheFirstWord = () => {
      const num = getRandomNum(words.length);
      const word = words[num];
      drawWord({
        word,
        direction: Math.random() > 0.5 ? "hor" : "vert",
      });
      words.splice(num, 1);
    };

    createTheFirstWord();

    const isIntersectedFunc = (params, anObj) => {
      let startX = +params.shiftX;
      let endX = +params.shiftX + params.word.length;
      let startY = +params.shiftY;
      let endY = +params.shiftY + params.word.length;

      let condition =
        (params.shiftY + 1 >= anObj.start.y &&
          params.shiftY - 1 <= anObj.start.y &&
          params.direction === "hor" &&
          anObj.dir === "hor") ||
        (params.shiftX - 1 <= anObj.start.x &&
          params.shiftX + 1 >= anObj.start.x &&
          params.direction === "vert" &&
          anObj.dir === "vert") ||
        (params.direction === "hor" &&
          params.shiftY >= anObj.start.y &&
          params.shiftY <= anObj.end.y &&
          anObj.start.x >= startX - 1 &&
          anObj.end.x <= endX + 1) ||
        (params.direction === "vert" &&
          params.shiftX >= anObj.start.x &&
          params.shiftX <= anObj.end.x &&
          anObj.start.y >= startY - 1 &&
          anObj.end.y <= endY + 1);

      return condition;
    };

    const createCrossword = () => {
      let printedWords = [...crossWordsArr];
      let item;

      while (words.length) {
        if (words.includes(item)) {
          words = words.filter((elem) => elem !== item);
        }

        for (let objIndex in printedWords) {
          let printedObj = printedWords[objIndex];
          for (let charInd in printedObj.word) {
            let printedChar = printedObj.word[charInd];
            for (let wordInd in words) {
              item = words[wordInd];
              charLabel: for (let i in item) {
                if (item[i] === printedChar) {
                  let params = {
                    word: item,
                    direction: printedObj.dir === "hor" ? "vert" : "hor",
                    shiftX:
                      printedObj.dir === "hor"
                        ? +charInd + printedObj.start.x + 1
                        : printedObj.start.x + -i - 1,
                    shiftY:
                      printedObj.dir === "hor"
                        ? printedObj.start.y + -i - 1
                        : +charInd + 1 + printedObj.start.y,
                    i,
                  };

                  for (let anObj of printedWords) {
                    if (printedObj === anObj) continue;
                    if (isIntersectedFunc(params, anObj)) {
                      continue charLabel;
                    }
                  }
                  printedWords = [...drawWord(params)];
                  words.splice(wordInd, 1);
                }
              }
            }
          }
        }
        if (!words.length) {
          drawWord({});
        }
      }
    };

    createCrossword();
  }, [setFieldSize, getRandomNum, w, startGenerate, render, autoWords]);

  return (
    <>
      <s.Crossword ref={fieldRef}></s.Crossword>
      {startGenerate && (
        <s.Buttons>
          <s.RegenerateBtn onClick={regenerateFunc}>Regenerate</s.RegenerateBtn>
          <s.AutoBtn onClick={autoGenerateFunc}>Auto Create</s.AutoBtn>
        </s.Buttons>
      )}
    </>
  );
};

export default Crossword;
