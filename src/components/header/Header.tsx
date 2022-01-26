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
            className="header__basket"
            onClick={() => openBasket(numFishes)}
            style={numFishes ? {cursor: 'pointer'} : {}}
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

  console.log('header rerender');

  return (
    <div className="header" style={props.style}>
        <div className="content">
            <a href="#inst" className="link base-instruction">базовая инструкция</a>
            <a href="#inst" className="link tech-support">тех. поддержка</a>
            {UserPanel()}
            {Basket(props.basketIds.size)}
        </div>
    </div>
  )
}