import { AiOutlineClose } from 'react-icons/ai'
import { MouseEvent } from 'react'

export default function DeletePopupGpa({ toggleDelete, removeNote, keyString, index, noteIndex }: {
    toggleDelete: (e: MouseEvent<HTMLButtonElement>, i: number) => void,
    removeNote: (e: MouseEvent<HTMLButtonElement>, key: string, index: number, noteIndex: number) => void,
    keyString: string,
    index: number,
    noteIndex: number,
    
}) {
    return (
        <div className="fixed w-full font-['Noto Sans'] -ml-[20.1em] top-0 bg-[#000000d5] z-10 h-screen">
            <form className="h-[12em] w-[26em] mt-[20em] rounded-[0.625em] bg-white ml-[40em]">
            <AiOutlineClose className='absolute text-black text-2xl ml-[29em] mt-8 cursor-pointer' />
            <p className='absolute text-2xl mt-8 ml-8'>Are you sure you want to delete?</p>
            <button type='submit' className="absolute mt-[7em] ml-[8em] w-20 h-10 rounded-2xl border-2 
            border-red-600 text-red-600" onClick={(e) => {toggleDelete(e, noteIndex); removeNote(e, keyString, index, noteIndex)}}>
                Delete
            </button>
            <button type='submit' className="absolute mt-[7em] ml-[14em] w-20 h-10 rounded-2xl border-2 
            border-blue-600 text-blue-600" onClick={(e) => toggleDelete(e, noteIndex)}>
                Cancel
            </button>
            </form>
        </div>
    )
}