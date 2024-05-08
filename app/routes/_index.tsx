import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
   
    return (
        <>
            <div className="flex flex-col flex-wrap items-center justify-center my-16">
                <div className="w-container">
                    <div className="flex flex-col justify-between items-center ">
                        <h1 className="text-3xl font-bold">Seja bem vindo ao meu teste!</h1>

                        <p>Seja bem vindo ao meu teste!</p>
                    </div>
                </div>
            </div>
        </>
    );
}
