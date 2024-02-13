import { useState, useEffect, MouseEvent } from "react";
import AddTask from "./AddTask";
import { getAllUsers, deleteUserDoc } from "../../utils/firebase/firebase.utils";
import { UserObject, Task } from "../../types/users.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsers } from "../../app/selectors/users.selectors";
import { setUsers, removeUser } from "../../app/slices/users";
import Individual from "./Individual";
import { selectLogin } from "../../app/selectors/login.selector";
import AddUser from "./AddUser";
import DeletePopup from "./DeletePopup";


export default function Staff() {
    const login = useSelector(selectLogin);
    const users = useSelector(selectUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ openAddTask, setOpenAddTask ] = useState(false);
    const [ assignee, setAssignee ] = useState({
        id: '',
        name: '',
    });
    const [ editedTask, setEditedTask ] = useState<Task | null>(null);
    const [ editedIndex, setEditedIndex ] = useState(0);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ isAddUser, setIsAddUser ] = useState(false);

    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ toBeDeleted, setToBeDeleted ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    
    const toggleAdd = (e:any) => {
        e.preventDefault();
        setIsAddUser(!isAddUser);
    }

    const toggleDelete = (e:any) => {
        e.preventDefault();
        setDeleteModal(!deleteModal);
    }

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

    useEffect(() => {
        const loggedInUser = users.find(user => user.email === login);
        if (loggedInUser) {
            if (loggedInUser.isSuperAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }, [login]);



    const toggleOpenTask = (e:any) => {
        e.preventDefault();
        setOpenAddTask(!openAddTask);
    };

    const handleDelete = async (e:any, id: string) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await deleteUserDoc(id);
            dispatch(removeUser(id));
            toggleDelete(e);
            setIsLoading(false)
        } catch (error: any) {
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
            } else {
                alert(error);
                return;
            }
        }
        setIsLoading(false)
    }


    return (
        <>
        {users && (
            <>
            <div className="w-screen font-['Noto Sans']">
                <div className='w-full max-w-[1800px] mx-auto'>
                    <div className='w-full p-10 bg-white sticky top-0 z-10 flex justify-between items-start'>
                        <div>
                            <p className='text-[48px] font-medium'>Staff</p>
                            <p className='text-xl'>Total: {users.length}</p>
                        </div>
                        {isAdmin && <button className="py-2 px-3 border-2 border-[#F06A6A] text-[#F06A6A] font-medium rounded hover:text-white hover:bg-[#F06A6A]" onClick={toggleAdd}>+ Add Member</button>}
                    </div>
                </div>
                <div className={`w-full max-w-[1800px] px-10 pb-10 flex flex-col justify-start items-center gap-10`}>
                {users.map(user => (
                    <Individual user={user} toggleOpenTask={toggleOpenTask} setAssignee={setAssignee} setEditedTask={setEditedTask} setEditedIndex={setEditedIndex} isAdmin={isAdmin}
                    toggleDelete={toggleDelete} setToBeDeleted={setToBeDeleted}
                    />
                ))}
                </div>
            </div>
            {openAddTask && <AddTask toggleOpenTask={toggleOpenTask} assignee={assignee} users={users} editedTask={editedTask} editedIndex={editedIndex}/>} 
            {isAddUser && <AddUser toggleAdd={toggleAdd}/>}
            {deleteModal && <DeletePopup toggleModal={toggleDelete} toBeDeleted={toBeDeleted} handleDelete={handleDelete} isLoading={isLoading}/>}
            </>
        )}
        </>
    )
}