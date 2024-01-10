import { contextE } from '@/components/context';
import { useContext } from 'react';
import ListProducts from '@/components/ListProducts';

export default function Home() {
    const { listProducts, params } = useContext(contextE);

    const filterSearchProducts = (array, paramVariable, queryName) => {
        const cleanQuery = paramVariable.get(queryName)?.replace(/\s+/g, '').toLowerCase();

        return array.filter(
            ({ title, description }) =>
                title?.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
                description?.toLowerCase().includes(cleanQuery)
        );
    };

    return (
        <>
            <main className="flex flex-col gap-2 pt-3">
                <div id="container-products" className="p-3 grid grid-cols-1 gap-4">
                    <ListProducts arrayProducts={filterSearchProducts(listProducts, params, 'keywords')} />
                </div>
            </main>
        </>
    );
}
