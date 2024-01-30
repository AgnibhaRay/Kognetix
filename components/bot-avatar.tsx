import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export const BotAvatar = () => {
    return (
        <Avatar className="h-12 w-12">
            <AvatarImage
                className="p-1"
                src="/logob.png"
            />
        </Avatar>
    )
}