import { contextE } from '@/components/context';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Home() {
    const { listProducts, discountedPrice, listCategory } = useContext(contextE);

    console.log(listProducts);

    const router = useRouter();

    if (!listCategory.includes(router.query.slug)) {
        return notFound();
    }

    const filterCategoryProducts = (array, categoryName) => {
        return array.filter(({ category }) => category === categoryName);
    };

    return (
        <>
            <main className="flex flex-col gap-2 pt-3">
                <div id="container-products" className="p-3 grid grid-cols-1 gap-4">
                    {filterCategoryProducts(listProducts, router.query.slug).map((product) => (
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
