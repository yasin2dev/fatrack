"use client"

import React, { MutableRefObject, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "@/app/styles/header.css"
import * as Separator from "@radix-ui/react-separator";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Label, Radio, RadioGroup, Field } from "@headlessui/react";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Types } from 'mongoose';

function Header() {
  const faturaCategories = ['e-Arşiv', 'e-Fatura'];
  const faturaTypes = ['Satış', 'İade'];
  const [open, setOpen] = useState(false);
  const [selectedFatCat, setSelectedFatCat] = useState();
  const [selectedFatType, setSelectedFatType] = useState();

  const handleOpen = () => setOpen(!open);

  const urunRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fatNoRef = useRef() as MutableRefObject<HTMLInputElement>;


  let fatCat: any;
  let fatType: any;
  if (selectedFatCat === faturaCategories[0]) {
    fatCat = new Types.ObjectId(process.env.NEXT_PUBLIC_E_ARSIV_ID)
  } else if (selectedFatCat === faturaCategories[1]) {
    fatCat = new Types.ObjectId(process.env.NEXT_PUBLIC_E_FATURA_ID)
  }

  if (selectedFatType === faturaTypes[0]) {
    fatType = "SATIS"
  } else if (selectedFatType === faturaTypes[1]) {
    fatType = "IADE"
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // For now axios is patching data for test fields and create operations.
    axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faturalar/6769e8fe796d34aee398e7b4?userId=675b5ff200e40d7c11cf81b6`,
      {
        "title": `${urunRef.current.value}`,
        "fatura_no": `${fatNoRef.current.value}`,
        "fat_type": `${fatType}`,
        "category": `${fatCat}`,
      },
      {
        headers: { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` }
      }).then(response => {
        console.log(response.data)
        window.location.reload()
      })
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-700/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="ModalBg px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-24 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-7 sm:size-10">
                    <FontAwesomeIcon icon={faPlus} className="size-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h1" className="text-lg mb-5 font-bold text-white sm:text-center">
                      Fatura Oluştur
                    </DialogTitle>
                    <form method="patch" className='text-white' onSubmit={handleSubmit}>
                      <label className='text-md'>
                        Ürün: &nbsp; <input ref={urunRef} name="title" className='text-black p-1 outline-1 min-w-full rounded-sm outline outline-gray-400 focus:outline-1 focus:outline-gray-600' spellCheck={false} placeholder='örn. Tekstil Ürünleri' />
                      </label>
                      <h3 className='mr-2 mt-3'>Fatura No:</h3>
                      <input ref={fatNoRef} name="fatNo" className='text-black p-1 outline-1 min-w-full rounded-sm outline outline-gray-400 focus:outline-1 focus:outline-gray-600' spellCheck={false} placeholder='örn. ABC20240000001' />
                      <Separator.Root
                        className='SeparatorRoot my-3'
                        decorative
                        orientation='horizontal'
                      />
                      <RadioGroup
                        value={selectedFatCat}
                        onChange={setSelectedFatCat}
                        aria-label='Fatura Tipi'
                        className={"flex"}

                      >
                        <h3 className='mr-2'>Fatura Kategorisi:</h3>
                        {faturaCategories.map((category) => (
                          <Field key={category} className="flex items-center gap-2">
                            <Radio
                              value={category}
                              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-700"
                            >
                              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                            </Radio>
                            <Label>{category}</Label>
                            &nbsp;
                          </Field>
                        ))}
                      </RadioGroup>
                      <RadioGroup
                        value={selectedFatType}
                        onChange={setSelectedFatType}
                        aria-label='Fatura Tipi'
                        className={"flex mt-3"}
                      >
                        <h3 className='mr-2'>Fatura Tipi:</h3>
                        {faturaTypes.map((type) => (
                          <Field key={type} className={"flex items-center gap-2"}>
                            <Radio
                              value={type}
                              className={"group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-700"}
                            >
                              <span className={"invisible size-2 rounded-full bg-white group-data-[checked]:visible"} />
                            </Radio>
                            <Label>{type}</Label>
                            &nbsp;
                          </Field>
                        ))}
                      </RadioGroup>

                    </form>
                  </div>
                </div>
              </div>
              <div className="ModalBg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
          <Button size={"default"} onClick={handleOpen} variant={"outline"} className='m-3 rounded-full hover:bg-blue-700'><FontAwesomeIcon className={"fa fa-plus mr-1"} icon={faPlus} /> Oluştur</Button>
        </div>
        <div className="text-white p-2 mx-auto hidden lg:flex lg:flex-1 lg:justify-end">
          <p className={"user-greet font-bold"}>Hoşgeldiniz, {process.env["NEXT_PUBLIC_USER"]}</p>
        </div>
      </header>

    </>
  )
};

export default Header;