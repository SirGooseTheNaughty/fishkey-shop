import { ContentShort, ContentExtended } from "../types/contentTypes";

export function mergeFishData(data: ContentShort[], addData: ContentExtended[]) {
    const extendedData = [...data];
    addData.forEach((data: ContentExtended) => {
        extendedData[data.id] = {
            ...data[data.id],
            ...data
        }
    });
    return extendedData;
}