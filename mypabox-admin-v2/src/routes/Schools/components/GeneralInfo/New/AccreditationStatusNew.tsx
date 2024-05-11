import { Dispatch, SetStateAction } from "react";
import { School, Note, EditedField } from "../../../../../types/schools.types";
import SelectFields from "../../../Fields/SelectFields";
import AddUpdateNote from "../../../Fields/AddUpdateNote";
import NoteFields from "../../../Fields/NoteFields";
import Screen from "../../../../../components/Screen";
import Indicator from "../../../../../components/Indicator";
import { isDisabled } from "../../../../../data/functions";


import EditButtons from "../../../Fields/EditButtons";
import { UserObject } from "../../../../../types/users.types";
import useInput from "../../../../../app/hooks/useInput";
import useNotes from "../../../../../app/hooks/useNotes";


export interface Option {
    label: string;
    value: string;
    target: {
        name: string;
        type: string;
        value: string;
    }
}

export const options: Option[] = [
    { label: 'Provisional', value: 'Provisional', target: {name: "school_accreditation_status", type: 'text', value: 'Provisional' }},
    { label: 'Continued', value: 'Continued', target: {name: "school_accreditation_status", type: 'text', value: 'Continued' }},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Clinical Postgraduate Program' }},
    { label: 'Probation', value: 'Probation', target: {name: "school_accreditation_status", type: 'text', value: 'Probation' }},
    { label: 'Administrative Probation', value: 'Administrative Probation', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Administrative Probation' }},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withheld' }},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withdrawn' }},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Voluntary Inactive Status' }},
  ]

export default function AccreditationStatusNew({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const {
        handleSelectInput,
    } = useInput({ newSchool, setNewSchool });

    const {
        addNoteObj,
        updateNoteObj,
        deleteNoteObj,
        addNewNote,
        isNoteOpen,
        toggleNotePopup,
        noteInfoObj,
        setNoteInfoObj,
    } = useNotes({ newSchool, setNewSchool });

    const getSelectValue = (value: string) => {
        const field = newSchool[value as keyof School];
        const input = field['input' as keyof object];

        if (input === null) {
            return null;
        } else {
            return { value: input, label: input };
        }
        
    }


    const infoFields = {
        label: 'Accreditation Status',
        name: 'school_accreditation_status'
    }

    const { label, name } = infoFields
    const field = newSchool[name as keyof School];
    const editedField = newSchool[`edited_${name}` as keyof School] as EditedField;
    const notes = 'notes' as keyof object;
    const noteValue = field[notes] as Note[]
    const editedNoteValue = editedField[notes] as Note[] | null;
    const editedValue = editedField.input

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={editedValue} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
            <Indicator label={label} editedInput={editedValue} />
                <div className='flex justify-center items-start gap-3'>
                    <SelectFields options={options} label={label} name={name} value={getSelectValue(name)!} editedValue={getSelectValue(`edited_${name}`)} handleInputChange={handleSelectInput} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                    
                    <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true)} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} 
                newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />

            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} name={name} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool} />}
        </div>
        {isNoteOpen && <AddUpdateNote noteInfoObj={noteInfoObj} setNoteInfoObj={setNoteInfoObj} toggleNotePopup={toggleNotePopup} updateNote={updateNoteObj} addNote={addNoteObj}/>}
        </>
    )
}