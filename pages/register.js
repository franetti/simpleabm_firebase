import React, {useState} from 'react';
import Layout from '../components/layout/Layout'
import {Form, InputContainer, InputSubmit, Error} from '../components/ui/Form'
import {css} from '@emotion/react'
import Router from 'next/router'
import firebase from '../firebase'; // index.js de firebase
import useValidation from '../hooks/useValidation';
import validacionRegister from '../validaciones/validacionRegister';

const INITIAL_STATE = {
  name:'',
  email:'',
  password:''
}

//MODOFICAR EL ESTILO DE LOS ERRORES.

export default function Register() {

  const [error, setError] = useState(false);

  const {values, errors, handleSubmit, handleChange, handleBlur } = useValidation(INITIAL_STATE, validacionRegister, createAccount);
  const {name, email, password} = values

  async function createAccount() {
      setError(false)
      //ME LO CREA A PESAR DE TIRARME ERROR. VER ESO OJO
      try {
        await firebase.register(name,email,password)
        alert("Usuario creado con exito")
        Router.push("/");
      } catch (error) {
        setError(error)        
      }
  }

  return (
      <div>
        <Layout>
          <>
            <h1
              css={css`
                text-align:center;
                margin-top:5rem;
              `}
            >Crear Cuenta</h1>    
            <Form 
              onSubmit={handleSubmit}
              noValidate
            >
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
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Your email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputContainer>              
              {errors.email && <Error>{errors.email}</Error>}    

              <InputContainer>
                <label htmlFor="email">Password</label>
                <input 
                  type="password" 
                  id="password"
                  placeholder="Your password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputContainer>              
              {errors.password && <Error>{errors.password}</Error>}    

              <InputSubmit 
                type="submit" 
                value="Create Account"                
              />
              {error && <Error>{error.message}</Error>}
            </Form> 
          </>          
        </Layout>
      </div>

  )
}
