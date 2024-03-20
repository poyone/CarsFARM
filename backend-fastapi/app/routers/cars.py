from typing import List, Optional

from bson import ObjectId
from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from models.carModel import CarBase, CarUpdate
from pymongo import ReturnDocument
from pymongo.collection import Collection

router = APIRouter()
def get_collection(request: Request, name: str ='cars1') -> Collection:
        return request.app.mongodb[name]

@router.get('/',
            response_description='List all cars',
            status_code=status.HTTP_200_OK,
            response_model_by_alias=False,)
async def list_all_cars(
    request: Request, 
    min_price: int=0, 
    max_price:int=100000, 
    brand: Optional[str] = None,
    page:int=1,
    ) -> List[CarBase]:

    RESULTS_PER_PAGE = 25
    skip = (page-1)*RESULTS_PER_PAGE
    
    
    query = {"price":{"$lt":max_price, "$gt":min_price}}
    if brand:
        query["brand"] = brand
    
    full_query =  (request.app.mongodb['cars1']
                    .find(query)
                    .sort("_id",-1)
                    .skip(skip)
                    .limit(RESULTS_PER_PAGE))

    # results = [CarBase(**raw_car) async for raw_car in full_query]
    results = []
    async for raw_car in full_query:
        car = CarBase(**raw_car)
        results.append(car)
        
    return results

@router.post('/',
            response_description="Add new car",
            response_model=CarBase,
            status_code=status.HTTP_201_CREATED,
            response_model_by_alias=False,)
async def create_car(request: Request, car: CarBase):
    
    new_car = await request.app.mongodb['cars1'].insert_one(
        car.model_dump(by_alias=True, exclude=['id'])
    )
    
    created_car = await request.app.mongodb["cars1"].find_one(
        {"_id": new_car.inserted_id}
    )
    
    return created_car
    

@router.get('/{id}',
            response_description='Show a car',
            status_code=status.HTTP_200_OK,
            response_model=CarBase,
            response_model_by_alias=False,)
async def show_car(id: str, request: Request):
    
    if (
        student := await request.app.mongodb['cars1'].find_one({'_id': ObjectId(id)})
    ) is not None:
        return student
    
    raise HTTPException(status_code=404,
                        detail=f'Student {id} not found')
    
    
@router.patch('/{id}',
            response_description='Update a car',
            status_code=status.HTTP_200_OK,
            response_model=CarBase,
            response_model_by_alias=False,)
async def update_car(id: str, 
                     car: CarUpdate,
                     request: Request):
    
    update_result = await request.app.mongodb['cars1'].find_one_and_update(
        {'_id': ObjectId(id)},
        {'$set': car},
        return_document=ReturnDocument.AFTER,
        )
    
    if (update_result) is not None:
        return update_result
    
    raise HTTPException(status_code=404, detail=f"Student {id} not found")


@router.delete('/{id}', response_description='Delete a car')
async def delete_car(request: Request, id: str):
    
    delete_result = await request.app.mongodb['cars1'].delete_one({'_id': ObjectId(id)})
    
    if delete_result.deleted_count == 1 :
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    
    raise HTTPException(status_code=404, detail=f"Student {id} not found")

@router.get('brand/{brand}',
            response_description='Get brand overview',
            response_model_by_alias=False,)
async def brand_price(brand: str,
                      collection: Collection = Depends(get_collection)):
    query = [
        {"$match": {"brand": brand}},
        {"$project": {"_id": 0, "price": 1, "year": 1, "make": 1}},
        {"$group": {"_id": {"model": "$make"}, "avgPrice": {"$avg": "$price"}}},
        {"$sort": {"avgPrice": 1}},
    ]
    
    results = [el async for el in collection.aggregate(query)]
    return results