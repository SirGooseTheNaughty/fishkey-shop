import { useState } from "react";

export default function useVideo() {
    const [isVideoShown, setIsVideoShown] = useState(false);
    const [link, setLink] = useState(null);

    function setVideo(link = '') {
        if (link) {
            setLink(link);
            setIsVideoShown(true);
        } else {
            setIsVideoShown(false);
        }
    }

    return [isVideoShown, link, setVideo];
}