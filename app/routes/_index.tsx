import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
    const navigate = useNavigate()
   
    return (
        <>
            <div className="flex flex-col flex-wrap items-center justify-center my-16 mx-8">
                <div className="w-container">
                    <div className="flex flex-col justify-between items-center ">
                        <h1 className="text-3xl font-bold">Seja bem vindo ao meu teste!</h1>

                        <p className="mt-10">Meu nome é <span className="font-bold">Matheus Alves</span>, e esse é o meu teste para vaga de <span className="font-bold">Desenvolvedor Fullstack</span>. 
                        Segue abaixo os passos para ter certeza que a aplicação irá funcionar sem erros:</p>

                        <ul className="mt-5 ml-4 flex flex-col gap-1 justify-start list-decimal">
                            <li>Certifique-se que seu banco de dados neo4j está funcionando;</li>
                            <li>Tenha certeza que os dados estão criados e o usuário do banco de dados foi criado seguindo as instruções no repositório do projeto;</li>
                            <li>Após isso é só acessar a rota <span className="cursor-pointer font-semibold text-slate-600 bg-slate-200 p-1 rounded-md" onClick={() => {navigate("/explore/trail-1")}}>http://localhost:5173/explore/trail-1</span>; </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
