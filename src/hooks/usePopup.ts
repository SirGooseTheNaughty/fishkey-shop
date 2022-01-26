import { useState } from "react";
import { ContentExtended } from "../types/contentTypes";

export default function usePopup(fishes: ContentExtended[]) {
    const locationArray = window.location.toString().split('#');
    const initialData = locationArray.length > 1
        ? fishes.find(fish => fish.id === locationArray[1]) || null
        : null;
    const [isFishPopupOpened, setIsOpened] = useState(Boolean(initialData));
    const [popupFishData, setPopupFishData] = useState(initialData);

    function setFishPopup(id: string = ''): void {
        const locationBase = window.location.toString().split('#')[0];
        window.location.href = `${locationBase}#${id}`;
        if (id) {
            const data = fishes.find(fish => fish.id === id) || null;
            setPopupFishData(data);
            setIsOpened(Boolean(data));
        } else {
            setIsOpened(false);
        }
    }

    return [popupFishData, isFishPopupOpened, setFishPopup];
}