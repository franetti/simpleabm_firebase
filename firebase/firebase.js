import app from './config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc  } from "firebase/firestore"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'


class Firebase{
    constructor(){     
        this.app = app,      
        this.auth = getAuth()
        this.db = getFirestore()
        this.storage = getStorage()
    }
    
    async register(name,email,password){    
        const newUser = await createUserWithEmailAndPassword(this.auth, email, password)        
        await updateProfile( this.auth.currentUser, {
            displayName : name
        })
        return newUser;
    }

    async login(email, password){
        return await signInWithEmailAndPassword(this.auth, email, password);        
    }

    async logOut(){
        return await signOut(this.auth);        
    }

    async addProduct(product,image){
        const imageRef = ref(this.storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const resultImgURL = await getDownloadURL(imageRef);
        product.image = resultImgURL
        const newProduct = await addDoc(collection(this.db, "products"), product);   
        // return newProduct     
    }
}

const firebase = new Firebase;
export default firebase;

