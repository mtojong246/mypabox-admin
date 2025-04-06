import { OptionalEvaluatorsType } from "../popups/OptionalEvaluatorsPopup";

export default function OptionalEvaluatorsField({
    value,
}: {
    value: OptionalEvaluatorsType,
}) {
    return (
        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
            <p><span className="font-semibold">{value.school_minimum_number_of_evaluators_required_in_group}</span> evaluators are required with the following titles:</p>
            <div className="w-full flex flex-col gap-2 justify-start items-stretch">
                {value.school_required_optional_group_evaluator_title.map(title => (
                    <div className="p-4 border border-outline flex justify-start items-center">
                        <p>{title.value}</p>
                    </div>
                ))}
                
            </div>
            
            <p><span className="font-semibold">Minimum time evaluator knows applicant:</span> {value.school_minimum_time_evaluator_knows_applicant.quantity} {value.school_minimum_time_evaluator_knows_applicant.units}</p>
        </div>
    )
}