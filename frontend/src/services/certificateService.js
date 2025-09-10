export const getCertificates = async () => {
  return [
    { title: "React Basics", issuer: "Coursera", status: "Verified" },
    { title: "JavaScript Advanced", issuer: "Udemy", status: "Pending" }
  ];
};

export const uploadCertificate = async (formData) => {
  console.log("Upload certificate:", formData);
  return { success: true };
};
