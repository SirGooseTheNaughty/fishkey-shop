import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .catch(console.error);
}

export function registerWithEmail(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function signInWithEmail(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .catch(console.error);
}

export function signOut () {
    const auth = getAuth();
    auth.signOut().catch((error: any) => {
        console.log(error);
    });
}