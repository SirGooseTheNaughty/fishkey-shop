import React from 'react';
import "./fishContainer.scss";
import { ContentShort } from "../../types/contentTypes";
import { Fish } from "./fish/Fish";

interface FishContainerProps {
  fishes: ContentShort[];
  addFishToBasket: (id: string) => void;
  removefishFromBasket: (id: string) => void;
}

export const FishContainer = ({ fishes, addFishToBasket, removefishFromBasket }: FishContainerProps) => {
  const renderFish = (fish: ContentShort): React.ReactNode => {
    return <Fish data={fish} key={fish.id}/>
  }

  return (
    <div className="fishContainer">
      {fishes.map(renderFish)}
    </div>
  )
}