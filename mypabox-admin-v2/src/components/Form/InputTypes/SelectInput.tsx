import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function SelectInput({
    label,
    placeholder,
    name,
    value,
    path,
    handleSelect,
    isRequired,
    isCreatable,
    options,
}: {
    label: string,
    placeholder: string,
    name: string,
    value: string | number,
    path: string,
    handleSelect: (e: any, name: string, path: string) => void,
    isRequired: boolean,
    isCreatable: boolean,
    options: { value: string | number, label: string | number }[],
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            {isCreatable ? (
             <CreatableSelect 
                className='w-full'
                options={options}
                value={!value.toString() ? null : { value: value, label: value }}
                onChange={(e:any) => handleSelect(e, name, path)}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        borderRadius: 8,
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '7px 16px',
                    })
                }}
            />
            ) : (
            <Select 
                className='w-full'
                options={options}
                value={!value.toString() ? null : { value: value, label: value }}
                onChange={(e:any) => handleSelect(e, name, path)}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        borderRadius: 8,
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '7px 16px',
                    })
                }}
            />
            )}
            
        </div>
    )
}