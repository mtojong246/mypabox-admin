import { School} from "../../../../types/schools.types";
import { Dispatch, SetStateAction, ChangeEvent} from "react"

import ApplicationsCaspa from "./ApplicationsCaspa";
import ApplicationsDirectly from "./ApplicationsDirectly";
import SupplementalApplications from "./SupplementalApplications";
import { UserObject } from "../../../../types/users.types";

// school_application_submitted_on_caspa: {
//     input: false,
//     school_caspa_application_deadline_date: null,
//     school_caspa_application_deadline_type: null,
//     school_caspa_application_notes: [],
// },

// school_application_submitted_directly_to_school: {
//     input: false,
//     school_application_direct_to_school_deadline: null,
//     school_application_direct_to_school_fee: null,
//     school_application_direct_to_school_notes: [],
// },

export default function Applications({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.currentTarget.name}` as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        }
        
    };

    const handleCheckInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        const field = newSchool[category as keyof School] as object;
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
        
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [name]: {
                        ...field[name as keyof object] as object,
                        input: e.target.checked,
                    }
                }
            })
        }
    }

    const handleInputInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
       
        if (!isEditedInput) {
            const field = newSchool[category as keyof School] as object;
            if (e.target.name === 'school_supplemental_application_fee' || e.target.name === 'school_application_direct_to_school_fee') {
                if (e.target.value === '') {
                    setNewSchool({
                        ...newSchool,
                        [category]: {
                            ...field,
                            [e.target.name]: '',
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
                            [category]: {
                                ...field,
                                [e.target.name]: value,
                            }
                        })
                    }
                }
            } else {
                setNewSchool({
                    ...newSchool,
                    [category]: {
                        ...field,
                        [e.target.name]: e.target.value,
                    }
                })
            }
        } else {
            const name = `edited_${e.target.name}`;
            const editedCategory = `edited_${category}`
            const field = newSchool[editedCategory as keyof School] as object;
            if (e.target.name === 'school_supplemental_application_fee' || e.target.name === 'school_application_direct_to_school_fee') {
                if (e.target.value === '') {
                    setNewSchool({
                        ...newSchool,
                        [editedCategory]: {
                            ...field,
                            [name]: {
                                ...field[name as keyof object] as object,
                                input: '',
                            }
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
                            [editedCategory]: {
                                ...field,
                                [name]: {
                                    ...field[name as keyof object] as object,
                                    input: value,
                                }
                            }
                        })
                    }
                }
            } else {
                setNewSchool({
                    ...newSchool,
                    [editedCategory]: {
                        ...field,
                        [name]: {
                            ...field[name as keyof object] as object,
                            input: e.target.value,
                        }
                    }
                })
            }
        } 
    };

    return (
        <>
            {(<ApplicationsCaspa newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit} handleCheck={handleCheck}
            handleInputInCategory={handleInputInCategory}
            />)}
            {(<ApplicationsDirectly newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit} handleCheck={handleCheck}
             handleInputInCategory={handleInputInCategory} /> )}
            <SupplementalApplications newSchool={newSchool} setNewSchool={setNewSchool}  loggedInUser={loggedInUser} isEdit={isEdit} handleCheck={handleCheck}
             handleInputInCategory={handleInputInCategory} handleCheckInCategory={handleCheckInCategory}/>
        </>
    )
}