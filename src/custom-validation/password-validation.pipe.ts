import { ArgumentMetadata, Injectable, PipeTransform ,Query} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class CustomerValidatorPipe implements PipeTransform {
  constructor(private readonly customerService:CustomersService) {}

  async transform(value: any, metadata: ArgumentMetadata) { 
    if(value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
      value.password =  await bcrypt.hash(value.password, 10)
      return value
    }
    return `Password require 8 characters of numbers, lower case letter and upper case letter`
  }
}