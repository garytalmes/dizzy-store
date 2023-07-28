

class Product {
  constructor(id, name, description, price){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  displayInfo(){
    console.log( `
Id: ${this.id}
Name: ${this.name}
Description: ${this.description}
Price: ${this.price}
    `)
  }
}

module.exports = Product