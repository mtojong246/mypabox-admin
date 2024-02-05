import { useState, ChangeEvent } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { addUser } from "../../app/slices/users";
import { useDispatch } from "react-redux";

const defaultUser = {
    displayName: '',
    email: '',
    password: '',
    isSuperAdmin: false,
    permissions: {
        canEdit: true,
        canVerify: false,
        canMakeLive: false,
        canAddOrDelete: false,
    },

}

export default function AddUser({toggleAdd}: {toggleAdd: (e:any) => void}) {
    const [ user, setUser ] = useState(defaultUser);
    const dispatch = useDispatch();

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
                    canEdit: e.target.checked ? true : user.permissions.canEdit,
                    canMakeLive: e.target.checked ? true : user.permissions.canMakeLive,
                    canAddOrDelete: e.target.checked ? true : user.permissions.canAddOrDelete,
                }
            })
        } else {
            setUser({
                ...user, 
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
                        canEdit: user.permissions.canEdit,
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

                            <div className='flex justify-start items-center gap-3 px-3 py-2 border-b border-[#b4b4b4]'>
                                <input onChange={handleCheck} name='canEdit' checked={user.permissions.canEdit ? true : false} type="checkbox" />
                                <span>Can Edit</span>
                            </div>

                            <div className='flex justify-start items-center gap-3 px-3 py-2 border-b border-[#b4b4b4]'>
                                <input onChange={handleCheck} name='canVerify' checked={user.permissions.canVerify ? true : false} type="checkbox" />
                                <span>Can Verify</span>
                            </div>

                            <div className='flex justify-start items-center gap-3 px-3 py-2 border-b border-[#b4b4b4]'>
                                <input onChange={handleCheck} name='canMakeLive' checked={user.permissions.canMakeLive ? true : false} type="checkbox" />
                                <span>Can Make Schools Live</span>
                            </div>

                            <div className='flex justify-start items-center gap-3 px-3 py-2'>
                                <input onChange={handleCheck} name='canAddOrDelete' checked={user.permissions.canAddOrDelete ? true : false} type="checkbox" />
                                <span>Can Add / Delete Schools</span>
                            </div>


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