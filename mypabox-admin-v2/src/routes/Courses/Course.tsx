import { useSelector, useDispatch } from "react-redux";
import { selectCourses } from "../../app/selectors/courses.selectors";
import { AppDispatch } from "../../app/store";
import { getAllCourses } from "../../utils/firebase/firebase.utils";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

export default function Courses() {
    return (
    <div className="w-screen py-24 px-10 font-['Noto Sans']">
      <div className='w-full max-w-[1800px] pt-10 mx-auto'>
            <div className={`w-full flex justify-between items-start`}>
                <div >
                    <p className='text-5xl font-medium'>Courses</p>
                    <p className='text-xl mt-2'>Total: </p>
                </div>

                <button className={`text-lg border-2 
                border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`}>
                + Add Course
                </button>
            </div>
            <div className='w-full mt-16 flex flex-col justify-start items-center'>
                <div className='w-full flex justify-between items-end py-2 border-b border-[#E5E5E5]'>
                    <div>
                        <p className='text-lg font-medium mb-1'>Abnormal Psychology</p>
                        <p className='text-sm'>GPA Calculation: Science</p>
                        <p className='text-sm mb-1'>Subject Category: Social/Behavioral Science</p>
                        <p className='text-sm text-[#8B8B8B]'>-24ij23987dkjh </p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                        <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}