import ReactQuill from "react-quill"

export default function TextEditorInput({
    label,
    name,
    value,
    path,
    handleQuill,
    isRequired,
}: {
    label: string,
    name: string,
    value: string,
    path: string,
    handleQuill: (e: any, name: string, path: string) => void,
    isRequired: boolean,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={(e:any) => handleQuill(e, name, path)}
                style={{
                    width: '100%',
                    height: '200px',
                    marginBottom: '40px'
                }}
            />
        </div>
    )
}