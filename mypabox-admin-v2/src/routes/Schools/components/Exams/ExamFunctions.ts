import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_gre') {
        const field = newSchool.edited_school_gre;
        const originalField = newSchool.school_gre;
        setNewSchool({
            ...newSchool,
            edited_school_gre: {
                ...field,
                isEditMode: true,
                edited_school_gre_required: {
                    ...field.edited_school_gre_required,
                    input: field.edited_school_gre_required.input === null ? originalField.school_gre_required : field.edited_school_gre_required.input,
                },
                edited_school_gre_recommended: {
                    ...field.edited_school_gre_recommended,
                    input: field.edited_school_gre_recommended.input === null ? originalField.school_gre_recommended : field.edited_school_gre_recommended.input,
                },
                edited_school_caspa_gre_institution_code: {
                    ...field.edited_school_caspa_gre_institution_code,
                    input: field.edited_school_caspa_gre_institution_code.input === null ? originalField.school_caspa_gre_institution_code : field.edited_school_caspa_gre_institution_code.input,
                },
                edited_school_gre_institution_code: {
                    ...field.edited_school_gre_institution_code,
                    input: field.edited_school_gre_institution_code.input === null ? originalField.school_gre_institution_code : field.edited_school_gre_institution_code.input,
                },
                edited_school_minimum_time_frame_gre_must_be_completed: {
                    ...field.edited_school_minimum_time_frame_gre_must_be_completed,
                    input: field.edited_school_minimum_time_frame_gre_must_be_completed.input === null ? originalField.school_minimum_time_frame_gre_must_be_completed && originalField.school_minimum_time_frame_gre_must_be_completed.input : field.edited_school_minimum_time_frame_gre_must_be_completed.input,
                },
                edited_school_mcat_accepted_in_place_of_gre: {
                    ...field.edited_school_mcat_accepted_in_place_of_gre,
                    input: field.edited_school_mcat_accepted_in_place_of_gre.input === null ? originalField.school_mcat_accepted_in_place_of_gre && originalField.school_mcat_accepted_in_place_of_gre.input : field.edited_school_mcat_accepted_in_place_of_gre.input,
                },
                edited_school_gre_exempt_with_masters_degree: {
                    ...field.edited_school_gre_exempt_with_masters_degree,
                    input: field.edited_school_gre_exempt_with_masters_degree.input === null ? originalField.school_gre_exempt_with_masters_degree && originalField.school_gre_exempt_with_masters_degree.input : field.edited_school_gre_exempt_with_masters_degree.input,
                },
                edited_school_gre_exempt_with_phd_degree: {
                    ...field.edited_school_gre_exempt_with_phd_degree,
                    input: field.edited_school_gre_exempt_with_phd_degree.input === null ? originalField.school_gre_exempt_with_phd_degree && originalField.school_gre_exempt_with_phd_degree.input : field.edited_school_gre_exempt_with_phd_degree.input,
                },
                edited_school_minimum_gre_scores_required: {
                    ...field.edited_school_minimum_gre_scores_required,
                    input: field.edited_school_minimum_gre_scores_required.input === null ? originalField.school_minimum_gre_scores_required : field.edited_school_minimum_gre_scores_required.input,
                },
                edited_school_gre_minimum_verbal_score: {
                    ...field.edited_school_gre_minimum_verbal_score,
                    input: field.edited_school_gre_minimum_verbal_score.input === null ? originalField.school_gre_minimum_verbal_score : field.edited_school_gre_minimum_verbal_score.input,
                },
                edited_school_gre_minimum_quantitative_score: {
                    ...field.edited_school_gre_minimum_quantitative_score,
                    input: field.edited_school_gre_minimum_quantitative_score.input === null ? originalField.school_gre_minimum_quantitative_score : field.edited_school_gre_minimum_quantitative_score.input,
                },
                edited_school_gre_minimum_analytical_writing_score: {
                    ...field.edited_school_gre_minimum_analytical_writing_score,
                    input: field.edited_school_gre_minimum_analytical_writing_score.input === null ? originalField.school_gre_minimum_analytical_writing_score : field.edited_school_gre_minimum_analytical_writing_score.input,
                },
                edited_school_gre_minimum_combined_score: {
                    ...field.edited_school_gre_minimum_combined_score,
                    input: field.edited_school_gre_minimum_combined_score.input === null ? originalField.school_gre_minimum_combined_score : field.edited_school_gre_minimum_combined_score.input,
                },
                edited_school_gre_minimum_verbal_percentile: {
                    ...field.edited_school_gre_minimum_verbal_percentile,
                    input: field.edited_school_gre_minimum_verbal_percentile.input === null ? originalField.school_gre_minimum_verbal_percentile : field.edited_school_gre_minimum_verbal_percentile.input,
                },
                edited_school_gre_minimum_quantitative_percentile: {
                    ...field.edited_school_gre_minimum_quantitative_percentile,
                    input: field.edited_school_gre_minimum_quantitative_percentile.input === null ? originalField.school_gre_minimum_quantitative_percentile : field.edited_school_gre_minimum_quantitative_percentile.input,
                },
                edited_school_gre_minimum_analytical_writing_percentile: {
                    ...field.edited_school_gre_minimum_analytical_writing_percentile,
                    input: field.edited_school_gre_minimum_analytical_writing_percentile.input === null ? originalField.school_gre_minimum_analytical_writing_percentile : field.edited_school_gre_minimum_analytical_writing_percentile.input,
                },
                edited_school_gre_minimum_combined_percentile: {
                    ...field.edited_school_gre_minimum_combined_percentile,
                    input: field.edited_school_gre_minimum_combined_percentile.input === null ? originalField.school_gre_minimum_combined_percentile : field.edited_school_gre_minimum_combined_percentile.input,
                },
                edited_school_average_gre_verbal_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_verbal_score_accepted_previous_year,
                    input: field.edited_school_average_gre_verbal_score_accepted_previous_year.input === null ? originalField.school_average_gre_verbal_score_accepted_previous_year : field.edited_school_average_gre_verbal_score_accepted_previous_year.input,
                },
                edited_school_average_gre_quantitative_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_quantitative_score_accepted_previous_year,
                    input: field.edited_school_average_gre_quantitative_score_accepted_previous_year.input === null ? originalField.school_average_gre_quantitative_score_accepted_previous_year : field.edited_school_average_gre_quantitative_score_accepted_previous_year.input, 
                },
                edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_analytical_writing_score_accepted_previous_year,
                    input: field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input === null ? originalField.school_average_gre_analytical_writing_score_accepted_previous_year : field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input, 
                },
                edited_school_average_gre_combined_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_combined_score_accepted_previous_year,
                    input: field.edited_school_average_gre_combined_score_accepted_previous_year.input === null ? originalField.school_average_gre_combined_score_accepted_previous_year : field.edited_school_average_gre_combined_score_accepted_previous_year.input,
                },
                edited_school_average_gre_verbal_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_verbal_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_verbal_percentile_accepted_previous_year.input === null ? originalField.school_average_gre_verbal_percentile_accepted_previous_year : field.edited_school_average_gre_verbal_percentile_accepted_previous_year.input,
                },
                edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_quantitative_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input === null ? originalField.school_average_gre_quantitative_percentile_accepted_previous_year :  field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input,
                },
                edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input === null ? originalField.school_average_gre_analytical_writing_percentile_accepted_previous_year : field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input,
                },
                edited_school_average_gre_combined_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_combined_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_combined_percentile_accepted_previous_year.input === null ? originalField.school_average_gre_combined_percentile_accepted_previous_year : field.edited_school_average_gre_combined_percentile_accepted_previous_year.input,
                }
            }
        })
    } else if (name === 'edited_school_english_proficiency_exams') {
        const field = newSchool.edited_school_english_proficiency_exams;
        const originalField = newSchool.school_english_proficiency_exams;
        setNewSchool({
            ...newSchool,
            edited_school_english_proficiency_exams: {
                ...field,
                isEditMode: true,
                edited_school_english_proficiency_exams_required: {
                    ...field.edited_school_english_proficiency_exams_required,
                    input: field.edited_school_english_proficiency_exams_required.input === null ? originalField.school_english_proficiency_exams_required : field.edited_school_english_proficiency_exams_required.input,
                },
                edited_school_toefl_required: {
                    ...field.edited_school_toefl_required,
                    input: field.edited_school_toefl_required.input === null ? originalField.school_toefl_required : field.edited_school_toefl_required.input,
                },
                edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_toefl_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input === null ? originalField.school_minimum_time_frame_toefl_needs_to_be_completed : field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input,
                },
                edited_school_toefl_exempt_with_masters_degree: {
                    ...field.edited_school_toefl_exempt_with_masters_degree,
                    input: field.edited_school_toefl_exempt_with_masters_degree.input === null ? originalField.school_toefl_exempt_with_masters_degree : field.edited_school_toefl_exempt_with_masters_degree.input,
                },
                edited_school_toefl_exempt_with_doctoral_degree: {
                    ...field.edited_school_toefl_exempt_with_doctoral_degree,
                    input: field.edited_school_toefl_exempt_with_doctoral_degree.input === null ? originalField.school_toefl_exempt_with_doctoral_degree : field.edited_school_toefl_exempt_with_doctoral_degree.input,
                },
                edited_school_toefl_ibt_minimum_total_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_total_score_required,
                    input: field.edited_school_toefl_ibt_minimum_total_score_required.input === null ? originalField.school_toefl_ibt_minimum_total_score_required : field.edited_school_toefl_ibt_minimum_total_score_required.input,
                },
                edited_school_toefl_ibt_minimum_reading_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_reading_score_required,
                    input: field.edited_school_toefl_ibt_minimum_reading_score_required.input === null ? originalField.school_toefl_ibt_minimum_reading_score_required : field.edited_school_toefl_ibt_minimum_reading_score_required.input,
                },
                edited_school_toefl_ibt_minimum_writing_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_writing_score_required,
                    input: field.edited_school_toefl_ibt_minimum_writing_score_required.input === null ? originalField.school_toefl_ibt_minimum_writing_score_required : field.edited_school_toefl_ibt_minimum_writing_score_required.input,
                },
                edited_school_toefl_ibt_minimum_listening_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_listening_score_required,
                    input: field.edited_school_toefl_ibt_minimum_listening_score_required.input === null ? originalField.school_toefl_ibt_minimum_listening_score_required : field.edited_school_toefl_ibt_minimum_listening_score_required.input,
                },
                edited_school_toefl_ibt_minimum_speaking_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_speaking_score_required,
                    input: field.edited_school_toefl_ibt_minimum_speaking_score_required.input === null ? originalField.school_toefl_ibt_minimum_speaking_score_required : field.edited_school_toefl_ibt_minimum_speaking_score_required.input,
                },
                edited_school_toefl_pbt_minimum_total_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_total_score_required,
                    input: field.edited_school_toefl_pbt_minimum_total_score_required.input === null ? originalField.school_toefl_pbt_minimum_total_score_required : field.edited_school_toefl_pbt_minimum_total_score_required.input,
                },
                edited_school_toefl_pbt_minimum_reading_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_reading_score_required,
                    input: field.edited_school_toefl_pbt_minimum_reading_score_required.input === null ? originalField.school_toefl_pbt_minimum_reading_score_required : field.edited_school_toefl_pbt_minimum_reading_score_required.input,
                },
                edited_school_toefl_pbt_minimum_writing_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_writing_score_required,
                    input: field.edited_school_toefl_pbt_minimum_writing_score_required.input === null ? originalField.school_toefl_pbt_minimum_writing_score_required : field.edited_school_toefl_pbt_minimum_writing_score_required.input,
                },
                edited_school_toefl_pbt_minimum_listening_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_listening_score_required,
                    input: field.edited_school_toefl_pbt_minimum_listening_score_required.input === null ? originalField.school_toefl_pbt_minimum_listening_score_required : field.edited_school_toefl_pbt_minimum_listening_score_required.input,
                },
                edited_school_toefl_pbt_minimum_speaking_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_speaking_score_required,
                    input: field.edited_school_toefl_pbt_minimum_speaking_score_required.input === null ? originalField.school_toefl_pbt_minimum_speaking_score_required : field.edited_school_toefl_pbt_minimum_speaking_score_required.input,
                },
                edited_school_ielt_required: {
                    ...field.edited_school_ielt_required,
                    input: field.edited_school_ielt_required.input === null ? originalField.school_ielt_required : field.edited_school_ielt_required.input,
                },
                edited_school_ielt_minimum_total_score_required: {
                    ...field.edited_school_ielt_minimum_total_score_required,
                    input: field.edited_school_ielt_minimum_total_score_required.input === null ? originalField.school_ielt_minimum_total_score_required : field.edited_school_ielt_minimum_total_score_required.input,
                },
                edited_school_melab_required: {
                    ...field.edited_school_melab_required,
                    input: field.edited_school_melab_required.input === null ? originalField.school_melab_required : field.edited_school_melab_required.input,
                },
                edited_school_melab_minimum_total_score_required: {
                    ...field.edited_school_melab_minimum_total_score_required,
                    input: field.edited_school_melab_minimum_total_score_required.input === null ? originalField.school_melab_minimum_total_score_required : field.edited_school_melab_minimum_total_score_required.input,
                },
                edited_school_pte_academic_required: {
                    ...field.edited_school_pte_academic_required,
                    input: field.edited_school_pte_academic_required.input === null ? originalField.school_pte_academic_required : field.edited_school_pte_academic_required.input,
                },
                edited_school_pte_academic_minimum_total_score_required: {
                    ...field.edited_school_pte_academic_minimum_total_score_required,
                    input: field.edited_school_pte_academic_minimum_total_score_required.input === null ? originalField.school_pte_academic_minimum_total_score_required : field.edited_school_pte_academic_minimum_total_score_required.input,
                },
                edited_school_itep_academic_plus_required:{
                    ...field.edited_school_itep_academic_plus_required,
                    input: field.edited_school_itep_academic_plus_required.input === null ? originalField.school_itep_academic_plus_required : field.edited_school_itep_academic_plus_required.input,
                },
                edited_school_itep_academic_plus_minimum_total_score_required: {
                    ...field.edited_school_itep_academic_plus_minimum_total_score_required,
                    input: field.edited_school_itep_academic_plus_minimum_total_score_required.input === null ? originalField.school_itep_academic_plus_minimum_total_score_required : field.edited_school_itep_academic_plus_minimum_total_score_required.input,
                }
            }
        })
    }
}



export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_gre') {
            const field = newSchool.edited_school_gre;
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...field,
                    isEditMode: false,
                    edited_school_gre_required: {
                        ...field.edited_school_gre_required,
                        input: field.edited_school_gre_required.input,
                        prev: field.edited_school_gre_required.input,
                    },
                    edited_school_gre_recommended: {
                        ...field.edited_school_gre_recommended,
                        input: field.edited_school_gre_recommended.input,
                        prev: field.edited_school_gre_recommended.input,
                    },
                    edited_school_caspa_gre_institution_code: {
                        ...field.edited_school_caspa_gre_institution_code,
                        input: field.edited_school_caspa_gre_institution_code.input,
                        prev: field.edited_school_caspa_gre_institution_code.input,
                    },
                    edited_school_gre_institution_code: {
                        ...field.edited_school_gre_institution_code,
                        input: field.edited_school_gre_institution_code.input,
                        prev: field.edited_school_gre_institution_code.input,
                    },
                    edited_school_minimum_time_frame_gre_must_be_completed: {
                        ...field.edited_school_minimum_time_frame_gre_must_be_completed,
                        input: field.edited_school_minimum_time_frame_gre_must_be_completed.input,
                        prev: field.edited_school_minimum_time_frame_gre_must_be_completed.input,
                    },
                    edited_school_mcat_accepted_in_place_of_gre: {
                        ...field.edited_school_mcat_accepted_in_place_of_gre,
                        input: field.edited_school_mcat_accepted_in_place_of_gre.input,
                        prev: field.edited_school_mcat_accepted_in_place_of_gre.input,
                    },
                    edited_school_gre_exempt_with_masters_degree: {
                        ...field.edited_school_gre_exempt_with_masters_degree,
                        input: field.edited_school_gre_exempt_with_masters_degree.input,
                        prev: field.edited_school_gre_exempt_with_masters_degree.input,
                    },
                    edited_school_gre_exempt_with_phd_degree: {
                        ...field.edited_school_gre_exempt_with_phd_degree,
                        input: field.edited_school_gre_exempt_with_phd_degree.input,
                        prev:field.edited_school_gre_exempt_with_phd_degree.input,
                    },
                    edited_school_minimum_gre_scores_required: {
                        ...field.edited_school_minimum_gre_scores_required,
                        input: field.edited_school_minimum_gre_scores_required.input,
                        prev: field.edited_school_minimum_gre_scores_required.input,
                    },
                    edited_school_gre_minimum_verbal_score: {
                        ...field.edited_school_gre_minimum_verbal_score,
                        input: field.edited_school_gre_minimum_verbal_score.input,
                        prev: field.edited_school_gre_minimum_verbal_score.input,
                    },
                    edited_school_gre_minimum_quantitative_score: {
                        ...field.edited_school_gre_minimum_quantitative_score,
                        input: field.edited_school_gre_minimum_quantitative_score.input,
                        prev: field.edited_school_gre_minimum_quantitative_score.input,
                    },
                    edited_school_gre_minimum_analytical_writing_score: {
                        ...field.edited_school_gre_minimum_analytical_writing_score,
                        input: field.edited_school_gre_minimum_analytical_writing_score.input,
                        prev: field.edited_school_gre_minimum_analytical_writing_score.input,
                    },
                    edited_school_gre_minimum_combined_score: {
                        ...field.edited_school_gre_minimum_combined_score,
                        input: field.edited_school_gre_minimum_combined_score.input,
                        prev: field.edited_school_gre_minimum_combined_score.input,
                    },
                    edited_school_gre_minimum_verbal_percentile: {
                        ...field.edited_school_gre_minimum_verbal_percentile,
                        input: field.edited_school_gre_minimum_verbal_percentile.input,
                        prev: field.edited_school_gre_minimum_verbal_percentile.input,
                    },
                    edited_school_gre_minimum_quantitative_percentile: {
                        ...field.edited_school_gre_minimum_quantitative_percentile,
                        input: field.edited_school_gre_minimum_quantitative_percentile.input,
                        prev: field.edited_school_gre_minimum_quantitative_percentile.input,
                    },
                    edited_school_gre_minimum_analytical_writing_percentile: {
                        ...field.edited_school_gre_minimum_analytical_writing_percentile,
                        input: field.edited_school_gre_minimum_analytical_writing_percentile.input,
                        prev: field.edited_school_gre_minimum_analytical_writing_percentile.input,
                    },
                    edited_school_gre_minimum_combined_percentile: {
                        ...field.edited_school_gre_minimum_combined_percentile,
                        input: field.edited_school_gre_minimum_combined_percentile.input, 
                        prev: field.edited_school_gre_minimum_combined_percentile.input,
                    },
                    edited_school_average_gre_verbal_score_accepted_previous_year: {
                        ...field.edited_school_average_gre_verbal_score_accepted_previous_year,
                        input: field.edited_school_average_gre_verbal_score_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_verbal_score_accepted_previous_year.input,
                    },
                    edited_school_average_gre_quantitative_score_accepted_previous_year: {
                        ...field.edited_school_average_gre_quantitative_score_accepted_previous_year,
                        input: field.edited_school_average_gre_quantitative_score_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_quantitative_score_accepted_previous_year.input,
                    },
                    edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
                        ...field.edited_school_average_gre_analytical_writing_score_accepted_previous_year,
                        input: field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input,
                    },
                    edited_school_average_gre_combined_score_accepted_previous_year: {
                        ...field.edited_school_average_gre_combined_score_accepted_previous_year,
                        input: field.edited_school_average_gre_combined_score_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_combined_score_accepted_previous_year.input,
                    },
                    edited_school_average_gre_verbal_percentile_accepted_previous_year: {
                        ...field.edited_school_average_gre_verbal_percentile_accepted_previous_year,
                        input: field.edited_school_average_gre_verbal_percentile_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_verbal_percentile_accepted_previous_year.input,
                    },
                    edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
                        ...field.edited_school_average_gre_quantitative_percentile_accepted_previous_year,
                        input: field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input,
                    },
                    edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                        ...field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year,
                        input: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input,
                    },
                    edited_school_average_gre_combined_percentile_accepted_previous_year: {
                        ...field.edited_school_average_gre_combined_percentile_accepted_previous_year,
                        input: field.edited_school_average_gre_combined_percentile_accepted_previous_year.input,
                        prev: field.edited_school_average_gre_combined_percentile_accepted_previous_year.input,
                    }
                }
            })
        } else if (name === 'edited_school_english_proficiency_exams') {
            const field = newSchool.edited_school_english_proficiency_exams;
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...field,
                    isEditMode: false,
                    edited_school_english_proficiency_exams_required: {
                        ...field.edited_school_english_proficiency_exams_required,
                        input: field.edited_school_english_proficiency_exams_required.input,
                        prev: field.edited_school_english_proficiency_exams_required.input,
                    },
                    edited_school_toefl_required: {
                        ...field.edited_school_toefl_required,
                        input: field.edited_school_toefl_required.input,
                        prev: field.edited_school_toefl_required.input,
                    },
                    edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                        ...field.edited_school_minimum_time_frame_toefl_needs_to_be_completed,
                        input: field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input,
                        prev: field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input,
                    },
                    edited_school_toefl_exempt_with_masters_degree: {
                        ...field.edited_school_toefl_exempt_with_masters_degree,
                        input: field.edited_school_toefl_exempt_with_masters_degree.input,
                        prev: field.edited_school_toefl_exempt_with_masters_degree.input,
                    },
                    edited_school_toefl_exempt_with_doctoral_degree: {
                        ...field.edited_school_toefl_exempt_with_doctoral_degree,
                        input: field.edited_school_toefl_exempt_with_doctoral_degree.input,
                        prev: field.edited_school_toefl_exempt_with_doctoral_degree.input,
                    },
                    edited_school_toefl_ibt_minimum_total_score_required: {
                        ...field.edited_school_toefl_ibt_minimum_total_score_required,
                        input: field.edited_school_toefl_ibt_minimum_total_score_required.input,
                        prev: field.edited_school_toefl_ibt_minimum_total_score_required.input,
                    },
                    edited_school_toefl_ibt_minimum_reading_score_required: {
                        ...field.edited_school_toefl_ibt_minimum_reading_score_required,
                        input: field.edited_school_toefl_ibt_minimum_reading_score_required.input,
                        prev: field.edited_school_toefl_ibt_minimum_reading_score_required.input,
                    },
                    edited_school_toefl_ibt_minimum_writing_score_required: {
                        ...field.edited_school_toefl_ibt_minimum_writing_score_required,
                        input: field.edited_school_toefl_ibt_minimum_writing_score_required.input,
                        prev: field.edited_school_toefl_ibt_minimum_writing_score_required.input,
                    },
                    edited_school_toefl_ibt_minimum_listening_score_required: {
                        ...field.edited_school_toefl_ibt_minimum_listening_score_required,
                        input: field.edited_school_toefl_ibt_minimum_listening_score_required.input,
                        prev: field.edited_school_toefl_ibt_minimum_listening_score_required.input,
                    },
                    edited_school_toefl_ibt_minimum_speaking_score_required: {
                        ...field.edited_school_toefl_ibt_minimum_speaking_score_required,
                        input: field.edited_school_toefl_ibt_minimum_speaking_score_required.input,
                        prev: field.edited_school_toefl_ibt_minimum_speaking_score_required.input,
                    },
                    edited_school_toefl_pbt_minimum_total_score_required: {
                        ...field.edited_school_toefl_pbt_minimum_total_score_required,
                        input: field.edited_school_toefl_pbt_minimum_total_score_required.input,
                        prev: field.edited_school_toefl_pbt_minimum_total_score_required.input,
                    },
                    edited_school_toefl_pbt_minimum_reading_score_required: {
                        ...field.edited_school_toefl_pbt_minimum_reading_score_required,
                        input: field.edited_school_toefl_pbt_minimum_reading_score_required.input,
                        prev:field.edited_school_toefl_pbt_minimum_reading_score_required.input,
                    },
                    edited_school_toefl_pbt_minimum_writing_score_required: {
                        ...field.edited_school_toefl_pbt_minimum_writing_score_required,
                        input: field.edited_school_toefl_pbt_minimum_writing_score_required.input,
                        prev: field.edited_school_toefl_pbt_minimum_writing_score_required.input,
                    },
                    edited_school_toefl_pbt_minimum_listening_score_required: {
                        ...field.edited_school_toefl_pbt_minimum_listening_score_required,
                        input: field.edited_school_toefl_pbt_minimum_listening_score_required.input,
                        prev: field.edited_school_toefl_pbt_minimum_listening_score_required.input,
                    },
                    edited_school_toefl_pbt_minimum_speaking_score_required: {
                        ...field.edited_school_toefl_pbt_minimum_speaking_score_required,
                        input: field.edited_school_toefl_pbt_minimum_speaking_score_required.input,
                        prev:field.edited_school_toefl_pbt_minimum_speaking_score_required.input,
                    },
                    edited_school_ielt_required: {
                        ...field.edited_school_ielt_required,
                        input: field.edited_school_ielt_required.input,
                        prev: field.edited_school_ielt_required.input,
                    },
                    edited_school_ielt_minimum_total_score_required: {
                        ...field.edited_school_ielt_minimum_total_score_required,
                        input: field.edited_school_ielt_minimum_total_score_required.input,
                        prev:  field.edited_school_ielt_minimum_total_score_required.input,
                    },
                    edited_school_melab_required: {
                        ...field.edited_school_melab_required,
                        input: field.edited_school_melab_required.input,
                        prev: field.edited_school_melab_required.input,
                    },
                    edited_school_melab_minimum_total_score_required: {
                        ...field.edited_school_melab_minimum_total_score_required,
                        input: field.edited_school_melab_minimum_total_score_required.input,
                        prev:field.edited_school_melab_minimum_total_score_required.input,
                    },
                    edited_school_pte_academic_required: {
                        ...field.edited_school_pte_academic_required,
                        input: field.edited_school_pte_academic_required.input,
                        prev:field.edited_school_pte_academic_required.input,
                    },
                    edited_school_pte_academic_minimum_total_score_required: {
                        ...field.edited_school_pte_academic_minimum_total_score_required,
                        input: field.edited_school_pte_academic_minimum_total_score_required.input,
                        prev:field.edited_school_pte_academic_minimum_total_score_required.input,
                    },
                    edited_school_itep_academic_plus_required:{
                        ...field.edited_school_itep_academic_plus_required,
                        input: field.edited_school_itep_academic_plus_required.input,
                        prev: field.edited_school_itep_academic_plus_required.input,
                    },
                    edited_school_itep_academic_plus_minimum_total_score_required: {
                        ...field.edited_school_itep_academic_plus_minimum_total_score_required,
                        input: field.edited_school_itep_academic_plus_minimum_total_score_required.input,
                        prev: field.edited_school_itep_academic_plus_minimum_total_score_required.input,
                    }
                }
            })
        }
    } else {
        if (name === 'edited_school_gre') {
            const field = newSchool.edited_school_gre;
            const originalField = newSchool.school_gre;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...originalField,
                    school_gre_required: field.edited_school_gre_required.input!,
                    school_gre_recommended: field.edited_school_gre_recommended.input!,
                    school_caspa_gre_institution_code: field.edited_school_caspa_gre_institution_code.input!,
                    school_gre_institution_code: field.edited_school_gre_institution_code.input!,
            
                    school_minimum_time_frame_gre_must_be_completed: field.edited_school_minimum_time_frame_gre_must_be_completed.input ? {
                        input: field.edited_school_minimum_time_frame_gre_must_be_completed.input,
                        school_minimum_time_frame_gre_must_be_completed_notes: originalField.school_minimum_time_frame_gre_must_be_completed ? originalField.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes : [],
                    } : originalField.school_minimum_time_frame_gre_must_be_completed,
            
                    school_mcat_accepted_in_place_of_gre: field.edited_school_mcat_accepted_in_place_of_gre.input ? {
                        input: field.edited_school_mcat_accepted_in_place_of_gre.input,
                        school_mcat_accepted_in_place_of_gre_notes: originalField.school_mcat_accepted_in_place_of_gre ? originalField.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes : [],
                    } : originalField.school_mcat_accepted_in_place_of_gre,
                    school_gre_exempt_with_masters_degree: field.edited_school_gre_exempt_with_masters_degree.input ? {
                        input: field.edited_school_gre_exempt_with_masters_degree.input,
                        school_gre_exempt_with_masters_degree_notes: originalField.school_gre_exempt_with_masters_degree ? originalField.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes : [],
                    } : originalField.school_gre_exempt_with_masters_degree,
            
                    school_gre_exempt_with_phd_degree: field.edited_school_gre_exempt_with_phd_degree.input ? {
                        input: field.edited_school_gre_exempt_with_phd_degree.input,
                        school_gre_exempt_with_phd_degree_notes: originalField.school_gre_exempt_with_phd_degree ? originalField.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes : [],
                    } : originalField.school_gre_exempt_with_phd_degree,
            
                    school_minimum_gre_scores_required: field.edited_school_minimum_gre_scores_required.input!,
                    school_gre_minimum_verbal_score:field.edited_school_gre_minimum_verbal_score.input!,
                    school_gre_minimum_quantitative_score: field.edited_school_gre_minimum_quantitative_score.input!,
                    school_gre_minimum_analytical_writing_score: field.edited_school_gre_minimum_analytical_writing_score.input!,
                    school_gre_minimum_combined_score: field.edited_school_gre_minimum_combined_score.input!,
            
                    school_gre_minimum_verbal_percentile: field.edited_school_gre_minimum_verbal_percentile.input!,
                    school_gre_minimum_quantitative_percentile: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input!,
                    school_gre_minimum_analytical_writing_percentile: field.edited_school_gre_minimum_analytical_writing_percentile.input!,
                    school_gre_minimum_combined_percentile: field.edited_school_gre_minimum_combined_percentile.input!,
            
                    school_average_gre_verbal_score_accepted_previous_year: field.edited_school_average_gre_verbal_score_accepted_previous_year.input!,
                    school_average_gre_quantitative_score_accepted_previous_year: field.edited_school_average_gre_quantitative_score_accepted_previous_year.input!,
                    school_average_gre_analytical_writing_score_accepted_previous_year: field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input!,
                    school_average_gre_combined_score_accepted_previous_year: field.edited_school_average_gre_combined_score_accepted_previous_year.input!,
            
                    school_average_gre_verbal_percentile_accepted_previous_year: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input!,
                    school_average_gre_quantitative_percentile_accepted_previous_year: field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input!,
                    school_average_gre_analytical_writing_percentile_accepted_previous_year: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input!,
                    school_average_gre_combined_percentile_accepted_previous_year: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input!,
                },
                edited_school_gre: {
                    link: '',
                    isEditMode: false,
                    edited_school_gre_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_recommended: {
                        input: null,
                        prev: null,
                    },
                    edited_school_caspa_gre_institution_code: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_institution_code: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_time_frame_gre_must_be_completed: {
                        input: null,
                        prev: null,
                    },
                    edited_school_mcat_accepted_in_place_of_gre: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_exempt_with_masters_degree: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_exempt_with_phd_degree: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_gre_scores_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_verbal_score: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_quantitative_score: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_analytical_writing_score: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_combined_score: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_verbal_percentile: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_quantitative_percentile: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_analytical_writing_percentile: {
                        input: null,
                        prev: null,
                    },
                    edited_school_gre_minimum_combined_percentile: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_verbal_score_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_quantitative_score_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_combined_score_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_verbal_percentile_accepted_previous_year:{
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                    edited_school_average_gre_combined_percentile_accepted_previous_year: {
                        input: null,
                        prev: null,
                    },
                }
            })
        } else if (name === 'edited_school_english_proficiency_exams') {
            const field = newSchool.edited_school_english_proficiency_exams;
            const originalField = newSchool.school_english_proficiency_exams;
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...originalField,
                    school_english_proficiency_exams_required: field.edited_school_english_proficiency_exams_required.input!,
                    school_toefl_required: field.edited_school_toefl_required.input!,
                    school_minimum_time_frame_toefl_needs_to_be_completed: field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input!,
                    school_toefl_exempt_with_masters_degree: field.edited_school_toefl_exempt_with_masters_degree.input!,
                    school_toefl_exempt_with_doctoral_degree: field.edited_school_toefl_exempt_with_doctoral_degree.input!,

                    school_toefl_ibt_minimum_total_score_required: field.edited_school_toefl_ibt_minimum_total_score_required.input!,
                    school_toefl_ibt_minimum_reading_score_required: field.edited_school_toefl_ibt_minimum_reading_score_required.input!,
                    school_toefl_ibt_minimum_writing_score_required: field.edited_school_toefl_ibt_minimum_writing_score_required.input!,
                    school_toefl_ibt_minimum_listening_score_required: field.edited_school_toefl_ibt_minimum_listening_score_required.input!,
                    school_toefl_ibt_minimum_speaking_score_required: field.edited_school_toefl_ibt_minimum_speaking_score_required.input!,

                    school_toefl_pbt_minimum_total_score_required: field.edited_school_toefl_pbt_minimum_total_score_required.input!,
                    school_toefl_pbt_minimum_reading_score_required: field.edited_school_toefl_pbt_minimum_reading_score_required.input!,
                    school_toefl_pbt_minimum_writing_score_required: field.edited_school_toefl_pbt_minimum_writing_score_required.input!,
                    school_toefl_pbt_minimum_listening_score_required: field.edited_school_toefl_pbt_minimum_listening_score_required.input!,
                    school_toefl_pbt_minimum_speaking_score_required: field.edited_school_toefl_pbt_minimum_speaking_score_required.input!,

                    school_ielt_required: field.edited_school_ielt_required.input!,
                    school_ielt_minimum_total_score_required: field.edited_school_ielt_minimum_total_score_required.input!,

                    school_melab_required: field.edited_school_melab_required.input!,
                    school_melab_minimum_total_score_required: field.edited_school_melab_minimum_total_score_required.input!,

                    school_pte_academic_required: field.edited_school_pte_academic_required.input!,
                    school_pte_academic_minimum_total_score_required: field.edited_school_pte_academic_minimum_total_score_required.input!,

                    school_itep_academic_plus_required: field.edited_school_itep_academic_plus_required.input!,
                    school_itep_academic_plus_minimum_total_score_required: field.edited_school_itep_academic_plus_minimum_total_score_required.input!,
                },
                edited_school_english_proficiency_exams: {
                    link: '',
                    isEditMode: false,
                    edited_school_english_proficiency_exams_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_exempt_with_masters_degree: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_exempt_with_doctoral_degree: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_ibt_minimum_total_score_required:{
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_ibt_minimum_reading_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_ibt_minimum_writing_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_ibt_minimum_listening_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_ibt_minimum_speaking_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_pbt_minimum_total_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_pbt_minimum_reading_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_pbt_minimum_writing_score_required:{
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_pbt_minimum_listening_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_toefl_pbt_minimum_speaking_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_ielt_required:{
                        input: null,
                        prev: null,
                    },
                    edited_school_ielt_minimum_total_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_melab_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_melab_minimum_total_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_pte_academic_required:{
                        input: null,
                        prev: null,
                    },
                    edited_school_pte_academic_minimum_total_score_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_itep_academic_plus_required:{
                        input: null,
                        prev: null,
                    },
                    edited_school_itep_academic_plus_minimum_total_score_required: {
                        input: null,
                        prev: null,
                    },
                }
            })
        }
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_gre') {
        const field = newSchool.edited_school_gre;
        setNewSchool({
            ...newSchool,
            edited_school_gre: {
                ...field,
                isEditMode: false,
                edited_school_gre_required: {
                    ...field.edited_school_gre_required,
                    input: field.edited_school_gre_required.prev,
                    prev: null,
                },
                edited_school_gre_recommended: {
                    ...field.edited_school_gre_recommended,
                    input: field.edited_school_gre_recommended.prev,
                    prev: null,
                },
                edited_school_caspa_gre_institution_code: {
                    ...field.edited_school_caspa_gre_institution_code,
                    input: field.edited_school_caspa_gre_institution_code.prev,
                    prev: null,
                },
                edited_school_gre_institution_code: {
                    ...field.edited_school_gre_institution_code,
                    input: field.edited_school_gre_institution_code.prev,
                    prev: null,
                },
                edited_school_minimum_time_frame_gre_must_be_completed: {
                    ...field.edited_school_minimum_time_frame_gre_must_be_completed,
                    input: field.edited_school_minimum_time_frame_gre_must_be_completed.prev,
                    prev: null,
                },
                edited_school_mcat_accepted_in_place_of_gre: {
                    ...field.edited_school_mcat_accepted_in_place_of_gre,
                    input: field.edited_school_mcat_accepted_in_place_of_gre.prev,
                    prev: null,
                },
                edited_school_gre_exempt_with_masters_degree: {
                    ...field.edited_school_gre_exempt_with_masters_degree,
                    input: field.edited_school_gre_exempt_with_masters_degree.prev,
                    prev: null,
                },
                edited_school_gre_exempt_with_phd_degree: {
                    ...field.edited_school_gre_exempt_with_phd_degree,
                    input: field.edited_school_gre_exempt_with_phd_degree.prev,
                    prev: null,
                },
                edited_school_minimum_gre_scores_required: {
                    ...field.edited_school_minimum_gre_scores_required,
                    input: field.edited_school_minimum_gre_scores_required.prev,
                    prev: null,
                },
                edited_school_gre_minimum_verbal_score: {
                    ...field.edited_school_gre_minimum_verbal_score,
                    input: field.edited_school_gre_minimum_verbal_score.prev,
                    prev: null,
                },
                edited_school_gre_minimum_quantitative_score: {
                    ...field.edited_school_gre_minimum_quantitative_score,
                    input: field.edited_school_gre_minimum_quantitative_score.prev,
                    prev: null,
                },
                edited_school_gre_minimum_analytical_writing_score: {
                    ...field.edited_school_gre_minimum_analytical_writing_score,
                    input: field.edited_school_gre_minimum_analytical_writing_score.prev,
                    prev: null,
                },
                edited_school_gre_minimum_combined_score: {
                    ...field.edited_school_gre_minimum_combined_score,
                    input: field.edited_school_gre_minimum_combined_score.prev,
                    prev: null,
                },
                edited_school_gre_minimum_verbal_percentile: {
                    ...field.edited_school_gre_minimum_verbal_percentile,
                    input: field.edited_school_gre_minimum_verbal_percentile.prev,
                    prev: null,
                },
                edited_school_gre_minimum_quantitative_percentile: {
                    ...field.edited_school_gre_minimum_quantitative_percentile,
                    input: field.edited_school_gre_minimum_quantitative_percentile.prev,
                    prev: null,
                },
                edited_school_gre_minimum_analytical_writing_percentile: {
                    ...field.edited_school_gre_minimum_analytical_writing_percentile,
                    input: field.edited_school_gre_minimum_analytical_writing_percentile.prev,
                    prev: null,
                },
                edited_school_gre_minimum_combined_percentile: {
                    ...field.edited_school_gre_minimum_combined_percentile,
                    input: field.edited_school_gre_minimum_combined_percentile.prev, 
                    prev: null,
                },
                edited_school_average_gre_verbal_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_verbal_score_accepted_previous_year,
                    input: field.edited_school_average_gre_verbal_score_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_quantitative_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_quantitative_score_accepted_previous_year,
                    input: field.edited_school_average_gre_quantitative_score_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_analytical_writing_score_accepted_previous_year,
                    input: field.edited_school_average_gre_analytical_writing_score_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_combined_score_accepted_previous_year: {
                    ...field.edited_school_average_gre_combined_score_accepted_previous_year,
                    input: field.edited_school_average_gre_combined_score_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_verbal_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_verbal_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_verbal_percentile_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_quantitative_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_quantitative_percentile_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.prev,
                    prev: null,
                },
                edited_school_average_gre_combined_percentile_accepted_previous_year: {
                    ...field.edited_school_average_gre_combined_percentile_accepted_previous_year,
                    input: field.edited_school_average_gre_combined_percentile_accepted_previous_year.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_english_proficiency_exams') {
        const field = newSchool.edited_school_english_proficiency_exams;
        setNewSchool({
            ...newSchool,
            edited_school_english_proficiency_exams: {
                ...field,
                isEditMode: false,
                edited_school_english_proficiency_exams_required: {
                    ...field.edited_school_english_proficiency_exams_required,
                    input: field.edited_school_english_proficiency_exams_required.prev,
                    prev: null,
                },
                edited_school_toefl_required: {
                    ...field.edited_school_toefl_required,
                    input: field.edited_school_toefl_required.prev,
                    prev: null,
                },
                edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_toefl_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_toefl_needs_to_be_completed.prev,
                    prev: null,
                },
                edited_school_toefl_exempt_with_masters_degree: {
                    ...field.edited_school_toefl_exempt_with_masters_degree,
                    input: field.edited_school_toefl_exempt_with_masters_degree.prev,
                    prev: null,
                },
                edited_school_toefl_exempt_with_doctoral_degree: {
                    ...field.edited_school_toefl_exempt_with_doctoral_degree,
                    input: field.edited_school_toefl_exempt_with_doctoral_degree.prev,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_total_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_total_score_required,
                    input: field.edited_school_toefl_ibt_minimum_total_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_reading_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_reading_score_required,
                    input: field.edited_school_toefl_ibt_minimum_reading_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_writing_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_writing_score_required,
                    input: field.edited_school_toefl_ibt_minimum_writing_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_listening_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_listening_score_required,
                    input: field.edited_school_toefl_ibt_minimum_listening_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_speaking_score_required: {
                    ...field.edited_school_toefl_ibt_minimum_speaking_score_required,
                    input: field.edited_school_toefl_ibt_minimum_speaking_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_total_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_total_score_required,
                    input: field.edited_school_toefl_pbt_minimum_total_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_reading_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_reading_score_required,
                    input: field.edited_school_toefl_pbt_minimum_reading_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_writing_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_writing_score_required,
                    input: field.edited_school_toefl_pbt_minimum_writing_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_listening_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_listening_score_required,
                    input: field.edited_school_toefl_pbt_minimum_listening_score_required.prev,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_speaking_score_required: {
                    ...field.edited_school_toefl_pbt_minimum_speaking_score_required,
                    input: field.edited_school_toefl_pbt_minimum_speaking_score_required.prev,
                    prev: null,
                },
                edited_school_ielt_required: {
                    ...field.edited_school_ielt_required,
                    input: field.edited_school_ielt_required.prev,
                    prev: null,
                },
                edited_school_ielt_minimum_total_score_required: {
                    ...field.edited_school_ielt_minimum_total_score_required,
                    input: field.edited_school_ielt_minimum_total_score_required.prev,
                    prev: null,
                },
                edited_school_melab_required: {
                    ...field.edited_school_melab_required,
                    input: field.edited_school_melab_required.prev,
                    prev: null,
                },
                edited_school_melab_minimum_total_score_required: {
                    ...field.edited_school_melab_minimum_total_score_required,
                    input: field.edited_school_melab_minimum_total_score_required.prev,
                    prev: null,
                },
                edited_school_pte_academic_required: {
                    ...field.edited_school_pte_academic_required,
                    input: field.edited_school_pte_academic_required.prev,
                    prev: null,
                },
                edited_school_pte_academic_minimum_total_score_required: {
                    ...field.edited_school_pte_academic_minimum_total_score_required,
                    input: field.edited_school_pte_academic_minimum_total_score_required.prev,
                    prev: null,
                },
                edited_school_itep_academic_plus_required:{
                    ...field.edited_school_itep_academic_plus_required,
                    input: field.edited_school_itep_academic_plus_required.prev,
                    prev: null,
                },
                edited_school_itep_academic_plus_minimum_total_score_required: {
                    ...field.edited_school_itep_academic_plus_minimum_total_score_required,
                    input: field.edited_school_itep_academic_plus_minimum_total_score_required.prev,
                    prev: null,
                }
            }
        })
    }
}


export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_gre') {
        setNewSchool({
            ...newSchool,
            edited_school_gre: {
                link: '',
                isEditMode: false,
                edited_school_gre_required: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_recommended: {
                    input: null,
                    prev: null,
                },
                edited_school_caspa_gre_institution_code: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_institution_code: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_time_frame_gre_must_be_completed: {
                    input: null,
                    prev: null,
                },
                edited_school_mcat_accepted_in_place_of_gre: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_exempt_with_masters_degree: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_exempt_with_phd_degree: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_gre_scores_required: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_verbal_score: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_quantitative_score: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_analytical_writing_score: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_combined_score: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_verbal_percentile: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_quantitative_percentile: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_analytical_writing_percentile: {
                    input: null,
                    prev: null,
                },
                edited_school_gre_minimum_combined_percentile: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_verbal_score_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_quantitative_score_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_combined_score_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_verbal_percentile_accepted_previous_year:{
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
                edited_school_average_gre_combined_percentile_accepted_previous_year: {
                    input: null,
                    prev: null,
                },
            }
        })
    } else if (name === 'edited_school_english_proficiency_exams') {
        setNewSchool({
            ...newSchool,
            edited_school_english_proficiency_exams: {
                link: '',
                isEditMode: false,
                edited_school_english_proficiency_exams_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_required: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_exempt_with_masters_degree: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_exempt_with_doctoral_degree: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_total_score_required:{
                    input: null,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_reading_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_writing_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_listening_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_ibt_minimum_speaking_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_total_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_reading_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_writing_score_required:{
                    input: null,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_listening_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_toefl_pbt_minimum_speaking_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_ielt_required:{
                    input: null,
                    prev: null,
                },
                edited_school_ielt_minimum_total_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_melab_required: {
                    input: null,
                    prev: null,
                },
                edited_school_melab_minimum_total_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_pte_academic_required:{
                    input: null,
                    prev: null,
                },
                edited_school_pte_academic_minimum_total_score_required: {
                    input: null,
                    prev: null,
                },
                edited_school_itep_academic_plus_required:{
                    input: null,
                    prev: null,
                },
                edited_school_itep_academic_plus_minimum_total_score_required: {
                    input: null,
                    prev: null,
                },
            }
        })
    }
}
