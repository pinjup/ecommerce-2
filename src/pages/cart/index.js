import ProductsCart from '@/components/ProductsCart';
import { contextE } from '@/components/context';
import { useContext } from 'react';

export default function Home() {
    const { itemsCart, totalPriceProducts, totalQuantityProducts } = useContext(contextE);

    console.log(itemsCart.length);

    console.log(totalQuantityProducts);

    itemsCart.forEach((product) => console.log(product));

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

                <div id="products" className="p-4 grid grid-cols-1 gap-5">
                    {itemsCart.map((product) => (
                        <ProductsCart key={product.id} product={product} />
                    ))}
                </div>

                {itemsCart.length >= 1 && (<div id="buy" className="w-full flex justify-center">
                    <button className="p-3 w-1/2 flex items-center justify-center text-white text-xl font-normal bg-[#8758FF] rounded-lg">
                        Buy now
                    </button>
                </div>)}
            </main>
        </>
    );
}
