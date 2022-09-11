import { Body, Controller, Get, Param, Post, Req, Res,Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { log } from 'console';
import { Request, Response } from 'express';
import { request } from 'http';

import { CustomerValidatorPipe } from '../custom-validation/password-validation.pipe';
import { Customers } from './customers.entity';
import { CustomersService } from './customers.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('customers')
export class CustomersController {

  constructor(private customerService:CustomersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe(), CustomerValidatorPipe)
  async insertCustomer(@Body() customer:SignupDto){
    if(typeof customer === 'string'){
      return customer
    }
    const newCustomer = await this.customerService.addCustomer(customer)
    return newCustomer
  }

  @Post('login')
  async validateCustomer(@Session() session: Record<string, any>, @Body() customer:LoginDto) {
    const customerDetails = await this.customerService.validateCustomer(customer)
    if(typeof customerDetails  != 'boolean'){
      session.userId = customerDetails.customer_id
      return true
    }
    else return false
  }

  @Get()
  async getCustomer(@Session() session: Record<string, any>){
    const customer = await this.customerService.getCustomer(+session.userId)
    return customer
  }

  @Get('logged')
  checkIfLoggedIn(@Session() session:Record<string, any>){
    if(session.userId){
      return true
    }
    else {
      return false
    }
  }
  @Get('logout')
  logOut(@Res() res:Response, @Session() session:Record<string, any>){
    res.clearCookie('SuliTools')
    res.send('cookie cleared')
  }
}
