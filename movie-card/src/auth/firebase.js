import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    toastErrorNotify,
    toastSuccessNotify,
    toastWarnNotify,
} from "../helpers/ToastNotify";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
    try {
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(auth.currentUser, {
            displayName: displayName,
        });
        navigate("/");
        toastSuccessNotify("Registered successfully!");
    } catch (error) {
        toastErrorNotify(error.message);
    }
};

export const signIn = async (email, password, navigate) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
    } catch (error) {
        toastErrorNotify(error.message);
    }
};

export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { email, displayName, photoURL } = user;
            setCurrentUser({ email, displayName, photoURL });
            console.log(user);
        } else {
            setCurrentUser(false);
            console.log("user signed out");
        }
    });
};

export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!");
};


export const signUpWithGoogle = (navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            navigate("/");
            toastSuccessNotify("Logged in successfully!");
        })
        .catch((error) => {
            console.log(error);
        });
};

export const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            toastWarnNotify("Please check your mail box!");
        })
        .catch((err) => {
            toastErrorNotify(err.message);
        });
};