import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Images {
  
  @PrimaryGeneratedColumn()
  image_id:number

  @Column()
  product_id:number

  @Column({length:5000})
  image_src:string

  @Column({length: 45})
  image_alt:string
}
