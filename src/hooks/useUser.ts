import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchOwnedFishes } from '../services/DataService';

export default function useUser() {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [ownedFishes, setOwnedFishes] = useState([]);
    const [userIcon, setUserIcon] = useState('./user.png');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setFirebaseUser(auth.currentUser);
            setUserIcon(auth.currentUser?.photoURL || './user.png');
            fetchOwnedFishes(user)
                .then(data => setOwnedFishes(data))
                .catch(err => console.error(err));
          } else {
            setFirebaseUser(null);
            setUserIcon('./user.png');
            setOwnedFishes([]);
          }
        });
    }, [firebaseUser]);

    return [firebaseUser, ownedFishes, userIcon];
}