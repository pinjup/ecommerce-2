import { contextE } from '@/components/context';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import ListProducts from '@/components/ListProducts';

export default function Home() {
    const { listProducts, listCategory } = useContext(contextE);

    'l';

    console.log(listProducts);

    const router = useRouter();

    useEffect(() => {
        if (!listCategory.includes(router.query.slug)) {
            router.push('/');
        }
    }, [listCategory, router]);

    const filterCategoryProducts = (array, categoryName) => {
        return array.filter(({ category }) => category === categoryName);
    };

    

    return (
        <>
            <main className="flex flex-col gap-2 pt-3">
                <div id="container-products" className="p-3 grid grid-cols-1 gap-4">
                    <ListProducts arrayProducts={filterCategoryProducts(listProducts, router.query.slug)} />
                </div>
            </main>
        </>
    );
}
