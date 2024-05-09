interface Step {
    id: string;
    title: string;
    content: string;
}

interface StepForm {
    id: string;
    title: string;
    content: string;
    trailId: string;
}

export type { Step, StepForm }