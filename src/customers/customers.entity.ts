import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Customers {
  
  @PrimaryGeneratedColumn()
  customer_id:number

  @Column({length:45})
  first_name:string
  
  @Column({length:45})
  last_name:string
  
  @Column({length:45})
  city:string
  
  @Column({length:60})
  address:string
  
  @Column({length:50})
  email:string
  
  @Column({length:6})
  gender:string

  @Column('date')
  birthday:Date
  
  @Column('timestamp')
  created_time:Date

  @Column({ length : 45})
  user_name:string

  @Column( {length: 250, nullable:true})
  password:string

}
