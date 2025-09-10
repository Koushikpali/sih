export const prepareFileUpload = (file, fieldName = "file") => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return formData;
};
