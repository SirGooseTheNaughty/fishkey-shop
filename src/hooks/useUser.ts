import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserData } from '../services/DataService';
import { User } from "firebase/auth";

export const USER_ROLES = {
  user: 'USER',
  admin: 'ADMIN',
};

export default function useUser() {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [ownedFishes, setOwnedFishes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userIcon, setUserIcon] = useState('./user.png');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user: User) => {
          if (user) {
            setFirebaseUser(auth.currentUser);
            setUserIcon(auth.currentUser?.photoURL || './user.png');
            fetchUserData(user)
                .then(data => {
                  setOwnedFishes(data.ownedFish);
                  setIsAdmin(data.role === USER_ROLES.admin);
                })
                .catch(err => console.error(err));
          } else {
            setFirebaseUser(null);
            setUserIcon('./user.png');
            setOwnedFishes([]);
          }
        });
    }, [firebaseUser]);

    return [firebaseUser, ownedFishes, userIcon, isAdmin];
}