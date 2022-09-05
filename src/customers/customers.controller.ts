import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {

  constructor(private service:CustomersService) {}

  @Get()
  getCustomers(){
    return this.service.getCustomers()
  }

  @Get(':id')
  getCustomer(@Param('id') id:number) {
    return this.service.getCustomer(id)
  }
}
