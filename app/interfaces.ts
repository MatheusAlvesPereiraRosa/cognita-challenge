interface Trail {
    id: string;
    title: string;
    content: string;
}

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

interface ActionErrors {
    id?: string;
    title?: string;
    content?: string;
}

interface ActionData {
    errors?: ActionErrors;
    type?: "error" | "success";
    message?: string;
}

export type { Trail, Step, StepForm, ActionData }