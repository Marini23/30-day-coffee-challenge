export const uploadBageToCloudinary = async (
  dataUrl: string
): Promise<string> => {
  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Missing secure_url in Cloudinary response");
    }

    console.log("✅ Upload successful. Cloudinary URL:", data.secure_url);
    return data.secure_url;
  } catch (err) {
    console.error("Error during Cloudinary upload:", err);
    throw err;
  }
};
