// A basic query to the Random User API is used for the time begin becuase I can't be bothered to make a new query.
// Additionally the Fetch API is used here because it works just fine. Remember to call the .json() method to parse the data.

const BASEURL = "https://randomuser.me/api/?inc=picture,name,phone,email,dob&nat=us,ca,de,dk,es,fi,fr,gb,no,nl,nz,tr&results=50";

const generateUsers = async () => {
    try {
        const fetchedUsers = await fetch(BASEURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
            }
        );
        const parsedUsers = await fetchedUsers.json();
        return parsedUsers;
    } catch (error) {
        console.log("Error in fetching API!");
    }
};

export default generateUsers;