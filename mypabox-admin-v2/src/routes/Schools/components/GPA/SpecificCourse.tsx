import { School, Note, MinimumGpaSpecificCourse } from "../../../../types/schools.types"
import { MouseEvent, SetStateAction, ChangeEvent, useState, useEffect, Dispatch } from "react"
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import AddNoteFields from "../../Assets/AddNoteFields";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import EditButtons from "../../Assets/EditButtons";
import { confirmEditGroup, enableEditModeGroup, revertEditGroup, undoEditGroup } from "./GPAFunctions";

import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import SelectFieldsGroup from "../../Assets/SelectFieldsGroup";
import InputFields from "../../Assets/InputsFields";

const specificCourseDefault = {
    minimum_gpa_required_for_course: 0,
    courseID: "",
    notes: [],
}

export default function SpecificCourse({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ array, setArray ] = useState<any[]>([])

    useEffect(() => {
        if (loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input === null) {
            setArray(newSchool.school_minimum_gpa_for_specific_course)
        } else if (loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input !== null) {
            setArray(newSchool.edited_school_minimum_gpa_for_specific_course.input) 
        } else if (!loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input === null) {
            setArray(newSchool.school_minimum_gpa_for_specific_course)
        } else if (!loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input !== null) {
            setArray(newSchool.edited_school_minimum_gpa_for_specific_course.input) 
        }
    }, [loggedInUser, newSchool.edited_school_minimum_gpa_for_specific_course , newSchool.school_minimum_gpa_for_specific_course])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    useEffect(() => {
        const options = courses.map(course => (
            { value: course.unique_id, label: course.course_name }
        ))
        setCourseOptions(options)
    }, [courses]);

    const [index, setIndex] = useState<number | null>(null);
    const [objIndex, setObjIndex] = useState<number | undefined>(0);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    // const addField = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     const updatedField = newSchool.school_minimum_gpa_for_specific_course.concat(specificCourseDefault);
    //     setNewSchool({
    //         ...newSchool,
    //         school_minimum_gpa_for_specific_course: updatedField,
    //     })
    // }

    const addField = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            const updatedField = newSchool.school_minimum_gpa_for_specific_course.concat(specificCourseDefault);
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: updatedField,
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: newSchool.edited_school_minimum_gpa_for_specific_course.input!.concat({
                        ...specificCourseDefault,
                        isCorrect: true,
                        isNew: true,
                    })
                }
            })
        }
        
        
    }

    // Deletes specific field from objects 
    // const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    //     e.preventDefault();
    //     const updatedField = newSchool.school_minimum_gpa_for_specific_course.filter((field, i)=> i !== index);
    //     setNewSchool({
    //         ...newSchool,
    //         school_minimum_gpa_for_specific_course: updatedField,
    //     })
    // }

    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            const updatedField = newSchool.school_minimum_gpa_for_specific_course.filter((field, i)=> i !== index);
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: updatedField,
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: isNew ? newSchool.edited_school_minimum_gpa_for_specific_course.input!.filter((inp, i) => i !== index) : newSchool.edited_school_minimum_gpa_for_specific_course.input!.map((inp, i) => {
                        if (i === index) {
                            return {...inp, isCorrect: false,}
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const undoDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_minimum_gpa_for_specific_course: {
                ...newSchool.edited_school_minimum_gpa_for_specific_course,
                input: newSchool.edited_school_minimum_gpa_for_specific_course.input!.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: true }
                    } else {
                        return { ...inp }
                    }
                }) 
            }
        })
    }

    const handleSelectInArray = (e: any, name: string, index: number, isEditedInput: boolean) => {

        if (!isEditedInput) {
            const objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj,i) => i === index) as MinimumGpaSpecificCourse;
            const updatedObj = {
                ...objToBeUpdated,
                courseID: e.value,
            }
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: newSchool.school_minimum_gpa_for_specific_course.map((field, i) => {
                    if (i === index) {
                        return updatedObj;
                    } else {
                        return field;
                    }
                }) 
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: newSchool.edited_school_minimum_gpa_for_specific_course.input!.map((inp,i) => {
                        if (i === index) {
                            return { ...inp, courseID: e.value }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };
    
    const handleObjInput = (e: ChangeEvent<HTMLInputElement>,name: string,index: number,  isEditedInput: boolean) => {
        if (!isEditedInput) {
            const value = e.target.value;
            const objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj,i) => i === index) as MinimumGpaSpecificCourse;
    
            const updatedObj = {
                ...objToBeUpdated,
                [name]: Number(value),
            }
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: newSchool.school_minimum_gpa_for_specific_course.map((field, i) => {
                    if (i === index) {
                        return updatedObj;
                    } else {
                        return field;
                    }
                }) 
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: newSchool.edited_school_minimum_gpa_for_specific_course.input!.map((inp, i) => {
                        if (i === index) {
                            return { ...inp, minimum_gpa_required_for_course: Number(e.target.value) }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        

    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        console.log(e)
        return;
    }

    const handleSelect =(e:any, category: string, isEditedInput: boolean) => {
        return;
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

            const currentField = newSchool.school_minimum_gpa_for_specific_course
                const updatedObj = { ...obj, notes: obj.notes.concat(note) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } 
                    return field;
                })
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_for_specific_course: updatedField,
                })
        } else {
            const obj = newSchool.edited_school_minimum_gpa_for_specific_course.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_minimum_gpa_for_specific_course;
            const updatedObj = { ...obj!, notes: obj!.notes.concat(note) }
            const updatedField = currentField.input!.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
                
            })
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: updatedField,
                }
            })
        }
        
            
        }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

            const currentField = newSchool.school_minimum_gpa_for_specific_course
                const updatedObj = { ...obj, notes: obj.notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                }) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } 
                    return field;
                })
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_for_specific_course: updatedField,
                })
        } else {
            const obj = newSchool.edited_school_minimum_gpa_for_specific_course.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_minimum_gpa_for_specific_course;
            const updatedObj = { ...obj!, notes: obj!.notes.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            }) }
            const updatedField = currentField.input!.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
               
            })
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: updatedField,
                },
            })
        }
        
            
    };

    const deleteNote = (e: any, index: number, name: string, noteName?: string, isIndividual?: boolean, objIndex?: number) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

            const currentField = newSchool.school_minimum_gpa_for_specific_course
                const updatedObj = { ...obj, notes: obj.notes.filter((n,i) => i !== index) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } 
                    return field;
                })
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_for_specific_course: updatedField,
                })
                
        } else {
            const obj = newSchool.edited_school_minimum_gpa_for_specific_course.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_minimum_gpa_for_specific_course
            const updatedObj = { ...obj!, notes: obj!.notes.filter((n,i) => i !== index) }
            const updatedField = currentField.input!.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
               
            })
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...newSchool.edited_school_minimum_gpa_for_specific_course,
                    input: updatedField,
                },
            })
            
        }
        
    }

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        const linkName = `edited_${linkObj.name}`
        setNewSchool({
            ...newSchool,
            [linkName]: {
                ...newSchool[linkName as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }
    


    return (
        <>
        {array.map((field, i) => {
            const input = newSchool.edited_school_minimum_gpa_for_specific_course.input && newSchool.edited_school_minimum_gpa_for_specific_course.input.find((ind: any, index: number) => i === index )
            const originalInput = newSchool.school_minimum_gpa_for_specific_course.find((ind: any, index: number) => i === index);
        return (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
        {((loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <div className='absolute top-[-16px] left-[20px] flex justify-between items-center w-full pr-[40px]'>
                <label className={`z-20 flex justify-start items-center text-xl bg-white ${input ? input.isCorrect ? 'no-underline' : 'line-through' : 'no-underline'}`}>Minimum GPA for Specific Course <PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_for_specific_course.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_for_specific_course.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/> <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label> 
                {!loggedInUser.permissions.canVerify && input && !input.isCorrect && !input.isNew ? 
                <button disabled={!newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode ? true : false} onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)} className={`bg-[#4573D2] rounded text-white text-sm px-3 py-1 font-bold hover:bg-[#26354C] ${i > 0 ? 'block' : 'hidden'}`}>Undo</button> : 
                    <button disabled={(!loggedInUser.permissions.canVerify && !newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode) || (loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input !== null) ? true : false} onClick={(e:any) => {input === null ? deleteField(e, i, false, false) : deleteField(e, i, !input?.isNew, true)}} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold hover:bg-[#B52020] relative z-20 ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>}
            </div>
            
            <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Course Name</label>
                    {/* <div className='flex justify-between items-center'>
                        <label className='text-xl'>Course Name</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div> */}
                    <SelectFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode} input={input ? input.courseID : null} originalInput={originalInput ? originalInput.courseID : null}
                    label={input && courseOptions.find(course => course.value === input.courseID)?.label} originalLabel={originalInput && courseOptions.find(course => course.value === originalInput.courseID)?.label}  name='courseID' category="school_minimum_gpa_for_specific_course" options={courseOptions} handleSelect={handleSelect} handleSelectInArray={handleSelectInArray} index={i}/>
                    {/* <Select
                    className="w-full focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, 'courseID', i)}
                    options={courseOptions}
                    value={field.courseID && courseOptions ? { value: field.courseID, label: courseOptions.find(course => course.value === field.courseID)?.label } : null}/> */}

                </div>
                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Minimum GPA Required</label>
                    <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode} input={input ? input.minimum_gpa_required_for_course : null} originalInput={originalInput ? originalInput.minimum_gpa_required_for_course : null}
                    name='minimum_gpa_required_for_course' handleInput={handleInput} handleInputInArray={handleObjInput} index={i} />
                    {/* <input onChange={(e) => handleObjInput(e, i, 'minimum_gpa_required_for_course')} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded block' */}
                    {/* value={field.minimum_gpa_required_for_course ? field.minimum_gpa_required_for_course : ''} name='minimum_gpa_required_for_course'/> */}
                </div>
                <div className='w-full mt-8 mx-4'>
                    <label className='text-xl font-medium'>Notes:</label>
                    <button name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-2 block" 
                    onClick={(e) => {toggleNotePopup(e); setObjIndex(i)}}>
                        Add Note
                    </button>
                </div>
                {/* {field.notes && field.notes.map((note: Note, index: number) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded max-w-[900px] mt-3 mx-4'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setObjIndex(i); setIndex(index)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, index)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))} */}
                <div className='max-w-[900px] mx-4'>
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode} notes={input ? input.notes : null} originalNotes={originalInput ? originalInput.notes : null} name='school_minimum_gpa_for_specific_course' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote} objIndex={objIndex} setObjIndex={setObjIndex}
                    />
                </div>

            </>
            {i === array.length-1 ? (
            <button disabled={(!loggedInUser.permissions.canVerify && !newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode) || (loggedInUser.permissions.canVerify && newSchool.edited_school_minimum_gpa_for_specific_course.input !== null) ? true : false} className="mx-4 mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={(e:any) => {input === null ? addField(e, false) : addField(e, true)}}>
                + Add New Field
            </button>
            ) : (
                <div className='w-full mb-5'></div>
            )}
        </div>
        {isEdit && i === 0 && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_for_specific_course.isEditMode} input={newSchool.edited_school_minimum_gpa_for_specific_course.input} link={newSchool.edited_school_minimum_gpa_for_specific_course.link}
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} newSchool={newSchool} setNewSchool={setNewSchool} name='school_minimum_gpa_for_specific_course' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup}
        revertEdit={revertEditGroup} undoEdit={undoEditGroup}
        />}
        </div>
        )})}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}