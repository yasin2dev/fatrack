"use client"

import { useEffect, useState } from "react";
import axios from "axios";

// Timestamps will be use here for announcement date.
interface AnnData {
  _id: string;
  title: string;
  content: string;
  createdAt: String;
  status: 'active' | 'inactive' | 'deleted';
}


export default function Home() {
  const [data, setData] = useState<AnnData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<AnnData[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/announcements`, {
      headers: { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    })
      .then(response => {
        setData(response.data);
        setLoading(false)
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      })
  }, [])

  if (loading) {
    return <div><h1 className={"font-bold"}>Yükleniyor...</h1></div>
  }

  if (error) {
    return <div><h1>Hata: {error}</h1></div>
  }


  return (
    <>
      <h2 className={"text-left ml-6 my-4 text-lg"}>Duyurular: </h2>
      <div key={"homePage"} className={"my-2 flex mx-auto"}>
        {data?.map(ann => (
          <div className="bg-blue-700 flex-1 mx-6 rounded pt-4 min-h-fit hover:shadow-xl hover:shadow-gray-700 transition duration-300">
            <h1 className={"font-semibold text-center"}>{ann.title}</h1>
            <p className={"text-center"}>{ann.content}</p>
            <p className={"text-end pr-2 pb-2 text-sm pt-6 bottom-0 right-0 ab"}>{ann.createdAt.slice().replaceAll("-", "/").split("T", 1)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
