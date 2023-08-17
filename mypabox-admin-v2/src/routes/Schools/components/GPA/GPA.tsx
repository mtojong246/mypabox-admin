import { School, NumberInput, Note, OtherTypesOfGpaEvaluted, StringInput, BooleanInput, PreviousCycle } from "../../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, MouseEvent, useEffect } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Select from 'react-select';

//*******TO DO*******:
//  Add Note functionality for 'Other types of GPA Evaluated' and 'Average GPA Accepted Previous Cycle'
//  Create input fields for 'Minimum GPA for Specific Course'
//  Separated larger portions of code into separated components inside GPA folder 
//  Fixed radio input so that option stays highlighted after selected 

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

const typeOfGpa = [
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' }
]

const otherGpaDefault = {
    gpa_value_required_or_recommended: "required",
    minimum_gpa_value_needed: undefined,
    minimum_number_of_credits_evaluated: undefined,
    type_of_gpa_evaluated: "",
    notes: [],
}

export default function GPA({ newSchool, setNewSchool, openNotePopup, handleInputChange, openEditPopup, handleDeletePopup }: { 
    newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, 
    openNotePopup: (e: MouseEvent<HTMLButtonElement>, object?: boolean) => void, 
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void, 
    openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void,
    handleDeletePopup: (e: any , i: SetStateAction<number>, input: string) => void,
}) {

    useEffect(() => {
        // Resets inputs if value change to false
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

    // Handles input changes for objects with multiple fields 
    const handleObjInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const name = e.target.name;
        const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
        const updatedObj = {
            ...objToBeUpdated,
            [name]: value,
        }
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })

    }

    // Handles input change specifically for 'Average GPA Accepted Previous Cycle'
    const handlePreviousCycle = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool.school_average_gpa_accepted_previous_cycle[e.target.name as keyof PreviousCycle];
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [e.target.name as keyof PreviousCycle]: {
                    ...field,
                    input: e.target.value,
                }
            }
        })
    }
    
    // Handles boolean inputs 
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        setNewSchool({
            ...newSchool,
            [name]: e.target.checked,
        })
    }

    // Handles select inputs 
    const handleSelect = (e: any, name: string, index: number) => {
        const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
        const updatedObj = {
            ...objToBeUpdated,
            [name]: e.value,
        }
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })
    }

    // Adds field to objects 
    const addField = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedField = newSchool.school_other_types_of_gpa_evaluated.concat(otherGpaDefault);
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: updatedField,
        })
    }

    // Deletes specific field from objects 
    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const updatedField = newSchool.school_other_types_of_gpa_evaluated.filter((field, i)=> i !== index);
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: updatedField,
        })
    }

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
                            <div className='w-full mt-4'>
                                <label className='text-xl'>{gpa.label}</label>
                                <div className='flex justify-start items-center gap-4 mt-3'>
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
                    <div className='w-full mt-4'>
                        <label className='text-xl'>{gpa.label}</label>
                        <div className='flex justify-start items-center gap-4 mt-3'>
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

        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Other Types of GPA Evaluated</label> 
            {newSchool.school_other_types_of_gpa_evaluated.map((field, i) => (
            <>
                <div className={`w-full mt-4 ${i > 0 && 'border-t border-[#DCDCDC] pt-4'}`}>
                    <div className='flex justify-between items-center'>
                        <label className='text-xl'>Type of GPA Evaluated</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <Select options={typeOfGpa} 
                    value={newSchool.school_other_types_of_gpa_evaluated[i].type_of_gpa_evaluated ? {value: `${newSchool.school_other_types_of_gpa_evaluated[i].type_of_gpa_evaluated}`, label: `${newSchool.school_other_types_of_gpa_evaluated[i].type_of_gpa_evaluated}`} : null } 
                    className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3" 
                    onChange={(e) => handleSelect(e, 'type_of_gpa_evaluated', i)}/>
                    <p className='text-[#4573D2] text-sm mt-1 pl-3'>*Note: Type to create a new option</p>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>GPA Required or Recommended:</label>
                    <div className='flex justify-start items-center mt-3 gap-10 ml-3'>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i)} type='radio' name='gpa_value_required_or_recommended' value='requirement' className='mr-2'/>
                            <span className='text-xl'>Requirement</span>
                        </div>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i)} type='radio' name='gpa_value_required_or_recommended' value='recommended' className='mr-2'/>
                            <span className='text-xl'>Recommended</span>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Valued Needed:</label>
                    <input onChange={(e) => handleObjInput(e, i)} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block' value={field.minimum_gpa_value_needed} name='minimum_gpa_value_needed'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum Number of Credits Evaluated:</label>
                    <input onChange={(e) => handleObjInput(e, i)} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block' value={field.minimum_number_of_credits_evaluated} name='minimum_number_of_credits_evaluated' />
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button value='school_other_types_of_gpa_evaluated' name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block" onClick={openNotePopup}>
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map(note => (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded-md border border-black">
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                            <button value='school_other_types_of_gpa_evaluated' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                            <button value='school_other_types_of_gpa_evaluated' onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                ))}
            </>
            ))}  
            <button className="w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={addField}>
                + Add New Field
            </button>
        </div>

        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA for Specific Course</label>   
            <div className='w-full mt-4'>
                
            </div>
        </div>

        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Average GPA Accepted Previous Cycle</label>   
            {previousCycle.map(gpa => (
                <>
                    <div className='w-full mt-4'>
                        <label className='text-xl'>{gpa.label}</label>
                        <div className='flex justify-start items-center gap-4 mt-3'>
                            <input className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' value={(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input} name={gpa.value} onChange={handlePreviousCycle} />
                            <button name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
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
                                <button value={gpa.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                <button value={gpa.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                            </div>
                        </div>
                    ))}
                </>
                ))}               
            </div>
        </>
        )}
        </>
    )
}