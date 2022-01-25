import { useState } from 'react';

export default function useBasket() {
    const [ids, setIds] = useState(new Set());
    const [isShown, setIsShown] = useState(false);

    function addId(id) {
        const newIds = new Set(ids);
        newIds.add(id);
        setIds(newIds);
    }

    function removeId(id) {
        const newIds = new Set(ids);
        newIds.delete(id);
        setIds(newIds);
    }

    function toggleId(id) {
        if (ids.has(id)) {
            removeId(id);
        } else {
            addId(id);
        }
    }

    return [ids, toggleId, isShown, setIsShown];
}