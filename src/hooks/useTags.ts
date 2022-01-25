import { useState } from "react";

export default function useTags() {
    const [tags, setTags] = useState(new Set());

    function toggleTag(tag: string) {
        if (tag === 'все') {
            return setTags(new Set());
        }

        const newTags = new Set(tags);
        if (tags.has(tag)) {
            newTags.delete(tag);
        } else {
            newTags.add(tag);
        }
        setTags(newTags);
    }

    return [tags, toggleTag];
}