import React from "react";

const TableRow = ({ image, name, phone, email, birthDate}) => {
    return (
        <tr>
            <td>{image}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
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