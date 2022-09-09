import React,{useState,useEffect, useContext} from 'react';
import Layout from '../components/layout/Layout'
import DetailProduct from '../components/layout/DetailProduct';
import useProducts from '../hooks/useProducts'

export default function Home() {

  const { productos } = useProducts('votos')

  return (
      <div>
        <Layout>
           <div className="listado-productos">
             <div className="contenedor">
               <div className="bg-white">
                  {productos.map( producto => (
                    <DetailProduct
                      key={producto.id}
                      producto={producto}
                    />
                  ))}
               </div>
             </div>
           </div>
        </Layout>
      </div>
  )
}
