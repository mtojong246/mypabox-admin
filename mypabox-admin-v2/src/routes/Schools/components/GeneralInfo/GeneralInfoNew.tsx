import { School } from "../../../../types/schools.types"
import { UserObject } from "../../../../types/users.types"
import { Dispatch, SetStateAction, useEffect, useState, ChangeEvent } from "react"
import { generalInfoFields } from "../../../../data/defaultValues"
import useInput from "../../../../app/hooks/useInput"
import ReactQuill from "react-quill"
import Select from 'react-select';
import countries from "../../../../data/countries.json";
import CreatableSelect from 'react-select/creatable';
import { Tooltip, IconButton } from "@mui/material"
import { AiOutlineInfoCircle, AiOutlineClose } from "react-icons/ai"

const months = [
    {value: 'January', label: 'January'},
    {value: 'February', label: 'February'},
    {value: 'March', label:'March'},
    {value: 'April', label: 'April'},
    {value: 'May', label: 'May'},
    {value: 'June', label: 'June'},
    {value: 'July', label: 'July'},
    {value: 'August', label: 'August'},
    {value: 'September', label: 'September'},
    {value: 'October', label: 'October'},
    {value: 'November', label: 'November'},
    {value: 'December', label: 'December'}
]

export default function GeneralInfoNew({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    
    const {
        handleStringOrNumberInput,
        handleBooleanValue,
        handleSelectInput,
        handleQuill
    } = useInput({ newSchool, setNewSchool });

    const [stateNames, setStateNames] = useState<any>([]);
    const [countryNames, setCountryNames] = useState<any>([]);

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
          target: {name: "school_country", type: 'text', value: country.name }})))
    
        setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
         .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
         value: state.name, } })))
    
    }, [newSchool.school_country.input]);

    const getOptions = (value: string) => {
        if (value === 'school_country') {
            return countryNames;
        } else if (value === 'school_state') {
            return stateNames;
        } else if (value === 'school_start_mont') {
            return months;
        }
    }

    const getSelectValue = (value: string) => {
        const field = newSchool[value as keyof School];
        const input = field['input' as keyof object];

        return { value: input, label: input };
    }
    
    return (
        <>
        {generalInfoFields.map((fieldObj, i) => {
            const { label, value } = fieldObj
            const field = newSchool[value as keyof School];
            
            if (typeof field === 'string') {
                return (
                    <div className={`mt-20 text-xl w-full`}>
                        <p>{label}</p>
                        <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={field} 
                        onChange={(e:any) => handleQuill(e, value)}/>
                    </div>
                )
            } else {
                const input = 'input' as keyof object
                console.log(value, typeof field[input] === 'string' || 'number' )
                if (typeof field[input] === ('string' || 'number')) {
                    
                    if (['school_country', 'school_state', 'school_start_month'].includes(value)) {
                        return (
                            <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">{label}</label>
                                    <div className='flex justify-center items-start gap-3'>
                                        <Select className="grow focus:outline-none rounded"
                                        options={getOptions(value)} onChange={(e:any) => handleSelectInput(e, value)} value={getSelectValue(value)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={`${i === 0 ? 'mt-12' : 'mt-20'} flex justify-start items-start gap-3 w-full`}>
                                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">{label}</label>
                                    <div className='flex justify-center items-start gap-3'>
                                        <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={field[input]} name={label} onChange={(e:ChangeEvent<HTMLInputElement>) => handleStringOrNumberInput(e, value)}/>
                                    </div>
                                </div>
                            </div>  
                        )
                        
                    }
                } else if (typeof field[input] === 'boolean') {
                    
                    return (
                        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20 bg-none">{label}</label>
                                <div className='flex justify-start items-center gap-3 '>
                                    <div className='mt-2 grow'>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" name={label} onChange={(e:ChangeEvent<HTMLInputElement>) => handleBooleanValue(e, value)} checked={field[input]}  />
                                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                            <span className={`ml-3 text-black text-xl`}>
                                            {field[input] ? 'True' : 'False'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">{label}</label>
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='w-1/4 flex justify-center items-start gap-1'>
                                        <CreatableSelect className="grow focus:outline-none rounded"
                                        options={[{value: 'Main', label: 'Main'}]} />
                                        <Tooltip title="Type and press enter to create new option" placement='right'>
                                            <IconButton style={{padding: '0px'}}>
                                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <input className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded"/>
                                    <button className="px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]">Add</button>
                                    
                                </div>
                               
                            </div>
                        </div>
                    )
                }
            }
        })}
        </>
    )
}