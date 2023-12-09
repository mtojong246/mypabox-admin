import { FaRegStar } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretDown } from "react-icons/rx";
import { UserObject } from "../../types/users.types";
import { useState, SetStateAction, Dispatch, MouseEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editUsers } from "../../app/slices/users";
import { updateUsersDoc } from "../../utils/firebase/firebase.utils";


export default function Individual({user, toggleOpenTask, setAssignee}: {user: UserObject, toggleOpenTask: (e:any) => void, setAssignee: SetStateAction<Dispatch<any>>}) {
    const [ openPermissions, setOpenPermissions ] = useState(false);
    const [ openActive, setOpenActive ] = useState(false);
    const [ openCompleted, setOpenCompleted ] = useState(false);
    const [ openArchived, setOpenArchived ] = useState(false);
    const dispatch = useDispatch();


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

    const deleteTask = async (e: MouseEvent<HTMLButtonElement>, id: string, index: number) => {
        e.preventDefault();
        const updatedUser: UserObject = {
            ...user,
            activeTasks: user.activeTasks.filter((t,i) => i !== index)
        }
        try {
            await updateUsersDoc(updatedUser, id);
            dispatch(editUsers(updatedUser))
        } catch (error:any) {
            alert('Error deleting task')
        }
    }




    return (
        <div className='w-full border border-[#E5E5E5] rounded-md'>
            <div className='w-full p-3 border-b border-[#E5E5E5] flex justify-between items-start'>
                <div>
                    <div className='flex justify-start items-center gap-1 mb-1'>
                        <p className='text-[22px] font-medium'>{user.displayName}</p>
                        {user.isSuperAdmin && <FaRegStar className='h-5 w-5 text-[#FF8F0B]' />}
                    </div>
                    <p className='font-bold text-sm'>Email: <span className='font-normal'>{user.email}</span></p>
                </div>
                {!user.isSuperAdmin && <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]' onClick={(e:any) => {toggleOpenTask(e); setAssignee({id: user.id, name: user.displayName} as any)}}>+ Add Task</button>}
            </div>
            {!user.isSuperAdmin && (
            <>
                <div className={`w-full ${!user.isSuperAdmin && 'border-b'} border-[#E5E5E5] relative`}>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={togglePermissions}></div>
                    <div className='flex justify-start items-center p-3'>
                        {openPermissions ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm'>{openPermissions ? 'Hide' : 'View'} Permissions</p>
                    </div>
                    {openPermissions && (
                    <div className='border-2 border-[#A4A4A4] mx-3 mb-3 rounded relative z-10'>
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
                        <p className='text-sm text-[#B4B4B4]'>({user.activeTasks.length})</p>
                    </div>
                    {openActive && (
                    <div className='flex flex-col justify-start items-center gap-6 mx-3 mb-3 mt-1 relative z-10'>
                        {user.activeTasks.length !== 0 && user.activeTasks.map((task,i) => (
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <p className='ml-1 font-semibold'>{task.state}</p>
                                <div className='flex justify-center items-center gap-2'>
                                    <button className='border-2 border-[#4573D2] text-sm text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]'>Edit Task</button>
                                    <button className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Mark as complete</button>
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => deleteTask(e, user.id, i)}><FaRegTrashAlt className='h-8 w-8 text-[#F06A6A] hover:text-white hover:bg-[#F06A6A] border-2 border-[#F06A6A] rounded px-1 py-1'/></button>
                                </div>
                            </div>
                            {task.schools.length !== 0 && (
                            <div className={`p-3 ${task.description ? 'border-b' : 'border-0'} border-[#A4A4A4]`}>
                                <div className='w-full border border-black rounded'>
                                    {task.schools.map((school,i) => (
                                    <div className={`p-2 flex justify-between items-center ${i !== task.schools.length-1 ? 'border-b' : 'border-0'} border-black`}>
                                        <p className='ml-1 text-sm font-semibold'>{school}</p>
                                    </div> 
                                    ))}
                                </div>
                            </div>
                            )}
                            {task.description && (
                            <div className='p-3'>
                                <p className='text-sm'>{task.description}</p>
                            </div>
                            )}
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                <div className='w-full border-b border-[#E5E5E5] relative'>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleCompleted}></div>
                    <div className='flex justify-start items-center p-3'>
                        {openCompleted ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm mr-2'>{openCompleted ? 'Hide' : 'View'} Completed Tasks</p>
                        <p className='text-sm text-[#B4B4B4]'>(0)</p>
                    </div>
                    {openCompleted && (
                    <div className='flex flex-col justify-start items-center gap-3 mx-3 mb-3 relative z-10'>
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <p className='ml-1 text-sm font-semibold'>Georgia</p>
                                <div className='flex justify-center items-center gap-2'>
                                    <button className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Make active</button>
                                    <button className='border-2 border-[#FF8F0B] text-sm text-[#FF8F0B] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#FF8F0B]'>Move to archive</button>
                                </div>
                            </div>
                            <div className='p-3 border-b border-[#A4A4A4]'>
                                <div className='w-full border border-black rounded'>
                                    <div className='p-2 flex justify-between items-center'>
                                        <p className='ml-1 text-sm font-semibold'>Emory University</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='w-full border-b border-[#E5E5E5] relative'>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleArchived}></div>
                    <div className='flex justify-start items-center p-3'>
                        {openArchived ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm mr-2'>{openArchived ? 'Hide' : 'View'} Archived Tasks</p>
                        <p className='text-sm text-[#B4B4B4]'>(0)</p>
                    </div>
                    {openArchived && (
                    <div className='flex flex-col justify-start items-center gap-3 mx-3 mb-3 relative z-10'>
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <div className='flex justify-start items-center gap-2'>
                                    <p className='ml-1 text-sm font-semibold'>Georgia</p>
                                    <p className='text-sm text-[#B4B4B4]'>11-24-2023</p>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <button className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Make active</button>
                                </div>
                            </div>
                            <div className='p-3 border-b border-[#A4A4A4]'>
                                <div className='w-full border border-black rounded'>
                                    <div className='p-2 flex justify-between items-center'>
                                        <p className='ml-1 text-sm font-semibold'>Emory University</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </>
            )}
        </div>
    )
}