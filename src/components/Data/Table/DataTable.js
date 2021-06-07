import React, { useState } from "react";
import "./DataTable.css";
import randomUserAPI from "../../../utils/randomUserAPI";
import TableHeader from "../TableHeader/TableHeader";

const DataTable = () => {
    return (
        <div className="DataTable">
            <table className="table table-striped">
                <TableHeader />
            </table>
        </div>
    )
};

export default DataTable;