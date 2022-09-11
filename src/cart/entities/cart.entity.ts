import { Entity, Column, PrimaryGeneratedColumn, Timestamp, PrimaryColumn } from 'typeorm';

@Entity()
export class Cart {
  
  @PrimaryColumn ()
  customer_id:number

  @PrimaryColumn ()
  product_id:number

  @Column()
  amount:number

  @Column('timestamp')
  last_updated : Date
}
