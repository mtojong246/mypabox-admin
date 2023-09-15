export default function CompleteConditions() {
    return (
        <>
            <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">All Courses Must Be Completed Before Applying</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">False</span>
                    </label>
                </div>
            </div>
            <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Courses Can Be In Progress While Applying</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">False</span>
                    </label>
                </div>
            </div>
        </>
    )
}