import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { School } from "../../../../types/schools.types";
import { Note } from "../../../../types/schools.types";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import ReactQuill from "react-quill";
import AddNote from "./AddNote";

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
}: {
  newSchool: School;
  setNewSchool: Dispatch<SetStateAction<School>>;
}) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [openNote, setOpenNote] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  const toggleNotePopup = (e: any) => {
    e.preventDefault();
    setOpenNote(!openNote);
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>, input: string) => {
    const name = e.target.name as keyof School;
    const field = newSchool[name] as object;
    setNewSchool({
      ...newSchool,
      [name]: {
        ...field,
        [input]: e.target.checked,
      },
    });
  };

  const addNote = (note: Note) => {
    const field = newSchool[value as keyof School] as object;
    setNewSchool({
      ...newSchool,
      [value as keyof School]: {
        ...field,
        [notes]: (field[notes as keyof object] as Note[]).concat(note),
      },
    });
  };

  const updateNote = (note: Note) => {
    const field = newSchool[value as keyof School] as object;
    setNewSchool({
      ...newSchool,
      [value as keyof School]: {
        ...field,
        [notes]: (field[notes as keyof object] as Note[]).map((n, i) => {
          if (i === index) {
            return { ...note };
          } else {
            return { ...n };
          }
        }),
      },
    });
  };

  const deleteNote = (e: any, index: number, value: string, notes: string) => {
    e.preventDefault();
    const field = newSchool[value as keyof School] as object;
    setNewSchool({
      ...newSchool,
      [value as keyof School]: {
        ...field,
        [notes]: (field[notes as keyof object] as Note[]).filter(
          (n, i) => i !== index
        ),
      },
    });
  };

  return (
    <>
      {dataArray.map((data, i) => {
        let field = newSchool[data.value as keyof School] as object;
        return (
          <div
            className={`${
              i > 0 ? "mt-10" : "mt-28"
            } relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}
          >
            <label className="absolute top-[-16px] text-xl bg-white">
              {data.name}
            </label>
            <div className='flex justify-center items-center'>
            <div className="mt-2 grow">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  name={data.value}
                  onChange={(e) => handleChecked(e, data.input)}
                  value={field[data.input as keyof object]}
                  checked={field[data.input as keyof object] ? true : false}
                />
                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                <span className="ml-3 text-xl text-black">
                  {field[data.input as keyof object] ? "True" : "False"}
                </span>
              </label>
            </div>
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
            <div
              className={`flex flex-col justify-center items-center gap-3 ${
                (field[data.notes as keyof object] as Note[]).length
                  ? "mt-3"
                  : "mt-0"
              }`}
            >
              {(field[data.notes as keyof object] as Note[]).map((note, i) => (
                <div className="py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full">
                  <div className="flex justify-between items-center w-full mb-1">
                    <p
                      className={`font-semibold ${
                        note.type === "information"
                          ? "text-[#4573D2]"
                          : "text-[#F06A6A]"
                      }`}
                    >
                      {note.type}:
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          toggleNotePopup(e);
                          setIndex(i);
                          setEditedNote(note);
                        }}
                      >
                        <FiEdit3 className="h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" />
                      </button>
                      <button
                        onClick={(e) => {
                          deleteNote(e, i, data.value, data.notes);
                          
                        }}
                      >
                        <AiOutlineClose className="h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" />
                      </button>
                    </div>
                  </div>
                  <ReactQuill
                    theme="bubble"
                    value={note.note}
                    readOnly={true}
                    className="edited-quill"
                  />
                </div>
              ))}
            </div>
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
    </>
  );
}
