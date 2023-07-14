import { defaultSchool } from "../../data/defaultValues";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectSchools } from "../../app/selectors/schools.selectors";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { addDocToSchoolCollection } from "../../utils/firebase/firebase.utils";
import { addSchool } from "../../app/slices/schools";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AddNote from "./components/AddNote";
import { School } from "../../types/schools.types";
import { StringInput, BooleanInput, NumberInput } from "../../types/schools.types";
import GeneralInfo from "./AddSchool/GeneralInfo";

export default function AddSchool() {
  const schools = useSelector(selectSchools);
  const [ newSchool, setNewSchool ] = useState(defaultSchool);
  const [ currentInput, setCurrentInput ] = useState('');
  const [ openNote, setOpenNote ] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation()

  // Toggles "AddNote" component
  const toggleNote = () => setOpenNote(!openNote);

  useEffect(() => {
        // Autoincrements id when adding a new school to db 
    const arrayToSort = [...schools];
    const sortedSchools = arrayToSort.sort((a,b) => a.id - b.id);
    const id = (sortedSchools[sortedSchools.length - 1]).id + 1; 
    setNewSchool({
        ...newSchool,
        id,
    })
   }, [schools])

    // Adds input values to 'newSchool' object
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Input changes based on what user types 
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInput | BooleanInput | NumberInput;
        if (e.target.type === 'text') {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field, 
                    input: e.target.value,
                }
            })
        // Input changes to opposite of its previous value 
        } else if (e.target.type === 'checkbox') {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: (e.target.checked)
                }
            })
        }        

    }

    // Sends newSchool data to db 
    const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            // Sends API request with new school data to firestore 
            await addDocToSchoolCollection(newSchool);
        } catch (error:any) {
            // throws error and navigates to main page if user is not authenticated when making request
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
            } else {
                alert('Error adding school');
                return;
            }
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

    // Opens note popup and sets value of "Add note" button to "currentInput", 
    // which will be used in the "addNote" function to find the corresponding data point 
    const openNotePopup = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        toggleNote();
        setCurrentInput((e.currentTarget as HTMLButtonElement).value);
    }

    // Concats new note to corresponding data point 
    const addNote = (currentInput: string, type: string, note: string) => {
   
        const name = currentInput as keyof School;
        const field = newSchool[name] as StringInput | BooleanInput | NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: field?.notes?.concat({type, note})
            }
        })
        console.log(newSchool)
    }

    // eslint-disable-next-line no-lone-blocks
    {/*
              <div className="absolute left-[200px] top-[200px] w-[500px] bg-slate-100">
        <input type='text' name='school_name' value={newSchool.school_name.input} placeholder="name" onChange={handleInputChange} />
        <button value='school_name' onClick={openNotePopup}>Add note</button>
        <input type='text' name='school_city' value={newSchool.school_city.input} placeholder='city' onChange={handleInputChange} />
        <input type='text' name='school_state' value={newSchool.school_state.input} placeholder='state' onChange={handleInputChange} />
        <input type='checkbox' name='school_rolling_admissions' onChange={handleInputChange} />
        <button value='done' onClick={handleSave}>Done</button>
        </div>
        {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}
    */}

  return (
    <>
      <div className="absolute left-32 font-['Noto Sans']">
      <div className="h-16 w-[105em] mt-28">
        <p className='text-4xl mt-4 font-medium'>Add School</p>
        <button className='absolute ml-[94em] border-2 border-solid border-[#4573D2] rounded-xl w-20 h-12 -mt-9'>
          Done
        </button>
      </div>

      <div className='h-8 mt-6 text-md border-b-2 flex border-black'>
        <Link to={{ pathname: '/schools/add-school', hash: '#general-info' }} className='focus:text-orange-500'>
          General Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#degree-info' }} className='ml-14 focus:text-orange-500'>
          Degree Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#tuition' }} className='ml-14 focus:text-orange-500'>
          Tuition
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GPA' }} className='ml-14 focus:text-orange-500'>
          GPA</Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#prerequisites' }} className='ml-14 focus:text-orange-500'>
          Prerequisites
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#healthcare-experience' }} className='ml-14 focus:text-orange-500'>
          Healthcare Experience
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#shadowing' }} className='ml-14 focus:text-orange-500'>
          Shadowing
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GRE' }} className='ml-14 focus:text-orange-500'>
          GRE
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#letters-of-recommendation' }} className='ml-14 focus:text-orange-500'>
          Letters of Recommendation
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#certifications' }} className='ml-14 focus:text-orange-500'>
          Certifications
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#additional-notes' }} className='ml-14 focus:text-orange-500'>
          Additional Notes
        </Link>
      </div>

      {
        location.hash === "#general-info" ? <GeneralInfo newSchool={newSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> : ''
      }

    </div>
    {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}

  </>
  )
}