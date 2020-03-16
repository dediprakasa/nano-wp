import axios from 'axios'

const ax = axios.create({
    baseURL: "http://35.225.34.198"
});

export default ax;