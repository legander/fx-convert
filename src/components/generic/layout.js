import styled from "styled-components";

import { fadeIn } from "./keyframes";


export const CenterLayout = styled.div`
  margin: 170px auto;
  max-width: 500px;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background: radial-gradient(
    ellipse at center,
    rgb(255, 196, 202) 10%,
    rgba(255, 153, 161, 1) 100%
  );
  background-repeat: no-repeat;
`;

export const InputRow = styled.div`
  display: flex;
  margin-bottom: 15px;

  .country-field {
    flex: 3;
  }

  .amount-field {
    flex: 2;
    margin-left: 10px;
  }

  &:only-child {
    margin-bottom: 0;
  }
`;

export const StyledResultView = styled.div`
  .resultview__list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
  }

  .resultview__text {
    animation: ${fadeIn} 0.3s ease;
    color: #0a166a;
    font-family: georgia;
    font-size: 22px;
  }

  .resultview__item--highlight .resultview__text {
    font-size: 30px;
  }

  small {
    font-size: 47%;
  }
`;

export const Card = styled.div`
  display: flex;
  text-align: left;
  line-height: 19px;
  font-size: 15px;
  background-color: rgba(255,255,255,0.4);
  border: 1px solid #ffffff30;
  margin: 15px 0;
  
  .card__col {
    padding: 10px;
  }

  .card__meta {
    font-family: georgia;
  }

  .card__title {
    margin-bottom: 5px;
    font-size: 18px;
  }

  .card__meta {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
