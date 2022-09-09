import React,{useState,useEffect, useContext} from 'react';
import {FirebaseContext} from '../firebase'
import { collection, getDocs, query, orderBy } from "firebase/firestore";


const useProducts = order => {
    
  const [productos, setProductos] = useState([])
  const {firebase} = useContext(FirebaseContext)
  
  useEffect(() => {
    const obtenerProductos = async () => {
      let productsArr=[];      
      const queryProducts = query(collection(firebase.db, "products"),  orderBy(order, "desc"));
      const querySnapshot = await getDocs(queryProducts)
      querySnapshot.forEach( doc => {      
        productsArr = [
          ...productsArr,
          {
            id:doc.id,
            data:doc.data()
          }
        ]                            
      });
      setProductos(productsArr)
    }    
    obtenerProductos()       
  },[])    
  
  return {
    productos
  }
}

export default useProducts;