import { ChangeEvent, MouseEvent, useState, useEffect } from "react"

export default function LinkPopup({toggleLinkPopup, addLink, linkObj}: {
    toggleLinkPopup: (e:MouseEvent<HTMLButtonElement>) => void, 
    addLink: (e:MouseEvent<HTMLButtonElement>, newLink: string) => void,
    linkObj: {link: string, name: string}
}) {

    const [newLink, setNewLink] = useState('');

    useEffect(() => {
        setNewLink(linkObj.link)
    }, [linkObj.link])

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setNewLink(e.target.value)
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] p-10 flex justify-center items-center'>
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]'></div>
            <div className='w-full max-w-[900px] bg-white rounded p-4 relative z-[100]'>
                <p className='text-xl font-semibold mb-4'>{linkObj.link ? 'Edit' : 'Add'} Supplemental Link</p>
                <div className='mb-4'>
                    <input onChange={handleInput} value={newLink} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded"/>
                </div>
                <div className='w-full flex justify-end items-center gap-3'>
                    <button onClick={toggleLinkPopup} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); addLink(e, newLink)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium w-[93px] h-[44px] rounded hover:text-white hover:bg-[#3558A0] flex justify-center items-center'>
                        Add Link
                    </button>
                </div>

            </div>
        </div>
    )
}