import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <header></header>
            <main>
                <h1>Example</h1>
                {children}
            </main>
        </>
    )
}
