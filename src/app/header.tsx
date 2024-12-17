import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import "@/app/styles/header.css"
import { Button } from '@/components/ui/button';

function Header() {
    return (
        <header className={"mx-auto flex items-center justify-between header"}>
            <div className={"flex justify-start"}>
                <h2 className={"text-start mx-3 my-2 text-xl font-bold"}>Fatrack</h2>
            </div>
            <div className="text-white lg:justify-start">
                <Button size={"default"} variant={"outline"} className='m-3 rounded-full hover:bg-blue-700'><FontAwesomeIcon className={"fa fa-plus mr-1"} icon={faPlus}/> Oluştur</Button>
            </div>
            <div className="text-white p-2 mx-auto hidden lg:flex lg:flex-1 lg:justify-end">
                <p className={"user-greet font-bold"}>Hoşgeldiniz, {process.env["user"]}</p>
            </div>

        </header>
    )};

export default Header;