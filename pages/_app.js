// Este archivo es como un archivo que envuelve al index y a la app en general. es como una configuracion poenele
import App from 'next/app' // 
import firebase, {FirebaseContext} from '../firebase'
import useAutentication from '../hooks/useAutentication';
import '../styles/globals.css'
import 'normalize.css/normalize.css';


function MyApp({ Component, pageProps }) {
  
  const user = useAutentication();
  // console.log(user)
  return (
    <FirebaseContext.Provider
        value={{
          firebase,
          user
        }}
    >
        <Component {...pageProps} /> 
    </FirebaseContext.Provider>
  )
}

export default MyApp
