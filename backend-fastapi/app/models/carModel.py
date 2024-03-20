from typing import Optional

from pydantic import BaseModel, ConfigDict, Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]
class CarBase(BaseModel):
    
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    brand: str = Field(..., min_length=1)
    make: str = Field(..., min_length=1)
    year: int = Field(..., gt=1975, lt=2024)
    price: int = Field(..., gt=1)
    km: int = Field(...)
    cm3: int = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )
    
class CarUpdate(CarBase):
    price: Optional[int] = None

