import ReactQuill from "react-quill"
import { Change } from "../../../types/newSchools.types"
import { MouseEvent } from "react"
import ChangePopup from "../Validation/ChangePopup"
import { UserPermissions } from "../../../types/users.types"


export default function TextEditorInput({
    label,
    name,
    value,
    path,
    handleQuill,
    isRequired,
    change,
    validateIndividualChange,
    revertIndividualChange,
    isDisabled,
    permissions
}: {
    label: string,
    name: string,
    value: string,
    path: string,
    handleQuill: (e: any, name: string, path: string) => void,
    isRequired: boolean,
    change?: Change,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    isDisabled: boolean,
    permissions: UserPermissions
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <div className="flex w-full gap-2 justify-start items-start">
                <ReactQuill 
                    readOnly={isDisabled}
                    theme="snow" 
                    value={value} 
                    onChange={(e:any) => handleQuill(e, name, path)}
                    style={{
                        width: '100%',
                        height: '200px',
                        marginBottom: '40px'
                    }}
                />
                {change && (
                    <ChangePopup 
                        change={change}
                        name={name}
                        validateIndividualChange={permissions.canVerify ? validateIndividualChange : undefined}
                        revertIndividualChange={revertIndividualChange}
                    />
                )}
            </div>
        </div>
    )
}