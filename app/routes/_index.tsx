import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";

import { json } from "@remix-run/node";
import { getSteps, createStep } from "~/utils/stepService";

import Modal from "~/components/modal";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const loader: LoaderFunction = async () => {
    try {
        const steps = await getSteps

        console.log(steps)

        return json(steps);
    } catch(error: any) {
        console.error('Error retrieving steps from database:', error.message);
        return json({ error: 'An error occurred while retrieving steps from the database.' }, 500); // Return an error response
    }
}

export default function Index() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const data = useLoaderData()

    console.log(data)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);

        // Reset input fields when modal is closed
        setTitle('');
        setContent('');
    };

    return (
        <>
            <div className="flex flex-col flex-wrap items-center justify-center my-16">
                <div className="w-container">
                    <div className="flex justify-between items-center ">
                        <h1 className="text-3xl font-bold">Título da trilha</h1>

                        <div>
                            <button onClick={openModal} className="flex items-center bg-btn px-4 py-3 rounded-md text-md text-white">+ Adicionar passo</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 bg-white mt-12 rounded-md border-2 border-slate-200">
                        <div className="p-6">
                            <p className="text-xl font-bold mb-2">Título do passo</p>

                            <p className="text-lg text-slate-600 font-semibold">Conteúdo do passo. Curabitur blandit tempus porttitor. Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal} />
        </>
    );
}
