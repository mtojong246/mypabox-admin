import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { School, Note, BooleanInput, StringInputWithFields } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";

export default function DegreeInfo({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');
    const [inputList, setInputList] = useState([{ input: '' }])

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    const addInputFields = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setInputList([...inputList, { input: "" }])
    };

    const removeField = (e: any, index: number) => {
        e.preventDefault();
        
        const list = inputList.filter(input => inputList.indexOf(input) !== index);

        setInputList(list)

        setNewSchool({
        ...newSchool,
        school_type_of_degree_offered: {
            ...newSchool.school_type_of_degree_offered,
            fields: list
        }
        })
    };

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        // Input changes based on what user types 
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInputWithFields;

        const list: any = [...inputList]

        list[index].input = e.target.value
        
        setInputList(list)

        setNewSchool({
        ...newSchool,
        [name]: {
            ...field, 
            fields: list
        }
        })
    }

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
    };

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
    };


      
    return (
        <>
            <div className={`mt-12 relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Types of Degrees Offered</label>
                <button value="school_type_of_degree_offered" className="w-56 pl-4 text-red-500 border border-[#F06A6A] rounded h-14 text-xl" 
                onClick={addInputFields}>
                <AiOutlinePlus className="absolute ml-2 mt-[6px]"/>
                Add more fields
                </button>
                <button value="school_type_of_degree_offered" className="w-32 ml-4 border text-red-500 border-[#F06A6A] rounded h-14 text-xl" 
                onClick={(e:any) => {toggleNotePopup(e); setName('school_type_of_degree_offered')}}>
                Add Note
                </button>
                {inputList.map((input: any, index: any) => {
                return (         
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <input className="grow focus:outline-none border border-[#B4B4B4] p-4 rounded" 
                    value={input.input} name='school_type_of_degree_offered' onChange={e => handleFieldChange(e, index)} />
                        {index < 1 ? null : (
                        <button onClick={(e:any) => removeField(e, index)} value='school_type_of_degree_offered'><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        )}
                    </div>
                )})
                }
                {newSchool.school_type_of_degree_offered.notes ? (
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_type_of_degree_offered.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_type_of_degree_offered.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_type_of_degree_offered')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_type_of_degree_offered')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                    </div>
                ) : ''
                }
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Dual-Degree Program</label>
                <div className='flex justify-start items-center gap-2'>
                    <div className='mt-2 grow'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" name='school_dual_degree_program' onChange={handleCheck}/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">
                        {newSchool.school_dual_degree_program.input ? 'True' : 'False'}
                        </span>
                    </label>
                    </div>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_dual_degree_program')}} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                
                {
                newSchool.school_dual_degree_program.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_dual_degree_program.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_dual_degree_program.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_dual_degree_program')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_dual_degree_program')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                }
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Bachelors Degree Required</label>
                <div className='flex justify-start items-center gap-2'>
                    <div className='mt-2 grow'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" name='school_dual_degree_program' onChange={handleCheck}/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">
                        {newSchool.school_bachelors_degree_required.input ? 'True' : 'False'}
                        </span>
                    </label>
                    </div>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_bachelors_degree_required')}} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                
                {
                newSchool.school_bachelors_degree_required.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_bachelors_degree_required.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_bachelors_degree_required.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_bachelors_degree_required')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_bachelors_degree_required')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                }
            </div>
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}