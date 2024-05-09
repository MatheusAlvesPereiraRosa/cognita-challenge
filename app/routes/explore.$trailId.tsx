import type { LoaderFunction } from "@remix-run/node";

import { redirect, useActionData } from "@remix-run/react";
import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { getSteps, getOneTrail, createStep } from "~/utils/dataService";

import Modal from "~/components/Modal";
import { useLoaderData, useParams } from "@remix-run/react";
import { StepList } from "~/components/StepList";

import { Step, Trail } from "~/interfaces";

export const loader: LoaderFunction = async ({ params }) => {
    const { trailId } = params

    if (!trailId || trailId === "") {
        return redirect("/");
    }

    try {

        const trail = await getOneTrail(trailId)

        const steps = await getSteps(trailId)

        if (trail === null || !trail || trail.length === 0) {
            return redirect("")
        }

        return json({ steps, trail });
    } catch (error: any) {
        console.error('Error retrieving steps from database:', error.message);
        return json({ error: 'An error occurred while retrieving steps from the database.' }, 500); // Return an error response
    }
}

export async function action({
    request,
}: ActionFunctionArgs) {
    try {
        const body = await request.formData();

        const id = String(body.get("id"))
        const trailId = String(body.get("trailId"))
        const title = String(body.get("title"))
        const content = String(body.get("content"))

        const errors: { id?: string; title?: string; content?: string } = {}

        if (!id || id === "") {
            errors.id = "Digite um Id para o passo!"
        }

        if (!title || title === "") {
            errors.title = "Digite um título para o passo!"
        }

        if (!content || content === "") {
            errors.content = "Digite um conteúdo para o passo!"
        }

        if (Object.keys(errors).length) {
            return json({ errors })
        }

        const step = await createStep({
            trailId: trailId,
            id: id,
            title: title,
            content: content
        })

        console.log(step)
    } catch (error: any) {
        console.log(error)
    }

    return null
}

export default function Steps() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const actionData = useActionData<typeof action>()

    console.log(actionData)

    const idError = actionData?.errors?.id
    const titleError = actionData?.errors?.title
    const contentError = actionData?.errors?.content

    const { trailId } = useParams()

    const { steps, trail }: {steps: Step[], trail: Trail} = useLoaderData()

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="flex flex-col flex-wrap items-center justify-center my-16 mx-8">
                <div className="w-container">
                    <div className="flex justify-between items-center ">
                        <h1 className="text-3xl font-bold">{trail.title}</h1>

                        <div>
                            <button onClick={openModal} className="flex items-center bg-btn px-4 py-3 rounded-md text-md text-white">+ Adicionar passo</button>
                        </div>
                    </div>

                    <StepList steps={steps} />
                </div>
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal} trailId={trailId} idError={idError} titleError={titleError} contentError={contentError} />
        </>
    );
}
