import axios from "axios";
import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface CriarNoticiaProps {
    criarNoticiaFunc: (titulo:string, descricao:string) => void
}

export function CriarNoticia(criarNoticiaProps:CriarNoticiaProps){

    const [descriptionValue,setDescriptionValue] = useState('')
    const [titleValue,setTitleValue] = useState('')

    function postAPI(){
        event?.preventDefault()
        axios.post('https://nodedeploy-api-test.onrender.com/criar', {
            titulo: titleValue,
            descricao: descriptionValue
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        criarNoticiaProps.criarNoticiaFunc(titleValue, descriptionValue)
        setDescriptionValue('')
        setTitleValue('')
        toast.success("Nota criada com sucesso")
    }

    function handleDescriptionValue(event: ChangeEvent<HTMLTextAreaElement>){
        setDescriptionValue(event.target.value)
    }
    function handleTitleValue(event: ChangeEvent<HTMLTextAreaElement>){
        setTitleValue(event.target.value)
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <h1 className="rounded-md bg-emerald-500 hover:bg-emerald-600  mt-32 p-5">Gerar nova Nota</h1>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
                <Dialog.Content className="fixed overflow-hidden -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-max-[60vh] max-w-[640px] w-full bg-emerald-500 rounded-md flex flex-col outline-none">
                    <Dialog.Close className="absolute right-0 top-0 bg-transparent hover:bg-red-600 p-1.5 hover:text-slate-100">
                        <X className="size-5"/>
                    </Dialog.Close>
                    <h1 className="w-full p-2 bg-emerald-600 text-2xl text-center font-serif">Criar Nota</h1>
                    <form className="flex flex-1 flex-col gap-3 p-5">
                        <textarea placeholder="Título" className=" mx-5 mt-5 p-2 rounded-md bg-transparent resize-none outline-none hover:ring-4 hover:ring-emerald-600 placeholder:text-slate-700" onChange={handleTitleValue}/>
                        <textarea placeholder="Descrição" className=" mx-5 p-2 rounded-md bg-transparent resize-none outline-none hover:ring-4 hover:ring-emerald-600 placeholder:text-slate-700" onChange={handleDescriptionValue}/>
                        <button type="submit" onClick={postAPI} className="w-full rounded-md bg-emerald-500 py-4 text-center text-sm text-lime-950 outline-none font-medium group hover:bg-emerald-600">Criar</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}