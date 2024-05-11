import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { School } from "../../types/schools.types";

const numberInputs = ['school_minimum_pa_shadowing_hours_required', 'school_minimum_pa_shadowing_hours_recommended'];
const stringInputs: string[] = [];
const arrayInputs = ['school_certifications_required_options'];

const useOpen = ({ input, editedInput, name, newSchool, setNewSchool, fieldNames }: { 
    input: boolean,
    editedInput: boolean,
    name: string,
    newSchool: School,
    fieldNames: string[],
    setNewSchool: Dispatch<SetStateAction<School>>,
 }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        if (editedInput === null) {
            if (input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            if (editedInput) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }
    }, [input, editedInput]);

    useEffect(() => {
        const field = newSchool[name as keyof School] as object;
        let obj = {...field};

        if (input) {

            fieldNames.forEach(n => {
                const inp: any = field[n as keyof object];
                if (arrayInputs.includes(n)) {
                    (obj[n as keyof object] as any[]) = inp !== null ? inp : [];
                } else if (stringInputs.includes(n)) {
                    (obj[n as keyof object] as string) = inp !== null ? inp : ''
                } else if (numberInputs.includes(n)) {
                    (obj[n as keyof object] as number) = inp !== null ? inp : 0;
                    console.log(obj)
                } else if (typeof inp === 'boolean') {
                    (obj[n as keyof object] as boolean) = inp !== null ? inp : false
                }
            })
            

        } else {
            
            fieldNames.forEach(n => {
                (obj[n as keyof object] as any | null) = null
            })
        }


        setNewSchool({
            ...newSchool,
            [name]: obj,
        })

    }, [input])

    return {
        isOpen,
    }

}

export default useOpen;