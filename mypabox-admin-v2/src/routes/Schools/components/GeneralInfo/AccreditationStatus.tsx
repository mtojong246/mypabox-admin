import { Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School } from "../../../../types/schools.types";
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";
import SelectFields from "../../Assets/SelectFields";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit} from "./GeneralInfoFunctions";
import { UserObject } from "../../../../types/users.types";
import useNotes from "../../../../hooks/useNotes";


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
    { label: 'Select', value: '', target: {name: "school_accreditation_status", type: 'text', value: '' }},
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
    { label: 'Developing - Not Accredited', value: 'Developing - Not Accredited', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Developing - Not Accredited' }},
  ]

export default function AccreditationStatus({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const {
        deleteNote,
        openAddNote,
        openEditNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
    } = useNotes({newSchool, setNewSchool});

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }


    const handleSelect = (e: any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_accreditation_status: {
                    ...newSchool.school_accreditation_status,
                    input: e.value,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_accreditation_status: {
                    ...newSchool.edited_school_accreditation_status,
                    input: e.value,
                }
            })
        }
        
    };


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
    }

    const original = 'school_accreditation_status'
    const field = newSchool.edited_school_accreditation_status;
    const originalField = newSchool.school_accreditation_status;

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={field.input} loggedInUser={loggedInUser} isEditMode={field.isEditMode} />
                <Indicator label="Accreditation Status" editedInput={field.input} />
                <div className='flex justify-center items-start gap-3'>
                <SelectFields isEdit={isEdit}  loggedInUser={loggedInUser} input={field.input} originalInput={originalField.input} isEditMode={field.isEditMode} handleSelect={handleSelect}
                options={options}  category={original} name={original}/>
                
                    
                    <button onClick={(e:any) => {openAddNote(e, 'school_accreditation_status')}} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                <AddNoteFields 
                isEditMode={newSchool.edited_school_accreditation_status.isEditMode} 
                notes={newSchool.edited_school_accreditation_status.notes} 
                originalNotes={newSchool.school_accreditation_status.notes} 
                name='school_accreditation_status' 
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                />
                
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={field.isEditMode} input={field.input} link={field.link} 
                   setLinkObj={setLinkObj} name={original} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {isNoteOpen && (
            <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
            )}
        </>
    )
}