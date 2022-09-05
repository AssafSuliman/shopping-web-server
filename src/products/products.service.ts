import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity'


@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Products) private productsRepository:Repository<Products>) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findProductsByCategory(categoryId):Promise<Products[]> {
    return await this.productsRepository.find({
      where : [{'category_id':categoryId}]
    })
  }

  async findBestSellers():Promise<Products[]> {
    return await this.productsRepository.query(`select products.product_id, category_id, product_name, description, 
    units_in_stock, price, amount  from finalprojectdb.products join
    (select product_id, sum(amount) as amount from finalprojectdb.order_details
    group by product_id
    order by amount desc limit 3) as best_sellers
    on products.product_id = best_sellers.product_id;`)
    
  }

  async findOne(id: number): Promise<Products[]> {
    return await this.productsRepository.find({
      where : [{'product_id' : id}]
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
