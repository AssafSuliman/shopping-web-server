import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderDto } from './dto/cart-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() orderDto: orderDto, @Session() session: Record<string, any>) {
    orderDto['customer_id'] = +session.userId
    return this.ordersService.create(orderDto);
  }

  @Get()
  getOrders(@Session() session: Record<string, any>) {
    return this.ordersService.getOrders(session.userId);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
