import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons"

function Header() {
    return (
        <header className={"mx-auto flex items-center justify-between"}>
            <div className={"flex justify-start"}>
                <h2 className={"text-start mx-3 my-2 text-xl font-bold"}>{process.env.appname}</h2>
            </div>
            <div className="text-white p-2 mx-auto hidden lg:flex lg:flex-1 lg:justify-end">
                <p className={"user-greet font-bold"}>Hoşgeldiniz, {process.env["user"]}</p>
                <button className={"hover:text-red-400"}><FontAwesomeIcon icon={faSignOut} className={"fa fa-signOut my-auto ml-2"}/></button>
            </div>
        </header>
    )};

export default Header;