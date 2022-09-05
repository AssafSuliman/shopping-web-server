import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';

@Injectable()
export class CustomersService {

  constructor(@InjectRepository(Customers) private customersRepository:Repository<Customers>) {}

  async getCustomers(): Promise<Customers[]> {
    return await this.customersRepository.find()
  }

  async getCustomer(id:number): Promise<Customers[]> {
    return await this.customersRepository.find({
      where : [{'customer_id' : id}]
    })
  }
}
