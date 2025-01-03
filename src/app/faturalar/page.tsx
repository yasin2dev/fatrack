"use client"

import { useEffect, useState } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Types } from 'mongoose';

interface FatData {
    _id: string;
    title: string;
    fatura_no: string;
    fat_type: string;
    birim: string;
    origin: string;
    root_amount: number;
    fat_date: Date;
    fat_edit_date: Date;
    tax_rat: number;
    tax_val: number;
    total: number;
    owner: string;
    to_who: string;
    user: string;
    category: string;
    createdAt: Date;
}


function Page() {
    const [data, setData] = useState<FatData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // API'ye istek atıyoruz
        axios.get<FatData[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faturalar`, {
            params: { "userId": "675b5ff200e40d7c11cf81b6" }, // Example user ID from mongodb.
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`, // For now, using manuel token system. Auth system inProgress
            }
        })
            .then(response => {
                /* TODO: VSCode showing error in here. fix. */
                setData(response.data.faturalar);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={"text-center my-2"}>Yükleniyor...</div>;
    }

    if (error) {
        return <div className={"text-center my-2"}>Hata: {error}</div>;
    }

    /* TODO: VSCode showing error in here. fix. */
    if (Object.keys(data).length <= 0) {
        return <div>NO DATA</div>
    }

    {/* TODO: Data successfully fetched and listed in front-end Fatura's now can be list dynamically */ }
    return (
        <div className={"justify-center mx-10"}>
            <h2 className={"text-lg"}>e-Arşiv olarak size kesilen faturalarınız: </h2>
            {data?.map(fatura => {
                if (fatura.category === "675debf13e48f596cb3730f1" && fatura.fat_type === "SATIS") {
                    return (
                        <div className='bg-blue-700 my-5 mx-2 rounded p-2 w-full h-fit pl-6'>
                            <div className='flex'>
                                <p><span className={"font-bold"}>Ürün: </span>{fatura.title} - <span className={"font-bold"}>Fatura No: </span>{fatura.fatura_no}</p>
                            </div>
                            <FontAwesomeIcon icon={faTrash} className={"fa fa-trash float-end cursor-pointer hover:text-red-500 mr-6"} />
                            <p><span className={"font-bold"}>{fatura.origin}</span></p>
                            <p><span className={"items-end"}>Tutar: {fatura.total} {fatura.birim}</span></p>
                        </div>
                    )
                }
                else if (fatura.category === "675debf13e48f596cb3730f1" && fatura.fat_type === "IADE") {
                    return (
                        <div className='bg-red-600 my-5 mx-2 rounded p-2 w-full h-fit pl-6'>
                            <div className='flex'>
                                <p><span className={"font-bold text-right"}>Ürün: </span>{fatura.title} - <span className={"font-bold"}>Fatura No: </span>{fatura.fatura_no}</p>
                            </div>
                            <FontAwesomeIcon icon={faTrash} className={"fa fa-trash float-end cursor-pointer hover:text-red-500 mr-6"} />
                            <p><span className={"font-bold"}>{fatura.origin}</span></p>
                            <p><span className={"items-end"}>Tutar: {fatura.total} {fatura.birim}</span></p>
                        </div>
                    )
                }
            })}
            <h1 className={"text-lg"}>e-Fatura olarak size veya şirketinize kesilen faturalar: </h1>
            {data?.map(fatura => {
                if (fatura.category === "675debfb3e48f596cb3730f3" && fatura.fat_type === "SATIS") {
                    return (
                        <div className='bg-blue-700 my-5 mx-2 rounded p-2 w-full h-fit pl-6'>
                            <div className='flex'>
                                <p><span className={"font-bold text-right"}>Ürün: </span>{fatura.title} - <span className={"font-bold"}>Fatura No: </span>{fatura.fatura_no}</p>
                            </div>
                            <FontAwesomeIcon icon={faTrash} className={"fa fa-trash float-end cursor-pointer hover:text-red-500 mr-6"} />
                            <p><span className={"font-bold"}>{fatura.origin}</span></p>
                            <p><span className={"font-bold"}>{fatura.category}</span></p>
                            <p><span className={"items-end"}>Tutar: {fatura.total} {fatura.birim}</span></p>
                        </div>
                    )
                }
                else if (fatura.category === "675debfb3e48f596cb3730f3" && fatura.fat_type === "IADE") {
                    return (
                        <div className='bg-red-600 my-5 mx-2 rounded p-2 w-full h-fit pl-6'>
                            <div className='flex'>
                                <p><span className={"font-bold text-right"}>Ürün: </span>{fatura.title} - <span className={"font-bold"}>Fatura No: </span>{fatura.fatura_no}</p>
                            </div>
                            <FontAwesomeIcon icon={faTrash} className={"fa fa-trash float-end cursor-pointer hover:text-red-500 mr-6"} />
                            <p><span className={"font-bold"}>{fatura.origin}</span></p>
                            <p><span className={"items-end"}>Tutar: {fatura.total} {fatura.birim}</span></p>
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default Page;