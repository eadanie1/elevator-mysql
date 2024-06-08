import axios, { CanceledError } from "axios";

export default axios.create({
  // baseURL: 'http://localhost:3000/api/elevators'
  baseURL: 'https://elevator-mysql-production.up.railway.app/api/elevators'
});



export { CanceledError };