import { defaultSchool } from "../../data/defaultValues";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectSchools } from "../../app/selectors/schools.selectors";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { addDocToSchoolCollection } from "../../utils/firebase/firebase.utils";
import { addSchool } from "../../app/slices/schools";
import { useNavigate } from "react-router-dom";

export default function AddSchool() {
    const schools = useSelector(selectSchools);
    const [ newSchool, setNewSchool ] = useState(defaultSchool);
    const [ field, setField ] = useState({
        input: "",
        notes: [],
    })
    const [ newNote, setNewNote ] = useState({
        type: '',
        note: '',
    })
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        // Autoincrements id when adding a new school to db 
        const sortedSchools = schools.sort((a,b) => a.id - b.id);
        const id = (sortedSchools[sortedSchools.length - 1]).id + 1; 
        setNewSchool({
            ...newSchool,
            id,
        })
    }, [schools])

    // Adds input values to 'newSchool' object
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Input changes based on what user types 
        if (e.target.type === 'text') {
            setNewSchool({
                ...newSchool,
                [e.target.name]: {
                    ...field,
                    input: e.target.value,
                }
            })
        // Input changes to opposite of its previous value 
        } else if (e.target.type === 'checkbox') {
            setNewSchool({
                ...newSchool,
                [e.target.name]: {
                    ...field,
                    input: (e.target.checked)
                }
            })
        }
        
    }

    const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
        const response = await addDocToSchoolCollection(newSchool);

        // if error, returns response, otherwise returns void 
        if (response) {
            return alert(response.error);
        } 

        // Adds new school to current school list 
        dispatch(addSchool(newSchool));

        // If button = 'Done', take back to schools page. Otherwise save progress 
        // and switch UI to subsequent category
        if ((e.target as HTMLButtonElement).value === 'done') {
            navigate('/schools');
        } else {
            alert('Progress saved');
        }
        // Resets inputs
        setNewSchool(defaultSchool)

    }

    console.log(newSchool)


    return (
        <div className="absolute left-[200px] top-[200px] w-[500px] bg-slate-100">
        <input type='text' name='school_name' value={newSchool.school_name.input} placeholder="name" onChange={handleInputChange} />
        <input type='text' name='school_city' value={newSchool.school_city.input} placeholder='city' onChange={handleInputChange} />
        <input type='text' name='school_state' value={newSchool.school_state.input} placeholder='state' onChange={handleInputChange} />
        <input type='checkbox' name='school_rolling_admissions' onChange={handleInputChange} />
        <button value='done' onClick={handleSave}>Save</button>
        </div>
    )
}