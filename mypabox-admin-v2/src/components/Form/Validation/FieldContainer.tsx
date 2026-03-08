import { Dispatch, ReactNode, useEffect, useState, MouseEvent, SetStateAction, ChangeEvent } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../types/newSchools.types";
import { UserPermissions } from "../../../types/users.types";
import TextInput from "../InputTypes/TextInput";
import IconButton from "../../Buttons/IconButton";
import Button from "../../Buttons/Button";

import { ReactComponent as RevertIcon } from '../../../components/Icons/Revert.svg';
import { ReactComponent as CheckIcon } from '../../../components/Icons/Check.svg';
import { ReactComponent as LinkIcon } from '../../../components/Icons/Link.svg';
import { ReactComponent as DeleteIcon } from '../../../components/Icons/Trash.svg';
import FieldTabs from "./FieldTabs";

export default function FieldContainer({
    children,
    changes,
    permissions,
    label,
    tabsAndIndex,
    modifyIndex,
    link,
    school,
    setSchool,
    name,
    validateAllRemovals,
}: {    
    children: ReactNode,
    changes: Change[],
    permissions: UserPermissions,
    label: string,
    tabsAndIndex: {
        tabs: string[];
        selectedIndex: number | null;
    };
    modifyIndex: (name: string, newIndex: number) => void,
    link: string | null;
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    name: string;
    validateAllRemovals?: (name: string) => {input: any; notes?: NewNote[] | undefined}
}) {
    const [ showRevertButton, setShowRevertButton ] = useState(false);
    const [ showValidateAllButton, setShowValidateAllButton ] = useState(false);

    useEffect(() => {
        let showRevert = false;
        let showValidate = false;

        const { canEditWithVerificationNeeded, canVerify } = permissions;

        if (changes.length > 0) {
            if (canVerify || canEditWithVerificationNeeded) {
                showRevert = true;
            }

            if (canVerify) {
                showValidate = true;
            }
        }

        setShowRevertButton(showRevert);
        setShowValidateAllButton(showValidate);
    }, [changes, permissions]);

    const handleLink = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSchool({
            ...school,
            [name]: {
                ...(school[name as keyof NewSchool] as any),
                link: value,
            }
        });
    }

    const resetLink = () => {
        setSchool({
            ...school,
            [name]: {
                ...(school[name as keyof NewSchool] as any),
                link: '',
            }
        });
    }

    const removeLink = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetLink();
    }

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

        let draft;

        if (validateAllRemovals) {
            draft = validateAllRemovals(name);
        } else {
            draft = field.draft;
        }

        field = {
            ...field,
            original: draft,
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
                {tabsAndIndex.tabs.length > 0 && tabsAndIndex.selectedIndex !== null && (
                    <FieldTabs 
                        name={name}
                        modifyIndex={modifyIndex}
                        tabs={tabsAndIndex.tabs}
                        selectedIndex={tabsAndIndex.selectedIndex}
                    />
                )}
                <div className={`p-6 w-full flex flex-col gap-8`}>
                    <div className="flex flex-col gap-8 justify-start items-start">
                        {children}
                    </div>
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
                                permissions={permissions}
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
                                    resetLink();
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