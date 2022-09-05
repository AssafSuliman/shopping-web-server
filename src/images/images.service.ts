import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Images } from './entities/image.entity';

@Injectable()
export class ImagesService {

  constructor(@InjectRepository(Images) private customersRepository:Repository<Images>) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findImagesOfBestSellers():Promise<Images[]> {
    return this.customersRepository.query(`select images.product_id, image_src, image_alt 
    from finalprojectdb.images join
    (select product_id, sum(amount) as amount from finalprojectdb.order_details
    group by product_id
    order by amount desc limit 3) as best_sellers
    on images.product_id = best_sellers.product_id;`)
  }

  findImagesByCategory(id:number):Promise<Images[]> {
    return this.customersRepository.query(`select image_src, image_alt, images.product_id from images join products
    where images.product_id = products.product_id and
    category_id = ?`,[id])
  }

  findImagesByProduct(id: number):Promise<Images[]> {
    return this.customersRepository.find({
      select: ['image_src', 'image_alt']
    })
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
