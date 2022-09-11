import { Entity, Column, PrimaryGeneratedColumn, Timestamp, PrimaryColumn } from 'typeorm';

@Entity()
export class Orders {

  @PrimaryGeneratedColumn()
  order_id:number

  @Column()
  customer_id:number

  @Column('timestamp')
  order_date: Date

  @Column('date')
  shipped_date: Date

  @Column('float')
  order_cost: number

  @Column({length:80})
  order_address:string

  @Column({length:45})
  order_city:string

  @Column({length:12})
  order_phone:string
}
