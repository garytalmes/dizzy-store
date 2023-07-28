

class Customer {
  constructor(id, name, location, email, password){
    this.id = id;
    this.name = name;
    this.location = location;
    this.email = email;
    this.password = password;
    this.orders = []
    this.totalSales = 0; 
    this.isGoldMember = false;
  }

  addOrder(order){
    // add the order object to the array above; because each order object contains a product object, 
    // we also have info on all products ordered
    // if the product is already in the products array; we just update the quantity
    this.orders.push(order)
    this.totalSales = this.totalSales += order.totalPrice
    if( this.totalSales > 250 ){
      this.makeGoldMember()
    }
  }

  // Gold members get a discount on merchandise
  makeGoldMember(){
    this.isGoldMember =  true
  }

  registerOrder(order){
    this.orders.push(order)
  }

  // When a user attempts to log in, the Store class can query its customer objects to find a match
  verifyCredentials(email, password){
    if( this.email === email && this.password === password ) return true 
    return false
  }

}


module.exports = Customer