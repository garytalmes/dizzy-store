const Order = require("./Order")


class Store {
  constructor(name, customers, products){
    this.name = name;
    this.customers = customers;
    this.products = products;
    this.orders = [];
  }

  handleLogin(email, password){
    let found = null
    this.customers.forEach( customer => {
      if( !found && customer.verifyCredentials(email, password) ){
        found = customer
      }
    })
    return found
  }

  getProducts(){
    return this.products
  }

  findProduct(id){
    return this.products.find( prod => prod.id === id )
  }

  makeSale(order){
    this.orders.push(order)
    console.log(`This order is complete! Dizzy thanks you!`)
  }
}

module.exports = Store