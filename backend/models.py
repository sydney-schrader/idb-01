from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, Table, Column

class Base(DeclarativeBase):
    pass

association_table = Table(
    "association_table",
    Base.metadata,
    Column("shelter_name", ForeignKey("shelters.name")),
    Column("medicare_name", ForeignKey("medicare.name")),
)

class City(Base):
    __tablename__ = "cities"
    csa_label: Mapped[str] = mapped_column(String(100), primary_key=True)
    total_unsheltered_pop: Mapped[int] # sort, filter
    total_sheltered_pop: Mapped[int]   # sort, filter
    total_pop: Mapped[int] # sort, filter
    square_miles: Mapped[float] # sort, filter
    latitude: Mapped[float]
    longitude: Mapped[float]
    density_unsheltered: Mapped[float]
    density_sheltered: Mapped[float] = mapped_column(nullable=True)
    density_total: Mapped[float] #sort, filter
    image_url: Mapped[String] = mapped_column(String(400))
    shelter: Mapped[str] = mapped_column(String(200), nullable=True)
    medicare: Mapped[str] = mapped_column(String(200), nullable=True)

    def __repr__(self) -> str:
        return f"City(CSA_Label={self.csa_label!r})"
    
    def to_dict(self):
        return {"csa_label" : self.csa_label, 
                "total_unsheltered_pop" : self.total_unsheltered_pop,
                "total_sheltered_pop" : self.total_sheltered_pop,
                "total_pop" : self.total_pop,
                "square_miles" : self.square_miles,
                "density_unsheltered" : self.density_unsheltered,
                "density_sheltered" : self.density_sheltered,
                "density_total" : self.density_total,
                "latitude" : self.latitude,
                "longitude" : self.longitude,
                "image_url" : self.image_url,
                "shelters" : self.shelter,
                "medicares" : self.medicare}

class Shelter(Base):
    __tablename__ = "shelters"
    name: Mapped[str] = mapped_column(String(200), primary_key=True) # sort, filter
    addrln1: Mapped[str] = mapped_column(String(100), nullable=True)
    addrln2: Mapped[str] = mapped_column(String(100), nullable=True)
    city: Mapped[str] = mapped_column(String(100), ForeignKey("cities.csa_label"), nullable=True) # sort, filter
    hours: Mapped[str] = mapped_column(String(400), nullable=True) # sort, filter
    phones: Mapped[str] = mapped_column(String(100), nullable=True)
    url: Mapped[str] = mapped_column(String(100), nullable=True)
    post_id: Mapped[float]
    description: Mapped[str] = mapped_column(String(550))
    zip: Mapped[str] = mapped_column(String(100))
    link: Mapped[str] = mapped_column(String(100))
    latitude: Mapped[float] # sort, filter by distance
    longitude: Mapped[float]
    date_updated: Mapped[str] = mapped_column(String(100)) # sort, filter
    image_url: Mapped[String] = mapped_column(String(450))
    closest_medicares: Mapped[list["Medicare"]] = relationship("Medicare", secondary="association_table", back_populates="closest_shelters")

    def __repr__(self) -> str:
        return f"Shelter(name={self.name!r}, description={self.description!r})"
    
    def to_dict(self):
        return {"name" : self.name, "addrln1" : self.addrln1, 
                "addrln2" : self.addrln2, "city" : self.city, 
                "hours" : self.hours, "phones" : self.phones,
                "url" : self.url, "post_id" : self.post_id, 
                "description" : self.description, "zip" : self.zip, 
                "link" : self.link, "latitude" : self.latitude, 
                "longitude" : self.longitude, 
                "date_updated" : self.date_updated,
                "image_url" : self.image_url,
                "medicare_name" : self.closest_medicares[0].name,
                "medicare_addrln1" : self.closest_medicares[0].addrln1,
                "medicare_addrln2" : self.closest_medicares[0].addrln2,
                "medicare_hours" : self.closest_medicares[0].hours}
    
class Medicare(Base):
    __tablename__ = "medicare"
    name: Mapped[str] = mapped_column(String(200), primary_key=True) # sort, filter
    addrln1: Mapped[str] = mapped_column(String(100))
    addrln2: Mapped[str] = mapped_column(String(100), nullable=True)
    city: Mapped[str] = mapped_column(String(100), ForeignKey("cities.csa_label"), nullable=True) # sort, filter
    hours: Mapped[str] = mapped_column(String(175), nullable=True) # sort, filter
    phones: Mapped[str] = mapped_column(String(250), nullable=True)
    post_id: Mapped[float]
    description: Mapped[str] = mapped_column(String(550))
    zip: Mapped[str] = mapped_column(String(100))
    latitude: Mapped[float] # sort, filter on location
    longitude: Mapped[float]
    date_updated: Mapped[str] = mapped_column(String(100)) # sort, filter
    image_url: Mapped[String] = mapped_column(String(250))
    closest_shelters: Mapped[list["Shelter"]] = relationship("Shelter", secondary="association_table", back_populates="closest_medicares")

    def __repr__(self) -> str:
        return f"Medicare(name={self.name!r}, description={self.description!r})"
    
    def to_dict(self):
        return {"name" : self.name, "addrln1" : self.addrln1, 
                "addrln2" : self.addrln2, "city" : self.city, 
                "hours" : self.hours, "phones" : self.phones,
                "post_id" : self.post_id, "description" : self.description, 
                "zip" : self.zip, "latitude" : self.latitude, 
                "longitude" : self.longitude, 
                "date_updated" : self.date_updated,
                "image_url" : self.image_url,
                "shelter_name" : self.closest_shelters[0].name, 
                "shelter_addrln1" : self.closest_shelters[0].addrln1,
                "shelter_addrln2" : self.closest_shelters[0].addrln2,
                "shelter_hours" : self.closest_shelters[0].hours}