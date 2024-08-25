import { School } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";
import LinkPopup from "../../LinkPopup";

import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./ApplicationFunctions";
import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import BooleanFieldsGroup from "../../Assets/BooleanFieldsGroup";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import useNotes from "../../../../hooks/useNotes";

export default function SupplementalApplications({ newSchool, setNewSchool, loggedInUser, isEdit, handleInputInCategory }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean,
     handleInputInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void}) {
 
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const {
        deleteNote,
        openAddNote,
        openEditNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
    } = useNotes({newSchool, setNewSchool});

    useEffect(() => {
        if (newSchool.school_supplemental_application_required.input) {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: newSchool.school_supplemental_application_required.school_supplemental_application_deadline ? newSchool.school_supplemental_application_required.school_supplemental_application_deadline : '',
                    school_supplemental_application_fee: newSchool.school_supplemental_application_required.school_supplemental_application_fee ? newSchool.school_supplemental_application_required.school_supplemental_application_fee : 0,
                    school_supplemental_application_link: newSchool.school_supplemental_application_required.school_supplemental_application_link ? newSchool.school_supplemental_application_required.school_supplemental_application_link : '',
                    school_supplemental_application_link_provided_with_invite_only: newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only : false,
                    school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes ? newSchool.school_supplemental_application_required.school_supplemental_application_notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: null,
                    school_supplemental_application_fee: null,
                    school_supplemental_application_link: null,
                    school_supplemental_application_link_provided_with_invite_only: null,
                    school_supplemental_application_notes: []
                }
            })
        }
    }, [newSchool.school_supplemental_application_required.input]);

    useEffect(() => {
        if (newSchool.edited_school_supplemental_application_required.input === null) {
            if (newSchool.school_supplemental_application_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_supplemental_application_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        }
}, [newSchool.edited_school_supplemental_application_required, newSchool.school_supplemental_application_required]);

    useEffect(() => {
        if (newSchool.edited_school_supplemental_application_required.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.input !== null 
            || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.input !== null
        ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_supplemental_application_required])

    

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

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.currentTarget.name}` as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        }
        
    };

    const handleCheckInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        const field = newSchool[category as keyof School] as object;
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
        
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [name]: {
                        ...field[name as keyof object] as object,
                        input: e.target.checked,
                    }
                }
            })
        }
    }

    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_supplemental_application_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} />
            <Indicator label="Supplemental Application Required" editedInput={newSchool.edited_school_supplemental_application_required.input} />
                   <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_supplemental_application_required.input} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} originalInput={newSchool.school_supplemental_application_required.input}
                   name='school_supplemental_application_required' handleCheck={handleCheck}
                   />
               
                    {isOpen && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Deadline</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_deadline} name='school_supplemental_application_deadline' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_deadline!} name='school_supplemental_application_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Fee</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_fee} name='school_supplemental_application_fee' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                           
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_link} name='school_supplemental_application_link' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_link!} name='school_supplemental_application_link' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link Provided With Invite Only</label> 
                            <BooleanFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.input} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.isEditMode}
                            name='school_supplemental_application_link_provided_with_invite_only' originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only} category="school_supplemental_application_required" handleCheck={handleCheckInCategory}
                            />
                          
                        </div> 
                    </>
                )}
                {isOpen && (
                <div className={`mx-5 mb-5`}>
                <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
                <button onClick={(e:any) => openAddNote(e, 'school_supplemental_application_required', 'school_supplemental_application_notes')} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                
                <AddNoteFields 
                isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} 
                notes={newSchool.edited_school_supplemental_application_required.notes} 
                originalNotes={newSchool.school_supplemental_application_required.school_supplemental_application_notes} 
                name='school_supplemental_application_required' 
                noteName="school_supplemental_application_notes"
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                    />
                </div>
                )}
            </div>
            {isEdit && 
            <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} name="school_supplemental_application_required" 
            link={newSchool.edited_school_supplemental_application_required.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool}
            setNewSchool={setNewSchool} toggleLinkPopup={toggleLinkPopup}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
        <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
        )}
        </>
    )
}