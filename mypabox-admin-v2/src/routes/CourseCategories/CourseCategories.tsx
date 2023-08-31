import { Link } from "react-router-dom"

export default function CourseCategories() {
    return (
        <>
        <div className="w-screen px-10 font-['Noto Sans']">
            <div className='w-full max-w-[1800px] mx-auto'>
                <div className={`w-full flex justify-between items-start sticky top-0 pt-10 pb-4 bg-white`}>
                    <div>
                        <p className='text-5xl font-medium'>Course Categories</p>
                        <p className='text-xl mt-2'>Total: </p>
                    </div>
                    <Link to='/categories/add-category'>
                        <button className={`text-lg border-2 border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`}>
                            + Add Course Category
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}