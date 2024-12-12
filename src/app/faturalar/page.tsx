import PagePlaceholder from '@/components/page-placeholder';
import React, { Fragment } from 'react';


async function Page() {
    return (
      <div className={"flex flex-row mx-auto my-2 w-full justify-between"}>
        <PagePlaceholder pageName={"Faturalar"}/>
      </div>
    );
}

export default Page;