import { School, Note } from "../../../../types/schools.types"
import { MouseEvent, SetStateAction, ChangeEvent } from "react"
import Select from 'react-select';

export default function SpecificCourse({ newSchool, deleteField, handleSelect, handleObjInput,openNotePopup, openEditPopup, handleDeletePopup, addField } : {
    newSchool: School,
    openNotePopup: (e: MouseEvent<HTMLButtonElement>, object?: boolean) => void, 
    openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void,
    handleDeletePopup: (e: any , i: SetStateAction<number>, input: string) => void,
    deleteField: (e: MouseEvent<HTMLButtonElement>, index: number, key: string) => void,
    addField: (e: MouseEvent<HTMLButtonElement>, key: string) => void,
    handleSelect: (e: any, name: string, index: number) => void,
    handleObjInput: (e: ChangeEvent<HTMLInputElement>, index: number) => void,

}) {
    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA for Specific Course</label>
            {newSchool.school_minimum_gpa_for_specific_course.map((field, i) => (
            <>
                <div className={`w-full mt-4 ${i > 0 && 'border-t border-[#DCDCDC] pt-4'}`}>
                    <div className='flex justify-between items-center'>
                        <label className='text-xl'>Course Name</label>
                        <button onClick={(e) => deleteField(e,i, 'school_minimum_gpa_for_specific_course')} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <Select
                    className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3" 
                    onChange={(e) => handleSelect(e, '', i)}/>

                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Required:</label>
                    <input onChange={(e) => handleObjInput(e, i)} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block" onClick={openNotePopup}>
                        Add Note
                    </button>
                </div>
            </>
            ))}
            <button className="w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={(e) => addField(e, 'school_minimum_gpa_for_specific_course')}>
                + Add New Field
            </button>
        </div>
    )
}