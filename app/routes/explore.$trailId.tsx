import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { getSteps, getOneTrail, createStep } from "~/utils/dataService";

import Modal from "~/components/Modal";
import { redirect, useLoaderData, useParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
    const { trailId } = params

    try {

        const trail = await getOneTrail(trailId)

        const steps = await getSteps(trailId)

        //console.log("Os passos", steps)

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
        const step = await createStep({
            trailId: body.get("trailId"),
            id: body.get("id"),
            title: body.get("title"),
            content: body.get("content")
        })

        console.log(step)
    } catch (error: any) {
        console.log(error)
    }

    return null
}

export default function Steps() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { trailId } = useParams()

    const { steps, trail } = useLoaderData()

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

                    <div className="flex flex-col gap-6 mt-12">
                        {steps.length > 0 && steps.map((step: any) => (
                            <div key={step.id} className=" bg-white  rounded-md border-2 border-slate-200">
                                <div className="p-6">
                                    <p className="text-xl font-bold mb-2">{step.title}</p>

                                    <p className="text-lg text-slate-600 font-semibold">{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal} trailId={trailId} />
        </>
    );
}
