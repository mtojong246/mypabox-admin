import { School } from '../../../../types/schools.types';
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent} from 'react';
import AddNote from './AddNote';
import { Note } from '../../../../types/schools.types';
import { PiCheckCircle, PiWarningCircle } from 'react-icons/pi';
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from './CriteriaFunctions';
import LinkPopup from '../../LinkPopup';
import { UserObject } from '../../../../types/users.types';
import EditButtons from '../../Assets/EditButtons';
import SelectFieldsGroup from '../../Assets/SelectFieldsGroup';
import AddNoteFields from '../../Assets/AddNoteFields';

const options = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
]

export default function MinimumGrade({ newSchool, setNewSchool, loggedInUser, isEdit }: {  
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean
}) {
    const [ selection, setSelection ] = useState('');
    const [ openNote, setOpenNote ] = useState(false);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ index, setIndex ] = useState<number | null>(0);

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setOpenNote(!openNote)
    }

    useEffect(() => {
        setSelection(newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses)
    }, [newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses])

    const handleSelect = (e: any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_grade_criteria;
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...field,
                    school_minimum_grade_required_for_all_courses: e.value,
                }
            })
        } else {
            const field = newSchool.edited_school_grade_criteria;
            setNewSchool({
                ...newSchool,
                edited_school_grade_criteria: {
                    ...field,
                    edited_school_minimum_grade_required_for_all_courses: {
                        ...field.edited_school_minimum_grade_required_for_all_courses,
                        input: e.value,
                    }
                }
            })
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const field = newSchool.school_grade_criteria;
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...field,
                    school_grade_criteria_note_section: field.school_grade_criteria_note_section.concat(note)
                }
            })
        } else {
            const field = newSchool.edited_school_grade_criteria;
            setNewSchool({
                ...newSchool,
                edited_school_grade_criteria: {
                    ...field,
                    notes: field.notes!.concat(note)
                }
            })
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const field = newSchool.school_grade_criteria;
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...field,
                    school_grade_criteria_note_section: field.school_grade_criteria_note_section.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            const field = newSchool.edited_school_grade_criteria;
            setNewSchool({
                ...newSchool,
                edited_school_grade_criteria: {
                    ...field,
                    notes: field.notes!.map((n,i) => {
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

    const deleteNote = (e:any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canAddOrDelete) {
            const field = newSchool.school_grade_criteria;
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...field,
                    school_grade_criteria_note_section: field.school_grade_criteria_note_section.filter((n,i) => i !== index),
                }
            })
        } else {
            const field = newSchool.edited_school_grade_criteria;
            setNewSchool({
                ...newSchool,
                edited_school_grade_criteria: {
                    ...field,
                    notes: field.notes!.filter((n,i) => i !== index),
                }
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
    };

    return (
        <>
        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
        {((loggedInUser.permissions.canVerify && newSchool.edited_school_grade_criteria.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_grade_criteria.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Minimum Grade Required for All Courses<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_grade_criteria.edited_school_minimum_grade_required_for_all_courses.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_grade_criteria.edited_school_minimum_grade_required_for_all_courses.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
            <div className='flex justify-start items-start gap-3'>
                <SelectFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_grade_criteria.isEditMode} input={newSchool.edited_school_grade_criteria.edited_school_minimum_grade_required_for_all_courses.input} 
                originalInput={newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses} name='school_minimum_grade_required_for_all_courses' category='school_grade_criteria' handleSelect={handleSelect} options={options}
                />
                {/* <Select className="grow focus:outline-none rounded" options={options} value={selection ? {value: selection, label: selection} : null} onChange={handleSelect}/> */}
                <button onClick={toggleNotePopup} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
            {/* <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_grade_criteria.school_grade_criteria_note_section.length ? 'mt-3' : 'mt-0'}`}>
            {newSchool.school_grade_criteria.school_grade_criteria_note_section.map((note, i) => (
                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                    <div className='flex justify-between items-center w-full mb-1'>
                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                        <div className='flex gap-2'>
                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                        </div>
                    </div>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
            ))}
            </div> */}
            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_grade_criteria.isEditMode} notes={newSchool.edited_school_grade_criteria.notes} originalNotes={newSchool.school_grade_criteria.school_grade_criteria_note_section} name='school_grade_criteria' toggleNotePopup={toggleNotePopup}
            deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
            />
        </div>
        {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_grade_criteria.isEditMode} input={newSchool.edited_school_grade_criteria.edited_school_minimum_grade_required_for_all_courses.input} 
        name='school_grade_criteria' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} link={newSchool.edited_school_grade_criteria.link}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openNote && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}