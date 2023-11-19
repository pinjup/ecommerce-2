import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { contextE } from '@/components/context';
import Link from 'next/link';
import { useContext } from 'react';

export default function Layout({ children }) {
    const { ModalBars, listCategory, setModalBars } = useContext(contextE);

    return (
        <>
            <Header />
            <NavBar />
            <>{children}</>

            {ModalBars && (
                <div id="modal-bars_config" className="fixed top-0 w-screen h-screen flex">
                    <div className="w-4/5 h-full overflow-y-auto flex flex-col gap-8 bg-[#181818]">
                        <div className="w-full h-[10%] min-h-[110px] p-3 text-white flex flex-col items-end justify-between bg-[#8758FF] border-t-[6px] border-[#5CB8E4]">
                            <div className="flex gap-2">
                                <span className="">Sign In</span>

                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 14 18"
                                >
                                    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                            </div>

                            <span className="text-[#F2F2F2] text-4xl self-start">cheakly</span>
                        </div>

                        <div id="categories" className="px-5 flex flex-col gap-4">
                            <span className="text-3xl font-medium text-[#5CB8E4]">Categories</span>

                            <div id="container-categories" className="pl-3 flex flex-col gap-3">
                                {listCategory?.map((category) => (
                                    <Link
                                        key={category}
                                        onClick={() => setModalBars(false)}
                                        href={`/category/${category}`}
                                        className="text-white text-2xl"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setModalBars(false)}
                        className="w-1/5 h-full pt-10 flex justify-center bg-[rgba(0,0,0,0.5)]"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
}
