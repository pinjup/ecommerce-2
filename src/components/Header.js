import Link from 'next/link';
import React from 'react';
import { contextE } from '@/components/context';
import { useContext } from 'react';
import InputSearch from './inputSearch';

export default function Header() {
    const { setModalBars, totalQuantityProducts, windowSize } = useContext(contextE);
    return (
        <header className="w-full h-16 p-4 flex justify-between items-center bg-[#181818] sm:py-6">
            <div id="bars_&_logo" className="flex items-center gap-4">
                <svg
                    onClick={() => setModalBars(true)}
                    id="icon-bars-config"
                    className="w-6 h-6 justify-self-start text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg>

                <Link href={'/'} id="logo" className="text-3xl block">
                    <span className="text-[#F2F2F2]">che</span>
                    <span className="text-[#8758FF]">ak</span>
                    <span className="text-[#5CB8E4]">ly</span>
                </Link>
            </div>

            {windowSize.width < 640 ? <></> : <InputSearch classNameList={['w-1/2']} id={'input-search_header'} />}

            <div id="container-icons" className="flex gap-5">
                <Link href={'/cart'}>
                    <div id="shopping-cart" className="relative">
                        <svg
                            id="icon-shopping-cart"
                            className="w-6 h-6 text-white cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                        >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>

                        <span
                            id="counter-cart"
                            className="absolute -top-[14px] left-[40%] px-[2px] py-[1px] rounded-lg bg-red-500 text-white text-sm"
                        >
                            {totalQuantityProducts > 99 ? '+99' : totalQuantityProducts}
                        </span>
                    </div>
                </Link>

                <svg
                    id="icon-user"
                    className="w-6 h-6 text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 18"
                >
                    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
            </div>
        </header>
    );
}
