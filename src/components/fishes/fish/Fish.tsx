import { useContext } from 'react';
import "./fish.scss";
import { ContentShort } from '../../../types/contentTypes';
import { Context } from '../../../App';

interface Props {
    data: ContentShort;
}

export const Fish = ({ data }: Props) => {
  const { basketIds, toggleId: toggleIdInBasket, ownedFishes, setFishPopup } = useContext(Context);
  const { id, name, description, price, video, additional = null } = data;

  const hasThisFish = () => {
    return ownedFishes.find((fishId: string) => fishId === id);
  }

  const ShoppingCart = () => <img src={"./shopping-cart.svg"} alt="shopping cart" width="25" height="25"></img>;

  const Arrow = () => {
    return (
      <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8.1579L8.55172 15L21 2" stroke="#F2F2F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  const Basket = () => {
    const isInBasket = basketIds.has(id);
    return (
        <div
          className="fish__basket"
          onClick={() => toggleIdInBasket(id)}
          style={isInBasket ? {backgroundColor: '#ACCBE1'} : {}}
        >
          {isInBasket ? Arrow() : ShoppingCart()}
        </div>
    );
  }

  const ToInstruction = () => {
    return (
      <div
        className="toInstruction"
        onClick={() => setFishPopup(id)}
      >
        Инструкция
      </div>
    )
  };

  const PriceAndBasket = () => {
    return (
      <div className="priceAndBasket">
        <div className="price">{price}</div>
        {Basket()}
      </div>
    )
  }

  const PlayButton = () => {
    return (
      <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.9167 17.9375L10.7931 25.5523C9.67931 26.1979 8.25 25.4162 8.25 24.1147V8.88524C8.25 7.58586 9.67725 
        6.80211 10.7931 7.44974L23.9167 15.0645C24.1701 15.2091 24.3807 15.4182 24.5272 15.6705C24.6737 15.9228 24.7508 
        16.2093 24.7508 16.501C24.7508 16.7927 24.6737 17.0793 24.5272 17.3316C24.3807 17.5839 24.1701 17.7929 23.9167 17.9375Z" 
        fill="#F2F2F2"/>
      </svg>      
    );
  }

  const AdditionalTooltip = () => {
    return (
      <div className="fish-tooltip">
        <div className="fish-tooltip__tooltip">!</div>
        <div className="fish-tooltip__info">{additional}</div>
      </div>
    )
  }

  return (
    <div className="fish">
        <a href={video} className="videoLink">{PlayButton()}</a>
        <div className="content">
          <div className="title" style={name.split("").length > 30 ? {fontSize: "19px"} : {}}>{name}</div>
          <div className="description">
            {additional && AdditionalTooltip()}
            {description}
          </div>
        </div>
      {hasThisFish() ? ToInstruction() : PriceAndBasket()}
    </div>
  )
}