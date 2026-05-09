import Image from "next/image";
import google from "@/public/google.svg"
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { signIn } from "next-auth/react";

export default function SignInDialog() {
    const handleLogin = () => signIn("google")
    return (
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                    Faça o login com sua conta Google.
                </DialogDescription>
            </DialogHeader>
            <Button className="font-bold" onClick={handleLogin}>
                <Image alt="Fazer login com o Google" src={google} />
                Google
            </Button>
        </DialogContent>
    )
}