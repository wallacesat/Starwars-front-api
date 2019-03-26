import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Link } from "react-router-dom";

class TableComponent extends Component {
  getUrl(url) {
    const resource = this.props.itemName || this.props.match.params.object;
    const id = url.replace("https://swapi.co/api", "");

    return resource === "peoples" ? `${id.replace("people", "peoples")}` : id;
  }

  handleTable() {
    const { items } = this.props || this.props.state;

    const resource = this.props.itemName || this.props.match.params.object;

    let data = [];
    items.map((item, i) => {
      data.push({
        name: item.name,
        avatar: item.urlAvatar40,
        url: item.url,
        idItem: item.idItem,
        attributes: (() => {
          const values = {
            peoples: [item.gender, item.eye_color],
            planets: [item.climate, item.orbital_period],
            starships: [item.model, item.starship_class],
            vehicles: [item.model, item.passengers]
          };
          return values[resource];
        })()
      });
      return null;
    });

    return data.map((item, i) => (
      <Link
        key={i}
        to={{
          // pathname: this.getUrl(item.idItem),
          pathname: `/${resource}/${item.idItem}`,
          state: this.props.items
        }}
        style={{ textDecoration: "none" }}
        className="d-flex width={1}"
      >
        <TableRow key={i} hover className="d-flex w-100 align-items-end">
          <TableCell className="col-2">
            <img
              src={item.avatar}
              className="img-fluid border border-ligth rounded-circle"
              alt=""
            />
          </TableCell>
          <TableCell className="col-4">{item.name}</TableCell>
          <TableCell className="col-4">{item.attributes[0]}</TableCell>
          <TableCell className="col-2">{item.attributes[1]}</TableCell>
        </TableRow>
      </Link>
    ));
  }

  render() {
    const { columns } = this.props;

    return (
      <Table className="table-responsive">
        <TableHead className="d-flex witdh={1}">
          <TableRow className="d-flex align-items-end w-100">
            <TableCell className="col-2">Avatar</TableCell>
            {columns.map((item, i) => (
              <TableCell
                key={i}
                className={i === 0 || i === 1 ? "col-4" : "col-2"}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{this.handleTable()}</TableBody>
      </Table>
    );
  }
}

export default TableComponent;
