import { RxCaretRight } from "react-icons/rx";
import { RxCaretDown } from "react-icons/rx";
import { useState } from "react";

export default function Staff() {
    const [ openPermissions, setOpenPermissions ] = useState(false);
    const [ openActive, setOpenActive ] = useState(false);
    const [ openCompleted, setOpenCompleted ] = useState(false);
    const [ openArchived, setOpenArchived ] = useState(false);

    const togglePermissions = (e:any) => {
        e.preventDefault();
        setOpenPermissions(!openPermissions);
    }

    const toggleActive = (e:any) => {
        e.preventDefault();
        setOpenActive(!openActive);
    }

    const toggleCompleted = (e:any) => {
        e.preventDefault();
        setOpenCompleted(!openCompleted);
    }

    const toggleArchived = (e:any) => {
        e.preventDefault();
        setOpenArchived(!openArchived);
    }

    return (
        <>
            <div className="w-screen font-['Noto Sans']">
                <div className='w-full max-w-[1800px] mx-auto'>
                    <div className='w-full p-10 bg-white sticky top-0 z-10'>
                        <p className='text-[48px] font-medium'>Staff</p>
                        <p className='text-xl'>Total: </p>
                    </div>
                </div>
                <div className={`w-full max-w-[1800px] px-10 pb-10 flex flex-column justify-start items-center gap-10`}>
                    <div className='w-full border border-[#E5E5E5] rounded-md'>
                        <div className='w-full p-3 border-b border-[#E5E5E5] flex justify-between items-start'>
                            <div>
                                <p className='text-[22px] font-medium mb-1'>Name</p>
                                <p className='font-bold text-sm'>Email: <span className='font-normal'>name@email.com</span></p>
                            </div>
                            <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]'>+ Add Task</button>
                        </div>
                        <div className='w-full h-[45px] flex justify-between items-center border-b border-[#E5E5E5] relative' onClick={togglePermissions}>
                            <div className='flex justify-start items-center absolute top-0 bottom-0 left-[12px]' onClick={togglePermissions}>
                                {openPermissions ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm'>{openPermissions ? 'Hide' : 'View'} Permissions</p>
                            </div>
                        </div>
                        <div className='w-full h-[45px] flex justify-between items-center border-b border-[#E5E5E5] relative' onClick={toggleActive}>
                            <div className='flex justify-start items-center absolute top-0 bottom-0 left-[12px]' onClick={toggleActive}>
                                {openActive ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openActive ? 'Hide' : 'View'} Active Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                        <div className='w-full h-[45px] flex justify-between items-center border-b border-[#E5E5E5] relative' onClick={toggleCompleted}>
                            <div className='flex justify-start items-center absolute top-0 bottom-0 left-[12px]' onClick={toggleCompleted}>
                                {openCompleted ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openCompleted ? 'Hide' : 'View'} Completed Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                        <div className='w-full h-[45px] flex justify-between items-center border-b border-[#E5E5E5] relative' onClick={toggleArchived}>
                            <div className='flex justify-start items-center absolute top-0 bottom-0 left-[12px]' onClick={toggleArchived}>
                                {openArchived ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openArchived ? 'Hide' : 'View'} Archived Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}