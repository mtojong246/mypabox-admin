import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, ChangeEvent, useState, MouseEvent } from "react"
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from "./ExperienceFunctions";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";
import BooleanFields from "../../Assets/BooleanFields";
import { UserObject } from "../../../../types/users.types";
import InputFields from "../../Assets/InputsFields";
import EditButtons from "../../Assets/EditButtons";
import useNotes from "../../../../hooks/useNotes";

export default function VolunteerService({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isReqOpen, setIsReqOpen ] = useState(false);
    const [ isRecOpen, setIsRecOpen ] = useState(false);


    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
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
        if (newSchool.edited_school_volunteer_service.input !== null) {
            setHasInputs(true);
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_volunteer_service.input]);

    

    useEffect(() => {
        if (newSchool.edited_school_volunteer_service.edited_school_volunteer_service_required.input === null) {
            if (newSchool.school_volunteer_service.school_volunteer_service_required) {
                setIsReqOpen(true)
            } else {
                setIsReqOpen(false)
            }
        } else {
            if (newSchool.edited_school_volunteer_service.edited_school_volunteer_service_required.input) {
                setIsReqOpen(true)
            } else {
                setIsReqOpen(false)
            }
        }

        if (newSchool.edited_school_volunteer_service.edited_school_volunteer_service_recommended.input === null) {
            if (newSchool.school_volunteer_service.school_volunteer_service_recommended) {
                setIsRecOpen(true)
            } else {
                setIsRecOpen(false)
            }
        } else {
            if (newSchool.edited_school_volunteer_service.edited_school_volunteer_service_recommended.input) {
                setIsRecOpen(true)
            } else {
                setIsRecOpen(false)
            }
        }
    }, [newSchool.edited_school_volunteer_service.edited_school_volunteer_service_required,newSchool.school_volunteer_service.school_volunteer_service_required, newSchool.school_volunteer_service.school_volunteer_service_recommended,
        newSchool.edited_school_volunteer_service.edited_school_volunteer_service_recommended])

    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {

            if (e.target.name === 'school_volunteer_service_required') {
                setNewSchool({
                    ...newSchool,
                    school_volunteer_service: {
                        ...newSchool.school_volunteer_service,
                        school_volunteer_service_required: e.target.checked,
                        school_minimum_volunteer_service_hours_required: e.target.checked ? {
                            input: 0,
                            school_minimum_volunteer_service_hours_required_notes: [],
                        } : null,
                    }
                })
            } else if (e.target.name === 'school_volunteer_service_recommended') {
                setNewSchool({
                    ...newSchool,
                    school_volunteer_service: {
                        ...newSchool.school_volunteer_service,
                        school_volunteer_service_recommended: e.target.checked,
                        school_minimum_volunteer_service_hours_recommended: e.target.checked ? {
                            input: 0,
                            school_minimum_volunteer_service_hours_recommended_notes: [],
                        } : null,
                    }
                })
            }

            
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                edited_school_volunteer_service: {
                    ...newSchool.edited_school_volunteer_service,
                    [name]: {
                        ...newSchool.edited_school_volunteer_service[name as keyof object] as object,
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    const handleInputGroup = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_volunteer_service[e.target.name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_volunteer_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_volunteer_service: {
                    ...newSchool.edited_school_volunteer_service,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_average_volunteer_service_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_volunteer_service: {
                    ...newSchool.edited_school_volunteer_service,
                    edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                        ...newSchool.edited_school_volunteer_service.edited_school_average_volunteer_service_hours_accepted_previous_cycle,
                        input: Number(e.target.value)
                    }
                }
            })
        }
    }

    return (
        <>
         <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_volunteer_service.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} />
        <Indicator label="Volunteer Service" editedInput={newSchool.edited_school_volunteer_service.input} />             
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_volunteer_service.school_volunteer_service_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Volunteer Service Required</label>   
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={newSchool.edited_school_volunteer_service.edited_school_volunteer_service_required.input}
                originalInput={newSchool.school_volunteer_service.school_volunteer_service_required} name='school_volunteer_service_required' handleCheck={handleCheck}
                />
            
                {isReqOpen && (
                <div className={`mt-7 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Volunteer Service Hours Required</label>   
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_required.input}
                        originalInput={ newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_required ? newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_required.input : null} name='school_minimum_volunteer_service_hours_required' handleInput={handleInputGroup}
                        />
                        <button onClick={(e) => {openAddNote(e, 'school_minimum_volunteer_service_hours_required', 'school_minimum_volunteer_service_hours_required_notes', 'school_volunteer_service')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    <AddNoteFields 
                    isEditMode={newSchool.edited_school_volunteer_service.isEditMode} 
                    notes={newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_required.notes ? newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_required.notes : null} 
                    originalNotes={newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_required ? newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes : null} 
                    name='school_minimum_volunteer_service_hours_required' 
                    noteName="school_minimum_volunteer_service_hours_required_notes" 
                    groupName="school_volunteer_service"
                    deleteNote={deleteNote} 
                    deleteNestedNote={deleteNestedNote}
                    openEditNote={openEditNote}
                        />
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_volunteer_service.school_volunteer_service_recommended ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Volunteer Service Recommended</label>   
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={newSchool.edited_school_volunteer_service.edited_school_volunteer_service_recommended.input}
                originalInput={newSchool.school_volunteer_service.school_volunteer_service_recommended} name='school_volunteer_service_recommended' handleCheck={handleCheck}
                />
                
                {isRecOpen && (
                <div className={`mt-7 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Volunteer Service Hours Recommended</label>   
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_recommended.input}
                        originalInput={newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_recommended ? newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.input : null} name='school_minimum_volunteer_service_hours_recommended'handleInput={handleInputGroup}
                        />
                        <button onClick={(e) => {openAddNote(e, 'school_minimum_volunteer_service_hours_recommended', 'school_minimum_volunteer_service_hours_recommended_notes', 'school_volunteer_service')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    <AddNoteFields 
                    isEditMode={newSchool.edited_school_volunteer_service.isEditMode} 
                    notes={newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_recommended.notes ? newSchool.edited_school_volunteer_service.edited_school_minimum_volunteer_service_hours_recommended.notes : null} 
                    originalNotes={newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_recommended ? newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes : null} 
                    name='school_minimum_volunteer_service_hours_recommended' 
                    noteName="school_minimum_volunteer_service_hours_recommended_notes" 
                    groupName="school_volunteer_service"
                    deleteNote={deleteNote} 
                    deleteNestedNote={deleteNestedNote}
                    openEditNote={openEditNote}
                        />
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Volunteer Service Hours Accepted Previous Cycle</label>   
                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={newSchool.edited_school_volunteer_service.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input}
                originalInput={newSchool.school_volunteer_service.school_average_volunteer_service_hours_accepted_previous_cycle} name='school_average_volunteer_service_hours_accepted_previous_cycle' handleInput={handleInput}
                />
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {openAddNote(e, 'school_volunteer_service', 'school_volunteer_service_general_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                
                <AddNoteFields 
                isEditMode={newSchool.edited_school_volunteer_service.isEditMode} 
                notes={newSchool.edited_school_volunteer_service.notes} 
                originalNotes={newSchool.school_volunteer_service.school_volunteer_service_general_notes} 
                name='school_volunteer_service' 
                noteName="school_volunteer_service_general_notes"
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                />
            </div>
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_volunteer_service.isEditMode} input={hasInputs} link={newSchool.edited_school_volunteer_service.link} toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj}
        newSchool={newSchool} setNewSchool={setNewSchool} name='school_volunteer_service' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup}
        />} 
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
        <AddNote groupName={groupName} editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
        )}
        </>
    )
}