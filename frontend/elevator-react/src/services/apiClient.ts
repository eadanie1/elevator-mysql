import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: 'https://elevator-mysql-production.up.railway.app'
});



export { CanceledError };