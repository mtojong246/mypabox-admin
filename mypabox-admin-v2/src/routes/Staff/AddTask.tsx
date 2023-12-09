import Select from 'react-select';
import states from '../../data/states.json';
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import { Task, UserObject } from '../../types/users.types';
import { updateUsersDoc } from '../../utils/firebase/firebase.utils';
import { editUsers } from '../../app/slices/users';
import { CircularProgress } from "@mui/material";
import { School } from '../../types/schools.types';

export default function AddTask({toggleOpenTask, assignee, users, editedTask, editedIndex}: {toggleOpenTask: (e:any) => void, assignee: any, users: UserObject[], editedTask: Task | null, editedIndex: number}) {
    const schools = useSelector(selectSchools);
    const dispatch = useDispatch();
    const [ selectedState, setSelectedState ] = useState('');
    const [ stateSchools, setStateSchools ] = useState<{name: string, isSelected: boolean}[]>([]);
    const [ description, setDescription ] = useState('');
    const [ usernames, setUsernames ] = useState<{
        value: string,
        label: string,
    }[]>([]);
    const [ currentAssignee, setCurrentAssignee ] = useState(assignee.name);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (editedTask) {
            setSelectedState(editedTask.state);
            if (editedTask.description) {
                setDescription(editedTask.description)
            } else {
                setDescription('')
            }
        } else {
            setSelectedState('');
            setDescription('')
        }
    }, [editedTask])


    useEffect(() => {
        const selectedSchools: School[] = schools.filter(school => school.school_state.input === selectedState);
        let names: {name: string, isSelected: boolean}[] = [];
        if (editedTask && editedTask.state === selectedState) {
            selectedSchools.forEach(school => names.push({
                name: school.school_name.input,
                isSelected: editedTask.schools.includes(school.school_name.input) ? true : false,
            }))
        } else {
            selectedSchools.forEach(school => names.push({
                name: school.school_name.input,
                isSelected: true,
            }))
        }
        
        setStateSchools(names)
    }, [selectedState]);

    useEffect(() => {
        let names: {value: string, label: string}[] = [];
        users.forEach(user => {
            if (!user.isSuperAdmin) {
                names.push({value: user.displayName, label: user.displayName})
            } else {
                return;
            }
        }) 
        setUsernames(names)
    }, [users]);


    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const editedFields = stateSchools.map(school => {
            if (school.name === e.target.name) {
                return {...school, isSelected: e.target.checked}
            } else {
                return {...school}
            }
        })
        setStateSchools(editedFields)
    };

    const handleSave = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        let selectedSchools: string[] = [];
        stateSchools.forEach(school => {
            if (school.isSelected) {
                selectedSchools.push(school.name)
            }
        }); 
        const newTask = {
            state: selectedState,
            schools: selectedSchools,
            description: description ? description : null,
        }
        const currentUser = users.find(user => user.id === assignee.id);
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                activeTasks: editedTask ? currentUser.activeTasks.map((t,i) => {
                    if (i === editedIndex) {
                        return {...newTask}
                    } else {
                        return {...t}
                    }
                }) : currentUser.activeTasks.concat(newTask),
            }
            try {
                await updateUsersDoc(updatedUser, updatedUser.id);
                dispatch(editUsers(updatedUser))
                toggleOpenTask(e);

            } catch (error:any) {
                alert('Error adding task')
            }
        }
        setIsLoading(false);
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] p-10 flex justify-center items-center'>
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]' onClick={toggleOpenTask}></div>
            <div className='w-full max-w-[900px] bg-white rounded p-4 relative z-[100]'>
                <p className='text-xl font-semibold mb-6'>{editedTask ? 'Edit' : 'Add New'} Task</p>
                <div className='mb-6'>
                    <p className='font-medium mb-1'>Assignee:</p>
                    <Select className="focus:outline-none rounded" options={usernames} value={{value: currentAssignee, label: currentAssignee}} onChange={(e:any) => setCurrentAssignee(e.value)}/>
                </div>
                <div className='mb-6'>
                    <p className='font-medium mb-1'>State to verify:</p>
                    <Select className="focus:outline-none rounded" options={states} onChange={(e:any) => setSelectedState(e.value)} value={{value: selectedState, label: selectedState}}/>
                    {stateSchools.length !== 0 && (
                    <div className='mt-6'>
                        <p className='font-medium mb-1'>Select schools:</p>
                        <div className='w-full border border-[#B4B4B4] rounded'>
                            {stateSchools.map((school,i) => (
                            <div className={`w-full p-3 ${i !== stateSchools.length-1 ? 'border-b' : 'border-0'} border-[#B4B4B4] flex justify-start items-center gap-3`}>
                                <input type='checkbox' checked={school.isSelected} name={school.name} onChange={handleCheck}/>
                                <p>{school.name}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
                <div className='mb-3'>
                    <p className='font-medium mb-1'>Description:</p>
                    <textarea placeholder='Add optional description' className='w-full focus:outline-none border border-[#B4B4B4] p-3 rounded min-h-[120px]' value={description} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>
                </div>
                <div className='w-full flex justify-end items-center gap-3'>
                    <button onClick={toggleOpenTask} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                    <button onClick={handleSave} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium w-[93px] h-[44px] rounded hover:text-white hover:bg-[#3558A0] flex justify-center items-center'>
                        {isLoading ? <CircularProgress color='inherit' style={{width: '30px', height: '30px'}} /> : editedTask ? 'Edit Task' : 'Add Task'}
                    </button>
                </div>
            </div>
        </div>
    )
}