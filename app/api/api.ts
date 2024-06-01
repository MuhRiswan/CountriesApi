// export const urlCountry = "https://restcountries.com/v3.1";
import axios from "axios";

export const http = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const api = {
  getCountries: async (name: string) => {
    const response = await http.get(`/name/${name}`);
    return response.data;
  },

  getCountry: async (name: string) => {
    const response = await http.get(`/name/${name}?fullText=true`);
    return response.data;
  },
  getCurrencyCountry: async (currency: string) => {
    const response = await http.get(`/currency/${currency}`);
    return response.data;
  },

  getCountryByCode: async (code: string) => {
    const response = await http.get(`/alpha/${code}`);
    return response.data;
  },
};
