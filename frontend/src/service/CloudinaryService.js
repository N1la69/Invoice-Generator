import axios from "axios";

export const uploadInvoiceThumbnail = async (imgData) => {
  const formData = new FormData();
  formData.append("file", imgData);
  formData.append("upload_preset", "invoice-thumbnail");
  formData.append("cloud_name", "dewbubda8");

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/dewbubda8/image/upload`,
    formData
  );

  return res.data.secure_url;
};
