import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Session } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('category/:id')
  findProductsByCategory(@Param('id', ParseIntPipe) id:number) {
    return this.productsService.findProductsByCategory(id);
  }

  @Get('best-sellers')
  bestSellers() {
    return this.productsService.findBestSellers()
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories()
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id:number) {
    return this.productsService.findOneWithAllImages(id)
  }

  /* @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  } */

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
