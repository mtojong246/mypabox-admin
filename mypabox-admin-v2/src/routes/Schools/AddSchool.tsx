import { defaultSchool } from "../../data/defaultValues";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectSchools } from "../../app/selectors/schools.selectors";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { addDocToSchoolCollection, getDocsById } from "../../utils/firebase/firebase.utils";
import { addSchool } from "../../app/slices/schools";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AddNote from "./components/AddNote";
import { School } from "../../types/schools.types";
import { StringInput, BooleanInput, NumberInput } from "../../types/schools.types";
import Category from "./components/Category";
import EditNote from "./components/EditNote";
import { Note } from "../../types/schools.types";
import { categories } from "../../data/categories";
// import GeneralInfo from "./AddSchool/GeneralInfo";
// import DegreeInfo from "./AddSchool/DegreeInfo";
// import AdditionalNotes from "./AddSchool/AdditionalNotes";
// import Tuition from "./AddSchool/Tuition";
// import GPA from "./AddSchool/GPA";
// import Prerequisites from "./AddSchool/Prerequisites";
// import HealthcareExperience from "./AddSchool/HealthcareExperience";
// import Shadowing from "./AddSchool/Shadowing";
// import GRE from "./AddSchool/GRE";
// import LettersOfRecommendation from "./AddSchool/LettersOfRecommendation";
// import Certifications from "./AddSchool/Certifications";
// import AccreditationStatus from "./AddSchool/AccreditationStatus";
// import MissionStatement from "./AddSchool/MissionStatement";
// import PANCEPassRate from "./AddSchool/PANCEPassRate";


export default function AddSchool() {
  const schools = useSelector(selectSchools);
  const [ newSchool, setNewSchool ] = useState(defaultSchool);
  const [ currentInput, setCurrentInput ] = useState('');
  const [ note, setNote ] = useState<Note>({} as Note);
  const [ tab, setTab ] = useState('')
  const [ index, setIndex ] = useState(0);
  const [ openNote, setOpenNote ] = useState(false);
  const [ openEdit, setOpenEdit ] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation()

  // Toggles "AddNote" and "EditNote" components
  const toggleNote = () => setOpenNote(!openNote);
  const toggleEdit = () => setOpenEdit(!openEdit);

  console.log(tab)

  useEffect(() => {
    // Continuing editing school if already saved, else start off fresh 
    const storedSchool = localStorage.getItem('newSchool');
    if (storedSchool) {
      setNewSchool(JSON.parse(storedSchool))
    } else {
      // Autoincrements id when adding a new school to db 
      const arrayToSort = [...schools];
      const sortedSchools = arrayToSort.sort((a,b) => a.id - b.id);
      const id = (sortedSchools[sortedSchools.length - 1]).id + 1; 
      setNewSchool({
          ...newSchool,
          id,
      })
    }
    
   }, [schools])

   // Sets initial tab value to General Info
   useEffect(() => {
    setTab('#general-info')
   }, [])

    // Adds input values to 'newSchool' object
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Input changes based on what user types 
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInput | BooleanInput | NumberInput;
        if (e.target.type === 'text' || 'number') {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field, 
                    input: e.target.value,
                }
            })
        // Input changes to opposite of its previous value 
        } 
    }

    // Handles changes to checkboxes 
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as keyof School;
        const field = newSchool[name] as BooleanInput;
        setNewSchool({
          ...newSchool,
          [name]: {
              ...field,
              input: e.target.checked,
          }
      })
    }

    const handleQuillInputChange = (name: string, value: string) => {
      setNewSchool({
        ...newSchool,
        [name]: value
      })
    }

    // Sends newSchool data to db 
    const handleSave = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
      
        try {
            // Sends API request with new school data to firestore 
            await addDocToSchoolCollection(newSchool, id);
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

        // Adds new school to current school list if it doesn't already exist
        const existingSchool = schools.find(school => school.id === id)
        if (existingSchool) {
          dispatch(addSchool(newSchool));
        }

        // If button = 'Done', take back to schools page. Otherwise save progress 
        if ((e.target as HTMLButtonElement).value === 'done') {
            navigate('/schools');
            // Remove newSchool from local storage 
            localStorage.removeItem('newSchool');
            // Resets inputs
            setNewSchool(defaultSchool)
        } else {
            try {
              const updatedSchool = await getDocsById(id);
              if (updatedSchool) {
                // Saves current school data to local storage 
                localStorage.setItem('newSchool', JSON.stringify(updatedSchool[0]));
                setNewSchool(updatedSchool[0] as School)

                // Switches to next tab after save 
                const currentCategory = categories.find(cat => cat.hash === tab);
                if (currentCategory) {
                  const nextIndex = categories.indexOf(currentCategory) + 1;
                  setTab(categories[nextIndex].hash)
                }
                
                alert('Progress saved')
              }
            } catch (error: any) {
              alert('Error retrieving updated school');
            }   
        }
    }

    // Opens note popup and sets value of "Add note" button to "currentInput", 
    // which will be used in the "addNote" function to find the corresponding data point 
    const openNotePopup = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        toggleNote();
        setCurrentInput((e.currentTarget as HTMLButtonElement).value);
    }

    const openEditPopup = (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => {
        e.preventDefault();
        toggleEdit();
        setCurrentInput((e.currentTarget as HTMLButtonElement).value);
        setNote(note);
        setIndex(index);
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

    const editNote = (currentInput: string, type: string, note: string, index: number) => {
      const name = currentInput as keyof School;
      const field = newSchool[name] as StringInput | BooleanInput | NumberInput;
      setNewSchool({
        ...newSchool,
        [name]: {
          ...field,
          notes: field?.notes?.map(n => {
            if (field.notes?.indexOf(n) === index) {
              return { type, note }
            } else {
              return { ...n }
            }
          })
        }
      })
    }


    // Removes note from corresponding data field 
    const removeNote = (e: MouseEvent<HTMLButtonElement>, i: number) => {
      const name = (e.currentTarget as HTMLButtonElement).value as keyof School;
      const field = newSchool[name] as StringInput | BooleanInput | NumberInput;
      const updatedSchool = {
        ...newSchool,
        [name]: {
          ...field,
          notes: field.notes?.filter((note: any) => field.notes?.indexOf(note) !== i)
        }
      }
      setNewSchool(updatedSchool);
    }


  return (
    <div className="w-screen px-10 font-['Noto Sans']">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="w-full flex justify-between items-center pt-[120px] sticky bg-white z-10 top-0 pb-10 border-b border-[#DCDCDC]">
          <p className='text-4xl font-medium'>Add School</p>
          <div className='flex gap-5'>
            <button onClick={(e) => handleSave(e, newSchool.id)} value='save' className='border ml-[50em] border-red-400 text-red-400 py-3 px-4 
            rounded-lg hover:text-white hover:bg-red-400'>
                Save & Next
              </button>
              <button onClick={(e) => handleSave(e, newSchool.id)} value='done' className='border border-blue-500 text-blue-500 rounded-lg 
              py-3 px-4 hover:text-white hover:bg-blue-500'>
                Done
              </button>
          </div>
        </div>
        <div className='flex justify-start items-start gap-10'>
          <div className='text-md pt-5 sticky top-[220px]'>
            <div className='flex flex-col justify-start items-start gap-5'>
            {categories.map(category => (
              <Link to={{ pathname: '/schools/add-school', hash: `${category.hash}` }} onClick={() => setTab(category.hash)} className='focus:text-red-500 decoration-red-500 
              whitespace-nowrap'>
                {category.name}
              </Link>
            ))}
            </div>
          </div>

        <div className='border-l border-[#DCDCDC] pl-10 grow'>
          <Category tab={tab} newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange}
          handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} />
        {/* {
          location.hash === "#general-info" ? <GeneralInfo newSchool={newSchool} handleInputChange={handleInputChange} handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} 
          openNotePopup={openNotePopup} setNewSchool={setNewSchool} removeNote={removeNote} openEditPopup={openEditPopup}/> 
          :
          location.hash === "#degree-info" ? <DegreeInfo newSchool={newSchool} setNewSchool={setNewSchool} handleCheck={handleCheck} handleInputChange={handleInputChange} 
          openNotePopup={openNotePopup}ß removeNote={removeNote} openEditPopup={openEditPopup}/> 
          :
          location.hash === "#accreditation-status" ? <AccreditationStatus newSchool={newSchool} setNewSchool={setNewSchool} 
          handleQuillInputChange={handleQuillInputChange} handleInputChange={handleInputChange} openNotePopup={openNotePopup} removeNote={removeNote} openEditPopup={openEditPopup}/> 
          :
          location.hash === "#mission-statement" ? <MissionStatement newSchool={newSchool} setNewSchool={setNewSchool} 
          handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} removeNote={removeNote} openEditPopup={openEditPopup}/> 
          :
          location.hash === "#tuition" ? <Tuition newSchool={newSchool} setNewSchool={setNewSchool} handleQuillInputChange={handleQuillInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} handleInputChange={handleInputChange}/> 
          :
          location.hash === "#pance-pass-rate" ? <PANCEPassRate newSchool={newSchool} setNewSchool={setNewSchool} handleQuillInputChange={handleQuillInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} handleInputChange={handleInputChange}/> 
          :
          location.hash === "#GPA" ? <GPA newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#GRE" ? <GRE newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#prerequisites" ? <Prerequisites newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#healthcare-experience" ? <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool} 
          handleInputChange={handleInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#shadowing" ? <Shadowing newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} 
          openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#healthcare-experience" ? <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool} 
          handleInputChange={handleInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#letters-of-recommendation" ? <LettersOfRecommendation newSchool={newSchool} setNewSchool={setNewSchool} 
          handleInputChange={handleInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#certifications" ? <Certifications newSchool={newSchool} setNewSchool={setNewSchool} 
          handleInputChange={handleInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote}/> 
          :
          location.hash === "#additional-notes" ? <AdditionalNotes newSchool={newSchool} setNewSchool={setNewSchool} removeNote={removeNote}
          handleInputChange={handleInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup}/>
          : ''
        } */}
        </div>
      </div>

    </div>
    {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}
    {openEdit && <EditNote currentInput={currentInput} note={note} index={index} toggleEdit={toggleEdit} editNote={editNote}/>}

  </div>
  )
}