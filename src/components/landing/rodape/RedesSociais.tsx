import { IconBrandGmail, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react"
import RedeSocial from "./RedeSocial"

export default function RedesSociais() {
    return (
        <div className="flex">
            <RedeSocial icone={<IconBrandLinkedin />} url="https://www.linkedin.com/in/vxfontes" />
            <RedeSocial icone={<IconBrandInstagram />} url="https://www.instagram.com/vxfontes" />
            <RedeSocial icone={<IconBrandGmail />} url="mailto:nessa1vane@icloud.com" />
            <RedeSocial icone={<IconBrandGithub />} url="https://github.com/vxfontes" />
        </div>
    )
}