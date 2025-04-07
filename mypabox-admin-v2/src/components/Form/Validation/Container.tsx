import { ReactNode, useState, MouseEvent, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react"
import { UserPermissions } from "../../../types/users.types";
import { GenericSchoolField, NewSchool } from "../../../types/newSchools.types";
import { ReactComponent as RevertIcon } from '../../../components/Icons/Revert.svg';
import { ReactComponent as CheckIcon } from '../../../components/Icons/Check.svg';
import { ReactComponent as LinkIcon } from '../../../components/Icons/Link.svg';
import { ReactComponent as DeleteIcon } from '../../../components/Icons/Trash.svg';
import TextInput from "../InputTypes/TextInput";
import Button from "../../Buttons/Button";
import SchoolFieldTabs from "./SchoolFieldTabs";
import IconButton from "../../Buttons/IconButton";

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
    const [ link, setLink ] = useState<string | null>(null);

    useEffect(() => {
        const schoolField = school[name as keyof NewSchool] as GenericSchoolField;
        setLink(schoolField.link ? schoolField.link : null);
        
    }, [name, school]);

    const handleLink = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const value = e.target.value;
        const schoolField = school[name as keyof NewSchool] as GenericSchoolField;
        setSchool({
            ...school,
            [name]: {
                ...schoolField,
                link: value,
            }
        })
    };

    const removeLink = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLink(null);
        const schoolField = school[name as keyof NewSchool] as GenericSchoolField;
        setSchool({
            ...school,
            [name]: {
                ...schoolField,
                link: '',
            }
        })
    }

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

    return (
        <div className="flex flex-col justify-start items-start gap-2 w-full max-w-[700px]">
            <div className="flex justify-between items-center gap-2 w-full">
                <label className="text-[18px] font-semibold">{label}</label>
                <div className="flex gap-4 justify-end items-center">
                    {showRevertButton && (
                        <button onClick={(e:any) => revertToOriginal(e, name)} className="flex gap-1 justify-center items-center text-warning hover:brightness-90 transition-all">
                            <div className="w-[16px]"><RevertIcon /></div>
                            <p className="text-[14px]">Revert to original</p>
                        </button>
                    )}
                    {showValidateAllButton && (
                        <button onClick={(e:any) => validateAllChanges(e, name)} className="flex gap-1 justify-center items-center text-success hover:brightness-90 transition-all">
                            <div className="w-[20px]"><CheckIcon/></div>
                            <p className="text-[14px]">Accept all changes</p>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-start items-start rounded-lg w-full border border-outline">
                {tabs.length > 0 && (
                    <SchoolFieldTabs 
                        tabs={tabs}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                )}
                <div className={`p-6 w-full flex flex-col gap-8`}>
                    {modifiedInputs && tabs[selectedIndex] === 'Modified' ? (
                        <>{modifiedInputs}</>
                    ) : (
                        <>{originalInputs}</>
                    )}
                    {link !== null ? (
                        <div className="flex justify-between items-end gap-4">
                            <TextInput 
                                type="text"
                                label="Link:"
                                placeholder="Link"
                                name=""
                                value={link}
                                path=""
                                isRequired={false}
                                handleInput={handleLink}
                                link={link}
                                isDisabled={false}
                            />
                            <div className="flex justify-center items-center h-[47px]">
                                <IconButton 
                                    color="warning"
                                    icon={<DeleteIcon/>}
                                    action={removeLink}
                                    isDisabled={false}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <label className="font-medium text-default">Link:</label>
                            <Button 
                                label="Insert Link"
                                type="primary"
                                styling="outline"
                                action={(e: MouseEvent<HTMLButtonElement>) => { 
                                    e.preventDefault();  
                                    setLink('');
                                }}
                                adornment={<LinkIcon/>}
                            />
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}