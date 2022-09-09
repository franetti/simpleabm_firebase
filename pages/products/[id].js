import React, { useEffect, useState, useContext } from 'react';
import Router,{useRouter} from 'next/router';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {FirebaseContext} from '../../firebase'
import Error404 from '../404'
import Layout from '../../components/layout/Layout';
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import { InputContainer, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button' 
import { createRouteLoader } from 'next/dist/client/route-loader';

const ProductoContainer = styled.div`
    @media(min-width:768px){
        display:grid;
        grid-template-columns: 2fr 1fr;
        column-gap:2rem;
    }
`

const Product = () => {
    
    const [producto, setProducto] = useState({});    
    const [error, setError] = useState(false)   
    const [comentario, setComentario]  = useState({});
    const [consultarDB, setConsultarDB] = useState(true)

    const router = useRouter()
    const { id } = router.query

    const {firebase, user} = useContext(FirebaseContext)

    const {comentarios, company,  createAt, description, image, name, url, votos, votedFor, createdBy}  = producto;

    useEffect(() => {
        if(id && consultarDB){
            const getProduct = async () =>{
                const docRef = doc(firebase.db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProducto(docSnap.data()) 
                    setConsultarDB(false)                  
                } else {                 
                    setError(true)   
                    setConsultarDB(false)                  
                }                  
            }
            getProduct()                        
        }
    }, [id, consultarDB])

    if(Object.keys(producto).length === 0 && !error) return "Cargando..."; // ver de reemplazar

    function calculatedDays(){
        const days = Math.floor( ( (Date.now() - createAt.toMillis()) / 1000 ) / 86400 ) // calculo para determinar hace cuantos dias se creo               
        return days > 1 ? `Publicado hace ${days.toString()} dias` : "Publicado hoy"
    }       

    const voteProduct = async () =>{
        if(!user) return Router.push('/login');

        if(votedFor.includes(user.uid)) return; // ver de deshabiltiar el boton d elos botos en vez de hacer un return
        
        const updateVotes = [...votedFor, user.uid]
        const productRef = doc(firebase.db, "products", id);        
        await updateDoc(productRef, {
            votos: votos+1,
            votedFor:updateVotes 
        });

        setProducto({
            ...producto,
            votos:votos+1
        })
        setConsultarDB(true)                  
    }

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })        
    }

    const addComentario = async (e) => {        
        e.preventDefault();
        console.log("hola")
        if(!user) return Router.push('/login');

        comentario.userId = user.uid;
        comentario.userName = user.displayName;

        const nuevosComentarios = [...comentarios, comentario ];
        const productRef = doc(firebase.db, "products", id);        
        await updateDoc(productRef, {            
            comentarios:nuevosComentarios
        });

        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })
        setConsultarDB(true)                  
    }
    
    const checkCreatorOfProduct = () => {
        if(!user)return false   
        if(createdBy.id === user.uid) return true;            
    }
    
    const deleteProduct = async() => {
        if(!user || (createdBy.id !==user.uid)){
            return Router.push('/')
        }
        else{
            try {
                await deleteDoc(doc(firebase.db, "products", id));
                alert("Producto borrado correctamente");     
                Router.push('/')
            } catch (error) {
                alert("Hubo un error:", error)
            }
        }
    }
    console.log(consultarDB)
    return(
      <Layout>
          <>            
            {
            error ?  <Error404/>     
                : (<div css={css`width:75%; margin:auto; `}>
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{name}</h1>
                    <ProductoContainer>
                        <div>
                            <p>{calculatedDays()}</p>
                            <p>Por {createdBy.name} de {company}</p>
                            <img src={image} alt="" />
                            <p>{description}</p>
                            {user&&
                                <>
                                <h2>Agrega tu comentario</h2>
                                <form
                                    onSubmit = {addComentario}
                                >
                                    <InputContainer>
                                        <input 
                                            type="text" 
                                            name="mensaje"
                                            onChange = {comentarioChange}
                                        />
                                    </InputContainer>
                                    <InputSubmit
                                        type="submit"
                                        value="Agregar comentario"
                                    >
                                    </InputSubmit>
                                </form>
                                </>
                            }
                            <h2 css={css`margin: 2rem 0;`}>Comentarios</h2>

                            {comentarios.length === 0 ? "Aun no hay comentarios" :
                                <ul>
                                    {comentarios.map( (comentario, i) => (
                                        
                                        <li
                                            key={i}
                                            css={css`
                                                border:1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por:<span css={css`font-weight:bold;`}>{comentario.userName}</span></p>                                        
                                        </li>
                                    ))}
                                </ul>
                                
                            }
                        </div>
                        <aside>                        
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar sitio</Button>                        
                            <div css={css`margin-top:5rem;`}>
                                <p css={css`text-align:center;`}>{votos} Votos</p>
                                {user&&
                                    <Button onClick={voteProduct}>Votar</Button>
                                }
                            </div>                        
                        </aside>
                    </ProductoContainer>
                    {checkCreatorOfProduct()&& <Button onClick={deleteProduct}>Eliminar Producto</Button>}
                </div> 

            )}
        </>
      </Layout>
    )
};

export default Product