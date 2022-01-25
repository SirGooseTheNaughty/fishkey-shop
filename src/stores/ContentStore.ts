import { ContentShort, ContentExtended } from "../types/contentTypes";
import { db } from "../utils/firebase";

export class ContentStore {
    contentShort: ContentShort[] = [];
    contentExtended: ContentExtended[] = [];

    // async fetchFishes() {
    //     this.setContentShort([]);
    //     db.collection("fishes")
    //         .get()
    //         .then((querySnapshot: any) => {
    //             querySnapshot.forEach((doc: any) => {
    //                 const { name, description, tags, price, video } = doc.data();
    //                 const data: ContentShort = { id: doc.id, name, description, tags, price, video };
    //                 this.addContentShort(data);
    //             });
    //         })
    //         .catch((error: any) => {
    //             console.log("Error getting documents: ", error);
    //         });
    // }

    // async fetchFishesFull() {
    //     this.setContentExtended([]);
    //     db.collection("fishes-full")
    //         .get()
    //         .then((querySnapshot: any) => {
    //             querySnapshot.forEach((doc: any) => {
    //                 const { warning, prep, params, code } = doc.data();
    //                 const data: ContentExtended = { id: doc.id, warning, prep, params, code };
    //                 this.addContentExtended(data);
    //             });
    //         })
    //         .catch((error: any) => {
    //             console.log("Error getting documents: ", error);
    //         });

    // }

    public filteredContent = (tags: Set<string>): ContentShort[] => {
        if (tags.size === 0) {
            return this.contentShort;
        }
        const hasAll = (fishTags: string[]): boolean => {
            let has = true;
            [...tags].forEach(tag => {
                if (!fishTags.find(fishTag => fishTag === tag)) {
                    has = false;
                }
            });
            return has;
        }
        return this.contentShort.filter(content => hasAll(content.tags));
    }

    public setContentShort (content: ContentShort[]): void {
        this.contentShort = content;
    }

    public setContentExtended (content: ContentExtended[]): void {
        this.contentExtended = content;
    }

    public addContentShort (content: ContentShort): void {
        this.contentShort.push(content);
    }

    public addContentExtended (content: ContentExtended): void {
        this.contentExtended.push(content);
    }
}