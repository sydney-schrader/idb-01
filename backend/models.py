from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class City(Base):
    __tablename__ = "cities"
    CSA_Label: Mapped[str] = mapped_column(primary_key=True)
    Total_Unsheltered_Pop: Mapped[int]
    Total_Sheltered_Pop: Mapped[int]
    Total_Pop: Mapped[int]
    Square_Miles: Mapped[float]
    Density_Unsheltered: Mapped[float]
    Density_Sheltered: Mapped[float]
    Density_Total: Mapped[float]
    # Will later want to add a one to many relationship with shelters and 
    # medicare offices
    
    def __repr__(self) -> str:
        return f"City(CSA_Label={self.CSA_Label!r})"

class Shelter(Base):
    __tablename__ = "shelters"
    name: Mapped[str] = mapped_column(primary_key=True)
    addrln1: Mapped[str]
    addrln1: Mapped[str]
    # Will later want to change this to a relationship to the specific city
    city: Mapped[str]
    hours: Mapped[str]
    phone: Mapped[str]
    url: Mapped[str]
    post_id: Mapped[float]
    description: Mapped[str]
    zip: Mapped[str]
    link: Mapped[str]
    latitude: Mapped[float]
    longitude: Mapped[float]
    date_updated: Mapped[str]

    def __repr__(self) -> str:
        return f"Shelter(name={self.name!r}, description={self.description!r})"
    
class Medicare(Base):
    __tablename__ = "medicare"
    name: Mapped[str] = mapped_column(primary_key=True)
    addrln1: Mapped[str]
    addrln1: Mapped[str]
    # Will later want to change this to a relationship to the specific city
    city: Mapped[str]
    hours: Mapped[str]
    phones: Mapped[str]
    post_id: Mapped[float]
    description: Mapped[str]
    zip: Mapped[str]
    latitude: Mapped[float]
    longitude: Mapped[float]
    date_updated: Mapped[str]

    def __repr__(self) -> str:
        return f"Medicare(name={self.name!r}, description={self.description!r})"