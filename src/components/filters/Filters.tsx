import React from 'react';
import { TAGS } from "../../constants/constants";
import { ContentShort } from '../../types/contentTypes';
import "./filters.scss";

interface FiltersProps {
  tags: Set<string>;
  toggleTag: (tag: string) => void;
  fishes: ContentShort[];
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
          >
            {tag}
            {number !== 0 && <div className="filters__number">{number}</div>}
          </div>
      );
  }

  return (
    <div className="filters">
        <div className="filters__header">ТЕГИ</div>
        <div className="filters__tags">
            {TAGS.map(tag => Tag(tag))}
        </div>
    </div>
  )
}