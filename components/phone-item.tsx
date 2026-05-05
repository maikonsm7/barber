"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneProps {
    phone: string
}

export default function PhoneItem({phone}: PhoneProps) {

    const handleCopyPhoneClick = (phone: string) => {
        navigator.clipboard.writeText(phone)
        toast.success("Telefone copiado com sucesso!")
    }

    return (
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <SmartphoneIcon size={20} />
                <p>{phone}</p>
            </div>
            <Button variant="outline" onClick={() => handleCopyPhoneClick(phone)}>Copiar</Button>
        </div>
    )
}