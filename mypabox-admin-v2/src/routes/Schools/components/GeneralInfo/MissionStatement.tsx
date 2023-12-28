import { School } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useState, MouseEvent } from "react";
import ReactQuill from "react-quill";
import { UserObject } from "../../../../types/users.types";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";

export default function MissionStatement({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }
    const handleQuill = (e:any, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_mission_statement: {
                    input: e,
                },
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_mission_statement: {
                    ...newSchool.edited_school_mission_statement,
                    input: e,
                },
            })
        }
        
    };

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            [linkObj.name]: {
                ...newSchool[linkObj.name as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }

    console.log(newSchool.school_mission_statement)
    
    return (
        <>
        <div className={`mt-10`}>
            <label className="text-xl flex justify-start items-center">Mission Statement<PiCheckCircle className={`h-5 w-5 ml-[5px] ${!newSchool.edited_school_mission_statement.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_mission_statement.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
            <div className='w-full flex justify-start items-start gap-3 mt-4'>
                <div className={`text-xl max-w-[900px] grow`}>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {newSchool.edited_school_mission_statement.input ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <ReactQuill readOnly className='h-60 mb-16 rounded-2xl w-full' theme="snow" value={newSchool.edited_school_mission_statement.input}
                            />
                            <ReactQuill readOnly className={`h-60 rounded-2xl w-full ${newSchool.edited_school_mission_statement.input ? 'line-through' : 'no-underline'}`} theme="snow" value={newSchool.school_mission_statement.input}
                            />
                        </div>
                        ) : (
                            <ReactQuill className='h-60 rounded-2xl w-full' theme="snow" value={newSchool.school_mission_statement.input}
                            onChange={(e:any) => handleQuill(e, false)}/>
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(newSchool.edited_school_mission_statement.input || newSchool.edited_school_mission_statement.isEditMode) && <ReactQuill readOnly={newSchool.edited_school_mission_statement.isEditMode ? false : true} className='h-60 mb-16 rounded-2xl w-full' theme="snow" value={newSchool.edited_school_mission_statement.input ? newSchool.edited_school_mission_statement.input : ''}
                            onChange={(e:any) => handleQuill(e, true)}/>}
                            <ReactQuill readOnly className={`h-60 rounded-2xl w-full ${newSchool.edited_school_mission_statement.input ? 'line-through' : 'no-underline'}`} theme="snow" value={newSchool.school_mission_statement.input}
                            />
                        </div>
                    )}
                    
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_mission_statement.isEditMode} input={newSchool.edited_school_mission_statement.input} link={newSchool.edited_school_mission_statement.link} 
                   setLinkObj={setLinkObj} name='school_mission_statement' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        </>
    )
}