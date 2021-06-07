import React, { useState, useEffect } from "react";
import "./DataTable.css";
import generateUsers from "../../../utils/randomUserAPI";
import TableHeader from "../TableHeader/TableHeader";
import TableRow from "../TableRow/TableRow";

const DataTable = () => {
    const [ tableRows, setTableRows ] = useState([]);
    useEffect(() => {
        generateUsers()
        .then(
            ({ results }) => setTableRows(results), 
            error => alert(error)
        )
    }, []);
    console.log(tableRows);
    const generateTableRows = () => {
        return tableRows.map(user => {
            return (
                <TableRow 
                    image={user.picture.medium}
                    name={`${user.name.first} ${user.name.last}`}
                    phone={user.phone}
                    email={user.email}
                    birthDate={user.dob.date}
                />
            )
        });
    };
    
    return (
        <div className="DataTable">
            <table className="table table-striped">
                <TableHeader />
                {generateTableRows()}
            </table>
        </div>
    )
};

export default DataTable;