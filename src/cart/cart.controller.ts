import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService
    ) {}

  @Put(':id')
  create(@Param('id') product_id: string, @Session() session: Record<string, any>) {
    return this.cartService.add(session.userId ,+product_id);
  }

  @Get()
  getCart(@Session() session: Record<string, any>) {
    return this.cartService.getCart(+session['userId']);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: Record<string, any>) {
    return this.cartService.remove(Number(id), session.userId);
  }
}
