

let BASE_URL = "http://182.254.221.184/cars/"

export default async function requestCars(brand, page) {
    try {
        const response = await fetch(`${BASE_URL}?brand=${brand}&page=${page}`)
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}