import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customers } from './customers/customers.entity';
import { CustomersModule } from './customers/customers.module';
import { Products } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { OrdersModule } from './orders/orders.module';
import {  Orders } from './orders/entities/order.entity';
import { Order_Details } from './orders/entities/order-details.entity';
import { Images } from './images/entities/image.entity';
import { Categories } from './products/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "1234565t",
      "database": "finalprojectdb",
      "entities": [Customers, Products, Categories, Images, Cart, Orders, Order_Details],
      "synchronize": false
    }
    
  ),
    CustomersModule,
    ProductsModule,
    ImagesModule,
    CartModule,
    OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
