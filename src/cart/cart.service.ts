import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {

  constructor(@InjectRepository(Cart) private cartRepository:Repository<Cart>,
    private productsService:ProductsService) {}

  async add(customer_id:number, product_id:number) {
    const productExist = await this.cartRepository.findOne({
      where: [{'customer_id':customer_id, 'product_id':product_id}]
    })

    if(productExist)
      await this.cartRepository.update(
        {'customer_id':customer_id ,'product_id':product_id},
        {amount:productExist.amount+1}
      )
    else {
      await this.cartRepository.save({
        customer_id,
        product_id,
        amount:1
      })
    }
    return 'added'
  }

  async getCart(id): Promise<Cart[]> {
    const cart = await this.cartRepository.query(`
    select cart.product_id, amount, product_name, description, price, image_src, image_alt
    from cart join products join images
    where cart.product_id = products.product_id and customer_id = ?
    and cart.product_id = images.product_id
    group by cart.product_id`,[id])
    return cart
  }


  async remove(id: number, customer_id : number) {
    await this.cartRepository.delete({
      customer_id,
      product_id:id
    })
  }

  async removeCart(customer_id:number) {
    console.log(customer_id);
    
    await this.cartRepository.delete({
      customer_id
    })
  }
}
