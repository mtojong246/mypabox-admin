import { School, NumberInput, Note, OtherTypesOfGpaEvaluted, StringInput, BooleanInput, PreviousCycle, MinimumGpaSpecificCourse } from "../../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, MouseEvent, useEffect } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import OtherTypesOfGpa from "./OtherTypesOfGpa";
import SpecificCourse from "./SpecificCourse";

//*******TO DO*******:
//  Add Note functionality for 'Other types of GPA Evaluated' and 'Average GPA Accepted Previous Cycle'
//  Create input fields for 'Minimum GPA for Specific Course'
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


const otherGpaDefault = {
    gpa_value_required_or_recommended: "required",
    minimum_gpa_value_needed: 0,
    minimum_number_of_credits_evaluated: 0,
    type_of_gpa_evaluated: "",
    notes: [],
}

const specificCourseDefault = {
    minimum_gpa_required_for_course: 0,
    courseID: "",
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
                    input: 0,
                    notes: [],
                },
                school_minimum_science_gpa_required: {
                    input: 0,
                    notes: []
                },
                school_minimum_prerequisite_gpa_required: {
                    input: 0,
                    notes: []
                }
            })
        }

        if (!newSchool.school_minimum_gpa_recommended) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_recommended: {
                    input: 0,
                    notes: [],
                },
                school_minimum_science_gpa_recommended: {
                    input: 0,
                    notes: []
                },
                school_minimum_prerequisite_gpa_recommended: {
                    input: 0,
                    notes: []
                }
            })
        }
    }, [newSchool.school_minimum_gpa_required, newSchool.school_minimum_gpa_recommended])

    // Handles input changes for objects with multiple fields 
    const handleObjInput = (e: ChangeEvent<HTMLInputElement>, index: number, key: string) => {
        const value = e.target.value;
        const name = e.target.name;
        let objToBeUpdated = {};
        if (key === "school_other_types_of_gpa_evaluated") {
            objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
        } else {
            objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === index) as MinimumGpaSpecificCourse;
        }

        const updatedObj = {
            ...objToBeUpdated,
            [name]: value,
        }
        setNewSchool({
            ...newSchool,
            [key]: (newSchool[key as keyof School] as OtherTypesOfGpaEvaluted[] | MinimumGpaSpecificCourse[]).map((field, i) => {
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
    const handleSelect = (e: any, name: string, index: number, key: string) => {
        let objToBeUpdated = {};
        if (key === "school_other_types_of_gpa_evaluated") {
            objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
        } else {
            objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === index) as MinimumGpaSpecificCourse;
        }
        const updatedObj = {
            ...objToBeUpdated,
            [name]: e.value,
        }
        setNewSchool({
            ...newSchool,
            [key]: (newSchool[key as keyof School] as OtherTypesOfGpaEvaluted[] | MinimumGpaSpecificCourse[]).map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })
    }

    // Adds field to objects 
    const addField = (e: MouseEvent<HTMLButtonElement>, key: string) => {
        e.preventDefault();
        let updatedField = [];
        if (key === "school_other_types_of_gpa_evaluated") {
            updatedField = newSchool.school_other_types_of_gpa_evaluated.concat(otherGpaDefault);
        } else {
            updatedField = newSchool.school_minimum_gpa_for_specific_course.concat(specificCourseDefault);
        }
        setNewSchool({
            ...newSchool,
            [key]: updatedField,
        })
    }

    // Deletes specific field from objects 
    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number, key: string) => {
        e.preventDefault();
        let updatedField = [];
        if (key === 'school_other_types_of_gpa_evaluated') {
            updatedField = newSchool.school_other_types_of_gpa_evaluated.filter((field, i)=> i !== index);
        } else {
            updatedField = newSchool.school_minimum_gpa_for_specific_course.filter((field, i) => i !== index)
        }
        setNewSchool({
            ...newSchool,
            [key]: updatedField,
        })
    }

    console.log(newSchool.school_other_types_of_gpa_evaluated, newSchool.school_minimum_gpa_for_specific_course)

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

        <OtherTypesOfGpa newSchool={newSchool} deleteField={deleteField} handleSelect={handleSelect} handleObjInput={handleObjInput} openNotePopup={openNotePopup} 
        openEditPopup={openEditPopup} handleDeletePopup={handleDeletePopup} addField={addField}/>

        <SpecificCourse newSchool={newSchool} deleteField={deleteField} handleSelect={handleSelect} handleObjInput={handleObjInput} openNotePopup={openNotePopup} 
        openEditPopup={openEditPopup} handleDeletePopup={handleDeletePopup} addField={addField}/>

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