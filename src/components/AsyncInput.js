import React from "react";
import styled, { css } from "styled-components";

import { scaleFadeIn, spin, Input } from "./generic/";


const StyledInput = styled.div`
  position: relative;

  ${({ isLoading }) =>
    isLoading &&
    css`
      .spinner {
        position: absolute;
        top: 50%;
        bottom: 0;
        right: 15px;
        height: 30px;
        width: 30px;
        margin-top: -15px;
        animation: ${scaleFadeIn} 0.2s;
      }

      .spinner:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 50%;
        border: 4px solid #dcdcdc;
        border-top-color: #aba8a8;
        animation: ${spin} 0.8s linear infinite;
      }
    `}
`;

export const AsyncInput = ({ isLoading, className, ...rest }) => (
  <StyledInput isLoading={isLoading} className={className}>
    <Input {...rest} />
    <div className="spinner" />
  </StyledInput>
);
