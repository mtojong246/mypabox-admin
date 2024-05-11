import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { EditedField, School } from "../../../../types/schools.types";
import { Note } from "../../../../types/schools.types";
import AddNote from "./AddNote";
import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./PrereqBoolFunctions";
import BooleanFieldsGroup from "../../Assets/BooleanFieldsGroup";
import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import LinkPopup from "../../LinkPopup";
import AddNoteFields from "../../Assets/AddNoteFields";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";


const dataArray = [
  {
    name: "Pass/Fail Courses Accepted",
    value: "school_pass_fail_criteria",
    input: "school_pass_fail_grade_accepted",
    notes: "school_pass_fail_grade_criteria_note_section",
  },
  {
    name: "AP Courses Accepted",
    value: "school_ap_criteria",
    input: "school_ap_courses_accepted",
    notes: "school_ap_courses_criteria_note_section",
  },
  {
    name: "Community College Courses Accepted",
    value: "school_community_college_criteria",
    input: "school_community_college_credits_accepted",
    notes: "school_community_college_criteria_note_section",
  },
  {
    name: "CLEP Credits Accepted",
    value: "school_clep_criteria",
    input: "school_clep_credits_accepted",
    notes: "school_clep_credits_criteria_note_section",
  },
  {
    name: "Online Courses Accepted",
    value: "school_online_courses_criteria",
    input: "school_online_courses_accepted",
    notes: "school_online_courses_criteria_note_section",
  },
];

export default function BooleanInputs({
  newSchool,
  setNewSchool,
  loggedInUser,
  isEdit,
}: {
  newSchool: School;
  setNewSchool: Dispatch<SetStateAction<School>>;
  loggedInUser: UserObject;
  isEdit: boolean;
}) {
  const [index, setIndex] = useState<number | null>(0);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState<string>("");
  const [openNote, setOpenNote] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
      e.preventDefault();
      const linkName = `edited_${linkObj.name}`
      setNewSchool({
          ...newSchool,
          [linkName]: {
              ...newSchool[linkName as keyof School] as object,
              link: newLink,
          }
      });
      setLinkObj({
          link: '',
          name: '',
      })
  };

  const toggleNotePopup = (e: any) => {
    e.preventDefault();
    setOpenNote(!openNote);
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
    
    if (!isEditedInput) {
      const field = newSchool[category as keyof School] as object;
      setNewSchool({
        ...newSchool,
        [category]: {
          ...field,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      const name = `edited_${e.target.name}` as keyof object;
      const editedCategory = `edited_${category}`
      const field = newSchool[editedCategory as keyof School] as object;
      setNewSchool({
        ...newSchool,
        [editedCategory]: {
          ...field,
          [name]: {
            ...field[name] as object,
            input: e.target.checked,
          }
        },
      });
    }
    
  };

  const addNote = (note: Note) => {
    if (loggedInUser.permissions.canAddOrDelete) {
      const field = newSchool[value as keyof School] as object;
      setNewSchool({
        ...newSchool,
        [value as keyof School]: {
          ...field,
          [notes!]: (field[notes as keyof object] as Note[]).concat(note),
        },
      });
    } else {
      const field = newSchool[`edited_${value}` as keyof School] as any;
      setNewSchool({
        ...newSchool,
        [`edited_${value}`]: {
          ...field,
          notes: field.notes.concat(note),
        },
      });
    }
    
  };

  const updateNote = (note: Note) => {
    if (loggedInUser.permissions.canAddOrDelete) {
      const field = newSchool[value as keyof School] as object;
      setNewSchool({
        ...newSchool,
        [value as keyof School]: {
          ...field,
          [notes!]: (field[notes as keyof object] as Note[]).map((n, i) => {
            if (i === index) {
              return { ...note };
            } else {
              return { ...n };
            }
          }),
        },
      });
    } else {
      const field = newSchool[`edited_${value}` as keyof School] as any;
      setNewSchool({
        ...newSchool,
        [`edited_${value}`]: {
          ...field,
          notes: field.notes.map((n:any, i:number) => {
            if (i === index) {
              return { ...note };
            } else {
              return { ...n };
            }
          }),
        },
      });
    }
    
  };

  const deleteNote = (e: any, index: number, name: string, noteName?: string) => {
    e.preventDefault();
    if (loggedInUser.permissions.canAddOrDelete) {
      const field = newSchool[name as keyof School] as object;
      setNewSchool({
        ...newSchool,
        [name as keyof School]: {
          ...field,
          [noteName!]: (field[noteName as keyof object] as Note[]).filter(
            (n, i) => i !== index
          ),
        },
      });
    } else {
      const field = newSchool[`edited_${name}` as keyof School] as any;
      setNewSchool({
        ...newSchool,
        [`edited_${name}`]: {
          ...field,
          notes: field.notes.filter(
            (n:any, i:any) => i !== index
          ),
        },
      });
    }
    
  };

  return (
    <>
      {dataArray.map((data, i) => {
        let field = newSchool[data.value as keyof School] as object;
        let editedField = newSchool[`edited_${data.value}` as keyof School] as EditedField;
        return (
         <div className={`${
          i > 0 ? "mt-10" : "mt-28"
        } flex justify-start items-start gap-3 w-full`}>
          <div
            className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}
          >
             <Screen isEdit={isEdit} editedInput={editedField.input} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
            <Indicator label={data.name} editedInput={editedField.input} />
            <div className='flex justify-center items-start'>
              <BooleanFieldsGroup  isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={(newSchool[`edited_${data.value}` as keyof School] as any).isEditMode} input={(newSchool[`edited_${data.value}` as keyof School][`edited_${data.input}` as keyof object] as {input: boolean | null, prev: boolean | null}).input}
              originalInput={field[data.input as keyof object]} name={data.input} category={data.value} handleCheck={handleChecked}
              />
           
            <button
              onClick={(e) => {
                toggleNotePopup(e);
                setValue(data.value);
                setNotes(data.notes);
              }}
              className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]"
            >
              Add Note
            </button>
            </div>
           
            <AddNoteFields loggedInUser={loggedInUser} isEditMode={(newSchool[`edited_${data.value}` as keyof School] as any).isEditMode} notes={(newSchool[`edited_${data.value}` as keyof School] as any).notes} originalNotes={field[data.notes as keyof object]} name={data.value} noteName={data.notes} toggleNotePopup={toggleNotePopup}
              deleteNote={deleteNote} setIndex={setIndex} setName={setValue} setEditedNote={setEditedNote} setNoteName={setNotes}
              />
          </div>
          {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={(newSchool[`edited_${data.value}` as keyof School] as any).isEditMode} input={(newSchool[`edited_${data.value}` as keyof School][`edited_${data.input}` as keyof object] as {input: boolean | null, prev: boolean | null}).input} 
          name={data.value} toggleLinkPopup={toggleLinkPopup} link={(newSchool[`edited_${data.value}` as keyof School] as any).link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup}
          revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
          />}
        </div>
        );
      })}
      {openNote && (
        <AddNote
          toggleNotePopup={toggleNotePopup}
          addNote={addNote}
          editedNote={editedNote}
          setEditedNote={setEditedNote}
          updateNote={updateNote}
        />
      )}
      {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
    </>
  );
}
