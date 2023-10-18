from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
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
    # Rather than dealing with relationships, since we have plenty of space
    # available for the database, we can just copy the data
    medicare_name: Mapped["String"] = mapped_column(String(200), nullable=True)
    medicare_addrln1: Mapped["String"] = mapped_column(String(100), nullable=True)
    medicare_addrln2: Mapped["String"] = mapped_column(String(100), nullable=True)
    medicare_hours: Mapped["String"] = mapped_column(String(175), nullable=True)

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
                "medicare_name" : self.medicare_name, 
                "medicare_addrln1" : self.medicare_addrln1,
                "medicare_addrln2" : self.medicare_addrln2,
                "medicare_hours" : self.medicare_hours}
    
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
    # Rather than dealing with relationships, since we have plenty of space
    # available for the database, we can just copy the data
    shelter_name: Mapped["String"] = mapped_column(String(200), nullable=True)
    shelter_addrln1: Mapped["String"] = mapped_column(String(100), nullable=True)
    shelter_addrln2: Mapped["String"] = mapped_column(String(100), nullable=True)
    shelter_hours: Mapped["String"] = mapped_column(String(175), nullable=True)

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
                "shelter_name" : self.shelter_name, 
                "shelter_addrln1" : self.shelter_addrln1,
                "shelter_addrln2" : self.shelter_addrln2,
                "shelter_hours" : self.shelter_hours}