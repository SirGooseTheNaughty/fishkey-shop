import { doc, setDoc } from "firebase/firestore";
import { db } from './firebase';
import { fishDB } from './fishDB';

export function deployFishes() {
    fishDB.forEach(fish => {
        const { id, name, description, additional, tags, price, video, prep, params, code, helpers } = fish;
        const short = { name, description, tags, price, video };
        if (additional) {
            short.additional = additional;
        }
        const full = { prep, params, code };
        if (helpers) {
            short.helpers = helpers;
        }
    
        setDoc(doc(db, "fishes", id), short);
        setDoc(doc(db, "fishes-full", id), full);
    });
}