import {useState} from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import {css} from '@emotion/react'


const InputText = styled.input`
    border:1px solid var(--grisclaro);
    padding: 1rem;
    min-width: 300px;
`

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-repeat:no-repeat;
    position: absolute;
    right: 1rem;
    top:1px;
    background-color: white;
    border:none;
    &:hover{
        cursor:pointer;
    }
`

const Search = () => {

    const [busqueda, setBusqueda] = useState('')

    const buscarProducto = e => {
        e.preventDefault()        
        if(busqueda.trim === '') return;        
        Router.push({
            pathname:'/search',
            query:{ q : busqueda}
        })
    }

    return (  
        <form action="!#"
            css={css`
                position: relative;
            `}
            onSubmit = {buscarProducto}
        >   
        {/* {AGREGAR ICONO DE BUSQUDA AL BOTON} */}
            <InputText 
                type="text" 
                placeholder='Buscar Productos'
                onChange={e => setBusqueda(e.target.value)}
            />
            <InputSubmit type="submit"></InputSubmit>
        </form>
    );
}
 
export default Search;