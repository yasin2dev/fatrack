"use client"

import React, { MutableRefObject, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "@/app/styles/header.css"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from '@/components/ui/button';
import axios from 'axios';

function Header() {
  const [open, setOpen] = useState(false);
  const [urunTitle, setUrunTitle] = useState<string>('');

  const handleOpen = () => setOpen(!open);

  const urunRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleSubmit = (event: any) => {
    setUrunTitle(urunRef.current.value);
    axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faturalar/6761a4147e290fe09f1d29aa?userId=675b5ff200e40d7c11cf81b6`, {"title": `${urunRef.current.value}`}, {headers: {"Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`}})
    setOpen(false);
    event.preventDefault();
  }

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop 
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <FontAwesomeIcon icon={faPlus} className="size-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h2" className="text-base font-bold text-gray-900">
                      Fatura Oluştur
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="">
                        <p className='text-black'>Ürün </p>
                        <input ref={urunRef} type='text' className={"w-full outline outline-1 text-black "} spellCheck="false"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Oluştur
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  İptal
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <header className={"mx-auto flex items-center justify-between header"}>
        <div className={"flex justify-start"}>
          <h2 className={"text-start mx-3 my-2 text-xl font-bold"}>Fatrack</h2>
        </div>
        <div className="text-white lg:justify-start">
          <Button size={"default"} onClick={handleOpen} variant={"outline"} className='m-3 rounded-full hover:bg-blue-700'><FontAwesomeIcon className={"fa fa-plus mr-1"} icon={faPlus}/> Oluştur</Button>
        </div>
        <div className="text-white p-2 mx-auto hidden lg:flex lg:flex-1 lg:justify-end">
          <p className={"user-greet font-bold"}>Hoşgeldiniz, {process.env["NEXT_PUBLIC_USER"]}</p>
        </div>
      </header>

    </>
  )
};

export default Header;