"use client"

import { useEffect, useState } from 'react';
import axios from "axios"

interface Data {
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
    createdAt: Date;
}


function Page() {
    const [data, setData] = useState<Data[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // API'ye istek atıyoruz
        axios.get<Data[]>('http://localhost:3000/api/faturalar', {
            params: { "userId": "675b5ff200e40d7c11cf81b6" }, // Example user ID from mongodb.
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`, // For now, using manuel token system. Auth system inProgress
            }
        })
            .then(response => {
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

    if (Object.keys(data).length <= 0) {
        return <div>NO DATA</div>
    }

    {/* TODO: Data successfully fetched and listed in front-end Fatura's now can be list dynamically */}
    return (
        <div className={"justify-center mx-10"}>
            {process.env.TOKEN}
            {data?.map(fatura => (
                <div className='text-center bg-amber-500 my-5 mx-2 rounded p-2 w-full h-16 justify-center pl-6'>
                    <p><span className={"font-bold"}>Ürün: </span>{fatura.title} - <span className={"font-bold text-black"}>Fatura No: </span>{fatura.fatura_no}</p>
                    <p><span className={"text-center"}>Tutar: {fatura.total}{fatura.birim}</span></p>
                </div>
            ))}
        </div>
    );
}

export default Page;