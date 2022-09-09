import React from 'react'
import Link from 'next/link'
import Header from  './Header'
import Head from 'next/head'

const Layout = props => {
    return (  
        <>   
            <Head>          
                <title>Product Hunt Clone - Next.js</title>
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
            </Head>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
    );
}
 
export default Layout;