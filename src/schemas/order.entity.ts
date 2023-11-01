import {CartItemEntity, cart} from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  delivery: { address: string; type: string };
  total: number;
  comments: string;
  isDeleted?: boolean;
  payment: { address: string; type: string; creditCard: string };
  id: string;
  userId?: string;
  items: CartItemEntity[];
  status: string
}

const order: OrderEntity = {
  id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  items: cart.items,
  payment: {
    type: 'paypal',
    address: undefined,
    creditCard: undefined
  },
  delivery: {
    type: 'post',
    address: undefined
  },
  comments: '',
  status: 'created',
  total: 2,
}
