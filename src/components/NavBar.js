import { contextE } from '@/components/context';
import { useContext } from 'react';
import InputSearch from './inputSearch';

function NavBar() {
    const { windowSize } = useContext(contextE);
    // const inputSearch = typeof document !== 'undefined' ? document.getElementById('input-search') : <></> ;
    // console.log('hey');
    // console.log(inputSearch);

    return windowSize.width >= 640 ? (
        <></>
    ) : (
        <nav className="relative p-3 w-full flex justify-center bg-[#181818]">
            
            <InputSearch classNameList={['w-11/12']} id={'input-search_navbar'} />
            {/* <div className='absolute top-16 w-full h-screen bg-red-500'></div> */}
        </nav>
    );
}

export default NavBar;
