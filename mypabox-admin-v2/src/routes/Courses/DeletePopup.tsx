import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCourses } from '../../app/selectors/courses.selectors'
import { useState, useEffect } from 'react'

export default function DeletePopup({ toggleModal, toBeDeleted, handleDelete }: { toggleModal: () => void, toBeDeleted: string, handleDelete: (name: string) => void }) {
    const courses = useSelector(selectCourses);
    const [ name, setName ] = useState('');

    useEffect(() => {
        const course = courses.find(c => c.unique_id === toBeDeleted);
        if (course) setName(course.course_name);
    }, [toBeDeleted])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0'>
            <div onClick={toggleModal} className='fixed bg-black opacity-20 top-0 left-0 right-0 bottom-0'></div>
            <div className='w-full max-w-[600px] rounded-lg p-4 bg-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                <div className='w-full flex justify-between items-start gap-8'>
                    <p className='text-xl font-bold'>Delete <q>{name}</q>?</p>
                    <button onClick={toggleModal}><AiOutlineClose className='text-black text-xl'/></button>
                </div>
                <p className='mt-4'>You will not be able to recover it.</p>
                <div className='mt-4 w-full flex justify-end items-center gap-4'>
                    <button className='rounded px-3 py-2 bg-[#DCDCDC] font-medium'>Cancel</button>
                    <button onClick={() => handleDelete(toBeDeleted)} className='rounded px-3 py-2 bg-[#F06A6A] text-white font-medium'>Yes, delete it</button>
                </div>
            </div>
        </div>
    )
}