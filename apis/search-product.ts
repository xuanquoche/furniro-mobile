import { Product } from "@/types/product";

interface SearchProductProps {
  keyword: string;
  current: number;
  pageSize: number;
}

interface SearchResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: Product[];
  };
}

export const searchProduct = async ({
  keyword,
  current,
  pageSize,
}: SearchProductProps): Promise<SearchResponse> => {
  try {
    const data = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/products/search?keyword=${keyword}&current=${current}&pageSize=${pageSize}`,
      {
        method: "get",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response: SearchResponse = await data.json();
    return response;
  } catch (error) {
    console.log("failed to search", error);
    throw error;
  }
};
