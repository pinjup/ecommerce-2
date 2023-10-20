import Header from '@/components/Header'
import { contextE } from '@/components/context'
import React, { useContext } from 'react'

export default function Layout({ children }) {
    const { example } = useContext(contextE)
    
    return (
        <>
            <Header />
            <main>
                <h1>{example}</h1>
                {children}
            </main>
        </>
    )
}
