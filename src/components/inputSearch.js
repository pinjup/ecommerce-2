import { useContext, useEffect } from 'react';
import { contextE } from './context';

export default function InputSearch({ classNameList, id }) {
    const { setSearchValue, searchValue, SubmitSearch } = useContext(contextE);

    console.log(classNameList);

    useEffect(() => {
        const fixClassNameList = classNameList === undefined ? [] : classNameList;

        const inputSearch = document.getElementById(id);
        if (inputSearch) {
            fixClassNameList?.forEach((className) => {
                inputSearch.classList.add(className);
            });
        }
    }, [classNameList, id]);

    return (
        <div
            id={id}
            className="rounded-2xl p-[2px] flex justify-center bg-gradient-to-tr from-[#8758FF] to-[#5CB8E4]"
        >
            <div className="w-full py-1 bg-white flex items-center justify-evenly rounded-2xl">
                <input
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && SubmitSearch()}
                    className="w-2/3 h-7 p-1"
                    value={searchValue}
                    placeholder="horno microhondas"
                    type="text"
                />

                <svg
                    onClick={() => setSearchValue('')}
                    className={`w-3 h-3 ${searchValue === '' ? 'text-white' : 'text-gray-400'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>

                <svg
                    id="icon-search"
                    className="w-5 h-5 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    onClick={SubmitSearch}
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
        </div>
    );
}
