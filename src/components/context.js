import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef, useState } from 'react';

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
    const [windowSize, setWindowSize] = useState({
        width: Window.innerWidth === '' ? 0 : Window.innerWidth,
        height: Window.innerHeight === '' ? 0 : Window.innerHeight,
    });

    const counterResize = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const LoadChargeWindowSize = () => {
            if (counterResize.current === 0) handleResize();
            counterResize.current += 1;
        };

        LoadChargeWindowSize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

        async function getProducts() {
            const { data: { products } } = await axios.get('https://dummyjson.com/products');
            // const namesCategory = response.data.map(category => category.name)
            console.log(products);
            //const products = response.data?.products;
            // const filterProducts = products.filter(product => listCategory.some(category => category?.name === product?.category?.name))
            // console.log(filterProducts)
            setListProducts(products);
        }

        getCategories();

        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const totalSumProducts = () => {
            setTotalQuantityProducts(0);

            itemsCart.forEach((product) => {
                setTotalQuantityProducts((prevTotal) => prevTotal + (product?.quantityProduct || 0));
            });
        };

        totalSumProducts();
    }, [itemsCart]);

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
                windowSize,
            }}
        >
            {children}
        </contextE.Provider>
    );
}

export { contextE, ContextProvider };
