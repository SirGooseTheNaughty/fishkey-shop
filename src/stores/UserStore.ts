import { User } from "../types/contentTypes"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../utils/firebase';

export class UserStore {
    auth = getAuth();

    // firebaseUserData: any = null;
    // user: User = null;
    // provider = new this.auth.GoogleAuthProvider();

    // public async signInWithGoogle () {
    //     await this.auth().signInWithPopup(this.provider);
    //     this.setAuthUser(this.auth().currentUser);
    // }

    // public async signInWithEmail (email: string, password: string) {
    //     this.auth().signInWithEmailAndPassword(email, password)
    //     .then((userCredential: any) => {
    //         this.setAuthUser(userCredential.user);
    //     })
    //     .catch((error: any) => {
    //         console.log(error.code, error.message);
    //     });
    // }

    // public async signUpWithEmail (email: string, password: string) {
    //     createUserWithEmailAndPassword(email, password)
    //     .then((userCredential: any) => {
    //         this.setAuthUser(userCredential.user);
    //     })
    //     .catch((error: any) => {
    //         console.log(error.code, error.message);
    //     });
    // }

    // public async signOut () {
    //     this.auth().signOut().then(() => {
    //         this.setAuthUser(null);
    //         this.setUser(null);
    //     }).catch((error: any) => {
    //         console.log(error);
    //     });
    // }

    // public async getUserData () {
    //     const user = this.auth().currentUser;
    //     if (!user) {
    //         this.setUser({
    //             id: null,
    //             ownedFish: [],
    //             role: 'user'
    //         });
    //         return;
    //     }
    //     db.collection("users")
    //         .doc(this.authUser.uid)
    //         .get()
    //         .then((doc: any) => {
    //             if (doc.exists) {
    //                 this.setUser({
    //                     id: doc.id,
    //                     ownedFish: doc.data().ownedFish,
    //                     role: doc.data().role || 'user'
    //                 });
    //             } else {
    //                 db.collection("users").doc(this.authUser.uid).set({
    //                     ownedFish: []
    //                 });
    //                 this.setUser({
    //                     id: this.authUser.uid,
    //                     ownedFish: [],
    //                     role: 'user'
    //                 });
    //             }
    //         })
    //         .catch((error: any) => {
    //             console.log("Error getting documents: ", error);
    //         });
    // }

    // async fetchUser() {
    //     try {
    //         const user = await fetch('userDB.json')
    //             .then((response) => {
    //                 return response.json();
    //             });
                
    //         runInAction(() => {
    //             this._user = user;
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // public setAuthUser(firebaseUserData: any):void {
    //     this.firebaseUserData = firebaseUserData;
    // }

    // public setUser(userData: User):void {
    //     this.user = userData;
    // }
}