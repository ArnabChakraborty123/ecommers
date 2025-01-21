export interface ItemData {
    brand: string
    shape: { name: string }[]
    color: { name: string }[]
    packsize: { name: string }[]
    size: { name: string }[]
  }
  
  export interface ApiResponse {
    data: ItemData
  }
  
  