import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types"

export default function BooleanFieldsGroup({ loggedInUser, input, isEditMode, originalInput, name, category, handleCheck } : { 
    loggedInUser: UserObject,
    input: boolean | null,
    isEditMode: boolean,
    originalInput: boolean | null,
    name: string,
    category: string,
    handleCheck: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void, 

 }) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='mt-2 mb-[6px] grow'>
                <div className='flex justify-start items-start gap-6'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={input ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">
                        {input ? 'True' : 'False'}
                        </span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={originalInput ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className={`ml-3 text-xl text-black ${input !== null ? 'line-through' : 'no-underline'}`}>
                        {originalInput ? 'True' : 'False'}
                        </span>
                    </label>
                </div>
            </div>
            ): (
            <div className='mt-2 grow'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, category, false)} checked={originalInput ? true : false}  />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">
                    {originalInput ? 'True' : 'False'}
                    </span>
                </label>
            </div>
            )}
            </>
        ): (
            <div className='grow mt-2 mb-[6px]'>
                <div className=' flex justify-start items-start gap-6'>
                    {(input !== null || isEditMode) && <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled={isEditMode ? false : true} className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, `edited_${category}`, true)} checked={input ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">
                        {input ? 'True' : 'False'}
                        </span>
                    </label>}
                    {input !== originalInput ? <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={originalInput ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className={`ml-3 text-xl text-black ${input !== null || isEditMode ? 'line-through' : 'no-underline'}`}>
                        {originalInput ? 'True' : 'False'}
                        </span>
                    </label> : null}
                </div>
            </div>
            )}
        </>
    )
}