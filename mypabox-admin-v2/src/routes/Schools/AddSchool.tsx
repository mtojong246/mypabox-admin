import { defaultSchool } from "../../data/defaultValues";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectIsEdit, selectSchools } from "../../app/selectors/schools.selectors";
import { useState, useEffect, ChangeEvent, MouseEvent, useContext } from "react";
import { deleteSchoolDoc, addSchoolDoc, updateSchoolDoc } from "../../utils/firebase/firebase.utils";
import { addSchool, editSchoolData } from "../../app/slices/schools";
import { useNavigate, useLocation } from "react-router-dom";
import AddNote from "./components/AddNote";
import { School } from "../../types/schools.types";
import { StringInput, BooleanInput, NumberInput } from "../../types/schools.types";
import Category from "./components/Category";
import EditNote from "./components/EditNote";
import { Note } from "../../types/schools.types";
import { categories } from "../../data/categories";
import { SchoolContext } from "../../useContext";
import { PiWarningCircle } from "react-icons/pi";
import { selectUsers } from "../../app/selectors/users.selectors";
import CancelPopup from "./CancelPopup";


import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddSchool() {
  const schools = useSelector(selectSchools);
  const users = useSelector(selectUsers);
  const isEdit = useSelector(selectIsEdit);
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
  const { show, setShow } = useContext(SchoolContext)
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  const [ allCategories, setAllCategories ] = useState(categories)

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [ assignee, setAssignee ] = useState('');
  const [ isCancelOpen, setIsCancelOpen ] = useState(false);

  const toggleCancelPopup = (e:any) => {
    e.preventDefault();
    setIsCancelOpen(!isCancelOpen);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggles "AddNote" and "EditNote" components
  const toggleNote = () => setOpenNote(!openNote);
  const toggleEdit = () => setOpenEdit(!openEdit);

  useEffect(() => {
    // Continuing editing school if already saved, else start off fresh 
    const storedSchool = localStorage.getItem('newSchool');
    if (storedSchool) {
      setNewSchool(JSON.parse(storedSchool))
    // } else if (!schools.length) {
    //   setNewSchool({
    //     ...defaultSchool,
    //     id: 1,
    //   })
   } else {
    setNewSchool(defaultSchool)
      // Autoincrements id when adding a new school to db 
      // const arrayToSort = [...schools];
      // const sortedSchools = arrayToSort.sort((a,b) => a.id - b.id);
      // const id = (sortedSchools[sortedSchools.length - 1]).id + 1; 
      // setNewSchool({
      //     ...defaultSchool,
      //     id,
      // })
    }
    
   }, [schools]);


   // Sets initial tab value to General Info
   useEffect(() => {
    if (location.hash === '') {
      setTab('#general-info')
    } else {
      setTab(location.hash)
    }

   }, [location.hash]);

   useEffect(() => {

    const newCategories = categories.map(category => {
      const editedFields = category.fields.find(field => (newSchool[`edited_${field.value}` as keyof object] as any) !== undefined && ((newSchool[`edited_${field.value}` as keyof object] as any).input !== null || 
      (field.innervalue !== undefined && (newSchool[`edited_${field.value}` as keyof object][`edited_${field.innervalue}`] as any).input !== null)));
      if (editedFields) {
        
        return {...category, isEdited: true}
      } else {
        return { ...category, isEdited: false }
      }
   })
    setAllCategories(newCategories)

   }, [newSchool]);


   useEffect(() => {
    if (newSchool.school_name.input) {
      const user = users.find(u => u.activeTasks.find(task => task.schools.includes(newSchool.school_name.input)))
      if (user) setAssignee(user.displayName)
    }
   }, [newSchool.school_name, users])


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
                    input: e.target.value
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
    const handleSave = async (e: MouseEvent<HTMLButtonElement>, id: string, hash?: string) => {
        if ((e.target as HTMLButtonElement).value === 'done') {
          setIsDone(true);
        } else {
          setIsLoading(true);
        }

        // if (!newSchool.school_name.input || !newSchool.school_street.input || !newSchool.school_city.input || !newSchool.school_zip_code.input || !newSchool.school_website.input) {
        //   setIsLoading(false);
        //   setIsDone(false);
        //   alert('Please input required fields ');
        //   return;
        // };

        if (newSchool.edited_school_name.isEditMode || newSchool.edited_school_logo.isEditMode || newSchool.edited_school_street.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_state.isEditMode 
          || newSchool.edited_school_zip_code.isEditMode || newSchool.edited_school_country.isEditMode || newSchool.edited_school_website.isEditMode || newSchool.edited_school_email.isEditMode || newSchool.edited_school_phone_number.isEditMode 
          || newSchool.edited_school_campus_location.isEditMode || newSchool.edited_school_start_month.isEditMode || newSchool.edited_school_class_capacity.isEditMode || newSchool.edited_school_duration_full_time.isEditMode || newSchool.edited_school_duration_part_time.isEditMode
          || newSchool.edited_school_seat_deposit_in_state.isEditMode || newSchool.edited_school_seat_deposit_out_of_state.isEditMode || newSchool.edited_school_rolling_admissions.isEditMode || newSchool.edited_school_nonrolling_admissions.isEditMode || 
          newSchool.edited_school_pre_pa_curriculum.isEditMode || newSchool.edited_school_direct_high_school_entry.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_online_learning.isEditMode || newSchool.edited_school_on_campus_housing.isEditMode ||
          newSchool.edited_school_cadaver_lab.isEditMode || newSchool.edited_school_faith_based_learning.isEditMode || newSchool.edited_school_military_personnel_preference.isEditMode || newSchool.edited_school_dual_degree_program.isEditMode || 
          newSchool.edited_school_type_of_degree_offered.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_mission_statement.isEditMode || newSchool.edited_school_in_state_tuition.isEditMode 
          || newSchool.edited_school_out_of_state_tuition.isEditMode || newSchool.edited_school_first_time_pass_rate.isEditMode || newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode || newSchool.edited_school_holistic_review.isEditMode) {
            setIsLoading(false);
            setIsDone(false);
            alert('Please confirm all edits before proceeding');
            return;
          }

        if (newSchool.edited_school_certifications_required.isEditMode || newSchool.edited_school_minimum_gpa_required.isEditMode || newSchool.edited_school_minimum_gpa_recommended.isEditMode || newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode || newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode || 
          newSchool.edited_school_average_gpa_accepted_previous_cycle.isEditMode || newSchool.edited_school_prereq_required_courses.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_prereq_required_course_categories.isEditMode || 
          newSchool.edited_school_grade_criteria.isEditMode || newSchool.edited_school_time_frame_criteria.isEditMode || newSchool.edited_school_pass_fail_criteria.isEditMode || newSchool.edited_school_ap_criteria.isEditMode || newSchool.edited_school_community_college_criteria.isEditMode || newSchool.edited_school_clep_criteria.isEditMode ||
          newSchool.edited_school_online_courses_criteria.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_paid_experience_required.isEditMode || newSchool.edited_school_patient_experience.isEditMode || newSchool.edited_school_healthcare_experience.isEditMode || 
          newSchool.edited_school_community_service.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_pa_shadowing_required.isEditMode || newSchool.edited_school_pa_shadowing_recommended.isEditMode ||  newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode || 
          newSchool.edited_school_required_optional_exams.isEditMode || newSchool.edited_school_gre.isEditMode) {
          setIsLoading(false);
          setIsDone(false);
          alert('Please confirm all edits before proceeding');
          return;
        }

        if (newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.isEditMode || newSchool.edited_school_casper.edited_school_casper_recommended.isEditMode || newSchool.edited_school_english_proficiency_exams.isEditMode || 
          newSchool.edited_school_evaluations_required.isEditMode || newSchool.edited_school_evaluations_recommended.isEditMode || newSchool.edited_school_international_students_accepted.isEditMode || newSchool.edited_school_accreditation_status.isEditMode ||
          newSchool.edited_school_application_submitted_on_caspa.isEditMode || newSchool.edited_school_accreditation_status.isEditMode || newSchool.edited_school_supplemental_application_required.isEditMode) {
            setIsLoading(false);
            setIsDone(false);
            alert('Please confirm all edits before proceeding');
            return;
          }
      
        // try {
        //     // Sends API request with new school data to firestore 
        //     await addDocToSchoolCollection(newSchool, id);
        // } catch (error:any) {
        //     // throws error and navigates to main page if user is not authenticated when making request
        //     if (error.message === 'permission-denied') {
        //         alert("Access denied. Please log in using the appropriate credentials");
        //         navigate('/');
        //         return;
        //     } else {
        //         alert('Error adding school');
        //         return;
        //     }
        // }

        // // Adds new school to current school list if it doesn't already exist
        // const existingSchool = schools.find(school => school.id === id)
        // if (existingSchool) {
        //   dispatch(addSchool(newSchool));
        // }

        const existingSchool = schools.find(school => school.id === id);
        
        if (!existingSchool) {

          try {
            const addedSchool = await addSchoolDoc(newSchool);
            if (addedSchool) {
              dispatch(addSchool(addedSchool));

              if ((e.target as HTMLButtonElement).value === 'done') {
                setIsLoading(false);
                setIsDone(false);
                navigate('/schools');
                // Remove newSchool from local storage 
                localStorage.removeItem('newSchool');
                // Resets inputs
                setNewSchool(defaultSchool)
              } else {
                setIsLoading(false);
                setIsDone(false);

                localStorage.setItem('newSchool', JSON.stringify(addedSchool));
                setNewSchool(addedSchool as School);

                if ((e.target as HTMLButtonElement).value === 'save') handleClick();

                if ((e.target as HTMLButtonElement).value === 'save') {
                  // Switches to next tab after save 
                  const currentCategory = categories.find(cat => cat.hash === tab);
                  if (currentCategory) {
                    const nextIndex = categories.indexOf(currentCategory) + 1;
                    setTab(categories[nextIndex].hash)
                  }
                  
                } 
              }
            }

          } catch (error:any) {
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
            } else {
                console.log(error)
            }
          }
        } else {
          try {
            await updateSchoolDoc(newSchool, newSchool.id);
            dispatch(editSchoolData(newSchool));

            if ((e.target as HTMLButtonElement).value === 'done') {
              setIsLoading(false);
              setIsDone(false);
              navigate('/schools');
              // Remove newSchool from local storage 
              localStorage.removeItem('newSchool');
              // Resets inputs
              setNewSchool(defaultSchool)
            } else {
              setIsLoading(false);
              setIsDone(false);

              localStorage.setItem('newSchool', JSON.stringify(newSchool));
              setNewSchool(newSchool);

              if ((e.target as HTMLButtonElement).value === 'save') handleClick();

              if ((e.target as HTMLButtonElement).value === 'save') {
                // Switches to next tab after save 
                const currentCategory = categories.find(cat => cat.hash === tab);
                if (currentCategory) {
                  const nextIndex = categories.indexOf(currentCategory) + 1;
                  setTab(categories[nextIndex].hash)
                }
                
              } 
            }

          } catch (error:any) {
            if (error.message === 'permission-denied') {
              alert("Access denied. Please log in using the appropriate credentials");
              navigate('/');
              return;
            } else {
                console.log(error)
                return;
            }
          }
        }

        // If button = 'Done', take back to schools page. Otherwise save progress 
        // if ((e.target as HTMLButtonElement).value === 'done') {
        //     setIsLoading(false);
        //     setIsDone(false);
        //     navigate('/schools');
        //     // Remove newSchool from local storage 
        //     localStorage.removeItem('newSchool');
        //     // Resets inputs
        //     setNewSchool(defaultSchool)
        // } else {
        //     try {
        //       const updatedSchool = await getDocsById(id);
        //       if (updatedSchool) {
        //         // Saves current school data to local storage 
        //         localStorage.setItem('newSchool', JSON.stringify(updatedSchool[0]));
        //         setNewSchool(updatedSchool[0] as School);
        //         setIsLoading(false);
        //         setIsDone(false);

        //         if ((e.target as HTMLButtonElement).value === 'save') handleClick();

        //         if ((e.target as HTMLButtonElement).value === 'save') {
        //           // Switches to next tab after save 
        //           const currentCategory = categories.find(cat => cat.hash === tab);
        //           if (currentCategory) {
        //             const nextIndex = categories.indexOf(currentCategory) + 1;
        //             setTab(categories[nextIndex].hash)
        //           }
        //           alert('Progress saved');
        //         } 
        //       }
        //     } catch (error: any) {
        //       alert('Error retrieving updated school');
        //     }   
        // }

        if (hash) {
          navigateTabs(hash)
        }
    };

    const navigateTabs = (hash: string) => {
      navigate(`/schools/add-school${hash}`);
        setTab(hash);
    }

    const cancel = async (e:MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isEdit) {
        navigate('/schools');
        localStorage.removeItem('newSchool');
        setNewSchool(defaultSchool);

      } else {

        if ((newSchool === defaultSchool) || (!localStorage.getItem('newSchool'))) {
          navigate('/schools');
          return;
        }

        try {

          await deleteSchoolDoc(newSchool.id.toString());
          navigate('/schools');
          localStorage.removeItem('newSchool');
          setNewSchool(defaultSchool);
  
        } catch (error: any) {
  
          alert("Error deleting school");
  
        }
      }
      
    }

    // Opens note popup and sets value of "Add note" button to "currentInput", 
    // which will be used in the "addNote" function to find the corresponding data point 
    const openNotePopup = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
    };

    // snackbar alert when progress saves
    const action = (
      <>
        <Button color="primary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    );


  return (
    <div className={`w-screen px-10 ont-['Noto Sans']`}>
      <div className={`w-full max-w-[1800px] mx-auto`}>
        <div className={`w-full flex justify-between items-center pt-[120px] sticky bg-white z-50 top-0 border-b border-[#DCDCDC]
        ${window.scrollY === 180 ? '' : 'pb-2'}`}>
          <div className={`${window.scrollY === 180 ? '' : '-mt-28'}`}>
          <div className="flex justify-start items-start gap-2">
            <div>
              <p className={`text-4xl font-medium`}>{isEdit ? 'Edit School' : 'Add School'}</p>
              {assignee && <p className='text-xl font-medium mt-1'>Assigned to: <span className='text-orange-600'>{assignee}</span></p>}
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              {newSchool.school_name.input && <p className="text-4xl font-medium">- {newSchool.school_name.input}</p>}
              {newSchool.school_website.input && <a className="text-blue-600 pl-6 hover:underline" href={newSchool.school_website.input} target="_blank" rel="noreferrer">{newSchool.school_website.input}</a>}
            </div>
          </div>
          </div>
          <div className={`flex gap-5 ${window.scrollY === 180 ? '' : '-mt-28'}`}>
            <button onClick={(e) => handleSave(e, newSchool.id)} value='save' className='border-2 border-[#4FC769] text-[#4FC769] h-[50px] w-[84px] 
            rounded hover:text-white hover:bg-[#4FC769] flex justify-center items-center'>
                {isLoading ? <CircularProgress color='inherit' style={{height: '30px', width: '30px'}}/> : 'Save'}
              </button>
              <button onClick={(e) => handleSave(e, newSchool.id)} value='done' className='border-2 border-blue-500 text-blue-500 rounded 
              h-[50px] w-[84px] hover:text-white hover:bg-blue-500 flex justify-center items-center'>
                {isDone ? <CircularProgress color='inherit' style={{height: '30px', width: '30px'}}/>  : 'Finish'}
              </button>
              <button onClick={toggleCancelPopup} className='border-2 border-red-400 text-red-400 rounded 
              h-[50px] px-5 hover:text-white hover:bg-red-400'>Cancel</button>
          </div>
        </div>
        <div className={`flex justify-start items-start gap-10 `}>
          <div className={`text-md py-4 side-max overflow-y-scroll sticky border-r border-[#DCDCDC]  pr-10 ${window.scrollY === 180 ? 'top-[210px]' : 'top-[135px]'}`}>
            <div className='flex flex-col justify-start items-start gap-5'>
            {allCategories.map(category => (
              <button onClick={(e:any) => {handleSave(e, newSchool.id, category.hash)}} 
              className={`whitespace-nowrap ${category.hash === tab ? 
              'text-red-500' : ''}`}>
                <div className='flex justify-start items-center gap-[2px]'>{category.name} {category.isEdited && <PiWarningCircle className={`h-5 w-5 ml-[2px] text-[#F06A6A]`}/>}</div>
              </button>
            ))}
            </div>
          </div>

        <div className={`grow`}>
          <Category tab={tab} newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange}
          handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} />
        </div>
      </div>

    </div>
    {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}
    {openEdit && <EditNote currentInput={currentInput} note={note} index={index} toggleEdit={toggleEdit} editNote={editNote}/>}
    {isCancelOpen && <CancelPopup toggleDelete={toggleCancelPopup} cancel={cancel} />}
    {<Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Progress Saved"
        action={action}
      />}

  </div>
  )
}