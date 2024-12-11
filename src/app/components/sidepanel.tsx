import '../styles/sidepanel.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faClock, faCalculator} from '@fortawesome/free-solid-svg-icons'

import {Roboto} from "next/font/google"

const f_roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
});

export default function SidePanel() {
    return (
        <div className={"sidepanel"}>
            {/*Font DIV*/}
            <div className={f_roboto.className}>
                <h3 className={"collapsibleBtn font-bold mx-8"}>Faturalar</h3>
                <div className={"text-white p-2 mx-auto my-2"}>
                    <ul className={"text-start mr-auto"}>
                        <li className={"fatBtn cursor-pointer"}><span className={"p-2"}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={"fa fa-check"}
                            style={{color: "lightgreen"}}
                        /></span>
                            Ödenen
                        </li>
                        <li className={"fatBtn cursor-pointer"}><span className={"p-2"}>
                        <FontAwesomeIcon
                            icon={faClock}
                            className={"fa fa-clock"}
                        /></span>
                            Ödenecek
                        </li>
                        <li className={"fatBtn cursor-pointer"}>
                        <span className={"p-2"}>
                        <FontAwesomeIcon
                            icon={faCalculator}
                            className={"fa fa-calculator"}
                        /></span>
                            Vergiler Toplamı
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}