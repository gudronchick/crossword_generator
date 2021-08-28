import styled from "styled-components";

export const ModalWrap = styled.div`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${({ startGenerate }) =>
    startGenerate ? "fading .8s forwards" : ""};

  @keyframes fading {
    0% {
      background: rgba(0, 0, 0, 0.4);
    }

    100% {
      background: rgba(0, 0, 0, 0);
      visibility: hidden;
    }
  }
`;

export const Modal = styled.div`
  margin: auto;
  padding: 15px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  animation: ${({ startGenerate }) =>
    startGenerate ? "bounceUp .8s ease-in forwards" : ""};

  @keyframes bounceUp {
    100% {
      visibility: hidden;
      transform: scale(0);
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  position: relative;
  width: 250px;
  padding: 5px 5px;
  border-radius: 12px;
  font-size: 1.1rem;
  border: 2px solid grey;

  &:focus {
    outline: none;
  }
`;

export const Buttons = styled.div`
  margin: 0 0 0 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    margin: 10px 0 0 0;
  }
`;

export const Add = styled.button`
  all: unset;
  text-align: center;
  color: white;

  border-radius: 12px;
  margin-right: 10px;
  padding: 6px 15px;
  background: linear-gradient(to right, rgb(0, 207, 208), rgb(255, 93, 225));
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 10px 0 grey;
  }

  @media screen and (max-width: 500px) {
    width: 60px;
  }
`;

export const Generate = styled(Add)`
  margin: 0;
  background: linear-gradient(to right, rgb(255, 131, 80), rgb(255, 0, 202));
`;
