import React, {useState, useContext} from 'react';
import Router, {useRouter} from 'next/router'
import firebase from '../firebase'; // index.js de firebase
import { FirebaseContext } from '../firebase'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import useValidation from '../hooks/useValidation';
import validacionProduct from '../validaciones/validacionProduct';
import Layout from '../components/layout/Layout'
import {Form, InputContainer, InputSubmit, Error} from '../components/ui/Form'
import {css} from '@emotion/react'


const INITIAL_STATE = {
  name:'',
  image:'',
  company:'',
  url:'',
  description:''  
}

//MODOFICAR EL ESTILO DE LOS ERRORES.

export default function NewProduct() {

  const [error, setError] = useState(false);  
  const {values, imgFile, errors, handleSubmit, handleChange, handleBlur, handleImageChange } = useValidation(INITIAL_STATE, validacionProduct, createProduct);
  const {name, company, image, url, description} = values;

  const { user, firebase } = useContext(FirebaseContext)

  async function createProduct() {
      if(!user){
        return Router.push("/login")
      }

      const product = {
        name,
        company,
        image,        
        url,
        description,
        votos:0,
        votedFor:[],
        comentarios:[],
        createAt:new Date,
        createdBy:{
          id:user.uid,
          name:user.displayName 
        },
      }

      try {
        await firebase.addProduct(product, imgFile);  
        alert("producto creado correctamente")        
        Router.push('/')
      } catch (error) {
        console.log(error)
      }
  }

  return (
      <div>
        <Layout>                              
          { !user 
            ? <h1
                css={css`
                  text-align:center;
                  margin-top:5rem;
                `}>Debes estar logueado para crear un producto</h1>
            : <>
              <h1
                css={css`
                  text-align:center;
                  margin-top:5rem;
                `}
              >Nuevo Producto</h1>    
              <Form 
                onSubmit={handleSubmit}
                noValidate
              >
                <fieldset>
                    <legend>General information</legend>
                  <InputContainer>
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="Your name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />               
                  </InputContainer>          
                  {errors.name && <Error>{errors.name}</Error>}    

                  <InputContainer>
                    <label htmlFor="company">Company</label>
                    <input 
                      type="text" 
                      id="company"
                      placeholder="Your company"
                      name="company"
                      value={company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />               
                  </InputContainer>          
                  {errors.company && <Error>{errors.company}</Error>}   

                  <InputContainer>
                    <label htmlFor="image">Image</label>
                    <input 
                      type="file" 
                      id="image"                  
                      // name="image"
                      // value={image}
                      onChange={handleImageChange}                    
                    />               
                  </InputContainer>          
                  {errors.image && <Error>{errors.image}</Error>}    

                  <InputContainer>
                    <label htmlFor="url">URL</label>
                    <input 
                      type="text" 
                      id="url"                  
                      name="url"
                      placeholder='Link to your product'
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />               
                  </InputContainer>          
                  {errors.url && <Error>{errors.url}</Error>}  
                </fieldset>

                <fieldset>
                  <legend>About your product</legend>
                  <InputContainer>
                  <label htmlFor="description">Description</label>
                  <textarea                   
                    id="description"                  
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />               
                  </InputContainer>          

                  {errors.description && <Error>{errors.description}</Error>}  
                </fieldset>                              

                <InputSubmit 
                  type="submit" 
                  value="Create Product"                
                />
                {error && <Error>{error.message}</Error>}
              </Form> 
            </>
          }                 
        </Layout>
      </div>

  )
}
