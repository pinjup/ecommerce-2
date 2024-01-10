import { contextE } from '@/components/context';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Home() {
    const { listCategory, listProducts } = useContext(contextE);

    const sliceProductsCategory = (array, category, number) => {
        const filterProducts = array.filter((product) => product?.category === category);
        const arraySlice = filterProducts.slice(0, number);
        return arraySlice;
    };

    const router = useRouter();

    return (
        <>
            <main className="flex flex-col gap-2 pt-3">
                <div id="top-products" className="flex flex-col gap-2 items-center border-b-2">
                    <h2 className="pl-4 text-3xl font-medium">Top Products</h2>
                    <div id="container-images" className="p-3 flex gap-3 overflow-x-scroll">
                        {listCategory.map((category) =>
                            sliceProductsCategory(listProducts, category, 1).map((product) => (
                                <Image
                                    onClick={() => router.push(`/product/${product.id}`)}
                                    key={product.id}
                                    src={product.images[0]}
                                    alt={`Image of ${product.title}`}
                                    width={150}
                                    height={150}
                                    className={`w-[40%] h-auto rounded-md border-2 ${
                                        listCategory.indexOf(category) % 2 === 0
                                            ? 'border-[#8758FF]'
                                            : 'border-[#5CB8E4]'
                                    }`}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div id="categories" className="flex flex-col gap-4 items-center">
                    <h2 className="pl-4 text-2xl font-medium">Categories</h2>
                    <div id="container-cards" className="flex flex-col gap-8">
                        {listCategory.map((category) => (
                            <Link
                                href={`/category/${category}`}
                                key={category}
                                className={`w-auto p-4 mx-auto bg-[#fafafa] border-2 ${
                                    listCategory.indexOf(category) % 2 === 0 ? 'border-[#8758FF]' : 'border-[#5CB8E4]'
                                } flex gap-2 items-center rounded-lg`}
                            >
                                <div className="grid grid-cols-[120px_120px] grid-rows-[120px_auto_120px] gap-x-3 gap-y-2 justify-items-center justify-center">
                                    <span
                                        className={`col-start-1 col-end-3 row-start-2 row-end-3 text-xl font-medium ${
                                            listCategory.indexOf(category) % 2 === 0
                                                ? 'text-[#8758FF]'
                                                : 'text-[#5CB8E4]'
                                        }`}
                                    >
                                        {category}
                                    </span>

                                    {sliceProductsCategory(listProducts, category, 4).map((product) => (
                                        <Image
                                            key={product.id}
                                            src={product.images[0]}
                                            alt={`Image of ${product.title}`}
                                            width={150}
                                            height={150}
                                            className={`w-full h-full border-2 ${
                                                listCategory.indexOf(category) % 2 === 0
                                                    ? 'border-[#8758FF]'
                                                    : 'border-[#5CB8E4]'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
