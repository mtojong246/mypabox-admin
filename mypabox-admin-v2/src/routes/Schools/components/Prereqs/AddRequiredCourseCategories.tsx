import Select from 'react-select';

export default function AddRequiredCourseCategories({ toggleRequiredCourseCategories }: { toggleRequiredCourseCategories: () => void }) {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] max-h-[800px] overflow-y-scroll rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>Add Required Course Category</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Category name:</label>
                        <Select className='w-full focus:outline-none rounded mt-2'/>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Total number of credit hours that need to be completed:</label>
                        <input className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Total number of quarter hours that need to be completed:</label>
                        <input className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Total number of courses that need lab:</label>
                        <input className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Included courses:</label>
                        <button className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                            Add Course
                        </button>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Excluded courses:</label>
                        <button className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                            Add Course
                        </button>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Notes:</label>
                        <button className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleRequiredCourseCategories} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}