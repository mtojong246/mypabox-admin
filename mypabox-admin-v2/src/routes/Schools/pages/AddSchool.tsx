import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddSchoolForms from "../formSections/AddSchoolForms";
import { GenericSchoolField, NewSchool } from "../../../types/newSchools.types";
import { defaultSchool, schoolCategories } from "../../../utils/defaults";
import Button from "../../../components/Buttons/Button";
import { ReactComponent as AlertIcon } from '../../../components/Icons/Info.svg';

export default function AddSchool() {
    const navigate = useNavigate();
    const [ tab, setTab ] = useState('#general-info');
    const [ school, setSchool ] = useState<NewSchool>(defaultSchool);

    const navigateTabs = (hash: string) => {
        navigate(`/schools/add-school${hash}`);
          setTab(hash);
    }

    const checkForChanges = (fields: string[]) => {
      let hasChanges = false;

      for (let i=0; i<fields.length; i++) {
        const schoolField = school[fields[i] as keyof NewSchool] as GenericSchoolField;
        if (schoolField) {
          const changes = schoolField.changes;
          if (changes && changes.length > 0) {
            hasChanges = true;
            break;
          }
        }
      }

      return hasChanges;
    }


    return (
        <div className={`w-screen px-10 ont-['Noto Sans']`}>
          <div className={`w-full max-w-[1800px] mx-auto`}>

            {/* Header */}
            <div className={`w-full flex justify-between items-center pt-[120px] sticky bg-white z-50 top-0 border-b border-[#DCDCDC] ${window.scrollY === 180 ? '' : 'pb-2'}`}>
              <div className={`${window.scrollY === 180 ? '' : '-mt-28'}`}>
                <div className="flex justify-start items-start gap-2">
                        <div>
                            <p className={`text-4xl font-medium`}>Add School</p>
                            {/* {assignee && <p className='text-xl font-medium mt-1'>Assigned to: <span className='text-orange-600'>{assignee}</span></p>} */}
                        </div>
                        {/* <div className="flex flex-col justify-start items-start gap-1">
                        {newSchool.school_name.input && <p className="text-4xl font-medium">- {newSchool.school_name.input}</p>}
                        {newSchool.school_website.input && <a className="text-blue-600 pl-6 hover:underline max-w-[700px] truncate" href={newSchool.school_website.input} target="_blank" rel="noreferrer">{newSchool.school_website.input}</a>}
                        </div> */}
                </div>
              </div>

              <div className={`flex gap-5 ${window.scrollY === 180 ? '' : '-mt-28'}`}>
                    <Button
                      type="success"
                      label="Save"
                      styling='outline'
                      action={() => {}}
                      value='save'
                    />
                    <Button
                      type="primary"
                      label="Finish"
                      styling='outline'
                      action={() => {}}
                      value='done'
                    />
                    <Button
                      type="warning"
                      label="Cancel"
                      styling='outline'
                      action={() => {}}
                      value='cancel'
                    />
              </div>
            </div>

            {/* Side Navbar */}
            <div className={`flex justify-start items-start `}>
              <div className={`text-md py-4 side-max overflow-y-scroll sticky border-r border-[#DCDCDC]  pr-10 ${window.scrollY === 180 ? 'top-[210px]' : 'top-[135px]'}`}>
                <div className='flex flex-col justify-start items-start gap-5'>
                {schoolCategories.map(category => (
                  <button 
                    onClick={(e:any) => {navigateTabs(category.hash)}} 
                    className={`whitespace-nowrap hover:text-warning transition-all ${category.hash === tab ? 'text-warning': ''}`}
                  >
                    <div className='flex justify-start items-center gap-1'>
                        {category.name}
                        {checkForChanges(category.fields) && <AlertIcon className='w-[16px] text-warning'/>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
    
            {/* Body */}
            <div className={`grow`}>
                <AddSchoolForms 
                    tab={tab}
                    school={school}
                    setSchool={setSchool}
                />
              {/* <Category tab={tab} newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange}
              handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} /> */}
            </div>
          </div>
    
        </div>
        {/* {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}
        {openEdit && <EditNote currentInput={currentInput} note={note} index={index} toggleEdit={toggleEdit} editNote={editNote}/>} */}
        {/* {isCancelOpen && <CancelPopup toggleDelete={toggleCancelPopup} cancel={cancel} />}
        {<Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Progress Saved"
            action={action}
          />} */}
    
      </div>
      )
}