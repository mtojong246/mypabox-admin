import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Note, School } from "../../../../types/schools.types";
import AddRecommendedOption from "./AddRecommendedOption";
import AddNote from "../Prereqs/AddNote";
import AddNoteFields from "../../Assets/AddNoteFields";
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./EvaluationFunctions";

import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import SelectInputsFields from "../../Assets/SelectInputsFields";
import TitleFields from "./TitleFields";
import RecOptionFields from "./RecOptionFields";

const evaluatorOptions = [
  { value: "PA", label: "PA" },
  { value: "MD", label: "MD" },
  { value: "DO", label: "DO" },
  { value: "NP", label: "NP" },
  { value: "PhD", label: "PhD" },
];

const timeOptions = [
  { value: "Months", label: "Months" },
  { value: "Years", label: "Years" },
];

interface Options {
  school_minimum_number_evaluators_recommended_in_group: number;
  school_recommended_optional_group_evaluator_title: string[];
  school_minimum_time_evaluator_knows_applicant: string;
}

export default function EvaluationsRecommended({
  newSchool,
  setNewSchool,
  loggedInUser,
  isEdit,
}: {
  newSchool: School;
  setNewSchool: Dispatch<SetStateAction<School>>;
  loggedInUser: UserObject,
  isEdit: boolean,
}) {
  const [selection, setSelection] = useState({
    number: "",
    duration: "",
  });
  const [ editedSelection, setEditedSelection] = useState<{number: string | null, duration: string | null}>({
    number: null,
    duration: null,
});
  const [openOptions, setOpenOptions] = useState(false);
  const [editedOption, setEditedOption] = useState<Options | null>(null);
  const [groupIndex, setGroupIndex] = useState<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [notePopup, setNotePopup] = useState(false);
  const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);


    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    };

    useEffect(() => {
      if (newSchool.edited_school_evaluations_recommended.input !== null) {
        setHasInputs(true)
      } else {
        setHasInputs(null)
      }
    }, [newSchool.edited_school_evaluations_recommended.input])

  const [evaluator, setEvaluator] = useState("");

  const addEvaluator = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
    e.preventDefault();
    if (!isEditedInput) {
      if (
        newSchool.school_evaluations_recommended.school_recommended_evaluator_title?.includes(
          evaluator
        )
      )
        return;
      if (!evaluator) return;
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_recommended_evaluator_title:
            newSchool.school_evaluations_recommended.school_recommended_evaluator_title!.concat(
              evaluator
            ),
        },
      });
    } else {
      if (!evaluator) return;
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          edited_school_recommended_evaluator_title: {
            ...newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title,
            input: newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input ? newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input.concat({
              name: evaluator,
              isCorrect: true,
              isNew: true
            }) : [{
              name: evaluator,
              isCorrect: true,
              isNew: true
            }]
          }
        }
      })
    }
    
  };

  const deleteEvaluator = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
    e.preventDefault();
    if (!isEditedInput) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_recommended_evaluator_title:
            newSchool.school_evaluations_recommended.school_recommended_evaluator_title!.filter(
              (e, i) => i !== index
            ),
        },
      });
    } else {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          edited_school_recommended_evaluator_title: {
            ...newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title,
            input: isNew ? newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input!.filter((inp,i) => i !== index) : newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input!.map((inp, i) => {
              if (i === index) {
                return { ...inp, isCorrect: false }
              } else {
                return { ...inp }
              }
            })
          }
        }
      })
    }
    
  };

  const undoDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => [
    setNewSchool({
      ...newSchool,
      edited_school_evaluations_recommended: {
        ...newSchool.edited_school_evaluations_recommended,
        edited_school_recommended_evaluator_title: {
          ...newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title,
          input: newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input!.map((inp,i) => {
            if (i === index) {
              return { ...inp, isCorrect: true }
            } else {
              return { ...inp }
            }
          })
        }
      }
    })
  ]

  const toggleNotePopup = (e: any) => {
    e.preventDefault();
    setNotePopup(!notePopup);
  };

  const toggleOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenOptions(!openOptions);
  };

  useEffect(() => {
    if (newSchool.school_evaluations_recommended.input) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_minimum_number_of_evaluations_recommended: newSchool.school_evaluations_recommended.school_minimum_number_of_evaluations_recommended ? newSchool.school_evaluations_recommended.school_minimum_number_of_evaluations_recommended : 0,
          school_recommended_evaluator_title: newSchool.school_evaluations_recommended.school_recommended_evaluator_title ? newSchool.school_evaluations_recommended.school_recommended_evaluator_title  : [],
          school_minimum_time_evaluator_knows_applicant: newSchool.school_evaluations_recommended.school_minimum_time_evaluator_knows_applicant ? newSchool.school_evaluations_recommended.school_minimum_time_evaluator_knows_applicant : '',
          school_optional_evaluators_recommended: newSchool.school_evaluations_recommended.school_optional_evaluators_recommended ? newSchool.school_evaluations_recommended.school_optional_evaluators_recommended : [],
        },
      });
      
    } else {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_minimum_number_of_evaluations_recommended: null,
          school_recommended_evaluator_title: null,
          school_minimum_time_evaluator_knows_applicant: null,
          school_optional_evaluators_recommended: null,
        },
      });
    }
  }, [newSchool.school_evaluations_recommended.input]);

  useEffect(() => {
    if (newSchool.edited_school_evaluations_recommended.input === null) {
      if (newSchool.school_evaluations_recommended.input) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    } else {
      if (newSchool.edited_school_evaluations_recommended.input) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [newSchool.edited_school_evaluations_recommended,newSchool.school_evaluations_recommended])

  useEffect(() => {
    setNewSchool({
      ...newSchool,
      school_evaluations_recommended: {
        ...newSchool.school_evaluations_recommended,
        school_minimum_time_evaluator_knows_applicant:
          selection.number + " " + selection.duration,
      },
    });
  }, [selection]);

  useEffect(() => {
    if (newSchool.school_evaluations_recommended.school_minimum_time_evaluator_knows_applicant) {
      const array = newSchool.school_evaluations_recommended.school_minimum_time_evaluator_knows_applicant.split(' ');
      setSelection({
        number: array[0],
        duration: array[1]
      })
    }
  }, [])

  useEffect(() => {
    if (newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant.input !== null) {
      const array = newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant.input.split(' ');
      setEditedSelection({
        number: array[0],
        duration: array[1],
      })
    } else {
      setEditedSelection({
        number: null,
        duration: null,
      })
    }
  }, [newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant])

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
    if (!isEditedInput) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          input: e.target.checked,
        },
      });
    } else {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          input: e.target.checked,
        }
      })
    }
    
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
    if (!isEditedInput) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      const name = `edited_${e.target.name}`;
      const field = newSchool.edited_school_evaluations_recommended[name as keyof object] as object;
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          [name]: {
            ...field,
            input: e.target.value,
          }
        }
      })
    }
    
  };

 

  const handleNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
    if (!isEditedInput) {
      setSelection({
        ...selection,
        number: e.target.value,
      });
    } else {
      setEditedSelection({
        ...editedSelection,
        number: e.target.value,
      })
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          edited_school_minimum_time_evaluator_knows_applicant: {
            ...newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant,
            input: (e.target.value) + ' ' + editedSelection.duration,
          }
        }
      })
    }
    
  };

  const handleDuration = (e:any, category: string, isEditedInput: boolean) => {
    if (!isEditedInput) {
      setSelection({...selection, duration: e.value})
    } else {
      setEditedSelection({...editedSelection, duration: e.value});
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          edited_school_minimum_time_evaluator_knows_applicant: {
            ...newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant,
            input: editedSelection.number + ' ' + e.value,
          }
        }
      })
    }
  }

  const deleteOption = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
    e.preventDefault();
    if (!isEditedInput) {
      setNewSchool({ 
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_optional_evaluators_recommended:
            newSchool.school_evaluations_recommended.school_optional_evaluators_recommended!.filter(
              (opt, i) => i !== index
            ),
        },
      });
    } else {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          edited_school_optional_evaluators_recommended: {
            ...newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended,
            input: isNew ? newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input!.filter((inp,i) => i !== index) : newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input!.map((inp,i) => {
              if (i === index) {
                return { ...inp, isCorrect: false }
              } else {
                return { ...inp }
              }
            })
          }
        }
      })
    }
    
  };


  const undoOption = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setNewSchool({
      ...newSchool,
      edited_school_evaluations_recommended: {
        ...newSchool.edited_school_evaluations_recommended,
        edited_school_optional_evaluators_recommended: {
          ...newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended,
          input: newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input!.map((inp,i) => {
            if (i === index) {
              return { ...inp, isCorrect: true }
            } else {
              return { ...inp }
            }
          })
        }
      }
    })
  }

  const addNote = (note: Note) => {
    if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_evaluations_recommended_notes:
            newSchool.school_evaluations_recommended.school_evaluations_recommended_notes.concat(
              note
            ),
        },
      });
    } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          notes:
            newSchool.edited_school_evaluations_recommended.notes!.concat(
              note
            ),
        },
      });
    }
    
  };

  const updateNote = (note: Note) => {
    if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_evaluations_recommended_notes:
            newSchool.school_evaluations_recommended.school_evaluations_recommended_notes.map(
              (n, i) => {
                if (i === index) {
                  return { ...note };
                } else {
                  return { ...n };
                }
              }
            ),
        },
      });
    } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          notes:
            newSchool.edited_school_evaluations_recommended.notes!.map(
              (n, i) => {
                if (i === index) {
                  return { ...note };
                } else {
                  return { ...n };
                }
              }
            ),
        },
      });
    }
    
  };

  const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        school_evaluations_recommended: {
          ...newSchool.school_evaluations_recommended,
          school_evaluations_recommended_notes:
            newSchool.school_evaluations_recommended.school_evaluations_recommended_notes.filter(
              (n, i) => i !== index
            ),
        },
      });
    } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
      setNewSchool({
        ...newSchool,
        edited_school_evaluations_recommended: {
          ...newSchool.edited_school_evaluations_recommended,
          notes:
            newSchool.edited_school_evaluations_recommended.notes!.filter(
              (n, i) => i !== index
            ),
        },
      });
    }
    
  };

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
}

  return (
    <>
    <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
      <div
        className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}
      >
        <Screen isEdit={isEdit} editedInput={hasInputs} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} />
        <Indicator label="Evaluations Recommended" editedInput={hasInputs} />
        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={newSchool.edited_school_evaluations_recommended.input} originalInput={newSchool.school_evaluations_recommended.input}
        name='school_evaluations_recommended' handleCheck={handleCheck}
        />
       
        {isOpen && (
          <>
            <div
              className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}
            >
              <label className="absolute top-[-16px] text-xl font-medium bg-white">
                Minimum Number of Evaluations Recommended
              </label>
              <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={newSchool.edited_school_evaluations_recommended.edited_school_minimum_number_of_evaluations_recommended.input}
              originalInput={newSchool.school_evaluations_recommended.school_minimum_number_of_evaluations_recommended} name='school_minimum_number_of_evaluations_recommended' handleInput={handleInput}
              />
              
            </div>
            <div
              className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}
            >
              <label className="absolute top-[-16px] text-xl font-medium bg-white">
                Recommended Evaluator Title
              </label>
              <TitleFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input}
              originalInput={newSchool.school_evaluations_recommended.school_recommended_evaluator_title} setEvaluator={setEvaluator} addEvaluator={addEvaluator} deleteEvaluator={deleteEvaluator} options={evaluatorOptions}
              undoDelete={undoDelete}
              />
            
            </div>
            <div
              className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}
            >
              <label className="absolute top-[-16px] text-xl font-medium bg-white">
                Minimum Time Evaluator Knows Applicant
              </label>
              <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant.input}
              originalInput={newSchool.school_evaluations_recommended.school_minimum_time_evaluator_knows_applicant} name='school_minimum_time_evaluator_knows_applicant' options={timeOptions}
              number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} handleInput={handleNumber} handleSelect={handleDuration}
              />
             
            </div>
            <div
              className={`mt-12 mx-4 mb-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}
            >
              <label className="absolute top-[-16px] text-xl font-medium bg-white">
                Optional Evaluators Recommended
              </label>
              <button
                onClick={toggleOptions}
                className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]"
              >
                Add Option
              </button>
              <RecOptionFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input}
              originalInput={newSchool.school_evaluations_recommended.school_optional_evaluators_recommended} toggleOptions={toggleOptions} setEditedOption={setEditedOption} setGroupIndex={setGroupIndex} undoDelete={undoOption} deleteOption={deleteOption}
              />
            
            </div>
          </>
        )}
        {isOpen && (
        <div
          className={`mx-5 mb-5`}
        >
            <label className="font-medium text-xl inline-block mt-8">
              Notes:
            </label>
          <button
            onClick={toggleNotePopup}
            className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]"
          >
            Add Note
          </button>
         
          <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} notes={newSchool.edited_school_evaluations_recommended.notes} originalNotes={newSchool.school_evaluations_recommended.school_evaluations_recommended_notes} name='school_evaluations_recommended' toggleNotePopup={toggleNotePopup}
              deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
              />
        </div>
        )}
      </div>
      {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={hasInputs} link={newSchool.edited_school_evaluations_recommended.link} toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj}
      name='school_evaluations_recommended' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} 
      />}
      </div>
      {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
      {openOptions && (
        <AddRecommendedOption
        originalInput={newSchool.school_evaluations_recommended.school_optional_evaluators_recommended}
        input={hasInputs}
        loggedInUser={loggedInUser} isEdit={isEdit}
          newSchool={newSchool}
          setNewSchool={setNewSchool}
          toggleOptions={toggleOptions}
          editedOption={editedOption}
          setEditedOption={setEditedOption}
          groupIndex={groupIndex}
        />
      )}
      {notePopup && (
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
