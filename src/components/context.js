import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

const contextE = createContext();

function ContextProvider({ children }) {
    const [ModalBars, setModalBars] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [counterCart, setCounterCart] = useState(0);
    const [Window, setWindow] = useState('');

    const discountedPrice = (product) =>
        Math.round(product.price - (product.price * Math.ceil(product.discountPercentage)) / 100);

    const router = useRouter();

    const SubmitSearch = () => {
        router.push('/search');
    };

    setTimeout(() => {
        setWindow(window);
    }, 500);

    const params = new URLSearchParams(Window?.location?.search);

    if (router.asPath === '/search') {
        params.set('keywords', searchValue);
        Window?.history?.replaceState({}, '', `${Window?.location?.pathname}?${params}`);
    }

    useEffect(() => {
        // const querystring = window.location.search;
        // const params = new URLSearchParams(querystring);

        // if (router.asPath === '/search') {
        //     params.set('keywords', searchValue);
        //     window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        // }

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

    // useEffect(() => {
    //     const querystring = window.location.search;
    //     const params = new URLSearchParams(querystring);

    //     params.set('search', searchValue);

    //     window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    // }, [searchValue]);

    return (
        <contextE.Provider
            value={{
                listCategory,
                ModalBars,
                setModalBars,
                searchValue,
                setSearchValue,
                listProducts,
                counterCart,
                setCounterCart,
                SubmitSearch,
                params,
                discountedPrice,
            }}
        >
            {children}
        </contextE.Provider>
    );
}

export { contextE, ContextProvider };
