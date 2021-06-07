import axios from "axios";

const BASEURL = "https://randomuser.me/api/";

export const randomUserAPI = {
    search: function(query) {
        return axios.get(BASEURL + query);
    }
};