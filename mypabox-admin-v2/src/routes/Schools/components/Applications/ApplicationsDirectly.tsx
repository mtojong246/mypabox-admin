import { School } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import { UserObject } from "../../../../types/users.types";

import LinkPopup from "../../LinkPopup";
import BooleanFields from "../../Assets/BooleanFields";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import EditButtons from "../../Assets/EditButtons";

import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./ApplicationFunctions";
import useNotes from "../../../../hooks/useNotes";

export default function ApplicationsDirectly({ newSchool, setNewSchool, loggedInUser, isEdit, handleInputInCategory}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean, 
    handleInputInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void }) {
   
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
    } = useNotes({newSchool, setNewSchool});

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);    

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }



    useEffect(() => {
        if (newSchool.school_application_submitted_directly_to_school.input) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : '',
                    school_application_direct_to_school_fee: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee : 0,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes : []
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: null,
                    school_application_direct_to_school_fee: null,
                    school_application_direct_to_school_notes: []
                }
            })
            console.log(newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline)
        }
    }, [newSchool.school_application_submitted_directly_to_school.input]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_directly_to_school.input === null) {
            if (newSchool.school_application_submitted_directly_to_school.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_application_submitted_directly_to_school.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        }
}, [newSchool.edited_school_application_submitted_directly_to_school, newSchool.school_application_submitted_directly_to_school]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_directly_to_school.input !== null || newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_deadline.input !== null || newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.input !== null 
        ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_application_submitted_directly_to_school]);



    

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
            
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    input: e.target.checked,
                    school_application_direct_to_school_deadline: e.target.checked ? '' : null,
                    school_application_direct_to_school_fee: e.target.checked ? '' : null,
                    school_application_direct_to_school_notes: [],
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

    return (
        <>
        {/* // <div className={`${newSchool.school_application_submitted_on_caspa.input && newSchool.edited_school_application_submitted_directly_to_school.input === null && loggedInUser.permissions.canVerify ? 'hidden' : 'block'}`}> */}
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_application_submitted_directly_to_school.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} />
            <Indicator label="Application Submitted Directly To School" editedInput={newSchool.edited_school_application_submitted_directly_to_school.input} />
    
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} originalInput={newSchool.school_application_submitted_directly_to_school.input} 
                    name='school_application_submitted_directly_to_school' handleCheck={handleCheck}
                    />
                
                    {isOpen && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_deadline.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.isEditMode}
                            originalInput={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline} name='school_application_direct_to_school_deadline' category="school_application_submitted_directly_to_school" handleInput={handleInputInCategory}
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : ''} name='school_application_direct_to_school_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Fee</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.isEditMode} 
                            originalInput={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee} name='school_application_direct_to_school_fee' category="school_application_submitted_directly_to_school" handleInput={handleInputInCategory}
                            />
                          
                        </div> 
                    </>
                )}
                {isOpen && (
                <div className={`mx-5 mb-5`}>
                <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
                <button onClick={(e:any) => openAddNote(e, 'school_application_submitted_directly_to_school', 'school_application_direct_to_school_notes')} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                
                <AddNoteFields 
                isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} 
                notes={newSchool.edited_school_application_submitted_directly_to_school.notes} 
                originalNotes={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes} 
                name='school_application_submitted_directly_to_school' 
                noteName="school_application_direct_to_school_notes"
                    deleteNote={deleteNote} 
                    openEditNote={openEditNote}
                    />
                </div>
                )}
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} name='school_application_submitted_directly_to_school' link={newSchool.edited_school_application_submitted_directly_to_school.link}
            setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
        <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
        )}
        {/* // </div> */}
        </>
    )
}