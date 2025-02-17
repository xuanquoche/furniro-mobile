import * as FileSystem from "expo-file-system";

interface AddProductProps {
  body: { file: File | Blob | string };
}

interface ImageResponse {
  statusCode: number;
  message: string;
  data: {
    filePath: string;
  };
}

export const addImage = async ({
  body,
}: AddProductProps): Promise<ImageResponse> => {
  try {
    const formData = new FormData();

    if (typeof body.file === "string") {
      const fileUri = body.file;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      const response = await fetch(fileUri);
      const blob = await response.blob();

      formData.append("file", {
        uri: fileUri,
        name: "image.jpg",
        type: blob.type,
      } as any);
    } else {
      formData.append("file", body.file);
    }

    console.log("FormData", formData);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/file-upload/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const filePath = `${process.env.EXPO_PUBLIC_BACKEND_IMAGE}/${data.data.filePath}`;
    console.log("file path image", filePath);

    return {
      statusCode: response.status,
      message: "File uploaded successfully",
      data: {
        filePath: filePath,
      },
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
