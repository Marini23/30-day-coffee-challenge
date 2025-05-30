export const uploadImageToCloudinary = async (
  file: File,
  userId: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");
  formData.append("public_id", `users/${userId}`);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dk1tf7ovm/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
};
