import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";

export default function PANCEPassRate({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInput | NumberInput;
        let value: string | number = e.target.value;
        if (typeof field.input === 'number') {
            value = Number(e.target.value)
        } 
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: value,
            }
        })
    };

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_pance_pass_rate_note: e,
        })
    };

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
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
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
    };

    return (
        <>
        <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">First Time Pass Rate</label>
                <div className='flex justify-center items-center gap-3'>
                    <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                    value={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' onChange={handleInput}/>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_first_time_pass_rate.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_first_time_pass_rate.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_first_time_pass_rate.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_first_time_pass_rate')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_first_time_pass_rate')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Five Year Average First-Time Pass Rate</label>
                <div className='flex justify-center items-center gap-3'>
                    <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                    value={newSchool.school_average_five_year_first_time_pass_rate.input} name='school_average_five_year_first_time_pass_rate' onChange={handleInput}/>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_average_five_year_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_average_five_year_first_time_pass_rate.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_average_five_year_first_time_pass_rate.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_average_five_year_first_time_pass_rate.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_average_five_year_first_time_pass_rate')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_average_five_year_first_time_pass_rate')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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

            <div className={`mt-28 text-xl w-full`}>
                <p>PANCE Pass Rate Notes</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_pance_pass_rate_note} 
                onChange={handleQuill}/>
            </div>

            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}