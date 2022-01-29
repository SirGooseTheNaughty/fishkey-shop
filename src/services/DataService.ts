import { db } from '../utils/firebase';
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { ContentShort, ContentExtended, ContentFull } from "../types/contentTypes";

export async function fetchShortData() {
    fetch('fishDB.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

export async function fetchFishes() {
    return getDocs(collection(db, "fishes"))
        .then((querySnapshot: any) => {
            const fishes: any[] = [];
            querySnapshot.forEach((doc: any) => {
                const { name, description, additional = null, tags, price, video } = doc.data();
                const data = { id: doc.id, name, description, additional, tags, price, video };
                fishes.push(data);
            });
            return fishes;
        });
}

export async function fetchFullFishes(ids: string[]) {
    const promises = ids.map(async id => {
        return getDoc(doc(db, "fishes-full", id))
            .then((doc: any) => {
                const { prep, code, params } = doc.data();
                const data = { id: doc.id, prep, code, params };
                return data;
            });
    });
    return Promise.all(promises);
}

export async function fetchOwnedFishes(user) {
    return getDoc(doc(db, "users", user.email))
        .then((docSnapshot: any) => {
            let ownedFish = [];
            if (docSnapshot.exists()) {
                ownedFish = docSnapshot.data().ownedFish;
            } else {
                setDoc(doc(db, "users", user.email), {
                    ownedFish: ['differ-on-browser', 'join-elements']
                });
            }
            return ownedFish;
        });
}

export function mergeFishData(data: ContentShort[], addData: ContentExtended[]): ContentFull[] {
    const extendedData = [...data];
    addData.forEach((adata: ContentExtended) => {
        const fishIndex = data.findIndex(fish => fish.id === adata.id);
        extendedData[fishIndex] = {
            ...data[fishIndex],
            ...adata
        }
    });
    return extendedData;
}