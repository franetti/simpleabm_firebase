import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled'
import {css} from '@emotion/react'

const ProductoContainer = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`
const DescriptionContainer = styled.div`
    flex:0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
    align-items: center;
`

const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    &:hover{
        cursor: pointer;
    }
`;
const Description = styled.p`
    font-size: 1.6rem;
    margin:0;
    color: #8888;
`

const Image = styled.img`
    width: 200px;
`

const ComentariosContainer = styled.div`
    margin-top:2rem;
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img{
        width: 2rem;
        margin-right: 1rem;
    }   
    p{
        font-size: 1.6rem;
        margin-right:1rem ;
        font-weight: 700;
        &:last-of-type{
            margin: 0;
        }
    }
`

const Votos = styled.div`
    flex: 0 0 auto;
    text-align:center;
    border:1px solid #e1e1e1;
    padding:1rem 3rem;
    div{
        font-size: 2rem;
    }
`

const DetailProduct = ({producto}) => {
    const {id, data} = producto
    const {comentarios, company,  createAt, description, image, name, url, votos}  = data
    
    function calculatedDays(){
        const days = Math.floor( ( (Date.now() - createAt.toMillis()) / 1000 ) / 86400 ) // calculo para determinar hace cuantos dias se creo               
        return days > 1 ? `Publicado hace ${days.toString()} dias` : "Publicado hoy"
    }

    return (
        <ProductoContainer css={css`
            list-style: none;
        `}>
            <DescriptionContainer>
                <div>
                    <Image src={image} alt="" />
                </div>
                <div>
                    <Link href={{
                        pathname: '/products/[id]',
                        query: {id}
                    }}>
                        <Title>{name}</Title>
                    </Link>
                    <Description>{description}</Description>
                    <ComentariosContainer>
                        <div>
                            <img src='/speech-bubble.png' />
                            <p>{comentarios.length} Comentarios</p>
                        </div>                        
                    </ComentariosContainer>
                    <p>{calculatedDays()}</p>
                </div>
            </DescriptionContainer>

            <Votos>
                <div>&#9650;</div>
                <div>{votos}</div>
            </Votos>
        </ProductoContainer>
    );
};

export default DetailProduct;

