import React from "react";

import { currencyFormatter } from "../utils";
import { StyledResultView } from "./generic";


export const ResultViewItem = ({ amount, code, highlight }) => (
  <li key={code} className={highlight ? "resultview__item resultview__item--highlight" : "resultview__item"}>
    <h4 className="resultview__text">
      <span>{currencyFormatter(amount)} </span>
      <small>{code}</small>
    </h4>
  </li>
);

export const ResultView = ({ list, children }) => (
  <StyledResultView className="resultview">
    <ul className="resultview__list">
      {children}
      {list.map(item => (
        <ResultViewItem {...item} key={item.code}/>
      ))}
    </ul>
  </StyledResultView>
);
