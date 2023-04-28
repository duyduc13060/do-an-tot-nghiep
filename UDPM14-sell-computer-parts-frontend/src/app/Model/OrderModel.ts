export class OrderModel {
  id!: number;
  address!: string;
  province!: string;
  district!: string;
  ward!: string;
  description!: string;
  fullname!: string;
  reason!: string;
  phone!: string;
  account_id!: number;
  discount!: number;
  grandTotal!: number;
  shipping!: number;
  status!: number;
  payment_id!: number;
  create_date!: Date;
  update_Date!: Date;
  paymentId!: number;
  couponCode!: string;
}
