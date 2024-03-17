import requestCars  from "@/app/libs/cars/data"
import SearchForm from "@/app/components/cars/searchForm"
import CarsLibrary from "@/app/components/cars/carLibrary"

export default async function Page({searchParams}) {
    
    const query = searchParams?.Brand === 'All Cars' || !searchParams?.Brand ? '' : searchParams.Brand;
    const currentPage = Number(searchParams?.Page) || 1;

    return (
        <div className="mx-4 my-2">
            {/* title */}
            <h2 className="font-bold font-mono text-lg text-center my-4">Cars - {searchParams?.brand || "all brands"}</h2>

            {/* filter bar */}
            <SearchForm />

            {/* cars library  */}
            <CarsLibrary query={{'brand':query, 'page':currentPage}} />

        </div>
    )
}