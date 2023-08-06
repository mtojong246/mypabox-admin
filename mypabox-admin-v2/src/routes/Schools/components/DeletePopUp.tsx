import React, { MouseEvent } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const DeletePopUp = ({event, i, deletePopUp, setDeletePopUp, removeNote, inputType, removeField}: any) => {

  console.log(inputType)

  const remove = (e: MouseEvent<HTMLButtonElement>) => {

    if (inputType === 'note') {
      const e = { currentTarget: { value: event } }
      
      removeNote(e, i)
    } else {
      e.preventDefault()
      const e1 = { currentTarget: { value: event } }

      removeField(e1, i)
    }
  }
  const toggleDeletePopUp = () => setDeletePopUp(!deletePopUp)

  return (
    <div className="fixed w-screen font-['Noto Sans'] -ml-[54.75em] top-0 bg-[#000000d5] z-10 h-screen">
      <form className="h-[12em] w-[26em] mt-[45em] rounded-[0.625em] bg-white ml-[75em]">
        <AiOutlineClose className='absolute text-black text-2xl ml-[29em] mt-8 cursor-pointer' />
        <p className='absolute text-2xl mt-8 ml-8'>Are you sure you want to delete?</p>
        <button type='submit' className="absolute mt-[7em] ml-[8em] w-20 h-10 rounded-2xl border-2 
        border-red-600 text-red-600" onClick={(e) => {remove(e); toggleDeletePopUp()}}>
          Delete
        </button>
        <button type='submit' className="absolute mt-[7em] ml-[14em] w-20 h-10 rounded-2xl border-2 
        border-blue-600 text-blue-600" onClick={toggleDeletePopUp}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default DeletePopUp