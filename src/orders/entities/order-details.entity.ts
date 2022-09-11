import { Entity, Column, PrimaryGeneratedColumn, Timestamp, PrimaryColumn } from 'typeorm';

@Entity()
export class Order_Details {

  @PrimaryColumn()
  order_id:number

  @PrimaryColumn()
  product_id:number

  @Column('float')
  unit_price: number

  @Column()
  amount:number

  @Column('float')
  discount:number
}