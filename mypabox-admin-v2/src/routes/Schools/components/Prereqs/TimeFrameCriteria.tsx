import { School, StringInput } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect, MouseEvent } from 'react';
import { Note } from '../../../../types/schools.types';
import AddNote from './AddNote';
import LinkPopup from '../../LinkPopup';
import Indicator from '../../../../components/Indicator';
import Screen from '../../../../components/Screen';
import { UserObject } from '../../../../types/users.types';
import EditButtons from '../../Assets/EditButtons';
import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from './CriteriaFunctions';
import SelectInputsFields from '../../Assets/SelectInputsFields';
import AddNoteFields from '../../Assets/AddNoteFields';

const options = [
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function TimeFrameCriteria({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
 }) {
    const [ allSelection, setAllSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ scienceSelection, setScienceSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ mathSelection, setMathSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ editedAllSelection, setEditedAllSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    });
    const [ editedScienceSelection, setEditedScienceSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    });
    const [ editedMathSelection, setEditedMathSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    });
    const [ openNote, setOpenNote ] = useState(false);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ index, setIndex ] = useState<number | null>(0);
    const [ name, setName ] = useState('');
    const [ isIndividual, setIsIndividual ] = useState<boolean | undefined>(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setOpenNote(!openNote)
    }

    useEffect(() => {
        if (newSchool.edited_school_time_frame_criteria.input !== null ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_time_frame_criteria.input])

    useEffect(() => {
        if (newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input) {
            const array = newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input.split(' ');
            setAllSelection({
                number: array[0],
                duration: array[1]
            })
        }
        if (newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input) {
            const array = newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input.split(' ');
            setScienceSelection({
                number: array[0],
                duration: array[1]
            })
        }
        if (newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input) {
            const array = newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input.split(' ');
            setMathSelection({
                number: array[0],
                duration: array[1],
            })
        }
        
    }, [newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input, newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input, newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input,
    ]);

    useEffect(() => {
        if (newSchool.edited_school_time_frame_criteria.edited_school_time_frame_all_courses_must_be_completed.input) {
            const array = newSchool.edited_school_time_frame_criteria.edited_school_time_frame_all_courses_must_be_completed.input.split(' ');
            setEditedAllSelection({
                number: array[0],
                duration: array[1],
            })
        } else {
            setEditedAllSelection({
                number: null,
                duration: null,
            })
        }
        if (newSchool.edited_school_time_frame_criteria.edited_school_time_frame_math_courses_must_be_completed.input) {
            const array = newSchool.edited_school_time_frame_criteria.edited_school_time_frame_math_courses_must_be_completed.input.split(' ');
            setEditedMathSelection({
                number: array[0],
                duration: array[1],
            })
        } else {
            setEditedMathSelection({
                number: null,
                duration: null,
            })
        }
        if (newSchool.edited_school_time_frame_criteria.edited_school_time_frame_science_courses_must_be_completed.input) {
            const array = newSchool.edited_school_time_frame_criteria.edited_school_time_frame_science_courses_must_be_completed.input.split(' ');
            setEditedScienceSelection({
                number: array[0],
                duration: array[1],
            })
        } else {
            setEditedScienceSelection({
                number: null,
                duration: null,
            })
        }
    }, [newSchool.edited_school_time_frame_criteria.edited_school_time_frame_all_courses_must_be_completed, newSchool.edited_school_time_frame_criteria.edited_school_time_frame_math_courses_must_be_completed, newSchool.edited_school_time_frame_criteria.edited_school_time_frame_science_courses_must_be_completed ])

    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_time_frame_criteria: {
                ...newSchool.school_time_frame_criteria,
                school_time_frame_all_courses_must_be_completed: {
                    ...newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed,
                    input: allSelection.number + ' ' + allSelection.duration
                },
                school_time_frame_science_courses_must_be_completed: {
                    ...newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed,
                    input: scienceSelection.number + ' ' + scienceSelection.duration
                },
                school_time_frame_math_courses_must_be_completed: {
                    ...newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed,
                    input: mathSelection.number + ' ' + mathSelection.duration,
                }
            },
        })
    }, [allSelection, mathSelection, scienceSelection])

    



    const handleInput = (e: ChangeEvent<HTMLInputElement>, name: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            if (name === 'school_time_frame_all_courses_must_be_completed') {
                setAllSelection({
                    ...allSelection,
                    number: e.target.value.toString().trim()
                })
            } else if (name === 'school_time_frame_science_courses_must_be_completed') {
                setScienceSelection({
                    ...scienceSelection,
                    number: e.target.value.toString().trim()
                })
            } else {
                setMathSelection({
                    ...mathSelection,
                    number: e.target.value.toString().trim()
                })
            }
        } else {
            const field = newSchool.edited_school_time_frame_criteria;
            if (name === 'school_time_frame_all_courses_must_be_completed') {
                setEditedAllSelection({
                    ...editedAllSelection,
                    number: e.target.value.toString().trim()
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_all_courses_must_be_completed: {
                            ...field.edited_school_time_frame_all_courses_must_be_completed,
                            input: (e.target.value.toString().trim()) + ' ' + editedAllSelection.duration,
                        }
                    }
                })
            } else if (name === 'school_time_frame_science_courses_must_be_completed') {
                setEditedScienceSelection({
                    ...editedScienceSelection,
                    number: e.target.value.toString().trim()
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_science_courses_must_be_completed: {
                            ...field.edited_school_time_frame_science_courses_must_be_completed,
                            input: (e.target.value.toString().trim()) + ' ' + editedScienceSelection.duration,
                        }
                    }
                })
            } else {
                setEditedMathSelection({
                    ...editedMathSelection,
                    number: e.target.value.toString().trim()
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_math_courses_must_be_completed: {
                            ...field.edited_school_time_frame_math_courses_must_be_completed,
                            input: (e.target.value.toString().trim()) + ' ' + editedMathSelection.duration,
                        }
                    }
                })
            }
        }
        
    }

    const handleSelect = (e:any, name: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            if (name === 'school_time_frame_all_courses_must_be_completed') {
                setAllSelection({
                    ...allSelection,
                    duration: e.value,
                })
            } else if (name === 'school_time_frame_science_courses_must_be_completed') {
                setScienceSelection({
                    ...scienceSelection,
                    duration: e.value, 
                })
            } else {
                setMathSelection({
                    ...mathSelection,
                    duration: e.value,
                })
            }
        } else {
            const field = newSchool.edited_school_time_frame_criteria;
            if (name === 'school_time_frame_all_courses_must_be_completed') {
                setEditedAllSelection({
                    ...editedAllSelection,
                    duration: e.value,
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_all_courses_must_be_completed: {
                            ...field.edited_school_time_frame_all_courses_must_be_completed,
                            input: editedAllSelection.number + ' ' + e.value,
                        }
                    }
                })
            } else if (name === 'school_time_frame_science_courses_must_be_completed') {
                setEditedScienceSelection({
                    ...editedScienceSelection,
                    duration: e.value, 
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_science_courses_must_be_completed: {
                            ...field.edited_school_time_frame_science_courses_must_be_completed,
                            input: editedScienceSelection.number + ' ' + e.value,
                        }
                    }
                })
            } else {
                setEditedMathSelection({
                    ...editedMathSelection,
                    duration: e.value,
                })
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...field,
                        edited_school_time_frame_math_courses_must_be_completed: {
                            ...field.edited_school_time_frame_math_courses_must_be_completed,
                            input: editedMathSelection.number + ' ' + e.value,
                        }
                    }
                })
            }
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.concat(note)
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.concat(note)
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.edited_school_time_frame_criteria[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes ? field.notes.concat(note) : [note]
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        notes: newSchool.edited_school_time_frame_criteria.notes!.concat(note)
                    }
                })
            }
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.map((n,i) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.edited_school_time_frame_criteria[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.map((n:any,i:number) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        notes: newSchool.edited_school_time_frame_criteria.notes!.map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            }
        }
        
    }

    const deleteNote = (e:any, index: number, name: string, noteName?: string, isIndividual?: boolean) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.filter((n,i) => i !== index)
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_time_frame_criteria: {
                        ...newSchool.school_time_frame_criteria,
                        school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.filter((n,i) => i !== index)
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (isIndividual) {
                const field = newSchool.edited_school_time_frame_criteria[`edited_${name}` as keyof object] as StringInput;
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.filter((n,i) => i !== index)
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_time_frame_criteria: {
                        ...newSchool.edited_school_time_frame_criteria,
                        notes: newSchool.edited_school_time_frame_criteria.notes!.filter((n,i) => i !== index)
                    }
                })
            }
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
    };



    return (
        <>
        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_time_frame_criteria.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} />
            <Indicator label="Time Frame Criteria" editedInput={newSchool.edited_school_time_frame_criteria.input} /> 
                <div className={`mt-7 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All Courses Must Be Completed Within:</label> 
                    <div className='flex justify-between items-start gap-3'>
                        <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} input={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_all_courses_must_be_completed.input}
                        originalInput={newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input} name='school_time_frame_all_courses_must_be_completed' options={options} handleInput={handleInput} handleSelect={handleSelect}
                        number={editedAllSelection.number} duration={editedAllSelection.duration} originalNumber={allSelection.number} originalDuration={allSelection.duration}
                        />
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_all_courses_must_be_completed')}} className="text-nowrap border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} notes={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_all_courses_must_be_completed.notes} originalNotes={newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes} name='school_time_frame_all_courses_must_be_completed' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} isIndividual={true} setIsIndividual={setIsIndividual}
                    />
                </div>


                <div className={`mt-12 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All SCIENCE Courses Must Be Completed Within:</label> 
                    <div className='flex justify-start items-start gap-3'>
                        <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} input={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_science_courses_must_be_completed.input}
                        originalInput={newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input} name='school_time_frame_science_courses_must_be_completed' options={options} handleInput={handleInput} handleSelect={handleSelect}
                        number={editedScienceSelection.number} duration={editedScienceSelection.duration} originalNumber={scienceSelection.number} originalDuration={scienceSelection.duration}
                        />
                       
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_science_courses_must_be_completed')}} className="text-nowrap border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                        </button>
                    </div>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} notes={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_science_courses_must_be_completed.notes} originalNotes={newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes} name='school_time_frame_science_courses_must_be_completed' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} isIndividual={true} setIsIndividual={setIsIndividual}
                    />
                </div>


                <div className={`mt-12 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All MATH Courses Must Be Completed Within:</label> 
                    <div className='flex justify-start items-center gap-3'>
                        <SelectInputsFields isEdit={isEdit}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} input={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_math_courses_must_be_completed.input}
                        originalInput={newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input} options={options} handleInput={handleInput} handleSelect={handleSelect}
                        number={editedMathSelection.number} duration={editedMathSelection.duration} originalNumber={mathSelection.number} originalDuration={mathSelection.duration} name='school_time_frame_math_courses_must_be_completed'
                        />
                       
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_math_courses_must_be_completed')}} className="text-nowrap border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                        </button>
                    </div>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} notes={newSchool.edited_school_time_frame_criteria.edited_school_time_frame_math_courses_must_be_completed.notes} originalNotes={newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes} name='school_time_frame_math_courses_must_be_completed' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} isIndividual={true} setIsIndividual={setIsIndividual}
                    />
                </div>


                <div className='w-full mt-8 mb-5'>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(false)}} className="text-nowrap block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} notes={newSchool.edited_school_time_frame_criteria.notes} originalNotes={newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section} name='school_time_frame_criteria_note_section' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} isIndividual={false} setIsIndividual={setIsIndividual}
                    />
                </div>
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_time_frame_criteria.isEditMode} input={hasInputs} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup}
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_time_frame_criteria.link} name='school_time_frame_criteria'
            newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openNote && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}