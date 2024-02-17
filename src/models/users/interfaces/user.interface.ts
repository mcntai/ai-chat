import { BaseInterface } from 'common/interfaces/base.interface';
export interface UserInterface extends BaseInterface {
  authToken: string;
  coins: number;
  paidCoins: number;
}