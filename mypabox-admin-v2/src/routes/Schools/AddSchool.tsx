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
import { AppState } from "../../app/root-reducer";
import { addSchoolState } from "../../types/addSchool.types";
import DegreeInfo from "./AddSchool/DegreeInfo";
import AdditionalNotes from "./AddSchool/AdditionalNotes";
import Tuition from "./AddSchool/Tuition";
import GPA from "./AddSchool/GPA";
import Prerequisites from "./AddSchool/Prerequisites";
import HealthcareExperience from "./AddSchool/HealthcareExperience";
import Shadowing from "./AddSchool/Shadowing";
import GRE from "./AddSchool/GRE";
import LettersOfRecommendation from "./AddSchool/LettersOfRecommendation";
import Certifications from "./AddSchool/Certifications";

export default function AddSchool() {
  const school = useSelector((state: AppState) => state.addSchool)
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
        } else if (e.target.type === 'textarea') {
          setNewSchool({
            ...newSchool,
            [name]: e.target.value
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
    }

  return (
    <>
      <div className="absolute left-32 font-['Noto Sans']">
      <div className="h-16 w-[105em] mt-28">
        <p className='text-4xl mt-4 font-medium'>Add School</p>
        <button onClick={handleSave} value='done' className='absolute ml-[94em] border-2 border-solid border-[#4573D2] rounded-xl w-20 h-12 -mt-9'>
          Done
        </button>
      </div>

      <div className='h-8 mt-6 text-md border-b-2 flex border-black'>
        <Link to={{ pathname: '/schools/add-school', hash: '#general-info' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          General Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#degree-info' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Degree Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#tuition' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Tuition
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GPA' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          GPA</Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#prerequisites' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Prerequisites
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#healthcare-experience' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Healthcare Experience
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#shadowing' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Shadowing
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GRE' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          GRE
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#letters-of-recommendation' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Letters of Recommendation
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#certifications' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Certifications
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#additional-notes' }} className='ml-14 focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          Additional Notes
        </Link>
      </div>

      {
        location.hash === "#general-info" ? <GeneralInfo newSchool={newSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#degree-info" ? <DegreeInfo newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#GPA" ? <GPA newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#prerequisites" ? <Prerequisites newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#healthcare-experience" ? <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#shadowing" ? <Shadowing newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#healthcare-experience" ? <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#letters-of-recommendation" ? <LettersOfRecommendation newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#certifications" ? <Certifications newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} /> 
        :
        location.hash === "#additional-notes" ? <AdditionalNotes newSchool={newSchool} setNewSchool={setNewSchool} 
        handleInputChange={handleInputChange} openNotePopup={openNotePopup} />
        : ''
      }

    </div>
    {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}

  </>
  )
}