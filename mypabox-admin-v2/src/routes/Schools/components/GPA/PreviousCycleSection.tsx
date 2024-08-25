
import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent, useEffect } from "react";
import { School, Note, NumberInput, PreviousCycle } from "../../../../types/schools.types";


import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GPAFunctions";
import EditButtons from "../../Assets/EditButtons";
import InputFields from "../../Assets/InputsFields";
import useNotes from "../../../../hooks/useNotes";

const previousCycle = [
    {
        label: 'Average Overall GPA Accepted:',
        value: 'average_overall_gpa_accepted_previous_year'
    },
    {
        label: 'Average BCP GPA Accepted',
        value: 'average_bcp_gpa_accepted_previous_year'
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

export default function PreviousCycleSection({newSchool, setNewSchool, loggedInUser, isEdit, handleInputInCategory}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>
    loggedInUser: UserObject,
    isEdit: boolean,
    handleInputInCategory: (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void,
}) {
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const {
        deleteNote,
        openAddNote,
        openEditNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
        groupName,
        deleteNestedNote,
    } = useNotes({newSchool, setNewSchool})

    useEffect(() => {
        if (newSchool.edited_school_average_gpa_accepted_previous_cycle.input !== null) {
                setHasInputs(true)
            } else {
                setHasInputs(null)
            }
    }, [newSchool.edited_school_average_gpa_accepted_previous_cycle.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof object;
            const field = newSchool.school_average_gpa_accepted_previous_cycle[name] as NumberInput;
            setNewSchool({
                ...newSchool,
                school_average_gpa_accepted_previous_cycle: {
                    ...newSchool.school_average_gpa_accepted_previous_cycle,
                    [name]: {
                        ...field,
                        input: e.target.value
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_average_gpa_accepted_previous_cycle[name as keyof object] as {input: number | null;
                prev: number | null;
                isEditMode: boolean;}

            setNewSchool({
                ...newSchool,
                edited_school_average_gpa_accepted_previous_cycle: {
                    ...newSchool.edited_school_average_gpa_accepted_previous_cycle,
                    [name]: {
                        ...field,
                        input: e.target.value
                    }
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
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_average_gpa_accepted_previous_cycle.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_average_gpa_accepted_previous_cycle.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Average GPA Accepted Previous Cycle<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                {previousCycle.map((gpa,i) => {
                    const name = `edited_${gpa.value}` as keyof object;
                    const field = newSchool.edited_school_average_gpa_accepted_previous_cycle[name] as {input: number | null, prev: number | null, isEditMode: boolean, notes: Note[] | null};
                    const originalField = newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] 
                    return (
                    <>
                        <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                            <div className='flex justify-start items-start gap-4'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={field.input} isEditMode={field.isEditMode} originalInput={originalField.input} name={gpa.value} handleInput={handleInput}/>
                                {/* <input className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' value={(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input ? (newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input : ''} name={gpa.value} onChange={handleInput} /> */}
                                <button className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]"
                                onClick={(e) => {openAddNote(e, gpa.value, undefined, 'school_average_gpa_accepted_previous_cycle')}}>
                                    Add Note
                                </button>
                            </div>
                        
                            <AddNoteFields  
                            isEditMode={field.isEditMode} 
                            notes={field.notes}
                            originalNotes={originalField ? originalField.notes : null} 
                            name={gpa.value} 
                            groupName="school_average_gpa_accepted_previous_cycle"
                            deleteNote={deleteNote}  
                            deleteNestedNote={deleteNestedNote}  
                            openEditNote={openEditNote}
                            />
                        </div>
                        <div className='w-full mb-4'></div>
                    </>
                    )
                    })}               
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_average_gpa_accepted_previous_cycle.isEditMode} link={newSchool.edited_school_average_gpa_accepted_previous_cycle.link} setLinkObj={setLinkObj}
            toggleLinkPopup={toggleLinkPopup} name='school_average_gpa_accepted_previous_cycle' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
        <AddNote groupName={groupName} editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
        )}
        </>
    )
}