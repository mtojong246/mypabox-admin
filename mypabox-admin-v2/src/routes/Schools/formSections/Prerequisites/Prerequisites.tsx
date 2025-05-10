import { Dispatch, SetStateAction, useState } from "react"
import { NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import MinimumGradeAndTimeCriteriaAndBoolean from "./components/MinimumGradeAndTimeCriteriaAndBoolean";
import CompletionCriteria from "./components/CompletionCriteria";
import RequiredCoursesPopup, { RequiredCourseType } from "./popups/RequiredCoursesPopup";
import RequiredOptionalCoursesPopup, { RequiredOptionalCourseType } from "./popups/RequiredOptionalCoursesPopup";
import RequiredCourseCategoriesPopup, { RequiredCourseCategoryType } from "./popups/RequiredCourseCategoriesPopup";
import RecommendedCoursePopup, { RecommendedCourseType } from "./popups/RecommendedCoursePopup";
import RecommendedCourses from "./components/RecommendedCourses";
import RequiredCoursesAndCategories from "./components/RequiredCoursesAndCategories";
import { UserPermissions } from "../../../../types/users.types";

export type PrereqPopupType = 'required-courses' | 'recommended-courses' | 'optional-courses' | 'course-categories' ;
export type PrereqArrItemType = RequiredCourseType | RequiredOptionalCourseType | RequiredCourseCategoryType | RecommendedCourseType;



export default function Prerequisites({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions
}) {
    const {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleRetrieveValue,
        handleModification,
        revertIndividualChange,
        validateIndividualChange,
        validateAllRemovals
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    const [ popupType, setPopupType ] = useState<PrereqPopupType | null>(null);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ selectedPrereqField, setSelectedPrereqField ] = useState<{
        name: string,
        path: string,
        index?: number,
    } | null>(null);

    const [ selectedPrereqArrItem, setSelectedPrereqArrItem ] = useState<PrereqArrItemType | null>(null);

    const togglePopup = (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => {
        e.preventDefault();
        setIsPopupOpen(!isNoteOpen);

        setPopupType(type);

        if (field !== undefined) {
            setSelectedPrereqField(field);
        } else {
            setSelectedPrereqField(null);
        }

        if (arrItem !== undefined) {
            setSelectedPrereqArrItem(arrItem);
        } else {
            setSelectedPrereqArrItem(null);
        }
    };


    return (
        <>
        <RequiredCoursesAndCategories 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            togglePopup={togglePopup}
            showChangesOnly={showChangesOnly}
        />
        <RecommendedCourses 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            togglePopup={togglePopup}
            showChangesOnly={showChangesOnly}
        />
        <MinimumGradeAndTimeCriteriaAndBoolean 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            showChangesOnly={showChangesOnly}
        />
        <CompletionCriteria 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            validateAllRemovals={validateAllRemovals}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            showChangesOnly={showChangesOnly}
        />
        
        {isNoteOpen && selectedField && (
            <NotePopup 
                toggleNotePopup={toggleNote}
                selectedField={selectedField}
                selectedNote={selectedNote}
                school={school}
                handleChanges={handleChanges}
                handleModification={handleModification}
            />
        )}

        {isPopupOpen && selectedPrereqField && (
            <>
            {popupType === 'required-courses' ? (
                <RequiredCoursesPopup 
                    school={school}
                    togglePopup={togglePopup}
                    selectedPrereqArrItem={selectedPrereqArrItem}
                    selectedPrereqField={selectedPrereqField}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                    permissions={permissions}
                />
            ) : popupType === 'recommended-courses' ? (
                <RecommendedCoursePopup 
                    school={school}
                    togglePopup={togglePopup}
                    selectedPrereqArrItem={selectedPrereqArrItem}
                    selectedPrereqField={selectedPrereqField}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                    permissions={permissions}
                />
            ) : popupType === 'optional-courses' ? (
                <RequiredOptionalCoursesPopup 
                    school={school}
                    togglePopup={togglePopup}
                    selectedPrereqArrItem={selectedPrereqArrItem}
                    selectedPrereqField={selectedPrereqField}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                    permissions={permissions}
                />
            ) : popupType === 'course-categories' ? (
                <RequiredCourseCategoriesPopup 
                    school={school}
                    togglePopup={togglePopup}
                    selectedPrereqArrItem={selectedPrereqArrItem}
                    selectedPrereqField={selectedPrereqField}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                    permissions={permissions}
                />
            ) : (
                <></>
            )}
            </>
        )}
        </>
    )
}