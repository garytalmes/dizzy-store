const inquirer = require("inquirer");
const datasets = require("./seeder")
const Store = require("./lib/Store")
const Customer = require("./lib/Customer")
const Product = require("./lib/Product")
const Order = require("./lib/Order")

// Make the customer objects
const customerObjs = datasets.customers.map( data => new Customer( data.id, data.name, data.location, data.email, data.password ))

// Make the product objects
const productObjs = datasets.products.map( data => new Product( data.id, data.name, data.description, data.price ))

// Load up the store
const dizzyStore = new Store("DizzyStore USA", customerObjs, productObjs)

let loggedInUser = null;


function start(){

  inquirer.prompt([
    {
      message: `Welcome to ${dizzyStore.name}! We have ${dizzyStore.customers.length} customers. Choose an option:`,
      type: "list",
      name: "step1", 
      choices: [
        "Log In",
        "Exit"
      ]
    }
  ]).then( response => {
    if( response.step1 === "Log In" ){
      login()
    } else if( response.step1 === "Exit" ){
      process.exit()
    }
  })
}

function login(){
  inquirer.prompt([
    {
      type: "input",
      message: "Please provide your email:",
      name: "email"
    },

    {
      type: "password",
      message: "Please provide your password:",
      name: "password"
    }
  ]).then( response => {
    loggedInUser = dizzyStore.handleLogin(response.email, response.password)
    if(!loggedInUser){
      console.log("Sorry, could not log you in.")
      start();
    } else {
      console.log(`Welcome back, ${loggedInUser.name}!`)
      mainMenu();
    }
  })
}


function mainMenu(){
  inquirer.prompt([
    {
      message: `Please choose an option:`,
      type: "list",
      name: "step2", 
      choices: [
        "View Products",
        "View Orders"
      ]
    }
  ]).then( response => {
    if( response.step2 === "View Products" ){
      viewProducts()
    } else {
      viewOrders()
    }
  })
}

function viewProducts(){
  dizzyStore.products.forEach( product => product.displayInfo() )
  inquirer.prompt([
    {
      message: "To order a product, enter the id of the product below:",
      type: "input",
      name: "productId",
    },
    {
      message: "Please specify a quantity:",
      type: "input", 
      name: "qty"
    }
    // See if you can figure out what I'm doing on line 101 below.
  ]).then( ({ productId, qty }) => {
    purchaseProduct(productId, qty)
  })
}

function purchaseProduct(productId, qty){
  // Get the product being ordered from the Store 
  const productToBuy = dizzyStore.findProduct(parseInt(productId))

  if( !productToBuy ){
    console.log("Sorry, there has been a problem.")
    start()
  }
  
  // Create the order & have the order obj guide present the necessary info
  const currOrder = new Order(loggedInUser, productToBuy, qty)
  currOrder.summary()

  inquirer.prompt([
    {
      message: "Ready to complete your order?",
      type: "list", 
      choices: ["Yes", "No"], 
      name: "okToComplete"
    }
  ]).then( responses => {
    if( responses.okToComplete === "No" ){
      start()
    } else {
      finishPurchase(currOrder)
    }
  })
}

function finishPurchase(currOrder){
  // add the order to the store's orders array
  dizzyStore.makeSale(currOrder)

  // add the order to the customer's data also
  loggedInUser.addOrder(currOrder)

  inquirer.prompt([
    {
      message: "Choose an option:", 
      type: "list",
      choices: [
        "Purchase another product",
        "Start over",
        "Exit"
      ],
      name: "afterPurchase"
    }
  ]).then( responses => {
    if( responses.afterPurchase === "Purchase another product"){
      viewProducts()
    } else if ( responses.afterPurchase === "Start over" ) {
      start()
    } else {
      process.exit()
    }
  })
}

start();