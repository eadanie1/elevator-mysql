// import { Elevator } from "../types/types";
import createHttpService, { HttpService } from "./httpService";

const elevatorService = createHttpService() as HttpService;

export default elevatorService;