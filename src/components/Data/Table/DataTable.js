import React, { useState, useEffect } from "react";
import "./DataTable.css";
import generateUsers from "../../../utils/randomUserAPI";
import TableHeader from "../TableHeader/TableHeader";
import TableRow from "../TableRow/TableRow";
import Searchbar from "../../Searchbar/Searchbar";

// The lovely world of React hooks has destroyed my morale for building this currently, so time for some explanation before I forget everything:

// We're passing states from the DataTable component to the TableRow component as a prop. 
// Two states are set up specifically to be passed to the TableRow component- we have one that is the user data when the Fetch API call is made, and one that will be used for a filter.
// We also have a state set up for the input.

// Regarding AJAX calls, the React documentation (https://reactjs.org/docs/faq-ajax.html) states that you should populate data from an AJAX call in the componentDidMount lifecycle method. In our case, because we're using a functional component, the useEffect() hook is what we need (currently, I have it set to only be populated when the component first loads).

// Finally, we separate out the mapping over the tableRows state to another function, then call it in the actual returned component. We convert the date string that is returned to a Javascript date so we can call tolocaleDateString() on it.

const DataTable = () => {
    // This state hook is for the original array of users that we get from the Random User API.
    const [ tableRows, setTableRows ] = useState([]);

    // This state hook is for the filtered array of users that we will render in the app.
    const [ filteredTableRows, setFilteredTableRows ] = useState([]);

    // This state hook is strictly for handling inputs from the search bar.
    const [ input, setInput ] = useState("");

    // This first useEffect hook handles page load effects.
    // When the DataTable component is mounted (on page load), we call the generateUsers() function which returns an array of users from the Random User API. We then call the setters for the state hooks we set up earlier to set the state of both tableRows and filteredTableRows to equal that returned array. Initially, both states will be the same, of course.
    // The second argument of this useEffect() is empty because we only want this to run once (ie. page load).
    useEffect(() => {
        console.log("Generating users...");
        generateUsers()
        .then(
            ({ results }) => {
                setFilteredTableRows(results);
                return setTableRows(results);
            }, 
            (error) => alert(error)
        )
    }, []);

    // This second useEffect hook handles filtering effects.
    // Firstly, the second argument of this useEffect is an array containing the input, and tableRows, meaning that whenever those change state, this effect will run (which is what we want).
    // We define a function called filterTableRows, which we pass in an array, and filter argument. In our case, our arrays of users are objects, so we call Object.values() to get an array of the values on each object, then use array destructuring to destructure each value into an individual variable. We then join those varibles together into a string, then we use indexOf() (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), pass the filter into it, and if it is found, then we return that user to the new array.
    // So, in our case we pass in the tableRows state, use our input state as the filter, and then set the filteredTableRows to the filter (which is also what we use to render the original element).
    // The weird and wonderful part of this filter function is that when the input is empty (""), running the filter function returns 0 for all the elements in the array, so it just returns the entire original user array we fetched in the first place!
    useEffect(() => {
        const filterTableRows = (array, filter) => {
            return array.filter(user => {
                const [ { first, last }, email, { date }, phone ] = Object.values(user);
                const valuesString = `${first} ${last} ${email} ${new Date(date).toLocaleDateString()} ${phone}`;
                return valuesString.indexOf(filter) !== -1;
            })
        }
        const filter = filterTableRows(tableRows, input);
        setFilteredTableRows(filter);
    }, [input, tableRows]);

    const generateTableRows = (usersArray) => {
        return usersArray.map((user, index) => {
            return (
                <TableRow 
                    key={index}
                    id={index + 1}
                    image={user.picture.medium}
                    name={`${user.name.first} ${user.name.last}`}
                    phone={user.phone}
                    email={user.email}
                    birthDate={new Date(user.dob.date).toLocaleDateString()}
                />
            )
        });
    };
    
    const handleInputChange = event => {
        setInput(event.target.value);
    };

    return (
        <div className="DataTable">
            <Searchbar handleInputChange={handleInputChange}/>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <TableHeader />
                    <tbody>
                        {generateTableRows(filteredTableRows)}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default DataTable;