var mysql = require("mysql");
var inquirer = require("inquirer");
var clear = require("clear");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "!Q@W3e4r5t6y",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start()
{
  clear();
  console.log("==============================================\n");
  console.log(" *** Welcome to the Interstellar Pawn Shop *** \n");
  console.log("==============================================\n");
  console.log("We carry the following items:\n");
  readCatalog();
}

function askCustomer()
{
  console.log("==============================================\n");
  inquirer.prompt([
        {
          type: "list",
          name: "item",
          message: "Pick an item ID to purchase:",
          choices: ["1 - Plumbus", "2 - Interdemisional_Cable", "3 - Grumbles(large)", "4 - Mr._Meeseeks_Box", "5 - Roy_VR_Headset", "6 - Fleeb", "7 - Microverse_Battery", "8 - MegaTree_Seeds(2pak)", "9 - Defractulator", "10 - EyeHoles_Cereal(1 Box)" ]
        },

        {
          type: "input",
          name: "quantity",
          message: "How many would you like to buy?"
        }
    ])
    .then(function(user) {
      console.log("Product chosen is: "+user.item);
      //convert to single id number
      var choice = user.item.split(" ", 1);
      var salesItem = user.item.split(" ", 3);
      var avail = currStock(choice[0]);
      console.log("Avail is = "+avail);
      var quanity = avail.stock_quantity;
      console.log("User Quantity Reqested = "+user.quantity);
      console.log("New Quantity: "+(avail-user.quantity));
      if(quanity-user.quantity < 0){
        console.log("\n==============================================");
        console.log("Insufficient quantity!");
        console.log("==============================================\n");
      }else{
        updateInv(quanity-user.quantity, choice[0]);
        var price = salePrice(choice[0]);
        console.log("Total sales price: $"+(user.quantity*price));
        console.log("\n==============================================");
        console.log("Order fulfilled. Enjoy your "+salesItem[2]);
        console.log("==============================================\n");

      }
    });
}

function salePrice(id){
  var query = "SELECT price FROM products WHERE ?";
  connection.query(query, { item_id: id}, function(err, res) {
    if (err) throw err;
  });
  return(res);
}

function readCatalog(){
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0; i<res.length; i++)
    {
      console.log("=======================================================");
      console.log("ID: "+res[i].item_id+", Name: "+res[i].product_name+", Price: "+res[i].price);
    }
    console.log("=======================================================");
    inquirer.prompt([
        {
          name: "desire",
          type: "list",
          message: "Need to see the Catalog again?",
          choices: ["Yes", "No"]
        }
      ])
      .then(function(user) {
        if(user.desire === "Yes"){
          console.log("\nNo time! We gotz a business ta run here.");
        }
        askCustomer();
      });
  });
}

function currStock(id){
  var query = "SELECT stock_quantity FROM products WHERE ?";
  var godHelpMe;
  connection.query(query, { item_id: id}, function(err, res) {
    if (err) throw err;
    godHelpMe = res;
    console.log("res"+JSON.stringify(res));
  });
  return(godHelpMe);
}

function updateInv(newtotal, id){
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{ stock_quantity: newtotal}, { item_id: id}], function(err) {
    if (err) throw err;
  });
}
