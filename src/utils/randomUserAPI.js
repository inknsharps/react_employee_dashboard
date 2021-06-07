import axios from "axios";

const BASEURL = "https://randomuser.me/api/?inc=picture,name,phone,email,dob&results=15";

export const randomUserAPI = {
    search: function(query) {
        return axios.get(BASEURL + query);
    }
};