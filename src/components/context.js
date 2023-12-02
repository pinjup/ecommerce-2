import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

const contextE = createContext();

function ContextProvider({ children }) {
    const [ModalBars, setModalBars] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [itemsCart, setItemsCart] = useState([]);
    const [Window, setWindow] = useState('');
    const [totalPriceProducts, setTotalPriceProducts] = useState(0);
    const [totalQuantityProducts, setTotalQuantityProducts] = useState(0);

    const totalSumProducts = () => {
        setTotalQuantityProducts(0);

        itemsCart.forEach((product) => {
            setTotalQuantityProducts((prevTotal) => prevTotal + (product?.quantityProduct || 0));
        });
    };

    const discountedPrice = (product) =>
        Math.round(product.price - (product.price * Math.ceil(product.discountPercentage)) / 100);

    const router = useRouter();

    const SubmitSearch = () => {
        router.push('/search');
    };

    const params = new URLSearchParams(Window?.location?.search);

    if (router.asPath === '/search') {
        params.set('keywords', searchValue);
        Window?.history?.replaceState({}, '', `${Window?.location?.pathname}?${params}`);
    }

    useEffect(() => {
        setWindow(window);

        if (params.has('keywords')) {
            console.log('hey');
            setSearchValue(params.get('keywords'));
            console.log(searchValue);
        }

        async function getCategories() {
            const response = await axios.get('https://dummyjson.com/products/categories');
            // const namesCategory = response.data.map(category => category.name)
            setListCategory(response.data.slice(0, 6));
        }
        getCategories();

        async function getProducts() {
            const response = await axios.get('https://dummyjson.com/products');
            // const namesCategory = response.data.map(category => category.name)
            const products = response.data?.products;
            // const filterProducts = products.filter(product => listCategory.some(category => category?.name === product?.category?.name))
            // console.log(filterProducts)
            setListProducts(products);
        }

        getProducts();
    }, []);

    useEffect(() => {
        totalSumProducts();
    }, [itemsCart]);

    console.log(totalQuantityProducts);

    return (
        <contextE.Provider
            value={{
                listCategory,
                ModalBars,
                setModalBars,
                searchValue,
                setSearchValue,
                listProducts,
                SubmitSearch,
                params,
                discountedPrice,
                itemsCart,
                setItemsCart,
                totalPriceProducts,
                setTotalPriceProducts,
                totalQuantityProducts,
                setTotalQuantityProducts,
            }}
        >
            {children}
        </contextE.Provider>
    );
}

export { contextE, ContextProvider };
