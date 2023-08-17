import { School, NumberInput, Note } from "../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, MouseEvent, useEffect } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const gpaRequired = [
    {
        label: 'Minimum Overall GPA Required:',
        value: 'school_minimum_overall_gpa_required'
    },
    {
        label: 'Minimum Science GPA Required:',
        value: 'school_minimum_science_gpa_required'
    },
    {
        label: 'Minimum Prerequisite GPA Required:',
        value: 'school_minimum_prerequisite_gpa_required'
    }
]

const gpaRecommended = [
    {
        label: 'Minimum Overall GPA Recommended:',
        value: 'school_minimum_overall_gpa_recommended'
    },
    {
        label: 'Minimum Science GPA Recommended:',
        value: 'school_minimum_science_gpa_recommended'
    },
    {
        label: 'Minimum Prerequisite GPA Recommended:',
        value: 'school_minimum_prerequisite_gpa_recommended'
    }
]

export default function GPA({ newSchool, setNewSchool, openNotePopup, handleInputChange, openEditPopup, handleDeletePopup }: { 
    newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, 
    openNotePopup: (e: MouseEvent<HTMLButtonElement>) => void, 
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void, 
    openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void,
    handleDeletePopup: (e: any , i: SetStateAction<number>, input: string) => void,
}) {

    useEffect(() => {
        if (!newSchool.school_minimum_gpa_required) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_required: {
                    input: undefined,
                    notes: [],
                },
                school_minimum_science_gpa_required: {
                    input: undefined,
                    notes: []
                },
                school_minimum_prerequisite_gpa_required: {
                    input: undefined,
                    notes: []
                }
            })
        }

        if (!newSchool.school_minimum_gpa_recommended) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_recommended: {
                    input: undefined,
                    notes: [],
                },
                school_minimum_science_gpa_recommended: {
                    input: undefined,
                    notes: []
                },
                school_minimum_prerequisite_gpa_recommended: {
                    input: undefined,
                    notes: []
                }
            })
        }
    }, [newSchool.school_minimum_gpa_required, newSchool.school_minimum_gpa_recommended])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        setNewSchool({
            ...newSchool,
            [name]: e.target.checked,
        })
    }

    console.log(newSchool)

    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" name='school_minimum_gpa_required' onChange={handleCheck} />
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">
                            {newSchool.school_minimum_gpa_required ? 'True' : 'False'}
                            </span>
                        </label>
                    </div>
                    {newSchool.school_minimum_gpa_required && (
                    <>
                        {gpaRequired.map(gpa => (
                        <>
                            <div className='w-full mt-3'>
                                <label className='text-xl'>{gpa.label}</label>
                                <div className='flex justify-start items-center gap-4 mt-4'>
                                    <input className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' value={(newSchool[gpa.value as keyof School] as NumberInput).input} name={gpa.value} onChange={handleInputChange} />
                                    <button name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
                                        Add Note
                                    </button>
                                </div>
                            </div>
                            {(newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                                <div className='flex justify-center items-start gap-2 mt-4'>
                                    <div className="grow p-4 rounded-md border border-black">
                                        <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                            {note.type}:
                                        </p>
                                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                    </div>
                                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                        <button value={gpa.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                        <button value={gpa.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                                    </div>
                                </div>
                            ))}
                        </>
                        ))}
                    </>
                    )}
            </div>

            <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA Recommended</label>   
            <div className='w-full mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name='school_minimum_gpa_recommended' onChange={handleCheck} />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">
                    {newSchool.school_minimum_gpa_recommended ? 'True' : 'False'}
                    </span>
                </label>
            </div>
            {newSchool.school_minimum_gpa_recommended && (
            <>
                {gpaRecommended.map(gpa => (
                <>
                    <div className='w-full mt-3'>
                        <label className='text-xl'>{gpa.label}</label>
                        <div className='flex justify-start items-center gap-4 mt-4'>
                            <input className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' value={(newSchool[gpa.value as keyof School] as NumberInput).input} name={gpa.value} onChange={handleInputChange} />
                            <button name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
                                Add Note
                            </button>
                        </div>
                    </div>
                    {(newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                        <div className='flex justify-center items-start gap-2 mt-4'>
                            <div className="grow p-4 rounded-md border border-black">
                                <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                            <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                <button value={gpa.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                <button value={gpa.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                            </div>
                        </div>
                    ))}
                </>
                ))}
            </>
            )}
        </div>
        </>
        )}
        </>
    )
}