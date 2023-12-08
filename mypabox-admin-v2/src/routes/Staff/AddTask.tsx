import Select from 'react-select';
import states from '../../data/states.json';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import { UserObject } from '../../types/users.types';

export default function AddTask({toggleOpenTask, assignee, users}: {toggleOpenTask: (e:any) => void, assignee: any, users: UserObject[]}) {
    const schools = useSelector(selectSchools);
    const [ selectedState, setSelectedState ] = useState('');
    const [ stateSchools, setStateSchools ] = useState<string[]>([]);
    const [ usernames, setUsernames ] = useState<{
        value: string,
        label: string,
    }[]>([]);
    const [ currentAssignee, setCurrentAssignee ] = useState(assignee.name);


    useEffect(() => {
        const selectedSchools= schools.filter(school => school.school_state.input === selectedState);
        let names: string[] = [];
        selectedSchools.forEach(school => names.push(school.school_name.input))
        setStateSchools(names)
    }, [selectedState]);

    useEffect(() => {
        let names: {value: string, label: string}[] = [];
        users.forEach(user => {
            if (!user.isSuperAdmin) {
                names.push({value: user.name, label: user.name})
            } else {
                return;
            }
        }) 
        setUsernames(names)
    }, [users])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] p-10 flex justify-center items-center'>
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]' onClick={toggleOpenTask}></div>
            <div className='w-full max-w-[900px] bg-white rounded p-4 relative z-[100]'>
                <p className='text-xl font-semibold mb-6'>Add New Task</p>
                <div className='mb-6'>
                    <p className='font-medium mb-1'>Assignee:</p>
                    <Select className="focus:outline-none rounded" options={usernames} value={{value: currentAssignee, label: currentAssignee}} onChange={(e:any) => setCurrentAssignee(e.value)}/>
                </div>
                <div className='mb-6'>
                    <p className='font-medium mb-1'>State to verify:</p>
                    <Select className="focus:outline-none rounded" options={states} onChange={(e:any) => setSelectedState(e.value)}/>
                    {stateSchools.length !== 0 && (
                    <div className='mt-6'>
                        <p className='font-medium mb-1'>Select schools:</p>
                        <div className='w-full border border-[#B4B4B4] rounded'>
                            {stateSchools.map((school,i) => (
                            <div className={`w-full p-3 ${i !== stateSchools.length-1 ? 'border-b' : 'border-0'} border-[#B4B4B4] flex justify-start items-center gap-3`}>
                                <input type='checkbox' />
                                <p>{school}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
                <div className='mb-3'>
                    <p className='font-medium mb-1'>Description:</p>
                    <textarea placeholder='Add optional description' className='w-full focus:outline-none border border-[#B4B4B4] p-3 rounded min-h-[120px]' />
                </div>
                <div className='w-full flex justify-end items-center gap-3'>
                    <button onClick={toggleOpenTask} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                    <button className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>Add task</button>
                </div>
            </div>
        </div>
    )
}