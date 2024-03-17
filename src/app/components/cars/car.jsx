import Link from "next/link";

export default function Card({car_info}) {
    let {brand, price, make, year, km, cm3, _id} = car_info

    return (
        <Link href={`/cars/${_id}`}>
            <div className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono hover:bg-sky-100 focus:bg-sky-100">
                <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{brand}</span> {make}</div>
            
                <div>Year: {year}</div>
                <div>Price: <span className="font-semibold text-blue-500">{price}</span></div>
                <div>Km: {km}</div>
                <div>Engine: {cm3}cm3</div>
            </div>
        </Link>
    )
}