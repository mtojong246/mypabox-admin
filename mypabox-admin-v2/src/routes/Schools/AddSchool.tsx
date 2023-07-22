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
    <div className="w-screen py-24 px-10 font-['Noto Sans']">
      <div className="w-full max-w-[1200px] pt-10 mx-auto">
      <div className="w-full flex justify-between items-center">
        <p className='text-4xl font-medium'>Add School</p>
        <button onClick={handleSave} value='done' className='border border-blue-500 rounded-lg py-3 px-4 text-blue-500 hover:text-white hover:bg-blue-500'>
          Done
        </button>
      </div>
      <div className='mt-16 text-md border-b-2 border-black flex justify-start items-end gap-14 w-full max-w-[1200px] overflow-x-scroll'>
        <Link to={{ pathname: '/schools/add-school', hash: '#general-info' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          General Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#degree-info' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Degree Info
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#tuition' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Tuition
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GPA' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px]'>
          GPA</Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#prerequisites' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Prerequisites
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#healthcare-experience' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Healthcare Experience
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#shadowing' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Shadowing
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#GRE' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          GRE
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#letters-of-recommendation' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Letters of Recommendation
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#certifications' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Certifications
        </Link>
        <Link to={{ pathname: '/schools/add-school', hash: '#additional-notes' }} className='focus:text-orange-500 decoration-orange-500 
        focus:underline underline-offset-[12px] whitespace-nowrap'>
          Additional Notes
        </Link>
      </div>

      {
        location.hash === "#general-info" ? <GeneralInfo newSchool={newSchool} handleInputChange={handleInputChange} 
        openNotePopup={openNotePopup} setNewSchool={setNewSchool}/> 
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
      <div className='w-full flex justify-between items-center'>
          <div className='w-[150px]'></div>
          <button className='mt-4 border border-red-400 text-red-400 py-3 px-4 rounded-lg hover:text-white hover:bg-red-400'>
            Save & Next
          </button>
          <button className='mt-4 border border-blue-500 text-blue-500 rounded-lg py-3 px-4 hover:text-white hover:bg-blue-500'>
            Save for later
          </button>
      </div>

    </div>
    {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}

  </div>
  )
}