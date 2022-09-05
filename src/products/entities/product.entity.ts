import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Products {
  
  @PrimaryGeneratedColumn()
  product_id:number

  @Column()
  category_id:number

  @Column({length:100})
  product_name:string

  @Column({length: 500})
  description:string

  @Column()
  units_in_stock:number

  @Column('float')
  price:number
}
