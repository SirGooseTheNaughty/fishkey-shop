import React from 'react';
import { TAGS } from "../../constants/constants";
import { ContentShort } from '../../types/contentTypes';
import "./filters.scss";

interface FiltersProps {
  tags: Set<string>;
  toggleTag: (tag: string) => void;
  fishes: ContentShort[];
  hideNotBought: boolean;
  setHideNotBought: (hideNotBought: boolean) => void;
}

export const Filters = (props: FiltersProps) => {

  const isTagChacked = (tag: string): boolean => {
    if (tag === "все") {
      return !Boolean(props.tags.size);
    }
    return props.tags.has(tag);
  }

  const Tag = (tag: string): React.ReactNode => {
    const style = isTagChacked(tag) ? {backgroundColor: '#ACCBE1'} : {};
    const number = tag !== "все" ? props.fishes.filter(fish => fish.tags.includes(tag)).length : 0;
    const isClickable = tag === "все" || number !== 0;
      return (
          <div
            className={`filters__tag ${!isClickable ? 'disabled' : ''}`}
            onClick={isClickable ? () => props.toggleTag(tag) : null}
            style={style}
            key={tag}
          >
            {tag}
            {number !== 0 && <div className="filters__number">{number}</div>}
          </div>
      );
  }

  const ShowOnlyMy = (): React.ReactNode => {
    const { hideNotBought, setHideNotBought } = props;
    const toggle = () => setHideNotBought(!hideNotBought);
    return (
      <div className="filters__checkbox">
        <input type="checkbox" id="show-my-fishes" checked={hideNotBought} onChange={toggle} />
        <label htmlFor="show-my-fishes">Только мои фишки</label>
      </div>
    )
  }

  return (
    <div className="filters">
        <div className="filters__header">ТЕГИ</div>
        <div className="filters__tags">
            {TAGS.map(Tag)}
        </div>
        <div className="filters__header">ФИЛЬТРАЦИЯ</div>
        {ShowOnlyMy()}
    </div>
  )
}