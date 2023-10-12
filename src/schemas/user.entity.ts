import {CartEntity} from "./cart.entity";

export interface UserEntity {
  id: string; // uuid
}

export const userEntity: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}

export interface UserInfo {
  cart: CartEntity,
  total: number
}

export const user: UserInfo = {
  "cart": {
    "id": "1434fec6-cd85-420d-95c0-eee2301a971d",
    "userId": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "items": [
      {
        "product": {
          "id": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book",
          "description": "Interesting book",
          "price": 200
        },
        "count": 2
      }
    ]
  },
  "total": 400
}

export const user2: UserInfo = {
  "cart": {
    "id": "1434fec6-cd85-420d-95c0-eee2301a971d",
    "userId": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c-2",
    "items": [
      {
        "product": {
          "id": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book 2",
          "description": "Interesting book",
          "price": 300
        },
        "count": 3
      }
    ]
  },
  "total": 300
}