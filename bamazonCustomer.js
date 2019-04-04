var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dontcare",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
});

// display the table of products
connection.query("SELECT * FROM products", function (err, results) {
    console.table(results);
    start();
});


// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt([
            {
                name: "buyOrNot",
                type: "list",
                message: "Would you like to [POST] an auction or [BID] on an auction?",
                choices: ["BUY", "EXIT"]
            }
        ])
        .then(function (answer) {
            if (answer.buyOrNot == "BUY") {
                inquirer
                    .prompt([
                        {
                            name: "whatToBuy",
                            type: "input",
                            message: "Enter in the ID number of what you want to buy",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                }
                                return false;
                            }
                        },
                        {
                            name: "howMany",
                            type: "input",
                            message: "How many do you want to buy",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    ])
                    .then(function (answer) {

                        var item = answer.whatToBuy;
                        var amount = answer.howMany;
                        var inventory;
                        var price;

                        connection.query(

                            // this part will get the stock quantity and subtract how many the user wanted to buy
                            // and save it in a local variable 
                            // we will also get the price and store it in a variable
                            "SELECT stock_quantity, price FROM products WHERE ?",
                            [{
                                item_id: item
                            }],
                            function (err, results) {
                                if (err) throw err;
                                inventory = results[0].stock_quantity - amount;
                                price = results[0].price * amount;

                                // if there is enough inventory 
                                if (inventory < 0) {
                                    console.log("INSUFFICIENT QUANTITY")
                                    start();
                                }

                                // otherwise update the inventory
                                else {
                                    connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: inventory
                                            },
                                            {
                                                item_id: item
                                            }
                                        ],
                                        function (err, results) {
                                            if (err) throw err;

                                            // display the table again and tell the user how much they have spent based on their last purchase
                                            // restart the function
                                            connection.query("SELECT * FROM products", function (err, results) {
                                                console.table(results);
                                                console.log("YOU SPEND $" + price);
                                                start();
                                            });
                                        }
                                    )
                                }
                            }
                        )
                    });
            }
            else{
                connection.end();
            }
        })
}
