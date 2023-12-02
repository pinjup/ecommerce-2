import { contextE } from '@/components/context';
import Image from 'next/image';
import { useContext } from 'react';
import Rating from '@mui/material/Rating';
import ListProducts from '@/components/ListProducts';

export default function Home() {
    const { listProducts, params, discountedPrice } = useContext(contextE);

    const sliceProductsCategory = (array, category, number) => {
        const filterProducts = array.filter((product) => product?.category === category);
        const arraySlice = filterProducts.slice(0, number);
        return arraySlice;
    };

    // const ImagesCategory = (product) => {
    //     if (!product.images[0].includes('https')) {
    //         return (
    //             <img
    //                 key={product.id}
    //                 src={'https://i.imgur.com/vZH5TYZ.jpeg'}
    //                 alt={`Image of ${product.title}`}
    //                 width={150}
    //                 height={150}
    //             />
    //         );
    //     } else {
    //         return (
    //             <img
    //                 key={product.id}
    //                 src={product.images[0]}
    //                 alt={`Image of ${product.title}`}
    //                 width={150}
    //                 height={150}
    //                 className='w-full h-full border-4 border-[#8758FF]'
    //             />
    //         );
    //     }
    // };

    console.log(listProducts);

    const filterSearchProducts = (array, paramVariable, queryName) => {
        const cleanQuery = paramVariable.get(queryName)?.replace(/\s+/g, '').toLowerCase();

        return array.filter(
            ({ title, description }) =>
                title?.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
                description?.toLowerCase().includes(cleanQuery)
        );
    };

    console.log(filterSearchProducts(listProducts, params, 'keywords'));

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
