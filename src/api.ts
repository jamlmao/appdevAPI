import axios from 'axios';

const baseUrl = 'https://psgc.gitlab.io/api';


export async function forRegions() {
    const response = await axios.get(`${baseUrl}/regions.json`);
    return response.data;
  }

  export async function forProvinces(regionCode: string) {
    const response = await axios.get(`${baseUrl}/provinces.json?region_code=${regionCode}`);
    return response.data;
  }


  export async function forMunicipalities(provinceCode: string) {
    const response = await axios.get(`${baseUrl}/municipalities.json?province_code=${provinceCode}`);
    return response.data;
  }


  export async function forBarangays(municipalityCode: string) {
    const response = await axios.get(`${baseUrl}/barangays.json?municipality_code=${municipalityCode}`);
    return response.data;
  }