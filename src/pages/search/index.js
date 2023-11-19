import { contextE } from '@/components/context';
import Image from 'next/image';
import { useContext } from 'react';

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
                    {filterSearchProducts(listProducts, params, 'keywords').map((product) => (
                        <div
                            key={product.id}
                            id={`product-${product.id}`}
                            className="grid grid-cols-[40%_60%] grid-rows-[224px] gap-2 items-center border rounded-md"
                        >
                            <div
                                id={`container_image_product-${product.id}`}
                                className="p-2 w-full h-full flex items-center bg-gray-100"
                            >
                                <Image
                                    src={product.images[0]}
                                    alt={`Image of ${product.description}`}
                                    width={50}
                                    height={50}
                                    className="w-full h-1/2"
                                />
                            </div>

                            <div
                                id={`container_info_product-${product.id}`}
                                className="p-2 w-full h-full flex flex-col"
                            >
                                <span id={`title_product-${product.id}`} className="text-lg font-normal">
                                    {product.title}
                                </span>

                                <span
                                    id={`price_normal_product-${product.id}`}
                                    className=" text-base text-gray-300 line-through"
                                >
                                    Normal: ${product.price}
                                </span>

                                <span id={`price_product-${product.id}`} className="text-2xl font-medium">
                                    <span className="font-light text-xl">$</span>
                                    {discountedPrice(product)}
                                </span>

                                <div id="c" className="h">
                                    <span
                                        id={`category_product-${product.id}`}
                                        className="p-1 text-xs font-semibold text-black bg-gray-300"
                                    >
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
