import axios from "axios";

export const saveInvoice = async (baseUrl, payload, token) => {
  return axios.post(`${baseUrl}/invoices`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllInvoices = async (baseUrl, token) => {
  return axios.get(`${baseUrl}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteInvoice = async (baseUrl, id, token) => {
  return axios.delete(`${baseUrl}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendInvoice = (baseUrl, formData, token) => {
  return axios.post(`${baseUrl}/invoices/sendinvoice`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
