import React from 'react';
import "./fishPopup.scss";
import { ContentFull } from '../../types/contentTypes';
import { FISH_DESC_NAMES } from '../../constants/constants';

interface FishPopupInterface {
    data: ContentFull;
    setFishPopup: (id?: string) => void;
}

export const FishPopup = ({ data, setFishPopup }: FishPopupInterface): React.ReactNode => {
    if (!data) {
        return null;
    }
    
    const fishParam = (paramId: string, paramCont: string): React.ReactNode => {
        return (
            <div className="fishPopup__item" key={paramId}>
                <div className="fishPopup__item-name">{FISH_DESC_NAMES[paramId]}</div>
                <div className="fishPopup__item-content">{paramCont}</div>
            </div>
        )
    }

    const fishInit = (inits: any[]): React.ReactNode => {
        return (
            <div className="fishPopup__item" key='init'>
                <div className="fishPopup__item-name">{FISH_DESC_NAMES["params"]}</div>
                <div className="fishPopup__item-content">
                    {inits && inits.map(init => {
                        return <div className="fishPopup__itemParam"><i>{init.param}</i> — {init.desc}</div>
                    })} 
                </div>
            </div>
        )
    }

    const fishCode = (code: string): React.ReactNode => {
        return <pre className="fishPopup__code"><code>{code}</code></pre>;
    }

    return (
        <div className="popup fishPopup">
            <div className="popup__content">
                <div className="popup__close" onClick={() => setFishPopup()}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="fishPopup__header">{data.name}</div>
                <div className="fishPopup__items">
                    {fishParam("desc", data.description)}
                    {fishParam("prep", data.prep)}
                    {fishInit(data.params)}
                </div>
                {Array.isArray(data.code) ? data.code.map(fishCode) : fishCode(data.code)}
            </div>
        </div>
    )
};