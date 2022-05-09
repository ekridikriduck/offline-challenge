import axios from "axios";
const baseUrl = "https://metakeep-be.herokuapp.com/";

const _api = axios.create({
  baseURL: baseUrl,
});
export const listApplications = async () => {
  const token = localStorage.getItem("token");
  const { data } = await _api.get("api/listApplications", {
    headers: { Authorization: `${token}` },
  });
  return data;
};

export const createApplication = async (body) => {
  const token = localStorage.getItem("token");
  const { data } = await _api.post("api/createApplication", body, {
    headers: { Authorization: `${token}` },
  });
  return data;
};
