import { AiOutlineClose } from 'react-icons/ai';
import { MouseEvent } from 'react';


export default function CancelPopup({toggleDelete, cancel}: {toggleDelete: (e:any) => void, cancel: (e:MouseEvent<HTMLButtonElement>) => void}) {

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div onClick={toggleDelete} className='fixed bg-black opacity-20 top-0 left-0 right-0 bottom-0 z-20'></div>
            <div className='w-full max-w-[600px] rounded-lg p-4 bg-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-30'>
                <div className='w-full flex justify-between items-start gap-8'>
                    <p className='text-xl font-bold'>Cancel</p>
                    <button onClick={toggleDelete}><AiOutlineClose className='text-black text-xl'/></button>
                </div>
                <p className='mt-4'>Are you sure you want to cancel? All recent changes will be lost.</p>
                <div className='mt-6 w-full flex justify-end items-center gap-4'>
                    <button onClick={toggleDelete} className='rounded px-3 py-2 bg-[#DCDCDC] font-medium'>Not now</button>
                    <button onClick={cancel} className='rounded px-3 py-2 bg-[#F06A6A] text-white font-medium'>
                        Yes, cancel progress
                    </button>
                </div>
            </div>
        </div>
    )
}