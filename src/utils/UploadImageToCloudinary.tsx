export const uploadBageToCloudinary = async (
  dataUrl: string
): Promise<string> => {
  const blob = await (await fetch(dataUrl)).blob();
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "unsigned_preset");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dk1tf7ovm/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};
