"use client"

import PagePlaceholder from '@/components/page-placeholder';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react';

function Page() {
    const [data, setData] = useState<any>();

    const fetchData = async () => {
        let response = await fetch("localhost:3000/api/faturalar/675ca78edd66a6b6dfa6b264?userId=675b5ff200e40d7c11cf81b6&categoryId=675c99e36f71368dbe09f064")
        response = await response.json();

        setData(response);
    }
    return (
        <>
            <PagePlaceholder pageName={"Settings"}/>
            <div className="text-center">
                <button onClick={fetchData}>Fetch Data</button>
                <p>{data}</p>
            </div>
        </>
    );
}

export default Page;

// TODO