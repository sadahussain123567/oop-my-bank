#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"
interface bankaccount {
    accountnumber: number;
    balance: number;
    withdrawal(amount: number): void
    deposit(amount: number): void
    checkbalance(): void
}

// bank account class
class bankaccount implements bankaccount {
    accountnumber: number;
    balance: number;

    constructor(accountnumber: number, balance: number) {
        this.accountnumber = accountnumber;
        this.balance = balance
    }
    // debit money
    withdrawal(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bold.green(`withdrawal of $${amount} successfull.Remaining balance is: $${this.balance}`));


        } else {
            console.log(chalk.bold.red("insufficient balance"));

        }
    }

    //credit money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;//$1 fee charged if more than 100 dlr deposit
        } this.balance += amount;
        console.log(chalk.bold.green(`deposit of $${amount} successfull.Remainig balance is:$${this.balance}`));

    }
    //check balance
    checkbalance(): void {
        console.log(chalk.bold.green(`current balance $${this.balance}`));

    }
}
//customers class

class customer {
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    mobilenumber: number;
    account: bankaccount;

    constructor(firstname: string, lastname: string, gender: string, age: number, mobilenumber: number, account: bankaccount) {
        this.firstname = firstname
        this.lastname = lastname
        this.gender = gender
        this.age = age
        this.mobilenumber = mobilenumber
        this.account = account
    }
}



///create bank accounts
const accounts: bankaccount[] = [
    new bankaccount(1001, 500),
    new bankaccount(1002, 5000),
    new bankaccount(1003, 1000),

];


///create customers
const customers: customer[] = [
    new customer("asad", "jatoi", "male", 15, 3129876574, accounts[0]),
    new customer("ali", "hussain", "male", 19, 3029876574, accounts[1]),
    new customer("hamza", "syed", "male", 21, 3229876574, accounts[2])
]

//function to interact with bank account
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: chalk.bold.blue("enter your account number:")
        })

        const customer = customers.find(customer => customer.account.accountnumber == accountnumberinput.accountnumber)
        if (customer) {
            console.log(chalk.bold.gray(`welcome, ${customer.firstname} ${customer.lastname}\n`));
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["deposit", "withdrawal", "checkbalance", "exit"]
            }])
            switch (ans.select) {
                case "deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.green("enter the amount to deposit")
                    })
                    customer.account.deposit(depositamount.amount)
                    break;
                case "withdrawal":
                    const withdrawalamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.green("enter the amount to withdrawal")
                    })
                    customer.account.withdrawal(withdrawalamount.amount)
                    break;
                case "checkbalance":
                    customer.account.checkbalance()
                    break;

                case "exit":

                    console.log(chalk.bold.blue("\texiting bank program"));
                    console.log(chalk.bold.blue("\n thank you for using our bank services"));
                    return;




            }

        } else {
            console.log(chalk.bold.red("invalid account number"));

        }
    } while (true)
}
service()