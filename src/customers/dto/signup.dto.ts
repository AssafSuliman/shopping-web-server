import { IsEmail, IsNotEmpty, IsNumber, IsAlpha, MinLength, IsDate } from "class-validator"

export class SignupDto {
  @IsNotEmpty()
  @MinLength(4)
  user_name:string

  @IsNotEmpty()
  @MinLength(8)
  password:string

  @IsNotEmpty()
  @MinLength(2)
  first_name:string

  @IsNotEmpty()
  @MinLength(2)
  last_name:string

  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @MinLength(3)
  city:string

  @IsNotEmpty()
  @MinLength(10)
  address:string

  @IsNotEmpty()
  birthday:Date
}