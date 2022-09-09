import React, {useState} from 'react';
import Layout from '../components/layout/Layout'
import {Form, InputContainer, InputSubmit, Error} from '../components/ui/Form'
import {css} from '@emotion/react'
import Router from 'next/router'
import firebase from '../firebase'; // index.js de firebase
import useValidation from '../hooks/useValidation';
import validacionLogin from '../validaciones/validacionLogin';

const INITIAL_STATE = {
  email:'',
  password:''
}


export default function Login() {

  const [error, setError] = useState(false);

  const {values, errors, handleSubmit, handleChange, handleBlur } = useValidation(INITIAL_STATE, validacionLogin, signIn);
  const { email, password} = values

  async function signIn(){
      try {
          await firebase.login(email,password);
          alert("Logueado con exito")
          Router.push("/")
      } catch (error) {
          setError(error);
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
            >Iniciar sesion</h1>    
            <Form 
              onSubmit={handleSubmit}
              noValidate
            >   
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
                value="Iniciar sesion"                
              />
              {error && <Error>{error.message}</Error>}
            </Form> 
          </>          
        </Layout>
      </div>

  )
}
