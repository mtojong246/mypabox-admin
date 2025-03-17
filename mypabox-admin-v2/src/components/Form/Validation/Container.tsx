import { ReactNode, useState, MouseEvent, useEffect, Dispatch, SetStateAction } from "react"
import Tabs from "./Tabs";
import { UserPermissions } from "../../../types/users.types";
import { GenericSchoolField, NewSchool } from "../../../types/newSchools.types";
import { ReactComponent as RevertIcon } from '../../../components/Icons/Revert.svg';
import { ReactComponent as CheckIcon } from '../../../components/Icons/Check.svg';

export default function Container({
    label,
    name,
    school,
    setSchool,
    isEditSchool,
    permissions,
    originalInputs,
    modifiedInputs,
}: {
    label: string,
    name: string,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    originalInputs: ReactNode,
    modifiedInputs?: ReactNode,
}) {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ tabs, setTabs ] = useState<string[]>([]);
    const [ showRevertButton, setShowRevertButton ] = useState(false);
    const [ showValidateAllButton, setShowValidateAllButton ] = useState(false);

    useEffect(() => {
        if (isEditSchool) {
            const schoolField = school[name as keyof NewSchool] as GenericSchoolField;
            const changes = schoolField.changes;

            if (permissions.canEditWithVerificationNeeded || (changes.length > 0 && permissions.canVerify)) {
                setTabs([ 'Modified', 'Original' ]);
            } else {
                setTabs([]);
            };

            if (changes.length > 0 && (permissions.canVerify || permissions.canEditWithVerificationNeeded)) {
                setShowRevertButton(true);
            } else {
                setShowRevertButton(false);
            }

            if (changes.length > 0 && permissions.canVerify) {
                setShowValidateAllButton(true);
            } else {
                setShowValidateAllButton(false);
            }
 
        }
    }, [isEditSchool, name, school, permissions]);

    const revertToOriginal = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();
        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            draft: field.original,
            changes: [],
        }

        setSchool({
            ...school,
            [name]: field,
        })
        
    }

    const validateAllChanges = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            original: field.draft,
            changes: [],
        }

        setSchool({
            ...school,
            [name]: field,
        })

    }

    // const validateIndividualChanges = (e: MouseEvent<HTMLButtonElement>, name: string, path: string) => {
    //     e.preventDefault();

    //     let field = school[name as keyof NewSchool] as GenericSchoolField;

    //     const keys = path.split('.'); // Split the index string into keys
    //     let original = field.original;
    //     let draft = field.draft;

    //     for (let i = 0; i < keys.length - 1; i++) {
    //         if (!(keys[i] in original)) {
    //             console.log('path invalid');
    //         }
    //         original = original[keys[i]];
    //     }

    //     for (let i = 0; i < keys.length - 1; i++) {
    //         if (!(keys[i] in draft)) {
    //             console.log('path invalid');
    //         }
    //         draft = draft[keys[i]];
    //     }

    //     original[keys[keys.length - 1]] = draft[keys[keys.length - 1]];
        
    //     setSchool({
    //         ...school,
    //         [name]: {
    //             original,
    //             draft,
    //             changes: field.changes.filter(change => change.path !== path),
    //         }
    //     })
    // }

    return (
        <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-between items-center gap-2">
                <label className="text-[18px] font-semibold">{label}</label>
                <div className="flex gap-2 justify-end items-center">
                    {showRevertButton && (
                        <button onClick={(e:any) => revertToOriginal(e, name)} className="flex gap-1 text-warning hover:brightness-90 transition-all">
                            <div className="w-[16px]"><RevertIcon /></div>
                            <p className="text-[14px]">Revert to original</p>
                        </button>
                    )}
                    {showValidateAllButton && (
                        <button onClick={(e:any) => validateAllChanges(e, name)} className="flex gap-1 text-success hover:brightness-90 transition-all">
                            <div className="w-[16px]"><CheckIcon/></div>
                            <p className="text-[14px]">Accept all changes</p>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-start items-start rounded-lg w-full">
                {tabs.length > 0 && <Tabs 
                    tabs={tabs.map((tab,i) => ({
                        label: tab,
                        action: (e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setSelectedIndex(i);
                        }
                    }))}
                    selectedIndex={selectedIndex}
                />}
                <div className={`${!modifiedInputs && 'rounded-tl-lg'} border border-outline rounded-tr-lg rounded-br-lg rounded-bl-lg p-6 w-full max-w-[600px]`}>
                    {modifiedInputs && tabs[selectedIndex] === 'Modified' ? (
                        <>{modifiedInputs}</>
                    ) : (
                        <>{originalInputs}</>
                    )}
                </div>
            </div>

        </div>
    )
}