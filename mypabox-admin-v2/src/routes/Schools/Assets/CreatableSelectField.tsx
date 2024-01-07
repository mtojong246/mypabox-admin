import { UserObject } from "../../../types/users.types";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function CreatableSelectField({loggedInUser, input, originalInput, isEditMode, name, category, options, handleSelect, index}: {
    loggedInUser: UserObject, 
    input: string | null,
    originalInput: string | null,
    isEditMode: 
    boolean, 
    name: string,
    category: string,
    options: {value: string, label :string}[],
    handleSelect: (e:any, name: string, index: number, isEditedInput: boolean) => void,
    index: number,
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                <div className='flex justify-center items-start gap-1 w-full'>
                    <CreatableSelect isDisabled options={options} 
                    value={input? {value: input, label: input} : null } 
                    className="grow focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, name, index, false)}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                    </Tooltip>
                </div>
                <div className='flex justify-center items-start gap-1 w-full'>
                    <CreatableSelect isDisabled options={options} 
                    value={originalInput ? {value: originalInput, label: originalInput} : null } 
                    className="grow focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, name, index, false)}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                    </Tooltip>
                </div>
            </div>
            ) : (
                <div className='flex justify-center items-start gap-1 w-full'>
                    <CreatableSelect options={options} 
                    value={originalInput ? {value: originalInput, label: originalInput} : null } 
                    className="grow focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, name, index, false)}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                    </Tooltip>
                </div>
            )}
            </>
        ) : (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                {(input !== null || isEditMode) && <div className='flex justify-center items-start gap-1 w-full'>
                    <CreatableSelect options={options} 
                    value={input ? {value: input , label: input } : null } 
                    className="grow focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, name, index, true)}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                    </Tooltip>
                </div>}
                {(!isEditMode || ((input !== originalInput) && isEditMode)) && <div className='flex justify-center items-start gap-1 w-full'>
                    <CreatableSelect isDisabled options={options} 
                    value={originalInput ? {value: originalInput, label: originalInput} : null } 
                    className="grow focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, name, index, false)}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                    </Tooltip>
                </div>}
            </div>
        )}
        </>
    )
}