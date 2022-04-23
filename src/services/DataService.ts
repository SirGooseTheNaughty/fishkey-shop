import { db } from '../utils/firebase';
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { ContentShort, ContentExtended, ContentFull } from "../types/contentTypes";
import { USER_ROLES } from '../hooks/useUser';
import { User } from '../types/contentTypes';

const defaultFishes = ['differ-on-browser', 'join-elements'];

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

export async function fetchFullFishes(userData: User) {
    const { ownedFish, role } = userData;
    if (role === USER_ROLES.admin) {
        return getDocs(collection(db, "fishes-full"))
            .then((querySnapshot: any) => {
                const fishes: any[] = [];
                querySnapshot.forEach((doc: any) => {
                    const { prep, code, params } = doc.data();
                    const data = { id: doc.id, prep, code, params };
                    fishes.push(data);
                });
                return fishes;
            });
    }
    const promises = ownedFish.map(async id => {
        return getDoc(doc(db, "fishes-full", id))
            .then((doc: any) => {
                const { prep, code, params } = doc.data();
                const data = { id: doc.id, prep, code, params };
                return data;
            });
    });
    return Promise.all(promises);
}

export async function fetchUserData(user) {
    return getDoc(doc(db, "users", user.email))
        .then((docSnapshot: any) => {
            if (docSnapshot.exists()) {
                const { ownedFish, role } = docSnapshot.data();
                return { ownedFish, role };
            } else {
                setDoc(doc(db, "users", user.email), {
                    ownedFish: defaultFishes
                });
                return { ownedFish: defaultFishes, role: USER_ROLES.user };
            }
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