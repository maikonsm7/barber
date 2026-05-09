import { Avatar, AvatarImage } from "./ui/avatar"

interface AvatarProfileProps{
    imageUrl: string
}

export const AvatarProfile = ({imageUrl}: AvatarProfileProps) => {
    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={imageUrl} />
        </Avatar>
    )
}