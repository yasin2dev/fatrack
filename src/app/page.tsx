"use client"

import { useEffect, useState} from "react";

interface AnnData {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
  category: string;
  status: 'active' | 'inactive' | 'deleted';
}


export default function Home() {
  const [data, setData] = useState<AnnData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return (
      <div className={"my-2 flex mx-auto"}>
        <div className="bg-blue-700 text-center mx-6 rounded-md h-max pb-4 pt-4">
          
          <p></p>
        </div>
      </div>
  );
}
