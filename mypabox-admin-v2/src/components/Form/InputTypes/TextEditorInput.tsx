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
                className='mt-4 h-60 rounded-2xl max-w-[900px]' 
                theme="snow" 
                value={value} 
                onChange={(e:any) => handleQuill(e, name, path)}
            />
        </div>
    )
}