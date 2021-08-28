import styled from "styled-components";

export const Crossword = styled.canvas``;

export const Buttons = styled.div`
  --dis: 10px;
  position: absolute;
  top: var(--dis);
  right: var(--dis);
  display: flex;
  justify-content: center;
  gap: var(--dis);
`;

export const RegenerateBtn = styled.button`
  all: inset;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(to right, rgb(255, 193, 0), rgb(254, 123, 198));

  &:hover {
    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const AutoBtn = styled(RegenerateBtn)`
  background: linear-gradient(to right, rgb(0, 207, 208), rgb(0, 135, 215));
`;
