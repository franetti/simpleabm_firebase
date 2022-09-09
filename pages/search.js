import {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import useProducts from '../hooks/useProducts';
import Layout from '../components/layout/Layout'
import DetailProduct from '../components/layout/DetailProduct'

export default function Search() {

  const router = useRouter();  
  const {query:{ q }} = router;

  const {productos} = useProducts('createAt')  
  const [resultado, setResultado] = useState([])
  
  useEffect(() => {
      const busqueda = q.toLowerCase();
      const filter = productos.filter(producto => {
        return(
          producto.data.name.toLowerCase().includes(busqueda) || producto.data.description.toLowerCase().includes(busqueda)
        )
      })      
      setResultado(filter)
  },[q,productos])
  

  return (
      <div>
        <Layout>
           <div className="listado-productos">
             <div className="contenedor">
               <div className="bg-white">
                  {resultado.map(producto => (
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
