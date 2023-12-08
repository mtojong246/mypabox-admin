import { RxCaretRight } from "react-icons/rx";
import { RxCaretDown } from "react-icons/rx";
import { useState } from "react";
import AddTask from "./AddTask";

export default function Staff() {
    const [ openPermissions, setOpenPermissions ] = useState(false);
    const [ openActive, setOpenActive ] = useState(false);
    const [ openCompleted, setOpenCompleted ] = useState(false);
    const [ openArchived, setOpenArchived ] = useState(false);
    const [ openAddTask, setOpenAddTask ] = useState(false);

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
    };

    const toggleOpenTask = (e:any) => {
        e.preventDefault();
        setOpenAddTask(!openAddTask);
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
                            <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]' onClick={toggleOpenTask}>+ Add Task</button>
                        </div>
                        <div className='w-full border-b border-[#E5E5E5] relative'>
                            <div className='absolute top-0 bottom-0 right-0 left-0' onClick={togglePermissions}></div>
                            <div className='flex justify-start items-center p-3'>
                                {openPermissions ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm'>{openPermissions ? 'Hide' : 'View'} Permissions</p>
                            </div>
                            {openPermissions && (
                            <div className='border border-[#A4A4A4] mx-3 mb-3 rounded'>
                                <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                        <span className="ml-3 text-sm text-black">Edit input fields</span>
                                    </label>
                                </div>
                                <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                        <span className="ml-3 text-sm text-black">Verify input fields</span>
                                    </label>
                                </div>
                                <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                        <span className="ml-3 text-sm text-black">Make school data live</span>
                                    </label>
                                </div>
                                <div className='p-3 flex justify-start items-center'>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                        <span className="ml-3 text-sm text-black">Add / delete school data</span>
                                    </label>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className='w-full border-b border-[#E5E5E5] relative'>
                            <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleActive}></div>
                            <div className='flex justify-start items-center p-3'>
                                {openActive ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openActive ? 'Hide' : 'View'} Active Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                        <div className='w-full border-b border-[#E5E5E5] relative'>
                            <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleCompleted}></div>
                            <div className='flex justify-start items-center p-3'>
                                {openCompleted ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openCompleted ? 'Hide' : 'View'} Completed Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                        <div className='w-full border-b border-[#E5E5E5] relative'>
                            <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleArchived}></div>
                            <div className='flex justify-start items-center p-3'>
                                {openArchived ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                                <p className='text-sm mr-2'>{openArchived ? 'Hide' : 'View'} Archived Tasks</p>
                                <p className='text-sm text-[#B4B4B4]'>(0)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openAddTask && <AddTask toggleOpenTask={toggleOpenTask}/>} 
        </>
    )
}