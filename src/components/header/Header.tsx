import React from 'react';
import "./header.scss";

interface Props {
    style: object;
    userIcon: string;
    setShowBasket: (showBasket: boolean) => void;
    basketIds: Set<any>;
    setShowLoginPopup: (showPopup: boolean) => void;
}

export const Header = (props: Props) => {
  const openBasket = (numFishes: number): void => {
      if (numFishes) {
        props.setShowBasket(true);
      }
  }

  const Basket = (numFishes: number) => {
      return (
          <div
            className={numFishes ? 'header__basket active' : 'header__basket'}
            onClick={() => openBasket(numFishes)}
        >
              <img src={"./shopping-cart.svg"} alt="shopping cart" width="25" height="25"></img>
              <span>{numFishes}</span>
          </div>
      );
  }

  const UserPanel = () => {
      return (
        <div
            className="header__login"
            onClick={() => props.setShowLoginPopup(true)}
        >
            <img src={props.userIcon} alt="user profile" width="25" height="25" className={props.userIcon !== './user.png' ? 'fullsize' : ''} ></img>
        </div>
      );
  }

  return (
    <div className="header" style={props.style}>
        <div className="header__content">
            <a href="#inst" target="_blank" rel="noreferrer" className="header__link">базовая инструкция</a>
            <a href="https://t.me/SirGooseTheNaughty" target="_blank" rel="noreferrer" className="header__link">тех. поддержка</a>
            {Basket(props.basketIds.size)}
            {UserPanel()}
        </div>
    </div>
  )
}