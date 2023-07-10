import { useState, ChangeEvent } from 'react';

export default function AddNote({ currentInput, addNote, toggleNote }: { currentInput: string, addNote: (currentInput: string, type: string, note: string) => void, toggleNote: () => void }) {
    const [ type, setType ] = useState('information');
    const [ note, setNote ] = useState('');

    // Changes type based on radio button selection 
    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        setType((e.target as HTMLInputElement).value);
    }

    // Changes note based on user input 
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    }

    return (
        // Test inputs 
        <div className="absolute left-[200px] top-[200px] w-[500px] bg-slate-100 z-10">
            <input type='radio' name='type' value='information' onChange={handleType} />
            <input type='radio' name='type' value='requirement' onChange={handleType}/>
            <input type='text' value={note} placeholder='Enter note' onChange={handleInput}/>
            <button onClick={() => {addNote(currentInput, type, note); toggleNote()}}>Done</button>
            <button onClick={toggleNote}>Close</button>
        </div>
    )
}