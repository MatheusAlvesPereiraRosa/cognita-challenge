import { Step } from "~/interfaces"

interface Props {
    step: Step
}

export const StepItem = ({step}: Props) => {
    return (
        <div className=" bg-white  rounded-md border-2 border-slate-200">
            <div className="p-6">
                <p className="text-xl font-bold mb-2">{step.title}</p>

                <p className="text-lg text-slate-600 font-semibold">{step.content}</p>
            </div>
        </div>
    )
}

