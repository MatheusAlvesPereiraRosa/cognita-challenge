import { StepItem } from "../StepItem/index"

import { Step } from "~/interfaces"

interface Props {
    steps: Step[]
}

export const StepList = ({ steps }: Props) => {
    return (
        <div className="flex flex-col gap-6 mt-12">
            {
                steps.length > 0 && steps.map((step: any) => (
                    <StepItem key={step.id} step={step}></StepItem>
                ))
            }
        </div>
    )
}