import styled from "styled-components";

export const Warning = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%)
    ${({ isModalClosed }) =>
      !isModalClosed ? "translateY(0)" : `translateY(-100vh)`};
  background-color: rgb(255, 243, 205);
  padding: 10px 20px;
  min-width: 250px;
  text-align: center;
  z-index: 9999;
  font-weight: 400;
  transition: 0.6s;
  animation: ${({ isModalClosed }) =>
    !isModalClosed ? "warning 0.6s linear backwards" : ""};

  @keyframes warning {
    0% {
      transform: translate(-50%, -100vh);
    }
    80% {
      transform: translate(-50%, 30px);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }
`;

export const Cross = styled.span`
  position: absolute;
  right: 5px;
  top: 0;
  cursor: pointer;
  color: grey;
  user-select: none;
`;
