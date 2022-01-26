import { db } from '../utils/firebase';
import { collection, doc, getDocs, getDoc, setDoc, query, where } from "firebase/firestore";
import { ContentShort, ContentExtended } from "../types/contentTypes";

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

export async function fetchFullFishes(ids) {
    const fishesRef = collection(db, "fishes-full");
    const q = query(fishesRef, where("id", "in", ids));
    return getDocs(q)
        .then((querySnapshot: any) => {
            const fishes: any[] = [];
            querySnapshot.forEach((doc: any) => {
                const { name, description, tags, price, video } = doc.data();
                const data = { id: doc.id, name, description, tags, price, video };
                fishes.push(data);
            });
            return fishes;
        });
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