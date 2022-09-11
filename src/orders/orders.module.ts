import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { Order_Details } from './entities/order-details.entity';
import { CartModule } from '../cart/cart.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [CartModule, ProductsModule, TypeOrmModule.forFeature([Orders, Order_Details])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
