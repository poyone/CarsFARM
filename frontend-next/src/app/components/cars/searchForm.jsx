"use client"

import Select from "@/app/components/cars/select"
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const brandList = [
    'All Cars',
    'Fiat',
    'Citroen',
    'Renault',
    'Poy',
]

const pageList = [...Array(5).keys()].map(i => i + 1);

export default function SearchForm() {
    const {push} = useRouter()
    const searchParams = useSearchParams();

    const handleSubmit = (e) => {
        // e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const brand = formJson?.brand == "All Cars" || ''
        push(`?brand=${brand}&page=${formJson.page}`)
    }

    return (
        <div className='flex'>
            <form className='hover:bg-sky-100 focus-within:bg-sky-100 rounded-md p-2' onSubmit={handleSubmit}>

                <Select labelName={'Brand'} optionList={brandList} defaultValue={searchParams.get('Brand')?.toString()} />
                <Select labelName={'Page'} optionList={pageList} defaultValue={searchParams.get('Page')?.toString()} />

                <button type="submit" className="border ml-2">
                    Search
                </button>
            </form>
        </div>
    )
}