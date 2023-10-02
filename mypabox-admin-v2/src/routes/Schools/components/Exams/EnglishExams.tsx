import Select from 'react-select'

export default function EnglishExams() {
    return (
        <>
            <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">English Proficiency Exams Required</label>  
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">False</span>
                    </label>
                </div>

                <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>

                    <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame TOEFL Needs To Be Completed</label>   
                        <div className='flex justify-start items-center gap-2'>
                            <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <Select className="w-1/3 focus:outline-none"/>
                        </div>     
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Masters Degree</label>   
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">False</span>
                            </label>
                        </div>    
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Doctoral Degree</label>   
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">False</span>
                            </label>
                        </div>    
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Reading Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Writing Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Listening Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Speaking Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL IBT Minimum Score Notes</label>   
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Reading Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Writing Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Listening Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Speaking Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>

                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL PBT Minimum Score Notes</label>   
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>

                </div>

                <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>

                    <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                </div>

                <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>

                    <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                </div>

                <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>

                    <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                </div>

                <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>

                    <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Minimum Total Score Required</label>   
                        <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                </div>
            </div> 
        </>
    )
}