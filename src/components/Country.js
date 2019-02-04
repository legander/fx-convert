import React from "react";
import styled, { css } from "styled-components";

import { commaSeparatedList, getCurrencyCodes } from "../utils";
import { slideFadeIn, Card } from "./generic";


const CustomScrollbar = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar:vertical {
    width: 4px;
  }

  &::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(6, 22, 116, 0.33);
  }

  &::-webkit-scrollbar-track {
    background-color: #ffb6bd;
    border-radius: 18px;
  }
`;

export const StyledCountryList = styled.div`
  margin-top: 20px;

  .header {
    color: #09166b;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
    border-bottom: 1px solid #09166b;
  }

  .header,
  button {
    display: flex;
    align-items: center;
    .name,
    .currency,
    .population {
      flex: 1;
      padding: 5px;
      text-align: left;
    }

    .name {
      min-width: 180px;
    }
  }

  ul {
    ${CustomScrollbar}
    list-style: none;
    padding-left: 0;
    margin: 0;
    max-height: 490px;
    overflow: auto;
  }
`;

export const CountryListItem = styled.li`
  border-bottom: 1px solid rgba(9, 22, 107, 0.4);
  animation: ${slideFadeIn} 0.3s ease;

  button {
    width: 100%;
    text-align: left;
    padding: 0;
    appearance: none;
    border: 0;
    color: #09166b;
    background: transparent;
    -webkit-appearance: none;
    cursor: pointer;
    transition: background 0.2s;

    .currency,
    .population {
      font-family: georgia;
      font-size: 20px;
    }

    &:hover {
      background: linear-gradient(
        to right,
        rgba(231, 176, 192, 0) 0%,
        rgba(231, 176, 192, 1) 5%,
        rgba(231, 176, 192, 1) 95%,
        rgba(125, 185, 232, 0) 100%
      );
    }
  }

  .text {
    width: 44%;
  }

  .name {
    h2 {
      margin-bottom: 5px;
    }

    h3 {
      margin-bottom: 0;
    }
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const CountryCard = ({ country: { name, capital, population, currencies } }) => (
  <Card>
    <div className="card__col">
      <h2 className="card__title">{name}</h2>
      <p className="card__meta">
        <strong>Capital: </strong>
        <span>{capital}</span>
      </p>
    </div>
    <div className="card__col">
      <p className="card__meta">
        <strong>Population: </strong>
        <span>{population}</span>
      </p>
      <p className="card__meta">
        <strong>Currencies: </strong>
        <span>{commaSeparatedList(getCurrencyCodes(currencies))}</span>
      </p>
    </div>
  </Card>
);

export const CountryList = ({ list, onSelect }) =>
  list.length > 0 && (
    <StyledCountryList>
      <div className="header">
        <div className="name">Name/Capital</div>
        <div className="currency">Currencies</div>
        <div className="population">Population</div>
      </div>
      <ul>
        {list.map(item => (
          <CountryListItem key={`${item.numericCode}${item.alpha3Code}`}>
            <button onClick={onSelect(item)}>
              <div className="name">
                <h2>{item.name}</h2>
                <h3>{item.capital}</h3>
              </div>
              <div className="currency">
                {commaSeparatedList(item.currencies.map(({ code }) => code))}
              </div>
              <div className="population">{item.population}</div>
            </button>
          </CountryListItem>
        ))}
      </ul>
    </StyledCountryList>
  );
