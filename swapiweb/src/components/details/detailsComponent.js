import React, { Fragment, Component } from "react";

class DetailsComponent extends Component {
  handleDescryption() {
    const { data, resource } = this.props;

    const item = {
      peoples:
        [
          { title: "Gender: ", desc: data.gender },
          { title: "Eye Color: ", desc: data.eye_color },
          { title: "Hair Color: ", desc: data.hair_color },
          { title: "Height: ", desc: `${data.height} Centimeters` },
          { title: "Skin Color: ", desc: data.skin_color },
          { title: "Mass: ", desc: `${data.mass} pounds` },
          { title: "Birth Year: ", desc: data.birth_year },
          { title: "Vehicles: ", desc: "n/a" }
        ] || [],
      planets:
        [
          { title: "Terrain: ", desc: data.terrain },
          { title: "Gravity: ", desc: data.gravity },
          { title: "Diameter: ", desc: data.diameter },
          { title: "Climate: ", desc: data.climate },
          { title: "Population: ", desc: data.population },
          { title: "Orbital Period: ", desc: `${data.orbital_period} Days` },
          {
            title: "Rotation Period: ",
            desc: `${data.rotation_period} Days`
          },
          { title: "Surface Water: ", desc: data.surface_water }
        ] || [],
      starships:
        [
          { title: "Starship Class: ", desc: data.starship_class },
          { title: "Model: ", desc: data.model },
          { title: "Manufacturer: ", desc: data.diameter },
          {
            title: "Cargo Capacity: ",
            desc: `${data.cargo_capacity} Pounds`
          },
          { title: "Passengers: ", desc: `${data.passengers} Persons` },
          { title: "Length: ", desc: `${data.length} Meters` },
          { title: "Consumables: ", desc: data.consumables },
          {
            title: "Max Atmosphering Speed: ",
            desc: data.max_atmosphering_speed
          }
        ] || [],
      vehicles:
        [
          { title: "Vehicle Class: ", desc: data.vehicle_class },
          { title: "Model: ", desc: data.model },
          { title: "Manufacturer: ", desc: data.manufacturer },
          {
            title: "Cargo Capacity: ",
            desc: `${data.cargo_capacity} Pounds`
          },
          { title: "Passengers: ", desc: `${data.passengers} Persons` },
          { title: "Length: ", desc: `${data.length} Meters` },
          { title: "Consumables: ", desc: data.consumables },
          {
            title: "Max Atmosphering Speed: ",
            desc: data.max_atmosphering_speed
          }
        ] || []
    };

    return item[resource];
  }

  render() {
    const data = this.handleDescryption();

    return (
      <Fragment>
        <div className="d-flex flex-row h-75 w-75 align-items-start justify-content-between">
          <div className="d-flex flex-column">
            {data.map((item, i) => (
              <label className="lead">
                <strong>{item.title}</strong> {item.desc}
              </label>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DetailsComponent;
