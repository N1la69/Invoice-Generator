import axios from "axios";

export const saveInvoice = async (baseUrl, payload) => {
  return axios.post(`${baseUrl}/invoices`, payload);
};
