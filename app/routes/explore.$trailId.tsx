import type { LoaderFunction } from "@remix-run/node";

import { redirect, useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { getSteps, getOneTrail, createStep } from "~/utils/dataService";

import Modal from "~/components/Modal";
import { useLoaderData, useParams } from "@remix-run/react";
import { StepList } from "~/components/StepList";

import { ActionData, Step, Trail } from "~/interfaces";
import { Alert } from "~/components/Alert.tsx";

export const loader: LoaderFunction = async ({ params }) => {
    const { trailId } = params

    if (!trailId || trailId === "") {
        return redirect("/");
    }

    try {

        const trail = await getOneTrail(trailId)

        const steps = await getSteps(trailId)

        if (trail === null || !trail || trail.length === 0) {
            return redirect("/")
        }

        return json({ steps, trail });
    } catch (error: any) {
        console.error('Error retrieving steps from database:', error.message);
        return json({ error: 'An error occurred while retrieving steps from the database.' }, 500);
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
            return json({ errors, type: "error", message: "Faltam informações!" })
        }

        const step = await createStep({
            trailId: trailId,
            id: id,
            title: title,
            content: content
        })

        return json({type: "success", message: "Passo criado com sucesso!"})
    } catch (error: any) {
        console.log(error)
        return json({type: "error", message: `Erro: ${error}`})
    }
}

export default function Steps() {
    /* States for the Alert and Modal form */
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isShowing, setIsShowing] = useState<boolean>(false)

    /* Request treatment variables and data */
    const actionData = useActionData<ActionData>()

    console.log(actionData)

    const idError = actionData?.errors?.id
    const titleError = actionData?.errors?.title
    const contentError = actionData?.errors?.content

    const type = actionData?.type
    const message = actionData?.message

    /* Trail ID from the URL parameters */
    const { trailId } = useParams()

    /* Data returned from the database to be listed */
    const { steps, trail }: {steps: Step[], trail: Trail} = useLoaderData()

    useEffect(() => {
        if (actionData?.errors) {
            showAlert()
        } else if (actionData?.message) {
            showAlert() 
        }
    }, [actionData]);

    /* Alert and Modal functions */
    const showAlert = () => {
        setIsShowing(true)

        setTimeout(() => {
            setIsShowing(false)
        }, 6000)
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Alert type={type} message={message} isShowing={isShowing} />
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
