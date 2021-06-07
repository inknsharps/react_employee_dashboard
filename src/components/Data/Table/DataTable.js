import React, { useState, useEffect } from "react";
import "./DataTable.css";
import generateUsers from "../../../utils/randomUserAPI";
import TableHeader from "../TableHeader/TableHeader";
import TableRow from "../TableRow/TableRow";
import Searchbar from "../../Searchbar/Searchbar";

// The lovely world of React hooks has destroyed my morale for building this currently, so time for some explanation before I forget everything:

// We're passing the state from the DataTable component to the TableRow component as a prop. useState() is initially set to an empty array, since we're going to be mapping over a newly set array to generate the table rows.

// Regarding AJAX calls, the React documentation (https://reactjs.org/docs/faq-ajax.html) states that you should populate data from an AJAX call in the componentDidMount lifecycle method. In our case, because we're using a functional component, the useEffect() hook is what we need (currently, I have it set to only be populated when the component first loads).

// Finally, we separate out the mapping over the tableRows state to another function, then call it in the actual returned component. We convert the date string that is returned to a Javascript date so we can call tolocaleDateString() on it.

const DataTable = () => {
    const [ tableRows, setTableRows ] = useState([]);
    const [ input, setInput ] = useState("");

    useEffect(() => {
        console.log("Generating users...");
        generateUsers()
        .then(
            ({ results }) => {
                return setTableRows(results);
            }, 
            (error) => alert(error)
        )
    }, [input]);

    const generateTableRows = () => {
        return tableRows.map((user, index) => {
            return (
                <TableRow 
                    key={index}
                    image={user.picture.medium}
                    name={`${user.name.first} ${user.name.last}`}
                    phone={user.phone}
                    email={user.email}
                    birthDate={new Date(user.dob.date).toLocaleDateString()}
                />
            )
        });
    };

    // Figure out how to link this to the filter???
    
    const handleInputChange = event => {
        const { value } = event.target;
        setInput(value);
    };

    // Steps for this filter nonsense:
    // 0.5) Make sure we're able to handle the changes for the filter
    // 1) Get all the data that we can filter out
    // 2) Run a filter method on the tableRows state array
    // 3) setTableRows to the new filtered array

    const filterTableRows = () => {
        const filter = input;
        return tableRows.filter(user => {
            const [ { first, last }, email, { date }, phone ] = Object.values(user);
            const valuesString = `${first} ${last} ${email} ${new Date(date).toLocaleDateString()} ${phone}`;
            return valuesString.includes(filter) !== -1;
        })
    }

    return (
        <div className="DataTable">
            <Searchbar handleInputChange={handleInputChange}/>
            <table className="table table-dark table-striped">
                <TableHeader />
                <tbody>
                    {generateTableRows()}
                </tbody>
            </table>
        </div>
    )
};

export default DataTable;