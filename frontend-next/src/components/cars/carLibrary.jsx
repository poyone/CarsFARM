import requestCars from "@/libs/cars/data";
import Card from "@/components/cars/car"

export default async function CarsLibrary({query}) {
    
    const cars = await requestCars(query.brand, query.page);

    return (
        <div className="cars_library">
            <div className="grid grid-cols-2 gap3 lg:grid-cols-4">
                {
                    cars.map((el, index) => {
                        return <Card car_info={el} key={index}/>
                    })
                }
            </div>
        </div>
    )
}