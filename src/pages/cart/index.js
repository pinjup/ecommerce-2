import ListProducts from '@/components/ListProducts';
import { contextE } from '@/components/context';
import Rating from '@mui/material/Rating';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Home() {
    const {
        itemsCart,
        setItemsCart,
        totalPriceProducts,
        setTotalQuantityProducts,
        totalQuantityProducts,
        discountedPrice,
    } = useContext(contextE);

    // const sliceProductsCategory = (array, category, number) => {
    //     const filterProducts = array.filter((product) => product?.category === category);
    //     const arraySlice = filterProducts.slice(0, number);
    //     return arraySlice;
    // };

    console.log(itemsCart);

    console.log(totalQuantityProducts);

    const router = useRouter();

    const ClickProduct = (event, thisProduct) => {
        const deleteProductArray = itemsCart.filter((product) => product?.id !== thisProduct?.id);
        if (event.target.id == 'delete-product') {
            setItemsCart(deleteProductArray);
        }
    };

    // const ClickProduct = (event, thisProduct) => {
    //     const indexProduct = itemsCart.findIndex((product) => product?.id === thisProduct?.id);
    //     const newItemsCart = [...itemsCart.slice(0, indexProduct), ...itemsCart.slice(indexProduct + 1)];

    //     if (event.target.id) {
    //         setItemsCart(newItemsCart);
    //     }
    // }

    return (
        <>
            <main className="flex flex-col gap-2 pt-3">
                {/* <div id="container_back-icon" className="p-3 flex flex-col gap-2 items-start justify-center border-b-2">
                    <Link href={'/'}>
                        <svg
                            className="w-7 h-7 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 8 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                            />
                        </svg>
                    </Link>
                </div> */}

                <div id="title" className="flex flex-col items-center">
                    <h1 className="text-3xl font-medium">Cart</h1>

                    <div id="container_info" className="w-full flex items-center justify-center gap-2">
                        <div id="container_quantity-products" className="flex gap-1">
                            <span>{totalQuantityProducts}</span>
                            <span>{itemsCart.length === 1 ? 'product' : 'products'}</span>
                        </div>

                        <span>|</span>

                        <div id="container_price-products" className="flex">
                            <span>$</span>
                            <span>{totalPriceProducts}</span>
                        </div>
                    </div>
                </div>

                <div id="products" className="p-4 grid grid-cols-1 auto-rows-[140px] gap-5">
                    {itemsCart.map((product) => (
                        <div
                            onClick={(event) => ClickProduct(event, product)}
                            className="relative w-full h-full grid grid-cols-[40%_60%] gap-2 items-center border rounded-md"
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
                                    className="w-full h-[35%] min-h-[64px] max-h-16"
                                />
                            </div>

                            <div
                                id={`container_info_product-${product.id}`}
                                className="p-3 w-full h-full flex flex-col justify-center"
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

                                {/* <div id="rating" className="flex gap-1 items-center">
                                        <span className="text-xs text-[#007185]">{product.rating}</span>
                                        <Rating
                                            name="half-rating-read"
                                            defaultValue={product.rating}
                                            precision={0.01}
                                            size="small"
                                            readOnly
                                        />
                                    </div> */}

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

                            <svg
                                id="delete-product"
                                className="absolute -top-3 -right-2 w-8 h-8 text-red-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
