// export const getCertificates = async () => {
//   return [
//     { title: "React Basics", issuer: "Coursera", status: "Verified" },
//     { title: "JavaScript Advanced", issuer: "Udemy", status: "Pending" }
//   ];
// };

// export const uploadCertificate = async (formData) => {
//   console.log("Upload certificate:", formData);
//   return { success: true };
// };
 import apiClient from './apiClient';

export const getCertificates = async (userId) => {
  const response = await apiClient.get(`/api/certificates/${userId}`);
  return response.data;
};

export const uploadCertificate = async (formData) => {
  const response = await apiClient.post('/api/certificates', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const bulkUploadCertificates = async (formData) => {
  const response = await apiClient.post('/api/certificates/bulk', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// New: Admin manual verification
export const verifyCertificate = async (certId, status, comments) => {
  const response = await apiClient.put(`/api/certificates/${certId}/verify`, { status, comments });
  return response.data;
};