import axios from "axios";

export default {
  user: {
    login: (credentials) => axios.post("/api/auth", { credentials }).then(res => res.data.user)
  },
  proces: {
    addProces: proces =>
      axios.post("/api/procese", { proces }).then(res => res.data.proces),
    getProcese: () =>
      axios.get(`api/procese`).then(res => res.data.procese),
    getProceseDate: (data) =>
      axios.get(`api/procese/?from=${data.startDate}&&to=${data.endDate}`).then(res => res.data.procese),
    editProces: proces =>
      axios.put("/api/procese/:id", { proces }).then(res => res.data.proces),
    deleteProces: (id) =>
      axios.delete(`/api/procese/${  id}`).then(res => res.status)
  },
  controlor: {
    addControlor: controlor =>
      axios.post("/api/controlori", { controlor }).then(res => res.data.controlor),
    getControlori: () =>
      axios.get(`api/controlori`).then(res => res.data.controlori),
    editControlor: controlor =>
      axios.put("/api/controlori/:id", { controlor }).then(res => res.data.controlor),
    deleteControlor: (id) =>
      axios.delete(`/api/controlori/${  id}`).then(res => res.status)
  }
};