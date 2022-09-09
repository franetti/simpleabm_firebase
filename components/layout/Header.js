import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase'
import Search from '../ui/Search'
import Navbar from './Navbar'
import Link from 'next/link'
import styled from '@emotion/styled'
import Button from '../ui/Button' 
import {css} from '@emotion/react'

const HeaderContainer = styled.div`
    max-width:1600px;
    width: 95%;
    margin:0 auto;
    @media(min-width:768px){
        display:flex;
        justify-content: space-between;
    }
`

//cambiar por styled.img
const Logo = styled.p`
    color:var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family:'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;
`

const Header = () => {

    const { user, firebase } = useContext(FirebaseContext)
    // console.log(user)

    //ver porque tarde 2 segudnos en chequear el user y modificar el header

    return (
        <header
            css={css` // para que me recozca esta prop, tuve que instalar un preset de babel desde emotion y agregar a carpeta root un .babelrc
                border-bottom:2px solid var(--grisclaro);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>                    
                    <Search/>
                    <Navbar/>
                </div>

                <div
                    css={css`
                        display: flex;             
                        align-items: center;
                    `}
                >
                    {user 
                        ? (<>
                            <p
                            css={css`
                                    margin-right: 2rem;
                                `}
                            >Hola: {user.displayName}</p>
                            <Link href="/">
                                <Button 
                                    bgColor="true" 
                                    onClick={() => {
                                        firebase.logOut()
                                        alert("se cerro sesion")
                                    }}
                                >Cerrar Sesion</Button>
                            </Link>
        
                            </>)
                        : (<>
                            <Link href="/register">
                                <Button>Crear Cuenta</Button>
                            </Link>
                            <Link href="/login">
                                <Button bgColor="true">Login</Button>
                            </Link>
                           </>)
                    }
                </div>
            </HeaderContainer>
        </header>
    );
}
 
export default Header;