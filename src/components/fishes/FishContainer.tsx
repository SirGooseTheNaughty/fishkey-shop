import React from 'react';
import "./fishContainer.scss";
import { ContentShort } from "../../types/contentTypes";
import { Fish } from "./fish/Fish";

interface FishContainerProps {
  fishes: ContentShort[];
}

export const FishContainer = ({ fishes }: FishContainerProps) => {
  const renderFish = (fish: ContentShort): React.ReactNode => {
    return <Fish data={fish} key={fish.id}/>
  }

  return (
    <div className="fishContainer">
      {fishes.map(renderFish)}
    </div>
  )
}