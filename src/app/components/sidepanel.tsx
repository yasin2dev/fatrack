import '../styles/sidepanel.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faClock} from '@fortawesome/free-solid-svg-icons'

export default function SidePanel() {
    return (
        <div className={"sidepanel"}>
            <div className="text-white p-2 mx-auto my-2 text-start">
                <p className={"user-greet font-bold"}>Hoşgeldiniz, {process.env["user"]}</p>
                <button className={"items-start hover:text-red-500"}><a href={"/"}>Çıkış Yap</a></button>
            </div>
            <div className={"text-white p-2 mx-auto my-2"}>
                <h3 className={"font-bold text-center"}>Faturalar</h3>
                <ul className={"text-start my-6"}>
                    <li className={"fatBtn cursor-pointer"}><a><span className={"p-2"}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={"fa fa-check"}
                            style={{color: "lightgreen"}}
                        /></span>
                        Ödenen</a>
                    </li>
                    <li className={"fatBtn cursor-pointer"}><a><span className={"p-2"}>
                        <FontAwesomeIcon
                            icon={faClock}
                            className={"fa fa-clock"}
                        /></span>
                        Ödenecek</a>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}