import { keyframes } from "styled-components";


export const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const scaleFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
