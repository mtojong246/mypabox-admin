import { Dispatch, SetStateAction, useState, MouseEvent } from "react"
import AddRequiredOptionalExam from "./AddRequiredOptionalExam";
import { School } from "../../../../types/schools.types";
import { UserObject } from "../../../../types/users.types";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./ExamFunctions";
import EditButtons from "../../Assets/EditButtons";
import RequiredOptionsField from "./RequiredOptionsField";
import LinkPopup from "../../LinkPopup";

export default function RequiredOptionalExams({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ openOptions, setOpenOptions ] = useState(false);
    const [ editedRequiredOption, setEditedRequiredOption ] = useState<any | null>(null)
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });;

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleOptions = (e:any) => {
        e.preventDefault();
        setOpenOptions(!openOptions)
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
    };

    const deleteOption = (e:any, index:number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        console.log(isNew, isEditedInput)
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_required_optional_exams: newSchool.school_required_optional_exams.filter((opt, i) => i !== index)
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_required_optional_exams: {
                    ...newSchool.edited_school_required_optional_exams,
                    input: isNew ? newSchool.edited_school_required_optional_exams.input!.filter((inp,i) => i !== index) : newSchool.edited_school_required_optional_exams.input!.map((inp, i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: false, }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const undoDelete = (e:MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_required_optional_exams: {
                ...newSchool.edited_school_required_optional_exams,
                input: newSchool.edited_school_required_optional_exams.input!.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: true }
                    } else {
                        return { ...inp }
                    }
                })
            }
        })
    }

    console.log(newSchool.edited_school_required_optional_exams.input)

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
        {((loggedInUser.permissions.canVerify && newSchool.edited_school_required_optional_exams.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_required_optional_exams.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Required Optional Exams<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_required_optional_exams.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_required_optional_exams.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
            <button disabled={(loggedInUser.permissions.canVerify && newSchool.edited_school_required_optional_exams.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_required_optional_exams.isEditMode) ? true : false} onClick={toggleOptions} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Option
            </button>
            <RequiredOptionsField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_required_optional_exams.isEditMode} input={newSchool.edited_school_required_optional_exams.input} 
            originalInput={newSchool.school_required_optional_exams} undoDelete={undoDelete} toggleOptions={toggleOptions} setEditedRequiredOption={setEditedRequiredOption} setGroupIndex={setGroupIndex} deleteOption={deleteOption}
            />
            {/* <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_required_optional_exams.length ? 'mt-4' : 'mt-0'}`}>
            {newSchool.school_required_optional_exams.map((group, i) => (
                <div className='p-3 border border-[#545454] rounded w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-xl'>{group.school_minimum_number_of_exams_to_be_completed} <span className='font-normal'>of the following exams need to be completed:</span></p>
                        <div className='flex gap-2'>
                            <button onClick={(e) => {toggleOptions(e); setEditedRequiredOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            <button onClick={(e) => deleteOption(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                    {group.school_required_optional_exams_list.map(course => {

                            return (
                                <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className='font-semibold'>{course}</p>
                                </div>
                            )
                    })}
                    </div>
                    {group.school_optional_exams_notes.length > 0 && (
                        <>
                            <p className='font-semibold underline underline-offset-2 mt-5 mb-2'>Optional Exams Notes:</p>
                            <div className='flex flex-col justify-center items-center gap-4'>
                            {group.school_optional_exams_notes.map(note => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </>
                    )}
                </div>
            ))}

            </div> */}
        </div>
        {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_required_optional_exams.isEditMode} input={newSchool.edited_school_required_optional_exams.input} link={newSchool.edited_school_required_optional_exams.link}
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} name='school_required_optional_exams' newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openOptions && <AddRequiredOptionalExam input={newSchool.edited_school_required_optional_exams.input} originalInput={newSchool.school_required_optional_exams} toggleOptions={toggleOptions} newSchool={newSchool} setNewSchool={setNewSchool} editedRequiredOption={editedRequiredOption} setEditedRequiredOption={setEditedRequiredOption} groupIndex={groupIndex} loggedInUser={loggedInUser} isEdit={isEdit}/>}
        </>
    )
}