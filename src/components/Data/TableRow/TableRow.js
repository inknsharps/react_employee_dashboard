import React from "react";
import "./TableRow.css";

const TableRow = ({ id, image, name, phone, email, birthDate }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td><img src={image} alt={name} /></td>
            <td>{name}</td>
            <td>{phone}</td>
            <td><a className="text-light" href={`mailto:${email}`}>{email}</a></td>
            <td>{birthDate}</td>
        </tr>
    )
};

TableRow.defaultProps = {
    image: "N/A",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@doe.com",
    birthDate: "01-02-03"
}

export default TableRow;