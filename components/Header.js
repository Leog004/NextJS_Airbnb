import React, {useState} from 'react'
import Image from 'next/image'
import {SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon} from '@heroicons/react/solid'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useRouter } from 'next/router';

export default function Header({placeholder}) {

    const [searchInput, setsearchInput] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [noOfGuests, setnoOfGuests] = useState(1)

    const router = useRouter();

 
    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        setstartDate(ranges.selection.startDate);
        setendDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setsearchInput('');
    }
   
    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>

            {/* Left */}
            <div onClick={() => router.push("/")} className='relative flex items-center h-10 cursor-pointer my-auto'>
                <Image src='https://links.papareact.com/qd3' layout='fill' objectFit='contain' objectPosition='left'/>
            </div>

            {/* Middle */}
            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input value={searchInput} onChange={(e) => setsearchInput(e.target.value)} className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-300'  type='text' placeholder={ placeholder || 'Start your Search'} />
                <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-auto md:mx-2' />
            </div>


            {/* Right */}
            <div className='flex space-x-4 items-center justify-end text-gray-500'>
                <p className='hidden md:inline-flex cursor-pointer'>Become a host</p>
                <GlobeAltIcon className='h-6 cursor-pointer' />

                <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                    <MenuIcon className='h-6 cursor-pointer' />
                    <UserCircleIcon className='h-6 cursor-pointer' />
                </div>

            </div>
        {
            searchInput && (
                <div className='flex flex-col col-span-3 mx-auto'>
                    <DateRangePicker minDate={new Date()} rangeColors={['#FD5B61']} onChange={handleSelect} ranges={[selectionRange]} />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UsersIcon className='h-5' />
                        <input value={noOfGuests} onChange={(e) => setnoOfGuests(e.target.value)} min='1'  type='number' className='w-12 pl-2 text-lg outline-none text-red-400' />
                    </div>
                    <div className='flex'>
                            <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
                            <button onClick={search} className='flex-grow text-red-400'>Search</button>
                        </div>
                </div>
            )
        }
      
        </header>
    )
}
