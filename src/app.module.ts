import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customers } from './customers/customers.entity';
import { CustomersModule } from './customers/customers.module';
import { Products } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "1234565t",
      "database": "finalprojectdb",
      "entities": [Customers, Products],
      "synchronize": false
    }
    
  ),
    CustomersModule,
    ProductsModule,
    ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
