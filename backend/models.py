from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import String

class Base(DeclarativeBase):
    pass

class City(Base):
    __tablename__ = "cities"
    csa_label: Mapped[str] = mapped_column(String(100), primary_key=True)
    total_unsheltered_pop: Mapped[int]
    total_sheltered_pop: Mapped[int]
    total_pop: Mapped[int]
    square_miles: Mapped[float]
    density_unsheltered: Mapped[float]
    density_sheltered: Mapped[float] = mapped_column(nullable=True)
    density_total: Mapped[float]
    # Will later want to add a one to many relationship with shelters and 
    # medicare offices
    
    def __repr__(self) -> str:
        return f"City(CSA_Label={self.csa_label!r})"

class Shelter(Base):
    __tablename__ = "shelters"
    name: Mapped[str] = mapped_column(String(200), primary_key=True)
    addrln1: Mapped[str] = mapped_column(String(100), nullable=True)
    addrln2: Mapped[str] = mapped_column(String(100), nullable=True)
    # Will later want to change this to a relationship to the specific city
    city: Mapped[str] = mapped_column(String(100))
    hours: Mapped[str] = mapped_column(String(400), nullable=True)
    phones: Mapped[str] = mapped_column(String(100), nullable=True)
    url: Mapped[str] = mapped_column(String(100), nullable=True)
    post_id: Mapped[float]
    description: Mapped[str] = mapped_column(String(550))
    zip: Mapped[str] = mapped_column(String(100))
    link: Mapped[str] = mapped_column(String(100))
    latitude: Mapped[float]
    longitude: Mapped[float]
    date_updated: Mapped[str] = mapped_column(String(100))

    def __repr__(self) -> str:
        return f"Shelter(name={self.name!r}, description={self.description!r})"
    
class Medicare(Base):
    __tablename__ = "medicare"
    name: Mapped[str] = mapped_column(String(200), primary_key=True)
    addrln1: Mapped[str] = mapped_column(String(100))
    addrln2: Mapped[str] = mapped_column(String(100), nullable=True)
    # Will later want to change this to a relationship to the specific city
    city: Mapped[str] = mapped_column(String(100))
    hours: Mapped[str] = mapped_column(String(175), nullable=True)
    phones: Mapped[str] = mapped_column(String(250), nullable=True)
    post_id: Mapped[float]
    description: Mapped[str] = mapped_column(String(550))
    zip: Mapped[str] = mapped_column(String(100))
    latitude: Mapped[float]
    longitude: Mapped[float]
    date_updated: Mapped[str] = mapped_column(String(100))

    def __repr__(self) -> str:
        return f"Medicare(name={self.name!r}, description={self.description!r})"