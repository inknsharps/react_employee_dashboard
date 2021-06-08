import React from "react";
import "./TableHeader.css";
import handleClick from "../../../utils/handleClick";

const TableHeader = () => {
    return (
        <thead className="TableHeader">
            <tr onClick={handleClick}>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
            </tr>
        </thead>
    )
};

export default TableHeader;