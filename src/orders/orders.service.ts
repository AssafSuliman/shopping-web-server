import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { ChildEntity, Repository } from 'typeorm';
import { orderDto } from './dto/cart-order.dto';
import { Order_Details } from './entities/order-details.entity';
import { Orders } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { log } from 'console';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Orders) private ordersRepository:Repository<Orders>,
    @InjectRepository(Order_Details) private orderDetailsRepository:Repository<Order_Details>,
    private cartService: CartService,
    private productsService: ProductsService) {}

  async create(orderDto: orderDto) {
    const notEnoughProducts:object[] = []
      for(let product of orderDto.products){
        const amountResponse = await this.productsService.checkAmount(product.product_id, product.amount)
        if(amountResponse != true){
          notEnoughProducts.push({name:product.product_name, amountInStock:amountResponse})
        }
      }
    if(notEnoughProducts.length === 0){
      const order = {
        'customer_id': orderDto['customer_id'], 'order_cost': orderDto.cost,
        'order_address':orderDto.address, 'order_city': orderDto.city,
        'order_phone': orderDto.phone}
        
      const newOrder =  await this.ordersRepository.save(order)
      
      for(let product of orderDto.products){
        const orderDetails = {'order_id':newOrder.order_id,
          'product_id':product.product_id, 'unit_price':product.price,
          'amount':product.amount, 'discount':product.discount}
        await this.productsService.updateAmount(product.product_id, product.amount)
        await this.orderDetailsRepository.save(orderDetails)
      }
        
      if(orderDto.isCart){
        await this.cartService.removeCart(orderDto['customer_id'])
      }

      return true
    } 

    return notEnoughProducts
    
  }
    
  async getOrders(customer_id:number) {
    const ordersId =  await this.ordersRepository.find({
      where : [{customer_id}],
      select: ['order_id', 'order_date', 'order_cost']
    })
    
    for(const order of ordersId){
      
      order['orderProducts'] = await this.orderDetailsRepository.find({
        where : [{'order_id': order['order_id']}],
        select : ['product_id', 'unit_price', 'amount']
      })
      
      for(const product of order['orderProducts']){
        const productDetails = await this.productsService.findOneWithOneImage(product.product_id)
        product['product_name'] = productDetails.product_name
        product['product_img'] = productDetails['image']
        product['product_alt'] = productDetails['alt']
      }
    }
    
    return ordersId
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }


  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}




/* else { // "buy now" option for single product
      const orderDetails = {'order_id':newOrder.order_id,
      'product_id':orderDto.products.product_id, 'unit_price':orderDto.products.price,
      'amount':1, 'discount':orderDto.products.discount}
      const amountResponse = await this.productsService.updateAmount(orderDto.products.product_id, 1)
      if(!amountResponse){
        notEnoughProducts.push(orderDto.products.product_name)
      }
      else await this.orderDetailsRepository.save(orderDetails)
    } */