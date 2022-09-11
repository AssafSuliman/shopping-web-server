import { IsEmail, IsNotEmpty, IsNumber, IsAlpha, MinLength } from "class-validator"

export class LoginDto {
  user_name:string
  password:string
}