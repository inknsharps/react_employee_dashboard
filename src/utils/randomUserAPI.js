const BASEURL = "https://randomuser.me/api/?inc=picture,name,phone,email,dob&results=15";

const generateUsers = () => {
    // return axios.get(BASEURL + query);
    return fetch(BASEURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
      })
        .then(response => response.json());
};

export default generateUsers;