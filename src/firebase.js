import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyC9U0dicWBB0mzPSbsblg5K4ZUyneX2ug4",
  authDomain: "netflix-clone-31895.firebaseapp.com",
  projectId: "netflix-clone-31895",
  storageBucket: "netflix-clone-31895.appspot.com",
  messagingSenderId: "1027393895477",
  appId: "1:1027393895477:web:58193c52987afa978fc57c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
       })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};