import { defaultSchool } from "../../data/defaultValues";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectSchools } from "../../app/selectors/schools.selectors";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { addDocToSchoolCollection } from "../../utils/firebase/firebase.utils";
import { addSchool } from "../../app/slices/schools";
import { useNavigate } from "react-router-dom";
import AddNote from "./components/AddNote";
import { School } from "../../types/schools.types";
import { StringInput, BooleanInput, NumberInput } from "../../types/schools.types";


export default function AddSchool() {
  const schools = useSelector(selectSchools);
  const [ newSchool, setNewSchool ] = useState(defaultSchool);
  const [ currentInput, setCurrentInput ] = useState('');
  const [ openNote, setOpenNote ] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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

    const handleBooleanChange = (e: { target: { name: any; }; }) => {
      const name = e.target.name

      console.log(name)
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
                notes: field.notes?.concat({type, note})
            }
        })
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
      <div className="absolute left-32 font-Noto Sans">
      <div className="h-16 w-[105em] mt-28">
        <p className='text-4xl mt-4 font-medium'>Add School</p>
        <button className='absolute ml-[100em] border-2 border-solid border-[#4573D2] rounded-xl w-20 h-12 -mt-9'>
          Done
        </button>
      </div>

      <div className='h-8 mt-6 text-lg border-b-2 flex border-black'>
        <p className=''>General Info</p>
        <p className='ml-14'>Degree Info</p>
        <p className='ml-14'>Tuition</p>
        <p className='ml-14'>GPA</p>
        <p className='ml-14'>Prerequisites</p>
        <p className='ml-14'>Healthcare Experience</p>
        <p className='ml-14'>Shadowing</p>
        <p className='ml-14'>GRE</p>
        <p className='ml-14'>Letters of Recommendation</p>
        <p className='ml-14'>Certifications</p>
        <p className='ml-14'>Additional Notes</p>
      </div>

      <form className='mt-16'>
        <div className="w-[45em] border h-44 rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Name</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" >
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_name.input} name='school_name' onChange={handleInputChange} />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Logo</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_logo.input} name='school_logo' onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Street Address</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_street.input} name='school_street' onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">City</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_city.input} name='school_city' onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">State</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_state.input} name='school_state' onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Zip</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_zip_code.input} name="school_zip_code" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Country</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_country.input} name="school_country" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Website</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_website.input} name="school_website" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Email</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_email.input} name="school_email" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Phone Number</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_phone_number.input} name="school_phone_number" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Campus Location</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_campus_location.input} name="school_campus_location" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Start Month</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_start_month.input} name="school_start_month" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Class Compacity</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_class_capacity.input} name="school_class_capacity" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Full-time)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_duration_full_time.input} name="school_duration_full_time" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Part-time)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_duration_part_time.input} name="school_duration_part_time" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(In-state)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_seat_deposit_in_state.input} name="school_seat_deposit_in_state" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(Out-of-state)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_seat_deposit_out_of_state.input} name="school_seat_deposit_out_of_state" onChange={handleInputChange}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Rolling admissions</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>

          
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Non-rolling admissions</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>

        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Pre-PA curriculum</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Direct High School Entry</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Part-time Option</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Online Learning</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">On-campus Housing</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Cadaver Lab</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Faith-based Learning</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Military Personnel Preference</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
        </div>
      </form>
    </div>
  </>
  )
}