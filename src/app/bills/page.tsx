import PagePlaceholder from '@/components/page-placeholder';
import React from 'react';
import {headers} from "next/headers"


async function Page() {
    const someDataFetch = async () => {
        const res = await fetch(`http://localhost:3001/main/healthcheck`, {cache: "force-cache"});
        return res.json()
    }
    const data = await someDataFetch()
    return (
        <div>Bills {data.products.map((i: any, e: any) => (
            <p>{i.title}</p>
        ))}</div>
    );
    {/*TODO: [ Server ] Error: Cannot read properties of undefined (reading 'map')*/}
    {/*TODO: solve it*/}
}


export default Page;