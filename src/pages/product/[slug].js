import { contextE } from '@/components/context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Rating from '@mui/material/Rating';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function Home() {
    const { listProducts, discountedPrice, itemsCart, setItemsCart } = useContext(contextE);

    const [quantity, setQuantity] = useState(1);
    const [modalQuantity, setModalQuantity] = useState(false);

    const router = useRouter();

    const filterIDProducts = (array, productID) => {
        return array?.filter(({ id }) => id == productID);
    };

    const images = filterIDProducts(listProducts, router.query.slug)?.flatMap((product) =>
        product.images.map((image) => {
            return {
                original: image,
                originalAlt: `image of ${product.title}`,
            };
        })
    );

    const stockArray = [];

    filterIDProducts(listProducts, router.query.slug).map((product) => {
        for (let i = 1; i <= product.stock; i++) {
            stockArray.push(i);
        }
    });

    const scrollQuantity = () => {
        stockArray.forEach((number) => {
            const element = document.getElementById(`quantity-${number}`);

            if (element.getBoundingClientRect().y <= 56) {
                element.classList.remove('border', 'bg-[#f0f2f2]');
                element.classList.add('text-transparent');
            } else {
                element.classList.add('border', 'bg-[#f0f2f2]');
                element.classList.remove('text-transparent');
            }
        });
    };

    const deactivateModal = (event) => {
        if (event.target.id === 'modal') {
            setModalQuantity(false);
        }
    };

    const quantityOption = (number) => {
        setQuantity(number);
        setModalQuantity(false);
    };

    const setQuantityProduct = () => {
        const objectProduct = filterIDProducts(listProducts, router.query.slug)[0];
        objectProduct.quantityProduct = quantity;
        
        const updatedCart = [...itemsCart, objectProduct];

        const indexProduct = itemsCart.findIndex((product) => product?.id === objectProduct?.id);

        if (indexProduct !== -1) {
            const updatedItemsCart = [...itemsCart];
            updatedItemsCart[indexProduct].quantityProduct = objectProduct.quantityProduct;
            setItemsCart(updatedItemsCart);
        } else {
            setItemsCart(updatedCart);
        }
    };

    console.log(itemsCart);

    // console.log(filterIDProducts(listProducts, router.query.slug))
    // console.log(filterIDProducts(listProducts, router.query.slug)[0]?.quantityProduct)
    // delete filterIDProducts(listProducts, router.query.slug)[0]?.quantityProduct
    // console.log(filterIDProducts(listProducts, router.query.slug)[0]?.quantityProduct)

    return (
        <>
            <main className="relative flex flex-col gap-2 pt-3">
                {filterIDProducts(listProducts, router.query.slug).map((product) => (
                    <div
                        key={product.id}
                        id={`product-${product.id}`}
                        className="p-3 grid grid-cols-1 gap-3 items-center"
                    >
                        <div id={`title-product-${product.id}`} className="w-full flex justify-center">
                            <span id={`title_product-${product.id}`} className="text-2xl font-bold">
                                {product.title}
                            </span>
                        </div>

                        <div
                            id={`container_image_product-${product.id}`}
                            className="w-full h-full flex justify-center items-center bg-gray-100"
                        >
                            {/* <Image
                                src={product.images[0]}
                                alt={`Image of ${product.description}`}
                                width={50}
                                height={50}
                                className="w-full h-full"
                            /> */}

                            <ImageGallery
                                items={images}
                                showThumbnails={false}
                                showPlayButton={false}
                                showBullets={true}
                                showFullscreenButton={false}
                            />
                        </div>

                        <div
                            id={`container_info_product-${product.id}`}
                            className="p-2 w-full h-full flex flex-col gap-1"
                        >
                            <div id="rating" className="flex gap-1 items-center">
                                <span className="text-sm text-[#007185]">{product.rating}</span>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={product.rating}
                                    precision={0.01}
                                    size="medium"
                                    readOnly
                                />
                            </div>

                            <div id={`price_product-${product.id}`} className="flex flex-col text-3xl font-medium">
                                <div className="flex gap-4">
                                    <span className="text-red-500">-{Math.ceil(product.discountPercentage)}%</span>
                                    <div>
                                        <span className="font-light">$</span>
                                        {discountedPrice(product)}
                                    </div>
                                </div>

                                <span
                                    id={`price_normal_product-${product.id}`}
                                    className=" text-base text-gray-300 line-through"
                                >
                                    Normal: ${product.price}
                                </span>
                            </div>

                            <div id="category" className="h">
                                <span
                                    id={`category_product-${product.id}`}
                                    className="p-1 text-xs font-semibold text-black bg-gray-300"
                                >
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        <div id={`stock_dropdown_product-${product.id}`} className="pl-2 w-full flex flex-col gap-2">
                            {product.stock > 1 ? (
                                <span className="text-xl font-medium text-green-400">In Stock</span>
                            ) : (
                                <span className="text-xl font-medium text-red-400">Out of Stock</span>
                            )}

                            <div
                                onClick={() => setModalQuantity(true)}
                                id="quantity"
                                className="p-2 w-auto max-w-[140px] flex items-center justify-between bg-[#f0f2f2] border border-black rounded-md"
                            >
                                <span>Quantity:</span>
                                <span>{quantity}</span>
                                <svg
                                    class="w-4 h-4 text-black"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 8"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div id="buttons-buy" className="p-2 w-full flex flex-col gap-3">
                            <button className="p-3 w-full flex justify-center text-white text-xl font-normal bg-[#8758FF] rounded-lg">
                                Buy now
                            </button>

                            <button
                                onClick={setQuantityProduct}
                                className="p-3 w-full flex justify-center text-white text-xl font-normal bg-[#5CB8E4] rounded-lg"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}

                {modalQuantity && (
                    <div
                        onScroll={scrollQuantity}
                        onClick={deactivateModal}
                        id="modal"
                        className="absolute -top-32 z-10 p-14 w-screen h-screen overflow-y-scroll flex flex-col items-center bg-[rgba(0,0,0,0.5)]"
                    >
                        <div className="fixed p-6 w-[180px] h-[50px] flex items-center justify-between bg-[#f0f2f2] rounded-t-md">
                            <span>Quantity:</span>
                            <svg
                                onClick={() => setModalQuantity(false)}
                                className="w-3 h-3 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </div>

                        <div className="mt-[50px]">
                            {stockArray.map((number) => (
                                <div
                                    key={number}
                                    onClick={() => quantityOption(number)}
                                    id={`quantity-${number}`}
                                    className={`p-6 w-[180px] h-[50px] flex items-center justify-center border bg-[#f0f2f2] ${
                                        number === stockArray[stockArray.length - 1] ? 'rounded-b-md' : ''
                                    }`}
                                >
                                    <span>{number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
