import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get('best-sellers')
  imagesOfBestSellers() {
    return this.imagesService.findImagesOfBestSellers();
  }

  @Get('category/:id')
  imagesByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findImagesByCategory(id);
  }

  @Get('oneImage/:id')
  imagesByProduct(@Param('id', ParseIntPipe) id:number){
    return this.imagesService.findImageByProduct(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
