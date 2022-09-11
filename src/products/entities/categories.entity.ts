import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  category_id:number

  @Column({length : 45})
  category_name: string
}