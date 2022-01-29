import React from "react";
import "./videoPopup.scss";

export const VideoPopup = ({ link, setVideo }: { link: string; setVideo: (link?: string) => void }): React.ReactNode => {
    const embedLinkArr = link.split('/');
    const embedId = embedLinkArr[embedLinkArr.length - 1];
    const embedUrl = `https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`;

    return (
        <div className="popup videoPopup">
            <div className="popup__content">
                <div className="popup__close" onClick={() => setVideo()}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <iframe
                    width="1160"
                    height="650"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}