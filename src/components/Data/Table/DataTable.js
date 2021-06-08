import React, { useState, useEffect, useRef } from "react";
import useInput from "../../../hooks/useInput";
import useToggle from "../../../hooks/useToggle";
import "./DataTable.css";
import generateUsers from "../../../utils/randomUserAPI";
import TableHeader from "../TableHeader/TableHeader";
import TableRow from "../TableRow/TableRow";
import Searchbar from "../../Searchbar/Searchbar";
import Button from "../../Button/Button";
import handleSort from "../../../utils/handleSort";

// The lovely world of React hooks has destroyed my morale for building this currently, so time for some explanation before I forget everything:

// We're passing states from the DataTable component to the TableRow component as a prop. 
// Two states are set up specifically to be passed to the TableRow component- we have one that is the user data when the Fetch API call is made, and one that will be used for a filter.
// We also have a state set up for the input, a state for the sort, and a ref for the current users display (to avoid some nasty infinite loops).

// Regarding AJAX calls, the React documentation (https://reactjs.org/docs/faq-ajax.html) states that you should populate data from an AJAX call in the componentDidMount lifecycle method. In our case, because we're using a functional component, the useEffect() hook is what we need (currently, I have it set to only be populated when the component first loads).

// Finally, we separate out the mapping over the tableRows state to another function, then call it in the actual returned component. We convert the date string that is returned to a Javascript date so we can call tolocaleDateString() on it.

const DataTable = () => {
    // This state hook is for the filtered array of users that we will render in the app.
    const [ filteredTableRows, setFilteredTableRows ] = useState([]);

    // This custom hook is for toggling the ascending or descending sort order of the data. A boolean is used since we only have one category to sort by, and only two possible orders.
    const [ sortState, setSortState ] = useToggle(true);
    
    // This custom hook is strictly for handling inputs from the search bar.
    const [ input, setInput ] = useInput("");

    // This ref hook is strictly for grabbing a reference to the current users that are displayed, so we don't have to re-render the app every time we need to access that info.
    const currentUsers = useRef([]);

    // This ref is for the original array of users that we get from the Random User API. Again, a ref hook is used so we don't cause unnecessary rerendering.
    const originalUsers = useRef([]);

    // This first useEffect hook handles page load effects.
    // When the DataTable component is mounted (on page load), we call the generateUsers() function which returns an array of users from the Random User API. We then call the setters for the state and ref hooks we set up earlier to set them to equal that returned array. Initially, all states and refs will be the same, of course.
    // The second argument of this useEffect() is empty because we only want this to run once (ie. page load).
    useEffect(() => {
        console.log("Generating users...");
        generateUsers()
        .then(
            ({ results }) => {
                currentUsers.current = results;
                originalUsers.current = results;
                setFilteredTableRows(results);
            }, 
            (error) => alert(error)
        )
    }, []);

    // This second useEffect hook handles filtering effects.
    // Firstly, the second argument of this useEffect is an array containing the input, meaning that whenever thot change state, this effect will run.
    // We define a function called filterTableRows, which we pass in an array, and filter argument. In our case, our arrays of users are objects, so we call Object.values() to get an array of the values on each object, then use array destructuring to destructure each value into an individual variable. We then join those varibles together into a string, then we use indexOf() (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), pass the filter into it, and if it is found, then we return that user to the new array.
    // So, in our case we pass in the originalUsers reference, use our input state as the filter, and then set the filteredTableRows to the filter (which is also what we used to render the original element).
    // The weird and wonderful part of this filter function is that when the input is empty (""), running the filter function returns 0 for all the elements in the array, so it just returns the entire original user array we fetched in the first place!
    // Additionally, we also update the currentUsers useRef object since I want the ability to sort the displayed users after a filter has been run. 
    useEffect(() => {
        const filterTableRows = (array, filter) => {
            return array.filter(user => {
                const [ { first, last }, email, { date }, phone ] = Object.values(user);
                const valuesString = `${first} ${last} ${email} ${new Date(date).toLocaleDateString()} ${phone}`;
                return valuesString.indexOf(filter) !== -1;
            })
        }
        const filter = filterTableRows(originalUsers.current, input);
        currentUsers.current = filter;
        setFilteredTableRows(filter);
    }, [input]);

    // This third useEffect hook handles sorting effects.
    // Initially, I tried using the filteredTableRows state, however, it would require it as a dependency in this hook, and on load that caused an infinite loop.
    // This is why the useRef hook was used, and updated any time setFilteredTableRows was called, so we have a carbon copy of filteredTableRows to use without rerendering the application infinitely.
    useEffect(() => {
        const sortedUsers = [...currentUsers.current];
        handleSort(sortedUsers, sortState);
        setFilteredTableRows(sortedUsers);
    }, [sortState]);

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

    return (
        <div className="DataTable bg-dark">
            <Searchbar handleInputChange={setInput}/>
            <div className="DataTable-button">
                <Button buttonContent={sortState ? "Sort Users Alphabetically Descending" : "Sort Users Alphabetically Ascending"} callback={setSortState}/>
            </div>
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