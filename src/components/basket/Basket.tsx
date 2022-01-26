import React from 'react';
import "./basket.scss";
import { ContentShort } from '../../types/contentTypes';

interface BasketProps {
    user: any;
    fishes: ContentShort[];
    basketIds: Set<string>;
    setShowBasket: (showBasket: boolean) => void;
    toggleFish: (id: string) => void;
}

export const Basket = ({ user, fishes, basketIds, setShowBasket, toggleFish }: BasketProps) => {
  const basketFishes = (): ContentShort[] => {
      return fishes.filter((fish: ContentShort) => basketIds.has(fish.id));
  }

  const basketFishesPrice = (): number => {
    const reducer = (totalPrice: number, fish: ContentShort) => totalPrice + fish.price;
    return basketFishes().reduce(reducer, 0)
  }

  const basketFish = (fish: ContentShort): React.ReactNode => {
    return (
        <div className="basket__fish" key={fish.id}>
            <div className="fish__name">{fish.name}</div>
            <div className="fish__price">{fish.price}</div>
            <div className="fish__delete" onClick={() => toggleFish(fish.id)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333"/>
                </svg>
            </div>
        </div>
    )
  }

  const orderBtn = (): React.ReactNode => {
    if (!user) {
        return (
            <button>Войдите для заказа</button>
        )
    }
    return (
        <button>Перейти к оплате</button>
    )
  }

  return (
    <div className="basket">
        <div className="basket__content">
            <div className="basket__close" onClick={() => setShowBasket(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="basket__header">КОРЗИНА</div>
            <div className="basket__fishes">
                {basketFishes().map(fish => basketFish(fish))}
            </div>
            <div className="basket__price">
                Итого: {basketFishesPrice()} руб.
            </div>
            {orderBtn()}
        </div>
    </div>
  )
};