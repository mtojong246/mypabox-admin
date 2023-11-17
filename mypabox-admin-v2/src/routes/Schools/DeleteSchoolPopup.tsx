import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import { deleteSchoolDoc } from '../../utils/firebase/firebase.utils';
import { setSchools } from '../../app/slices/schools';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function DeleteSchoolPopup({toggleDelete, name}: {toggleDelete: (e:any) => void, name: string}) {
    const schools = useSelector(selectSchools);
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleDelete = async (e:any, name: string) => {
        e.preventDefault();
        setIsLoading(true)
        const school = schools.find(s => s.school_name.input === name);
        if (school) {
            try {
                await deleteSchoolDoc(school.id.toString());
                const newSchools = schools.filter(s => s.id !== school.id);
                dispatch(setSchools(newSchools));
                toggleDelete(e);
            } catch (err:any) {
                alert('Error deleting school')
            }
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div onClick={toggleDelete} className='fixed bg-black opacity-20 top-0 left-0 right-0 bottom-0 z-20'></div>
            <div className='w-full max-w-[600px] rounded-lg p-4 bg-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-30'>
                <div className='w-full flex justify-between items-start gap-8'>
                    <p className='text-xl font-bold'>Delete <q>{name}</q>?</p>
                    <button onClick={toggleDelete}><AiOutlineClose className='text-black text-xl'/></button>
                </div>
                <p className='mt-4'>You will not be able to recover it.</p>
                <div className='mt-4 w-full flex justify-end items-center gap-4'>
                    <button onClick={toggleDelete} className='rounded px-3 py-2 bg-[#DCDCDC] font-medium'>Cancel</button>
                    <button onClick={(e:any) => handleDelete(e,name)} className='rounded w-[119px] h-[40px] bg-[#F06A6A] text-white font-medium flex justify-center items-center'>
                        {isLoading ? <CircularProgress color='inherit' style={{height: '20px', width: '20px'}}/> : 'Yes, delete it'}
                    </button>
                </div>
            </div>
        </div>
    )
}