import type { ApiResponse } from '@/app/types/item'

export const getItemById = (id: string): ApiResponse => {
  // In a real application, this would fetch data from a database
  return {
    data: {
      brand: "AMUL BODY WARMER",
      shape: [{ name: "I/E" }],
      color: [{ name: "ASSORTED" }, { name: "FINE WHITE" }],
      packsize: [{ name: "10000" }, { name: "3" }],
      size: [{ name: "XX" }, { name: "YML" }],
    },
  }
}

