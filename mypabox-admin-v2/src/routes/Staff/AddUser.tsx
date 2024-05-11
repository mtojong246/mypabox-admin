import { useState, ChangeEvent, useEffect } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { addUser } from "../../app/slices/users";
import { useDispatch } from "react-redux";
import { defaultUserWithPassword, userPermissions } from "../../data/defaultValues";

export default function AddUser({toggleAdd}: {toggleAdd: (e:any) => void}) {
    const [ user, setUser ] = useState(defaultUserWithPassword);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user.permissions.canEditWithVerificationNeeded) {
    //         setUser({...user, permissions: {...user.permissions, canEditWithoutVerificationNeeded: false}})
    //     } else if (user.permissions.canEditWithoutVerificationNeeded) {
    //         setUser({...user, permissions: {...user.permissions, canEditWithVerificationNeeded: false}})
    //     }
    // }, [user]);

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'isSuperAdmin') {
            setUser({
                ...user,
                isSuperAdmin: e.target.checked,
                permissions: {
                    canVerify: e.target.checked ? true : user.permissions.canVerify,
                    canEditWithoutVerificationNeeded: e.target.checked ? true : user.permissions.canEditWithoutVerificationNeeded,
                    canEditWithVerificationNeeded: e.target.checked ? false : user.permissions.canEditWithVerificationNeeded,
                    canMakeLive: e.target.checked ? true : user.permissions.canMakeLive,
                    canAddOrDelete: e.target.checked ? true : user.permissions.canAddOrDelete,
                }
            })
        } else if (e.target.name === 'canEditWithVerificationNeeded') {
            setUser({
                ...user,
                isSuperAdmin: user.isSuperAdmin && e.target.checked ? false : user.isSuperAdmin,
                permissions: {
                    ...user.permissions,
                    [e.target.name]: e.target.checked,
                    canVerify: e.target.checked ? false : user.permissions.canVerify,
                    canEditWithoutVerificationNeeded: e.target.checked ? false : user.permissions.canEditWithoutVerificationNeeded,
                }
            })
        } else if (e.target.name === 'canEditWithoutVerificationNeeded')  {
            setUser({
                ...user,
                isSuperAdmin: user.isSuperAdmin && !e.target.checked ? false : user.isSuperAdmin,
                permissions: {
                    ...user.permissions,
                    [e.target.name]: e.target.checked,
                    canVerify: e.target.checked,
                    canEditWithVerificationNeeded: e.target.checked ? false : user.permissions.canEditWithVerificationNeeded,
                }
            })
        } else if (e.target.name === 'canVerify') {
            setUser({
                ...user,
                isSuperAdmin: user.isSuperAdmin && !e.target.checked ? false : user.isSuperAdmin,
                permissions: {
                    ...user.permissions,
                    [e.target.name]: e.target.checked,
                    canEditWithoutVerificationNeeded: e.target.checked,
                    canEditWithVerificationNeeded: e.target.checked ? false : user.permissions.canEditWithVerificationNeeded,
                }
            })
        } else {
            setUser({
                ...user, 
                isSuperAdmin: user.isSuperAdmin && !e.target.checked ? false : user.isSuperAdmin,
                permissions: {
                    ...user.permissions,
                    [e.target.name]: e.target.checked,
                }
            })
        }
    };

    const handleSave = async () => {
        try {
            const userAuth = await createAuthUserWithEmailAndPassword(user.email, user.password);
            if (userAuth) {
                await createUserDocumentFromAuth(userAuth.user, {
                    displayName: user.displayName,
                    email: user.email,
                    isSuperAdmin: user.isSuperAdmin,
                    permissions: {
                        canEditWithoutVerificationNeeded: user.permissions.canEditWithoutVerificationNeeded,
                        canEditWithVerificationNeeded: user.permissions.canEditWithVerificationNeeded,
                        canVerify: user.permissions.canVerify,
                        canMakeLive: user.permissions.canMakeLive,
                        canAddOrDelete: user.permissions.canAddOrDelete,
                    },
                })
                dispatch(addUser({
                    id: userAuth.user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    isSuperAdmin: user.isSuperAdmin,
                    permissions: user.permissions,
                    activeTasks: [],
                    completedTasks: [],
                    archivedTasks: [],
                }))
            }
        } catch (err:any) {
            console.log(err)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 p-10 z-50 flex justify-center items-center'>
            <div onClick={toggleAdd} className='fixed top-0 bottom-0 right-0 left-0 bg-black/[.54]'></div>
            <div className='bg-white rounded relative z-[100] max-w-[600px] max-h-[600px] w-full h-full'>
                <div className='w-full h-full max-h-[700px] overflow-auto p-4'>
                    <p className="text-[24px] font-medium mb-3">Add Member</p>

                    <div className='my-6'>
                        <label>Display Name:</label>
                        <input onChange={handleInput} name='displayName' value={user.displayName} className="w-full p-3 border border-[#b4b4b4] rounded focus:outline-none" />
                    </div>

                    <div className='my-6'>
                        <label>Email</label>
                        <input onChange={handleInput} name='email' value={user.email} type='email' className="w-full p-3 border border-[#b4b4b4] rounded focus:outline-none" />
                    </div>

                    <div className='my-6'>
                        <label>Password</label>
                        <input onChange={handleInput} name='password' value={user.password} type='password' className="w-full p-3 border border-[#b4b4b4] rounded focus:outline-none" />
                    </div>

                    <div className='my-6'>
                        <label>Permissions:</label>
                        <div className='border border-[#b4b4b4] rounded'>
                            <div className='flex justify-start items-center gap-3 px-3 py-2 border-b border-[#b4b4b4]'>
                                <input onChange={handleCheck} name='isSuperAdmin' checked={user.isSuperAdmin ? true : false} type="checkbox" />
                                <span>Super Admin</span>
                            </div>

                            {userPermissions.map(permission => {
                                const value = permission.value as keyof object;
                                const bool = user.permissions[value] as boolean;

                                return (
                                    <div className='flex justify-start items-center gap-3 px-3 py-2 border-b border-[#b4b4b4]'>
                                        <input onChange={handleCheck} name={value} checked={bool} type="checkbox" />
                                        <span>{permission.label}</span>
                                    </div>
                                )
                            })}

                        </div>
                        
                    </div>


                    <div className='w-full flex justify-end items-center gap-3 mt-6'>
                        <button onClick={toggleAdd} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e:any) => {handleSave(); toggleAdd(e)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}