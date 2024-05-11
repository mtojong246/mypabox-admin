import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";

import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";
import { GoLink } from "react-icons/go";
import { UserObject } from "../../../types/users.types";
import { School } from "../../../types/schools.types";

export default function EditButtons({ loggedInUser, isEditMode, isEdit, input, link, name, toggleLinkPopup, setLinkObj, enableEditMode, confirmEdit, undoEdit, revertEdit, newSchool, setNewSchool }: { 
    loggedInUser: UserObject, 
    isEditMode: boolean, 
    isEdit: boolean,
    input: string | number | boolean | any[] | null, 
    link?: string,
    name: string,
    toggleLinkPopup?: (e: MouseEvent<HTMLButtonElement>) => void,
    setLinkObj?: Dispatch<SetStateAction<{link: string, name: string}>>,
    enableEditMode: (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => void,
    confirmEdit: (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => void,
    undoEdit: (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => void,
    revertEdit: (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => void,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,

}) {

    const [ canSeeButtons, setCanSeeButtons ] = useState(false);


    useEffect(() => {
        if (isEdit && (loggedInUser.permissions.canVerify || loggedInUser.permissions.canEditWithVerificationNeeded)) {
            setCanSeeButtons(true);
        } else {
            setCanSeeButtons(false);
        }
    }, [isEdit, loggedInUser]);

    return (
        <>
        {canSeeButtons && (
        <div className='flex flex-col justify-start items-start gap-2'>
            <div className='flex justify-start items-start gap-2'>
                {loggedInUser.permissions.canVerify && input !== null && (
                    <>
                        <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, name)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>
                        <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                    </>
                )}

                {loggedInUser.permissions.canEditWithVerificationNeeded && (
                    <>
                    {isEditMode ? (
                        <>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                        </>
                    ) : (
                        <>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e, newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            {input !== null && (
                                <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                            )}
                        </>
                    )}
                    </>
                )}
                
            </div>
            {link !== null && setLinkObj && toggleLinkPopup && (
                <>
                {loggedInUser.permissions.canEditWithVerificationNeeded && (
                    <>
                    {!link && isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                    {link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: link, name})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                )}

                {loggedInUser.permissions.canVerify && link && (
                    <a href={link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>
                )}
                </>
            )}
        </div>
        )}
        </>
        // <div className='flex flex-col justify-start items-start gap-2'>
        //     <div className='flex justify-start items-start gap-2'>
        //         {!loggedInUser.permissions.canVerify ? (
        //         <>
        //             {!isEditMode && <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
        //             {isEditMode && <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={input !== null ? input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
        //             {isEditMode && <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
        //             {(!isEditMode && input !== null) ? (<button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
        //         </>
        //         ) : (
        //         <>
        //             {input !== null && <button name={name} value={input.toString()} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, name)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
        //             {input !== null && <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
        //         </>
        //         )}
        //     </div>
        //     {!loggedInUser.permissions.canVerify && link !== null && setLinkObj && toggleLinkPopup && (
        //         <>
        //         {!link && isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
        //         {link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: link, name})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
        //     </>
        //     )}
        //     {loggedInUser.permissions.canVerify && link && <a href={link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
        // </div>
    )
}