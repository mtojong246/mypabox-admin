import { MouseEvent } from "react"
import { UserObject } from "../../../../types/users.types";
import { AiOutlineClose,  } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";

export default function TypeOfDegree({ loggedInUser, isEditMode, input, originalInput, deleteFunc, undoFunc } : { 
    loggedInUser: UserObject,
    isEditMode: boolean,
    input: {
        name: string,
        isCorrect: boolean,
        isNew: boolean,
    }[] | null,
    originalInput: string[],
    deleteFunc: (e: MouseEvent<HTMLButtonElement>, index: number, isInputNew: boolean, isEditedInput: boolean) => void,
    undoFunc: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
 }) {




    return (
        <>
        {input !== null && input.length > 0 && input.map((field,i) => (
                <div className={`${field.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} flex justify-between items-center border  rounded mt-3 py-2 pl-3 pr-2`}>
                    <p className={`font-medium ${!field.isCorrect && !field.isNew ? 'line-through' : 'no-underline'}`}>{field.name}</p>
                    {!field.isCorrect && !field.isNew ? (
                        <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoFunc(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                    ) : (
                        <button onClick={(e:any) => deleteFunc(e,i, field.isNew, isEditMode)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    )}
                </div>
        ))}

        {input === null && originalInput.length > 0 && originalInput.map((field,i) => (
                <div className='flex justify-between items-center border border-[#B4B4B4] rounded mt-3 py-2 pl-3 pr-2'>
                    <p className='font-medium'>{field}</p>
                    <button onClick={(e:any) => deleteFunc(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            ))}

        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            {input.length ? input.map((field,i) => (
                <div className={`${field.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} flex justify-between items-center border  rounded mt-3 py-2 pl-3 pr-2`}>
                    <p className={`font-medium ${!field.isCorrect && !field.isNew ? 'line-through' : 'no-underline'}`}>{field.name}</p>
                    <button disabled onClick={(e:any) => deleteFunc(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            )): null}
            </>
            ): (
            <>
            {originalInput.length ? originalInput.map((field,i) => (
                <div className='flex justify-between items-center border border-[#B4B4B4] rounded mt-3 py-2 pl-3 pr-2'>
                    <p className='font-medium'>{field}</p>
                    <button onClick={(e:any) => deleteFunc(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            )): null}
            </>
            )}
            </>
        ): (
            <>
            {input !== null ? (
            <>
            {input.length ? input.map((field,i) => (
                <div className={`${field.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} flex justify-between items-center border  rounded mt-3 py-2 pl-3 pr-2`}>
                    <p className={`font-medium ${!field.isCorrect && !field.isNew ? 'line-through' : 'no-underline'}`}>{field.name}</p>
                    {!field.isCorrect && !field.isNew ? (
                        <button disabled={isEditMode ? false : true} onClick={(e:MouseEvent<HTMLButtonElement>) => undoFunc(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                    ) : (
                        <button disabled={isEditMode ? false : true} onClick={(e:any) => deleteFunc(e,i, field.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    )}
                </div>
            )): null}
            </>
            ): (
            <>
            {originalInput.length ? originalInput.map((field,i) => (
                <div className='flex justify-between items-center border border-[#B4B4B4] rounded mt-3 py-2 pl-3 pr-2'>
                    <p className='font-medium'>{field}</p>
                    <button disabled onClick={(e:any) => deleteFunc(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            )): null}
            </>
            )}
            </>
            )} */}
        </>
    )
}