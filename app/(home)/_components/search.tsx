"use client"

import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import React from 'react'
import { SearchIcon } from "lucide-react";
const Search = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
        <Input placeholder='Buscar musica...'/>
        <Button variant={"default"} type="submit">
            <SearchIcon size={20} />
          </Button>

    </div>
  )
}

export default Search