

export class orderDto {
  
  products: {product_id:number,
     amount:number, 
     price:number, 
     discount:number, 
     product_name:string
    }[] 

  cost:number

  city:string

  address:string

  phone:string

  isCart:boolean
}
