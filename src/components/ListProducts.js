import Rating from '@mui/material/Rating';
import Link from 'next/link';
import Image from 'next/image';
import { contextE } from './context';
import { useContext } from 'react';

export default function ListProducts({ arrayProducts }) {
    const { discountedPrice } = useContext(contextE);

    return (
        <>
            {arrayProducts.map((product) => (
                <Link key={product.id} id={`product-${product.id}`} href={`/product/${product.id}`}>
                    <div className="grid grid-cols-[40%_60%] grid-rows-[224px] gap-2 items-center border rounded-md">
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

                        <div id={`container_info_product-${product.id}`} className="p-2 w-full h-full flex flex-col">
                            <span id={`title_product-${product.id}`} className="text-lg font-normal">
                                {product.title}
                            </span>

                            <span
                                id={`price_normal_product-${product.id}`}
                                className=" text-base text-gray-300 line-through"
                            >
                                Normal: ${product.price}
                            </span>

                            <div id="rating" className="flex gap-1 items-center">
                                <span className="text-xs text-[#007185]">{product.rating}</span>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={product.rating}
                                    precision={0.01}
                                    size="small"
                                    readOnly
                                />
                            </div>

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
                </Link>
            ))}
        </>
    );
}
