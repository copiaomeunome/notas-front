import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import axios from "axios";
import { toast } from 'sonner'

interface NoticiaProps{
    noticiaProps:{
        id:number
        titulo:string
        descricao:string
    }
    
}


export function Noticia({noticiaProps}: NoticiaProps){

    function handleDeleteNote(){
        axios.delete(`https://nodedeploy-api-test.onrender.com/excluir/${noticiaProps.id}`)
        .then(() => {
            
        }).catch(error => {
            console.error(error);
        });
        toast.success('Nota deletada com sucesso!!', {
            description: 'Atualize a página para visualizar',
        })
        
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className=" relative p-5 place-content-evenly w-full text-center flex flex-col overflow-hidden hover:ring-2 hover:ring-emerald-600 outline-none rounded">
                <h1 className="text-xl">
                    {noticiaProps.titulo}
                </h1>
                <p className="overflow-hidden">
                    {noticiaProps.descricao}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/20 to-black/0 pointer-events-none" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
                <Dialog.Content className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-max-[60vh] max-w-[640px] w-full h-[60vh] rounded-md flex flex-col outline-none">
                    <Dialog.Close className="rounded absolute right-0 top-0 bg-transparent hover:bg-red-600 p-1.5 hover:text-slate-100">
                        <X className="size-5"/>
                    </Dialog.Close>
                    <div className="w-full h-full text-center flex flex-1 flex-col gap-3 p-5 overflow-hidden bg-emerald-500  outline-none rounded">
                        <h1 className="text-2xl ">
                            {noticiaProps.titulo}
                        </h1>
                        <p className="text-sm mx-5 my-5 outline-none overflow-scroll h-full">
                            {noticiaProps.descricao}
                        </p>
                        
                        <Dialog.Close className="text-red-500 hover:bg-red-500 w-full py-3 rounded-md hover:text-red-100" onClick={handleDeleteNote}>Deletar nota</Dialog.Close>
                        
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}