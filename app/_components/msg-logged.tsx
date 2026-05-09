"use client"

import { useSession } from "next-auth/react"

export default function MsgLogged() {
    const {data} = useSession()
    if(data?.user){
        return (<></>)
    }else{
        return (
        <h2 className="text-red-500 text-sm">Faça o login para agendar</h2>
        )
    }
}