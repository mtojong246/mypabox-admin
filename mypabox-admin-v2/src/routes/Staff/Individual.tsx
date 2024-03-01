import { FaRegStar } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretDown } from "react-icons/rx";
import { Task, UserObject } from "../../types/users.types";
import { useState, SetStateAction, Dispatch, MouseEvent, ChangeEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editUsers } from "../../app/slices/users";
import { updateUsersDoc } from "../../utils/firebase/firebase.utils";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";



export default function Individual({user, toggleOpenTask, setAssignee, setEditedTask, setEditedIndex, isAdmin, setToBeDeleted, toggleDelete}: {user: UserObject, toggleOpenTask: (e:any) => void, setAssignee: Dispatch<SetStateAction<any>>, setEditedTask: Dispatch<SetStateAction<Task | null>>, setEditedIndex: Dispatch<SetStateAction<number>>, isAdmin: boolean,
    setToBeDeleted: Dispatch<SetStateAction<string>>, toggleDelete: (e:any) => void,
}) {
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

    // Moves task from active to completed
    const markAsComplete = async (e:MouseEvent<HTMLButtonElement>, task: Task, index: number) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            activeTasks: user.activeTasks.filter((t,i) => i !== index),
            completedTasks: user.completedTasks.concat(task)
        };
        try {
            await updateUsersDoc(updatedUser, updatedUser.id);
            dispatch(editUsers(updatedUser));
        } catch (err: any) {
            alert('Error moving active task to completed tasks');
        }
    };

    // Moves completed or archived task back to active tasks
    const makeActive = async (e:MouseEvent<HTMLButtonElement>, task: Task, index: number, type: string) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            activeTasks: user.activeTasks.concat(task),
            completedTasks: type === 'completed' ? user.completedTasks.filter((t,i) => i !== index) : user.completedTasks,
            archivedTasks: type === 'archived' ? user.archivedTasks.filter((t,i) => i !== index) : user.archivedTasks,
        }

        try {
            await updateUsersDoc(updatedUser, updatedUser.id);
            dispatch(editUsers(updatedUser));
        } catch (err: any) {
            alert('Error making task active');
        }
    };

    const moveToArchive = async (e:MouseEvent<HTMLButtonElement>, task: Task, index: number) => {
        e.preventDefault();
        const date = new Date().toDateString();
        const updatedUser = {
            ...user,
            completedTasks: user.completedTasks.filter((t,i) => i !== index),
            archivedTasks: user.archivedTasks.concat({...task, timestamp: date})
        };
        try {
            await updateUsersDoc(updatedUser, updatedUser.id);
            dispatch(editUsers(updatedUser));
        } catch (err: any) {
            alert('Error moving to archive');
        }
    };

    const makeAllActive = async (e:MouseEvent<HTMLButtonElement>, tasks: Task[]) => {
        e.preventDefault();
        if (tasks.length === 0) return;
        const updatedTasks = tasks.map(task => ({state: task.state, schools: task.schools, description: task.description}));
        const updatedUser = {
            ...user,
            activeTasks: user.activeTasks.concat(updatedTasks),
            archivedTasks: []
        };
        try {
            await updateUsersDoc(updatedUser, updatedUser.id);
            dispatch(editUsers(updatedUser));
        } catch (err: any) {
            alert('Error making all tasks active');
        }
        
    }

    const handleCheck = async (e:ChangeEvent<HTMLInputElement>) => {
        const updatedUser = {
            ...user,
            permissions: {
                ...user.permissions,
                [e.target.name]: e.target.checked,
            }
        }
        try {
            await updateUsersDoc(updatedUser, updatedUser.id);
            dispatch(editUsers(updatedUser));
        } catch (err: any) {
            alert('Error editing permissions');
        }
    }






    return (
        <div className='w-full border border-[#E5E5E5] rounded-md'>
            <div className={`w-full p-3 ${user.isSuperAdmin ? 'border-0' : 'border-b'} border-[#E5E5E5] flex justify-between items-start`}>
                <div>
                    <div className='flex justify-start items-center gap-1 mb-1'>
                        <p className='text-[22px] font-medium'>{user.displayName}</p>
                        {user.isSuperAdmin && <FaRegStar className='h-5 w-5 text-[#FF8F0B]' />}
                    </div>
                    <p className='font-bold text-sm'>Email: <span className='font-normal'>{user.email}</span></p>
                </div>
                
                {isAdmin && (<div className='flex justify-end items-center gap-2'>
                    {!user.isSuperAdmin && <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]' onClick={(e:any) => {toggleOpenTask(e); setAssignee({id: user.id, name: user.displayName} as any); setEditedTask(null)}}>+ Add Task</button>}
                    <button onClick={(e:any) => {setToBeDeleted(user.id); toggleDelete(e)}}><FaRegTrashAlt className='h-[36px] w-8 text-[#F06A6A] hover:text-white hover:bg-[#F06A6A] border-2 border-[#F06A6A] rounded px-1 py-1'/></button>
                </div>)}
                {/* {!user.isSuperAdmin && isAdmin && <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]' onClick={(e:any) => {toggleOpenTask(e); setAssignee({id: user.id, name: user.displayName} as any); setEditedTask(null)}}>+ Add Task</button>} */}
            </div>
            {!user.isSuperAdmin && (
            <>
                <div className={`w-full ${!user.isSuperAdmin && 'border-b'} border-[#E5E5E5] relative`}>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={togglePermissions}></div>
                    <div className='flex justify-start items-center px-3 py-4'>
                        {openPermissions ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm'>{openPermissions ? 'Hide' : 'View'} Permissions</p>
                    </div>
                    {openPermissions && (
                    <div className='border-2 border-[#A4A4A4] mx-3 mb-3 rounded relative z-10'>
                        <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                            <label className="relative inline-flex items-center cursor-pointer">
                            {isAdmin ? (
                                <>
                                    <input type="checkbox" className="sr-only peer" onChange={handleCheck} name='canEdit' checked={user.permissions.canEdit ? true : false}/>
                                    <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                </>
                                ) : user.permissions.canEdit ? <IoIosCheckmarkCircleOutline className='w-5 h-5 text-[#4FC769]'/> : <IoIosCloseCircleOutline className='w-5 h-5 text-[#F06A6A]' />}
                                <span className="ml-3 text-sm text-black">Edit input fields</span>
                            </label>
                        </div>
                        <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                {isAdmin ? (
                                <>
                                    <input type="checkbox" className="sr-only peer" onChange={handleCheck} name='canVerify' checked={user.permissions.canVerify ? true : false}/>
                                    <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                </>
                                ) : user.permissions.canVerify ? <IoIosCheckmarkCircleOutline className='w-5 h-5 text-[#4FC769]'/> : <IoIosCloseCircleOutline className='w-5 h-5 text-[#F06A6A]' /> }
                                <span className="ml-3 text-sm text-black">Verify input fields</span>
                            </label>
                        </div>
                        <div className='p-3 border-b border-[#A4A4A4] flex justify-start items-center'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                {isAdmin ? (
                                <>
                                    <input type="checkbox" className="sr-only peer" onChange={handleCheck} name='canMakeLive' checked={user.permissions.canMakeLive ? true : false}/>
                                    <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                </>
                                ) : user.permissions.canMakeLive ? <IoIosCheckmarkCircleOutline className='w-5 h-5 text-[#4FC769]'/> : <IoIosCloseCircleOutline className='w-5 h-5 text-[#F06A6A]' /> }
                                <span className="ml-3 text-sm text-black">Make school data live</span>
                            </label>
                        </div>
                        <div className='p-3 flex justify-start items-center'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                {isAdmin ? (
                                <>
                                    <input type="checkbox" className="sr-only peer" onChange={handleCheck} name='canAddOrDelete' checked={user.permissions.canAddOrDelete ? true : false}/>
                                    <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                                </>
                                ) : user.permissions.canAddOrDelete ? <IoIosCheckmarkCircleOutline className='w-5 h-5 text-[#4FC769]'/> : <IoIosCloseCircleOutline className='w-5 h-5 text-[#F06A6A]' /> }
                                <span className="ml-3 text-sm text-black">Add / delete school data</span>
                            </label>
                        </div>
                    </div>
                )}
                </div>
                <div className='w-full border-b border-[#E5E5E5] relative'>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleActive}></div>
                    <div className='flex justify-start items-center px-3 py-4'>
                        {openActive ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm mr-2'>{openActive ? 'Hide' : 'View'} Active Tasks</p>
                        <p className='text-sm text-[#B4B4B4]'>({user.activeTasks.length})</p>
                    </div>
                    {openActive && (
                    <div className={`flex flex-col justify-start items-center gap-6 ${user.activeTasks.length !== 0 ? 'mx-3 mb-3' : 'mx-0 mb-0'} relative z-10`}>
                        {user.activeTasks.length !== 0 && user.activeTasks.map((task,i) => (
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <p className='ml-1 font-semibold'>{task.state}</p>
                                <div className='flex justify-center items-center gap-2'>
                                    {isAdmin && <button onClick={(e:any) => {toggleOpenTask(e); setAssignee({id: user.id, name: user.displayName} as any); setEditedTask(task); setEditedIndex(i)}} className='border-2 border-[#4573D2] text-sm text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]'>Edit Task</button>}
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => markAsComplete(e, task, i)} className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Mark as complete</button>
                                    {isAdmin && <button onClick={(e:MouseEvent<HTMLButtonElement>) => deleteTask(e, user.id, i)}><FaRegTrashAlt className='h-8 w-8 text-[#F06A6A] hover:text-white hover:bg-[#F06A6A] border-2 border-[#F06A6A] rounded px-1 py-1'/></button>}
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
                    <div className='flex justify-start items-center px-3 py-4'>
                        {openCompleted ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                        <p className='text-sm mr-2'>{openCompleted ? 'Hide' : 'View'} Completed Tasks</p>
                        <p className='text-sm text-[#B4B4B4]'>({user.completedTasks.length})</p>
                    </div>
                    {openCompleted && (
                    <div className={`flex flex-col justify-start items-center gap-6 ${user.completedTasks.length !== 0 ? 'mx-3 mb-3' : 'mx-0 mb-0'} relative z-10`}>
                        {user.completedTasks.length !== 0 && user.completedTasks.map((task,i) => (
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <p className='ml-1 text-sm font-semibold'>{task.state}</p>
                                <div className='flex justify-center items-center gap-2'>
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => makeActive(e, task, i, 'completed')} className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Make active</button>
                                    {isAdmin && <button onClick={(e:MouseEvent<HTMLButtonElement>) => moveToArchive(e, task, i)} className='border-2 border-[#FF8F0B] text-sm text-[#FF8F0B] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#FF8F0B]'>Move to archive</button>}
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
                <div className='w-full relative'>
                    <div className='absolute top-0 bottom-0 right-0 left-0' onClick={toggleArchived}></div>
                    <div className='flex justify-between items-center py-[10px] px-3'>
                        <div className='flex justify-start items-center'>
                            {openArchived ? <RxCaretDown className='mr-3 w-5 h-5 text-[#B4B4B4]' /> : <RxCaretRight className='mr-3 w-5 h-5 text-[#B4B4B4]'/>}
                            <p className='text-sm mr-2'>{openArchived ? 'Hide' : 'View'} Archived Tasks</p>
                            <p className='text-sm text-[#B4B4B4]'>({user.archivedTasks.length})</p>
                        </div>
                        {isAdmin && <button onClick={(e:MouseEvent<HTMLButtonElement>) => makeAllActive(e, user.archivedTasks)} className='relative z-10 border-2 border-[#4573D2] text-sm text-[#4573D2] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4573D2]'>Make all active</button>}
                    </div>
                    {openArchived && (
                    <div className={`flex flex-col justify-start items-center gap-6 ${user.archivedTasks.length !== 0 ? 'mx-3 mb-3' : 'mx-0 mb-0'} relative z-10`}>
                        {user.archivedTasks.length !== 0 && user.archivedTasks.map((task,i) => (
                        <div className='w-full border-2 border-[#A4A4A4] rounded'>
                            <div className='p-2 border-b border-[#A4A4A4] flex justify-between items-center'>
                                <div className='flex justify-start items-center gap-2'>
                                    <p className='ml-1 text-sm font-semibold'>{task.state}</p>
                                    <p className='text-sm text-[#B4B4B4]'>{task.timestamp}</p>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    {isAdmin && <button onClick={(e:MouseEvent<HTMLButtonElement>) => makeActive(e, {state: task.state, schools: task.schools, description: task.description}, i, 'archived')} className='border-2 border-[#4FC769] text-sm text-[#4FC769] font-medium rounded px-3 py-1 hover:text-white hover:bg-[#4FC769]'>Make active</button>}
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
            </>
            )}
        </div>
    )
}