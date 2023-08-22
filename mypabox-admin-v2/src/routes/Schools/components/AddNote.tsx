import { useState, ChangeEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddNote({ currentInput, addNote, toggleNote }: { currentInput: string, addNote: (currentInput: string, type: string, note: string) => void, toggleNote: () => void }) {
    const [ type, setType ] = useState('information');
    const [ note, setNote ] = useState('');
    // Changes type based on radio button selection 
    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        setType((e.target as HTMLInputElement).value);
    }


    return (
        // Test inputs 
        <div className="fixed w-screen font-['Noto Sans'] -ml-10 top-0 bg-[#000000d5] z-10 h-screen">
          <form className="h-[50em] w-[46em] mt-24 rounded-[0.625em] bg-white ml-[30em]">
            <AiOutlineClose className='absolute text-black text-2xl ml-[29em] mt-8 cursor-pointer' onClick={toggleNote}/>
            <p className='absolute text-2xl mt-8 ml-8'>Add Note</p>
            <div className="absolute mt-24 ml-8">
              <p className="after:content-['*'] mb-2 after:ml-0.5 after:text-red-500">Select Type:</p>
              <label className="mb-2">
                <input type='radio' name='type' value='information' className='' onChange={handleType} checked={type === 'information' ? true : false}/>
                <p className='-mt-6 ml-5'>Information</p>
              </label>
              <label className='mt-'>
                <input type='radio' name='type' value='requirement' className='' onChange={handleType} checked={type === 'requirement' ? true : false}/>
                <p className='-mt-6 ml-5'>Requirement</p>
              </label>
            </div>
            
            <ReactQuill className='absolute mt-[15em] h-96 rounded-2xl w-[42em] ml-8' theme="snow" value={note} onChange={setNote} />
            <button type='submit' className="absolute mt-[45em] ml-[39em] w-20 h-10 rounded-2xl border-2 border-blue-600 text-blue-600" 
            onClick={() => {addNote(currentInput, type, note); toggleNote()}}>
              Done
            </button>
          </form>
        </div>
    )
}