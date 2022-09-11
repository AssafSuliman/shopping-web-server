import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class CustomersService {

  constructor(@InjectRepository(Customers) private customersRepository:Repository<Customers>) {}

  async addCustomer(customer:SignupDto) {
    await this.customersRepository.save(customer)
    return 'Created'
  }

  async validateCustomer(body:LoginDto) : Promise<boolean | Customers>  {
    const customer = await this.customersRepository.findOne({
      where : [{'user_name':body.user_name}]
    })
    if(customer){
      const passwordMatch = await bcrypt.compare(body.password, customer.password)
      if(passwordMatch){
        return customer
      }
      return false
    }
    else return false
  }

  async getCustomer(id:number): Promise<Customers> {
    const customer = await this.customersRepository.findOne({
      where : [{'customer_id':id}],
      select: ['address', 'birthday', 'city', 
      'email', 'first_name', 'last_name', 'user_name']
    })
    return customer
  }

  checkCookie(req:Request):boolean{
    if(req.cookies.Sulitools){
      return true
    }
    return false
  }
}
