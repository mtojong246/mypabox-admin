import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, StringInput } from "../../../../types/schools.types";
import { UserObject } from "../../../../types/users.types";
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import useNotes from "../../../../hooks/useNotes";

export default function Tuition({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

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

    

    const handleInput = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        let name = '';
        let field = null;
        if (!isEditedInput) {
            name = e.target.name as keyof School;
            field = newSchool[name as keyof School] as StringInput;
        } else {
            name = `edited_${e.target.name}` as keyof School;
            field = newSchool[name as keyof School] as object;
        }
        if (e.target.value === '') {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.value,
                }
            })
        } else {
            const conversion = parseInt(e.target.value.replace(/,/g, ''));
            if (isNaN(conversion)) {
                return
            } else {
                const value = conversion.toLocaleString();
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        input: value,
                    }
                })
            }
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
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_in_state_tuition.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_in_state_tuition.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">In-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_in_state_tuition.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_in_state_tuition.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_in_state_tuition.input} isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} originalInput={newSchool.school_in_state_tuition.input} name='school_in_state_tuition' category="school_in_state_tuition" isMoney={true} handleInput={handleInput}/>
                    <button onClick={(e:any) => {openAddNote(e, 'school_in_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                
                <AddNoteFields 
                isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} 
                notes={newSchool.edited_school_in_state_tuition.notes} 
                originalNotes={newSchool.school_in_state_tuition.notes} 
                name='school_in_state_tuition' 
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} input={newSchool.edited_school_in_state_tuition.input} link={newSchool.edited_school_in_state_tuition.link} 
                setLinkObj={setLinkObj} name='school_in_state_tuition' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_out_of_state_tuition.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_out_of_state_tuition.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Out-of-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_out_of_state_tuition.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_out_of_state_tuition.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_out_of_state_tuition.input} isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} originalInput={newSchool.school_out_of_state_tuition.input} name='school_out_of_state_tuition' category="school_out_of_state_tuition" isMoney={true} handleInput={handleInput}/>
                    <button onClick={(e:any) => {openAddNote(e, 'school_out_of_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
               
                <AddNoteFields 
                isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} 
                notes={newSchool.edited_school_out_of_state_tuition.notes} 
                originalNotes={newSchool.school_out_of_state_tuition.notes} 
                name='school_out_of_state_tuition'
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} input={newSchool.edited_school_out_of_state_tuition.input} link={newSchool.edited_school_out_of_state_tuition.link} 
                setLinkObj={setLinkObj} name='school_out_of_state_tuition' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>


        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_in_state.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_seat_deposit_in_state.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (In-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_in_state.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_in_state.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_seat_deposit_in_state.input} isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} originalInput={newSchool.school_seat_deposit_in_state.input} name='school_seat_deposit_in_state' category="school_seat_deposit_in_state" isMoney={true} handleInput={handleInput}/>    
                    <button onClick={(e:any) => {openAddNote(e, 'school_seat_deposit_in_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                
                <AddNoteFields 
                isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} 
                notes={newSchool.edited_school_seat_deposit_in_state.notes} 
                originalNotes={newSchool.school_seat_deposit_in_state.notes} 
                name='school_seat_deposit_in_state' 
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} input={newSchool.edited_school_seat_deposit_in_state.input} link={newSchool.edited_school_seat_deposit_in_state.link} 
                   setLinkObj={setLinkObj} name='school_seat_deposit_in_state' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_out_of_state.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_seat_deposit_out_of_state.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (Out-of-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_out_of_state.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_out_of_state.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_seat_deposit_out_of_state.input} isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} originalInput={newSchool.school_seat_deposit_out_of_state.input} name='school_seat_deposit_out_of_state' category="school_seat_deposit_out_of_state" isMoney={true} handleInput={handleInput}/>                    
                    <button onClick={(e:any) => {openAddNote(e, 'school_seat_deposit_out_of_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
              
                <AddNoteFields 
                isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} 
                notes={newSchool.edited_school_seat_deposit_out_of_state.notes} 
                originalNotes={newSchool.school_seat_deposit_out_of_state.notes} 
                name='school_seat_deposit_out_of_state' 
                deleteNote={deleteNote}
                openEditNote={openEditNote}
                />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} input={newSchool.edited_school_seat_deposit_out_of_state.input} link={newSchool.edited_school_seat_deposit_out_of_state.link} 
                   setLinkObj={setLinkObj} name='school_seat_deposit_out_of_state' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
        </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {isNoteOpen && (
            <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
            )}
        </>
    )
}