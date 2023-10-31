
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { School, Note, NumberInput, PreviousCycle } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";

const previousCycle = [
    {
        label: 'Average Overall GPA Accepted:',
        value: 'average_overall_gpa_accepted_previous_year'
    },
    {
        label: 'Average Science GPA Accepted:',
        value: 'average_science_gpa_accepted_previous_year',
    },
    {
        label: 'Average Prerequisite GPA Accepted:',
        value: 'average_prerequisite_gpa_accepted_previous_year'
    }
]

export default function PreviousCycleSection({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof object;
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [name]: {
                    ...field,
                    input: e.target.value,
                }
            }
        })
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

      const addNote = (note: Note) => {
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note)
                }
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
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
            }
        })
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            }
        })
    };


    return (
        <>
        <div className={`mt-28 relative max-w-[900px] border py-5 px-8 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Average GPA Accepted Previous Cycle</label>   
            {previousCycle.map((gpa,i) => (
                <>
                    <div className={`w-full mt-4 ${i === previousCycle.length - 1 ? 'mb-5' : 'mb-0'}`}>
                        <label className='text-xl'>{gpa.label}</label>
                        <div className='flex justify-start items-center gap-4 mt-3'>
                            <input className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' value={(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input} name={gpa.value} onChange={handleInput} />
                            <button className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]"
                            onClick={(e) => {toggleNotePopup(e); setName(gpa.value)}}>
                                Add Note
                            </button>
                        </div>
                    </div>
                    {(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).notes && (newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).notes?.map((note: Note, i: number) => (
                        <div className='flex justify-center items-start gap-2 mt-4'>
                            <div className="grow p-4 rounded-md border border-black">
                                <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                            <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                <button value={gpa.value} onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(gpa.value)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                <button value={gpa.value} onClick={(e) => {deleteNote(e, i, gpa.value)}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                            </div>
                        </div>
                    ))}
                </>
                ))}               
        </div>
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}