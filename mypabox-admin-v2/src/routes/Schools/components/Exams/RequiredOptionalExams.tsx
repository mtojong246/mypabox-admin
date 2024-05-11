import { Dispatch, SetStateAction, useState, MouseEvent } from "react"
import AddRequiredOptionalExam from "./AddRequiredOptionalExam";
import { School } from "../../../../types/schools.types";
import { UserObject } from "../../../../types/users.types";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./ExamFunctions";
import EditButtons from "../../Assets/EditButtons";
import RequiredOptionsField from "./RequiredOptionsField";
import LinkPopup from "../../LinkPopup";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";

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


    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_required_optional_exams.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_required_optional_exams.isEditMode} />
        <Indicator label="Required Optional Exams" editedInput={newSchool.edited_school_required_optional_exams.input} />
            <button disabled={(loggedInUser.permissions.canVerify && newSchool.edited_school_required_optional_exams.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_required_optional_exams.isEditMode) ? true : false} onClick={toggleOptions} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Option
            </button>
            <RequiredOptionsField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_required_optional_exams.isEditMode} input={newSchool.edited_school_required_optional_exams.input} 
            originalInput={newSchool.school_required_optional_exams} undoDelete={undoDelete} toggleOptions={toggleOptions} setEditedRequiredOption={setEditedRequiredOption} setGroupIndex={setGroupIndex} deleteOption={deleteOption}
            />
           
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_required_optional_exams.isEditMode} input={newSchool.edited_school_required_optional_exams.input} link={newSchool.edited_school_required_optional_exams.link}
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} name='school_required_optional_exams' newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openOptions && <AddRequiredOptionalExam input={newSchool.edited_school_required_optional_exams.input} originalInput={newSchool.school_required_optional_exams} toggleOptions={toggleOptions} newSchool={newSchool} setNewSchool={setNewSchool} editedRequiredOption={editedRequiredOption} setEditedRequiredOption={setEditedRequiredOption} groupIndex={groupIndex} loggedInUser={loggedInUser} isEdit={isEdit}/>}
        </>
    )
}