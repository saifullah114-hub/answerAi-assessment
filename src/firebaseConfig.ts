import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQPoFGCaZnrJ98LAUO2qbqBtfva-BYxlg",
  authDomain: "ansersai-assignment.firebaseapp.com",
  projectId: "ansersai-assignment",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
