import { useContext, useState } from 'react';
import { contextE } from './context';
import Image from 'next/image';

export default function ProductsCart({ product }) {
    const { discountedPrice, itemsCart, setItemsCart } = useContext(contextE);

    const [valueQuantityProduct, setValueQuantityProduct] = useState(product.quantityProduct);

    const ClickProduct = (event, thisProduct) => {
        const deleteProductArray = itemsCart.filter((product) => product?.id !== thisProduct?.id);
        if (event.target.id == 'delete-product') {
            setItemsCart(deleteProductArray);
        }
    };

    console.log(product.quantityProduct);

    const ChangeValueProductInput = (event) => {
        let newValue = parseInt(event.target.value, 10);

        if (newValue < 1) {
            newValue = 1;
        } else if (newValue > product.stock) {
            newValue = product.stock;
        }

        setValueQuantityProduct(newValue);

        const updatedCart = itemsCart.map((item) =>
            item.id === product.id ? { ...item, quantityProduct: newValue } : item
        );

        setItemsCart(updatedCart);
    };

    const ChangeValueProductButton = (operation) => {
        setValueQuantityProduct((prevValue) => {
            let newValue;

            if (operation === 'plus') {
                newValue = Math.min(product.stock, prevValue + 1);
            } else if (operation === 'minus') {
                newValue = Math.max(1, prevValue - 1);
            } else {
                // Operación no reconocida, mantener el valor actual
                newValue = prevValue;
            }

            const updatedCart = itemsCart.map((item) =>
                item.id === product.id ? { ...item, quantityProduct: newValue } : item
            );

            setItemsCart(updatedCart);

            return newValue;
        });
    };

    return (
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

            <div id={`container_info_product-${product.id}`} className="p-3 w-full h-full flex flex-col justify-center">
                <span id={`title_product-${product.id}`} className="text-lg font-normal">
                    {product.title}
                </span>
                <span id={`price_normal_product-${product.id}`} className=" text-base text-gray-300 line-through">
                    Normal: ${product.price}
                </span>
                <span id={`price_product-${product.id}`} className="text-2xl font-medium">
                    <span className="font-light text-xl">$</span>
                    {discountedPrice(product)}
                </span>
                <div id={`category_product-${product.id}`}>
                    <span className="p-1 text-xs font-semibold text-black bg-gray-300">{product.category}</span>
                </div>
                <div id="quantityProduct" className="pt-2 flex gap-1 items-center">
                    <button
                        disabled={product.quantityProduct === 1}
                        onClick={() => ChangeValueProductButton('minus')}
                        className="w-8 h-8 flex items-center justify-center text-2xl rounded-full bg-[#8758FF] active:text-red-500 disabled:bg-gray-400 disabled:text-black"
                    >
                        -
                    </button>
                    <input
                        className="text-end"
                        type="number"
                        min="1"
                        max={product.stock}
                        value={valueQuantityProduct}
                        onChange={ChangeValueProductInput}
                    />
                    <button
                        disabled={product.quantityProduct === product.stock}
                        onClick={() => ChangeValueProductButton('plus')}
                        className="w-8 h-8 flex items-center justify-center text-2xl rounded-full bg-[#5CB8E4] active:text-red-500 disabled:bg-gray-400 disabled:text-black"
                    >
                        +
                    </button>
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
    );
}
