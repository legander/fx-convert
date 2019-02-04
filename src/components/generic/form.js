import styled, { css } from "styled-components";

import { fadeIn } from "./keyframes";


export const Input = styled.input`
  font-weight: 400;
  color: #08166c;
  background-color: rgba(255, 255, 255, 0.9);
  border: 0;
  border-bottom: 4px solid rgba(8, 22, 108, 0.6);
  border-top: 4px solid transparent;
  width: 100%;
  transition: 0.2s;

  padding: 14px 16px;
  font-size: 1em;
  outline: 0;
  font-weight: 300;
  width: 100%;
  -webkit-appearance: none;

  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 0.3s ease;
    `}

  ::placeholder {
    color: rgba(8, 22, 108, 0.4);
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  &:focus {
    background-color: rgba(255, 255, 255, 1);
    border-bottom-color: #0a166a;
  }

  &:focus::placeholder {
    color: rgba(8, 22, 108, 0.7);
  }
`;
