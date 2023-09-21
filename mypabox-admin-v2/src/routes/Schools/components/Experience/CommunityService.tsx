export default function CommunityService() {
    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Community Service</label>   
            
            <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">False</span>
                    </label>
                </div>
                <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Required</label>   
                    <input className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mb-4' />  
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>            
                </div>
            </div>

            <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">False</span>
                    </label>
                </div>
                <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Recommended</label>   
                    <input className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mb-4' />  
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>            
                </div>
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Community Service Hours Accepted Previous Cycle</label>   
                <input className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className='w-full mt-10'>
                <label className='font-medium text-xl'>Notes:</label>
                <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
        </div>
    )
}