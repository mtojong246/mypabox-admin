import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import { UserObject } from "../../../../types/users.types";

import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./CertificationFunctions";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";
import AddSelected from "../../Assets/AddSelected";
import useNotes from "../../../../hooks/useNotes";

const options = [
    {value: 'CPR', label: 'CPR'},
    {value: 'BLS', label: 'BLS'},
    {value: 'ACLS', label: 'ACLS'},
]

export default function Certifications({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ certification, setCertification ] = useState('');
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

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
        if (newSchool.edited_school_certifications_required.input !== null || newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_certifications_required]);

    useEffect(() => {
        if (newSchool.edited_school_certifications_required.input === null) {
            if (newSchool.school_certifications_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        } else {
            if (newSchool.edited_school_certifications_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }
    }, [newSchool.edited_school_certifications_required, newSchool.school_certifications_required])


    const handleCheck = (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    input: e.target.checked,
                    school_certifications_required_options: e.target.checked ? [] : null,
                }
            })

        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const addCertification = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (newSchool.school_certifications_required.school_certifications_required_options?.includes(certification)) return;
        if (!certification) return;
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.concat(certification)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    edited_school_certifications_required_options: {
                        ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                        input: newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input ? newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input.concat({
                            name: certification, isCorrect: true, isNew: true,
                        }) : [{name: certification, isCorrect: true, isNew: true}],
                    }
                }
            })
        }

        
    };

    const undoCertification = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();

        setNewSchool({
            ...newSchool,
            edited_school_certifications_required: {
                ...newSchool.edited_school_certifications_required,
                edited_school_certifications_required_options: {
                    ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                    input: newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.map((ind,i) => {
                        if (i === index) {
                            return { ...ind, isCorrect: true }
                        } else {
                            return { ...ind } 
                        }
                    })
                }
            }
        })
    }

    const deleteCertification = (e: MouseEvent<HTMLButtonElement>, index: number, isInputNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.filter((c,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    edited_school_certifications_required_options: {
                        ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                        input: isInputNew ? newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.filter((inp,i) => i !== index) : newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.map((ind,i) => {
                            if (i === index) {
                                return {
                                    ...ind,
                                    isCorrect: false,
                                }
                            } else {
                                return { ...ind }
                            }
                        }) 
                    }
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

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative grow max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_certifications_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} />
            <Indicator label="Certification Required" editedInput={hasInputs} />
            
                <div className={`w-full ${!isOpen ? 'flex justify-between items-center mt-0' : 'block mt-2'}`}>
                    
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={newSchool.edited_school_certifications_required.input} originalInput={newSchool.school_certifications_required.input}
                    name='school_certifications_required' handleCheck={handleCheck} />
                    
                    {!isOpen && (
                        <button onClick={(e:any) => openAddNote(e, 'school_certifications_required', 'school_certification_notes')} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    )}
                </div>
                {isOpen && (
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Certifications</label> 
                        <AddSelected loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input} 
                        setCertification={setCertification} addCertification={addCertification} deleteCertification={deleteCertification} stringArray={newSchool.school_certifications_required.school_certifications_required_options} 
                        objectArray={newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input} options={options} undoCertification={undoCertification}
                        />
                       
                    </div> 
                )}
                {newSchool.school_certifications_required.input && (
                <div className={`${newSchool.school_certifications_required.input ? 'mx-5 mb-5' : 'mx-0 mb-0'}`}>
                <label className='font-medium text-xl inline-block mt-8'>Notes:</label>
                <button onClick={(e:any) => openAddNote(e, 'school_certifications_required', 'school_certification_notes')} className="mt-2 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
               
                <AddNoteFields 
                    isEditMode={newSchool.edited_school_certifications_required.isEditMode} 
                    notes={newSchool.edited_school_certifications_required.notes} 
                    originalNotes={newSchool.school_certifications_required.school_certification_notes} 
                    name='school_certifications_required' 
                    noteName="school_certification_notes"
                    deleteNote={deleteNote}
                    openEditNote={openEditNote}
                    />
                </div>
                )}
                {newSchool.school_certifications_required.school_certification_notes && !newSchool.school_certifications_required.input && (
                   
                   <AddNoteFields 
                   isEditMode={newSchool.edited_school_certifications_required.isEditMode} 
                   notes={newSchool.edited_school_certifications_required.notes} 
                   originalNotes={newSchool.school_certifications_required.school_certification_notes} 
                   name='school_certifications_required' 
                   noteName="school_certification_notes"
                   deleteNote={deleteNote}
                   openEditNote={openEditNote}
                   />
                )}
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={hasInputs} name='edited_school_certifications_required' enableEditMode={enableEditModeGroup} 
            confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} link={newSchool.edited_school_certifications_required.link} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
            <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
            )}
        </>
    )
}