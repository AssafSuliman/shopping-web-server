import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesService } from '../images/images.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity'
import { Categories } from './entities/categories.entity';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products) private productsRepository:Repository<Products>,
    @InjectRepository(Categories) private categoryRepository:Repository<Categories>,
    private imagesService:ImagesService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findProductsByCategory(categoryId):Promise<Products[]> {
    return await this.productsRepository.query(`select * from products join images
    on products.product_id = images.product_id
    where products.category_id = ?
    group by products.product_id;`,[categoryId])
  }

  async findBestSellers():Promise<Products[]> {
    return await this.productsRepository.query(`select products.product_id, category_id, product_name, description, 
    units_in_stock, price, image_src, image_alt from finalprojectdb.products join images
    join (select product_id, sum(amount) as amount from finalprojectdb.order_details
    group by product_id
    order by amount desc limit 4) as best_sellers
    on products.product_id = best_sellers.product_id and
    images.product_id = products.product_id
    group by products.product_id;`) // best  sellers with their images
    
  }

  async findOneWithOneImage(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where : {'product_id' : id},
      select: ['product_name']
    })
    
    const image = await this.imagesService.findImageByProduct(id)
    product['image'] = image.image_src
    product['alt'] = image.image_alt
    
    return product
  }

  async findOneWithAllImages(id:number): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where : {'product_id': id}
    })
    product['images'] = await this.imagesService.findAllImagesOfProduct(id)
    return product
  }

  async checkAmount(product_id:number , amount:number) {
    const product = await this.productsRepository.findOne({
      where : [{'product_id':product_id}]
    })
    if(product.units_in_stock < amount) {
      return product.units_in_stock
    }
    return true
  }

  async updateAmount(product_id:number, amount:number):Promise<Products | boolean> {
    const product = await this.productsRepository.findOne({
      where : [{'product_id':product_id}]
    })
    this.productsRepository.update({'product_id':product_id},
      {'units_in_stock': product.units_in_stock - amount})
    return  product
  }


  async getCategories():Promise<Categories[]> {
    return await this.categoryRepository.find()
  } 

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
