

class Order {
  constructor(customer, product, qty){
    this.customer = customer;
    this.product = product;
    this.qty = qty;
    this.orderDate = new Date();
    this.subTotal = 0;
    this.totalPrice = 0;
  }

  getFinalPrice(){
    // add sales tax 
    this.totalPrice = this.subTotal + (this.subTotal * .10)
    return this.totalPrice
  }

  getSubtotal(){
    this.subTotal = this.product.price * this.qty
    return this.subTotal
  }

  checkForDiscount(){
    if( this.customer.isGoldMember ){
      this.subTotal = this.subTotal - (this.subTotal * .10)
      return "Congrats! Gold members receive 10% off!"
    } else {
      return "There are no extra discounts, sorry!"
    }
  }

  summary(){
    console.log( `
You are purchasing ${this.qty} units of ${this.product.name} at $ ${this.product.price} each. 
Your sub total is $ ${this.getSubtotal()}.
${this.checkForDiscount()}.
Your final total is ${this.getFinalPrice()}.
`)
  }
}

module.exports = Order