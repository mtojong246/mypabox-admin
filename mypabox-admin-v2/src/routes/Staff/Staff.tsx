import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import { getAllUsers } from "../../utils/firebase/firebase.utils";
import { UserObject } from "../../types/users.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsers } from "../../app/selectors/users.selectors";
import { setUsers } from "../../app/slices/users";
import Individual from "./Individual";

export default function Staff() {
    const users = useSelector(selectUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ openAddTask, setOpenAddTask ] = useState(false);
    const [ assignee, setAssignee ] = useState({
        id: '',
        name: '',
    });

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                let userData: UserObject[] = [];
                if (allUsers) {
                    allUsers.forEach(user => (
                        userData.push({
                            id: user.id,
                            displayName: user.data.displayName,
                            email: user.data.email,
                            isSuperAdmin: user.data.isSuperAdmin,
                            permissions: user.data.permissions,
                            activeTasks: user.data.activeTasks,
                            completedTasks: user.data.completedTasks,
                            archivedTasks: user.data.archivedTasks,
                        })
                    )) 
                    dispatch(setUsers(userData))
                }
 
            } catch (error: any) {
                if (error.message === 'permission-denied') {
                    alert("Access denied. Please log in using the appropriate credentials");
                    navigate('/');
                    return;
                  } else {
                    alert('Error loading user data')
                  }
            }
        }

        fetchUsers();

    }, [dispatch, navigate]);


    const toggleOpenTask = (e:any) => {
        e.preventDefault();
        setOpenAddTask(!openAddTask);
    };

    console.log(users[0])

    return (
        <>
        {users && (
            <>
            <div className="w-screen font-['Noto Sans']">
                <div className='w-full max-w-[1800px] mx-auto'>
                    <div className='w-full p-10 bg-white sticky top-0 z-10'>
                        <p className='text-[48px] font-medium'>Staff</p>
                        <p className='text-xl'>Total: {users.length}</p>
                    </div>
                </div>
                <div className={`w-full max-w-[1800px] px-10 pb-10 flex flex-col justify-start items-center gap-10`}>
                {users.map(user => (
                    <Individual user={user} toggleOpenTask={toggleOpenTask} setAssignee={setAssignee}/>
                ))}
                </div>
            </div>
            {openAddTask && <AddTask toggleOpenTask={toggleOpenTask} assignee={assignee} users={users}/>} 
            </>
        )}
        </>
    )
}