import { NewSchool } from "../../../../types/newSchools.types";

export const setExperienceConditionalFields = (school: NewSchool) => {
    const {
        school_patient_experience,
        school_healthcare_experience,
        school_volunteer_service,
        school_community_service,
    } = school;

    const pceRequired = {
        original: school_patient_experience.original.input.school_patient_experience_required.input,
        draft: school_patient_experience.draft.input.school_patient_experience_required.input,
    }

    const pceRecommended = {
        original: school_patient_experience.original.input.school_patient_experience_recommended.input,
        draft: school_patient_experience.draft.input.school_patient_experience_recommended.input,
    }

    const hceRequired = {
        original: school_healthcare_experience.original.input.school_healthcare_experience_required.input,
        draft: school_healthcare_experience.draft.input.school_healthcare_experience_required.input,
    }

    const hceRecommended = {
        original: school_healthcare_experience.original.input.school_healthcare_experience_recommended.input,
        draft: school_healthcare_experience.draft.input.school_healthcare_experience_recommended.input,
    }

    const vsRequired = {
        original: school_volunteer_service.original.input.school_volunteer_service_required.input,
        draft: school_volunteer_service.draft.input.school_volunteer_service_required.input,
    }

    const vsRecommended = {
        original: school_volunteer_service.original.input.school_volunteer_service_recommended.input,
        draft: school_volunteer_service.draft.input.school_volunteer_service_recommended.input,
    }

    const csRequired = {
        original: school_community_service.original.input.school_community_service_required.input,
        draft: school_community_service.draft.input.school_community_service_required.input,
    }

    const csRecommended = {
        original: school_community_service.original.input.school_community_service_recommended.input,
        draft: school_community_service.draft.input.school_community_service_recommended.input,
    }
    

    let updatedSchool: NewSchool = {
        ...school,
        school_patient_experience: {
            ...school.school_patient_experience,
            original: {
                ...school.school_patient_experience.original,
                input: {
                    ...school.school_patient_experience.original.input,
                    school_minimum_patient_care_experience_hours_required: pceRequired.original ? school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_required ? 
                        school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_patient_care_experience_hours_recommended: pceRecommended.original ? school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_recommended ? 
                        school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: pceRequired.original ? school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required ? 
                        school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: pceRecommended.original ? school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended ? 
                        school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                },
            },
            draft: {
                ...school.school_patient_experience.draft,
                input: {
                    ...school.school_patient_experience.draft.input,
                    school_minimum_patient_care_experience_hours_required: pceRequired.draft ? school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_required ? 
                        school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_patient_care_experience_hours_recommended: pceRecommended.draft ? school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_recommended ? 
                        school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: pceRequired.draft ? school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required ? 
                        school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: pceRecommended.draft ? school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended ? 
                        school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                }
            }
        },
        school_healthcare_experience: {
            ...school.school_healthcare_experience,
            original: {
                ...school.school_healthcare_experience.original,
                input: {
                    ...school.school_healthcare_experience.original.input,
                    school_minimum_healthcare_experience_hours_required: hceRequired.original ? school.school_healthcare_experience.original.input.school_minimum_healthcare_experience_hours_required ? 
                        school.school_healthcare_experience.original.input.school_minimum_healthcare_experience_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_healthcare_experience_hours_recommended: hceRecommended.original ? school.school_healthcare_experience.original.input.school_minimum_healthcare_experience_hours_recommended ? 
                        school.school_healthcare_experience.original.input.school_minimum_healthcare_experience_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: hceRequired.original ? school.school_healthcare_experience.original.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required ? 
                        school.school_healthcare_experience.original.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: hceRecommended.original ? school.school_healthcare_experience.original.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended ? 
                        school.school_healthcare_experience.original.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                }
            },
            draft: {
                ...school.school_healthcare_experience.draft,
                input: {
                    ...school.school_healthcare_experience.draft.input,
                    school_minimum_healthcare_experience_hours_required: hceRequired.draft ? school.school_healthcare_experience.draft.input.school_minimum_healthcare_experience_hours_required ? 
                        school.school_healthcare_experience.draft.input.school_minimum_healthcare_experience_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_healthcare_experience_hours_recommended: hceRecommended.draft ? school.school_healthcare_experience.draft.input.school_minimum_healthcare_experience_hours_recommended ? 
                        school.school_healthcare_experience.draft.input.school_minimum_healthcare_experience_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: hceRequired.draft ? school.school_healthcare_experience.draft.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required ? 
                        school.school_healthcare_experience.draft.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: hceRecommended.draft ? school.school_healthcare_experience.draft.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended ? 
                        school.school_healthcare_experience.draft.input.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended : {
                            input: { quantity: 0, units: '' },
                            notes: [],
                        } : null,
                }
            }
        },
        school_volunteer_service: {
            ...school.school_volunteer_service,
            original: {
                ...school.school_volunteer_service.original,
                input: {
                    ...school.school_volunteer_service.original.input,
                    school_minimum_volunteer_service_hours_required: vsRequired.original ? school.school_volunteer_service.original.input.school_minimum_volunteer_service_hours_required ? 
                        school.school_volunteer_service.original.input.school_minimum_volunteer_service_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_volunteer_service_hours_recommended: vsRecommended.original ? school.school_volunteer_service.original.input.school_minimum_volunteer_service_hours_recommended ? 
                        school.school_volunteer_service.original.input.school_minimum_volunteer_service_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                }
            },
            draft: {
                ...school.school_volunteer_service.draft,
                input: {
                    ...school.school_volunteer_service.draft.input,
                    school_minimum_volunteer_service_hours_required: vsRequired.draft ? school.school_volunteer_service.draft.input.school_minimum_volunteer_service_hours_required ? 
                        school.school_volunteer_service.draft.input.school_minimum_volunteer_service_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_volunteer_service_hours_recommended: vsRecommended.draft ? school.school_volunteer_service.draft.input.school_minimum_volunteer_service_hours_recommended ? 
                        school.school_volunteer_service.draft.input.school_minimum_volunteer_service_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                }
            }
        },
        school_community_service: {
            ...school.school_community_service,
            original: {
                ...school.school_community_service.original,
                input: {
                    ...school.school_community_service.original.input,
                    school_minimum_community_service_hours_required: csRequired.original ? school.school_community_service.original.input.school_minimum_community_service_hours_required ? 
                        school.school_community_service.original.input.school_minimum_community_service_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_community_service_hours_recommended: csRecommended.original ? school.school_community_service.original.input.school_minimum_community_service_hours_recommended ? 
                        school.school_community_service.original.input.school_minimum_community_service_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                },
            },
            draft: {
                ...school.school_community_service.draft,
                input: {
                    ...school.school_community_service.draft.input,
                    school_minimum_community_service_hours_required: csRequired.draft ? school.school_community_service.draft.input.school_minimum_community_service_hours_required ? 
                        school.school_community_service.draft.input.school_minimum_community_service_hours_required : {
                            input: 0,
                            notes: [],
                        } : null,
                    school_minimum_community_service_hours_recommended: csRecommended.draft ? school.school_community_service.draft.input.school_minimum_community_service_hours_recommended ? 
                        school.school_community_service.draft.input.school_minimum_community_service_hours_recommended : {
                            input: 0,
                            notes: [],
                        } : null,
                }
            }
        }
    };

    

    return updatedSchool;
    
}