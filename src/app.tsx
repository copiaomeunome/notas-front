import { Noticia } from './components/Noticia'
import { CriarNoticia } from './components/Criar-noticia'
import { useState } from 'react'
import axios from "axios";
import React from 'react'


interface noticiaType{
  
  id:number
  titulo:string
  descricao:string

}

export function App() {
  const [noticias,setNoticias] = useState<noticiaType[]>([])
  
  React.useEffect(() => {
    axios.get("https://nodedeploy-api-test.onrender.com/listar").then((response) => {
      setNoticias(response.data);
    });
  }, []);

  function criarNoticiaFunc (titulo:string, descricao:string){
    const novaNoticia = {
      id:-1,
      titulo,
      descricao
    }
    setNoticias([novaNoticia, ...noticias])
  }
  
  function deletarNoticiaFunc (id:number){
    const noticiasArray=noticias.filter(noticia=>{
      return noticia.id!=id
    })
    setNoticias(noticiasArray)
  }

  return (
    <div className="text-center w-screen space-y-6 h-full">
      <h1 className="font-serif text-4xl fixed w-full bg-emerald-600 z-9 p-10">NOTAS<div className="text-sm text-black/60"> (created by Heitor Augusto)</div></h1>
      <CriarNoticia criarNoticiaFunc={criarNoticiaFunc}></CriarNoticia>
      <div className="w-full px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        {noticias.map(noticia=>{
          return (<Noticia key={noticia.id} noticiaProps={noticia} deletarNoticiaFunc={deletarNoticiaFunc }/>)
        })}
      </div>
    </div>
  )
}

