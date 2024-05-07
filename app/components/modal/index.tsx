import React, { useState } from 'react';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const Modal = ({ isOpen, closeModal }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [id, setId] = useState<string>('')

    const handleCreate = () => {
        // Call the onCreate function passed from the parent component
        // and pass the new step data
        onCreate({ id, title, content });
        // Close the modal after creating the step
        closeModal();
    };

    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div onClick={closeModal} className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                        <div className="modal-container w-modal bg-white w-96 mx-auto rounded-modal shadow-lg z-50 overflow-y-auto p-8">
                            {/* Modal header */}
                            <div className="modal-header">
                                <h2 className="text-2xl font-bold">Adicionar passo</h2>
                            </div>

                            {/* Modal body */}
                            <div className="modal-body my-3">
                                <div className="mb-4">
                                    <label className="block text-md font-medium text-gray-700">Id</label>
                                    <input
                                        type="text"
                                        className="mt-1 bg-slate-50 p-2 block w-full input-focus shadow-sm sm:text-sm"
                                        name='id'
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-md font-medium text-gray-700">Título</label>
                                    <input
                                        type="text"
                                        className="mt-1 bg-slate-50 p-2 block w-full shadow-sm sm:text-sm input-focus border-2 border-gray-100 rounded-md"
                                        name='title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-md font-medium text-gray-700">Conteúdo</label>
                                    <textarea
                                        className="mt-1 bg-slate-50 p-2 block w-full shadow-sm sm:text-sm input-focus border-2 border-gray-100 rounded-md"
                                        rows={3}
                                        name='title'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer flex justify-end mt-10">
                                <button onClick={closeModal} className='bg-slate-50 text-sm color-btn-2 font-bold py-2 px-6 mr-6 border-2 border-slate-200 rounded-lg'>
                                    Voltar
                                </button>

                                <button onClick={handleCreate} className="bg-btn text-sm text-white font-bold py-2 px-6 rounded-lg">
                                    Criar Passo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;