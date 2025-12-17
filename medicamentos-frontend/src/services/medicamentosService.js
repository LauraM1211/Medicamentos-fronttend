import axios from "axios";

const API_URL = "https://localhost:7292/api/medicamentos";

export const getMedicamentos = () => axios.get(API_URL);
export const createMedicamento = (data) => axios.post(API_URL, data);
