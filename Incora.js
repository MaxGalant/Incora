class User {
    constructor(name, money) {
        if (name === "") { //Перевірка чи ім'я не пуста стрічка
            console.log("Error incorrect user name")
        } else {
            this.name = name
        }
        if (money < 0 || typeof money != "number") { //Перевірка на правильність вводу грошей
            console.log("Error money cannot be negative and must be type number")
        } else {
            this.money = money
        }
    }
    play(CasinoList) {

        if (CasinoList.length > 0) {
            let ChooseCasino = Number(prompt("Index of casino"))
            if (Number.isInteger(ChooseCasino)) {
                if (CasinoList.length < ChooseCasino || ChooseCasino <= 0) { //Перевірка чи існує казино з таким індексом
                    console.log(`Error there is no such casino number(start from 1 to ${CasinoList.length})`)
                } else {
                    if (CasinoList[ChooseCasino - 1].getMachineCount > 0) {
                        let ChooseCasinoMachine = Number(prompt("num of machine"))
                        if (Number.isInteger(ChooseCasinoMachine)) {
                            if (CasinoList[ChooseCasino - 1].getMachineCount < ChooseCasinoMachine || ChooseCasinoMachine <= 0) { //Перевірка чи існує гральний автомат з таким індексом
                                console.log(`Error there is no such casino number(start from 1 to ${CasinoList[ChooseCasino - 1].getMachineCount}`)
                            } else {
                                if (this.money === 0) { //Перевірка чи юзер банкрот
                                    console.log("Sorry but you are bankrupt")
                                } else if (this.money > 0) {
                                    let cash = Number(prompt("How much money put to GameMachine"))
                                    console.log("Cash put to GameMachine", cash)
                                    if (cash > 0 && typeof cash == "number") { //Перевірка на правильність вводу суми

                                        if (this.money - cash >= 0) { //Перевірка чи можна взяти певну суму з рахунку юзера
                                            console.log("Cash which is putted to GameMachine:", cash)
                                            this.money = this.money - cash
                                            console.log("Your money after put money", this.money)
                                            this.money = this.money + CasinoList[ChooseCasino - 1].AllGameMachine[ChooseCasinoMachine - 1].playGame(cash)
                                        } else {
                                            console.log("You don't have enougth money")
                                        }
                                    } else {
                                        console.log("Cash must be more than 0 and must be type number")
                                    }
                                }
                            }
                        } else {
                            console.log("Incorrect GameMachine number (must be integer)")
                        }
                    } else {
                        console.log("GameMachines not created")
                    }
                }
            } else {
                console.log("Incorrect casino number (must be integer)")
            }
        } else { console.log("Error casino not created") }
    }
}
class SuperAdmin extends User {
    constructor(name, money) {
        super(name, money)
        this.CasinoList = []
    }
    addCasino() {
        let nameCasino = prompt("name of casino")
        if (nameCasino != "") { //Перевірка чи ім'я не є пустою стрічкою
            let casino = new Casino(nameCasino)
            this.CasinoList.push(casino)
        } else {
            console.log("Error incorrect name")
        }
    }
    addGameMachine() {
        let num = Number(prompt("Number  of GameMachine in casino"))
        if (num > 0 && Number.isInteger(num)) { //Перевірка чи кількість гральних автоматів більша 0 та типу інтеджер
            for (let i = 0; i < this.CasinoList.length; i++) {
                let startGameMachineMoney = this.money / num
                for (let j = 0; j < num; j++) {
                    let machine = new GameMachine(startGameMachineMoney)
                    this.CasinoList[i].addNewGameMachine(machine)
                }
            }
        } else {
            console.log(`Error number must be more than 0 and must be type integer`)
        }
    }
    takeMoneyCasino(number) {
        if (number > 0 && typeof number == "number") { //Перевірка чи сума більша 0 і типу number
            let sum = number
            if (this.CasinoList.length > 0) { //Перевірка чи існує казино
                for (let i = 0; i < this.CasinoList.length; i++) {
                    if (this.CasinoList[i].getMachineCount > 0) { //Перевірка чи існують гральні автомати
                        this.CasinoList[i].AllGameMachine.sort()
                        for (let j = 0; j < this.CasinoList[i].getMachineCount; j++) {
                            sum = this.CasinoList[i].AllGameMachine[j].getMoney - sum
                            if (sum == 0) {
                                this.CasinoList[i].AllGameMachine[j].changeMoney = 0
                                break
                            } else if (sum < 0) {
                                this.CasinoList[i].AllGameMachine[j].changeMoney = 0
                                sum = sum * (-1)
                                if (j === this.CasinoList[i].getMachineCount - 1) {
                                    console.log(`Sorry but your casino is bankrupt, it has debt:${sum} `)
                                }
                            } else if (sum > 0) {
                                this.CasinoList[i].AllGameMachine[j].changeMoney = sum
                                break
                            }

                        }
                    } else { console.log("Error  your casino doesn't have GameMachine") }
                }
            } else {
                console.log("Error your casino doesn't exist")
            }
        } else {
            console.log("Error sum cannot be negative and must be value")
        }
    }
    addMoneyMachine(number) {
        if (number > 0 && typeof number == "number") { //Перевірка чи сума більша 0 і типу number
            if (this.CasinoList.length > 0) { //Перевірка чи існує казино
                for (let i = 0; i < this.CasinoList.length; i++) {
                    if (this.CasinoList[i].getMachineCount > 0) { //Перевірка чи існують гральні автомати
                        let num = Number(prompt("Index of GameMachine to which you need to add money "))
                        if (num > 0 && num <= this.CasinoList[i].getMachineCount && Number.isInteger(num)) { //Перевірка чи існує такий індекс гральних автоматів та чи тип інтеджер
                            let prevMoney = this.CasinoList[i].AllGameMachine[num - 1].getMoney
                            this.CasinoList[i].AllGameMachine[num - 1].changeMoney = prevMoney + number
                            this.money += number
                        } else {
                            console.log(`Error there is no such GameMachine number(start from 1 to ${this.CasinoList[i].getMachineCount}) and type number`)
                        }
                    } else { console.log("Error  your casino doesn't have GameMachine") }

                }
            } else {
                console.log("Error your casino doesn't exist")

            }

        } else {
            console.log("Error sum cannot be negative and empty")
        }
    }
    deleteGameMachine() {
        if (this.CasinoList.length > 0) { //Перевірка чи існує казино
            for (let i = 0; i < this.CasinoList.length; i++) {
                if (this.CasinoList[i].getMachineCount > 0) { //Перевірка чи існують гральні автомати

                    let numOfMachine = Number(prompt("Enter index of GameMachine to which you want to delete"))


                    if (numOfMachine > this.CasinoList[i].getMachineCount || numOfMachine <= 0 || !Number.isInteger(numOfMachine)) { //Перевірка чи існує такий індекс гральних автоматів та чи тип інтеджер
                        console.log(`Error there is no such GameMachine number(start from 1 to  ${this.CasinoList[i].getMachineCount}) and type number`)
                    } else {
                        let moneyFromDeleteMachine = this.CasinoList[i].AllGameMachine[numOfMachine - 1].getMoney
                        this.CasinoList[i].AllGameMachine.splice([numOfMachine - 1], 1)
                        let divided = moneyFromDeleteMachine / this.CasinoList[i].getMachineCount
                        for (let j = 0; j < this.CasinoList[i].getMachineCount; j++) {
                            let prevMoney = this.CasinoList[i].AllGameMachine[j].getMoney
                            this.CasinoList[i].AllGameMachine[j].changeMoney = prevMoney + divided
                        }
                    }
                } else { console.log("Error  your casino doesn't have GameMachine") }

            }
        } else {
            console.log("Error your casino doesn't exist")

        }
    }

}
class Casino {
    #name
    constructor(name) {
        if (name === "") { //Перевірка чи ім'я не пуста стрічка
            console.log("Error incorect casino name")
        } else {
            this.#name = name
        }
        this.AllGameMachine = []
    }
    addNewGameMachine(machine) {
        if (machine instanceof GameMachine) { //Перевірка чи параметр відноситься до класу GameMachine
            this.AllGameMachine.push(machine)
        } else {
            console.log("Error undefined element(must be class GameMachine)")
        }
    }
    get getMachineCount() {
        return this.AllGameMachine.length
    }
    get getMoney() {
        let sum = 0
        for (let i = 0; i < this.getMachineCount; i++) {
            sum += this.AllGameMachine[i].getMoney
        }
        return sum
    }

}
class GameMachine {
    #number
    constructor(number) {
        if (number < 0 || typeof number != "number") { //Перевірка чи гроші більші 0 і типу number
            console.log("Error money cannot be negative and must be type number in GameMachine ")
        } else {
            this.#number = number
        }
    }
    get getMoney() {
        return this.#number
    }
    set changeMoney(newMoney) {
        if (newMoney >= 0 && typeof newMoney == "number") { //Перевірка чи параметр більший 0 і типу number
            this.#number = newMoney
        } else {
            console.log("Money must be more than 0")
        }
    }
    takeMoney(number) {
        if (number < 0 || typeof number != "number") { //Перевірка чи параметр більший 0 і типу number
            console.log("Error money cannot be negative and must be type number")
        } else {
            this.#number = this.#number - number
        }
    }
    putMoney(number) {
        if (number <= 0 || typeof number != "number") { //Перевірка чи параметр більший 0 і типу number
            console.log("Error you can't put negative value , 0 and must be type number")
        } else {
            this.#number = this.#number + number
        }
    }
    playGame(number) {
        if (number < 0 || typeof number != "number") { //Перевірка чи параметр більший 0 і типу number
            console.log("Error money cannot be negative and must be type number")
        } else {
            this.putMoney(number)
            let digit = Math.random() * (999 - 100) + 100
            digit = Math.round(digit)
            let digitArray = String(digit).split("")
            console.log("Scoreboard",digitArray)
            if (digitArray[0] === digitArray[1] && digitArray[0] === digitArray[2] && digitArray[1] === digitArray[2]) {
                number = number * 3
                this.takeMoney(number)
                console.log("You win: X3")
                return number
            } else if (digitArray[0] === digitArray[1] || digitArray[0] === digitArray[2] || digitArray[1] === digitArray[2]) {
                number = number * 2
                this.takeMoney(number)
                console.log("You win: X2")
                return number
            } else {
                console.log("YOU LOST")


                return 0
            }
        }
    }
}

function Menu() { //Функція яка демонструє роботу класу SuperAdmin

    let test1 = true
    while (test1) {
        let user = prompt("Hello you are SuperAdmin 1-Start/0-User")
        if (user == "1") {
            let nameUser = prompt("Enter your name")
            let moneyUser = Number(prompt("Enter your money"))
            let Admin = new SuperAdmin(nameUser, moneyUser)
            console.log(Admin)
            let testA1 = true
            while (testA1) {
                casino = prompt("Do you want to create casino? 1-Yes/0-No")
                if (casino == "1") {
                    Admin.addCasino()
                    Admin.addGameMachine()
                    console.log(Admin)
                    let testA2 = true
                    while (testA2) {
                        let action = prompt("Do you want to interact with  casinos? 1-Yes/0-No")
                        if (action == "1") {
                            let testA3 = true
                            while (testA3) {
                                let whatAction = prompt("What action do you want?1-Take Money/2-Add money to GameMachine/3-Delete GameMathine/0-End")
                                if (whatAction === "1") {
                                    let takeMoney = Number(prompt("How much money take?"))
                                    Admin.takeMoneyCasino(takeMoney)
                                    console.log("Take money:", takeMoney)
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                }
                                if (whatAction === "2") {
                                    let addMoney = Number(prompt("How much money add"))
                                    Admin.addMoneyMachine(addMoney)
                                    console.log("Add money to GameMachine:", addMoney)
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                }
                                if (whatAction === "3") {
                                    Admin.deleteGameMachine()
                                    console.log("Delete GameMachine")
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                } else if (whatAction != "1" && whatAction != "2" && whatAction != "3") {
                                    let ask = prompt("What are you want? 1-prev/-1-End this block/0-End ")
                                    if (ask == "1") {
                                        testA3 = true
                                    } else if (ask == "-1") {
                                        testA2 = true
                                        testA3 = false
                                    } else {
                                        console.log("The end of SuperAdmin block")
                                        testA3 = false
                                        testA2 = false
                                        testA1 = false
                                        test1 = false
                                        return Admin.CasinoList

                                    }
                                }
                            }

                        } else {
                            let ask = prompt("What are you want? 1-prev/-1-End this block/0-End")
                            if (ask == "1") {
                                testA2 = true
                            } else if (ask == "-1") {
                                testA1 = true
                                testA2 = false
                            } else {
                                console.log("The end of SuperAdmin block")

                                testA2 = false
                                testA1 = false
                                test1 = false
                                return Admin.CasinoList
                            }
                        }
                    }
                } else {

                    let testA4 = true
                    while (testA4) {
                        let ask2 = prompt("Do you want to interact with  casinos?1-Yes/0-No")
                        if (ask2 == "1") {
                            let testA3 = true
                            while (testA3) {
                                let whatAction = prompt("What action do you want?1-Take Money/2-Add money to GameMachine/3-Delete GameMathine/0-End")
                                if (whatAction === "1") {
                                    let takeMoney = Number(prompt("How much money take?"))
                                    Admin.takeMoneyCasino(takeMoney)
                                    console.log("Take money:", takeMoney)
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                }
                                if (whatAction === "2") {
                                    let addMoney = Number(prompt("How much money add"))
                                    Admin.addMoneyMachine(addMoney)
                                    console.log("Add money to GameMachine:", addMoney)
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                }
                                if (whatAction === "3") {
                                    Admin.deleteGameMachine()
                                    console.log("Delete GameMachine")
                                    console.log(Admin.CasinoList[Admin.CasinoList.length - 1].AllGameMachine)
                                } else if (whatAction != "1" && whatAction != "2" && whatAction != "3") {
                                    let ask = prompt("What are you want? 1-prev/-1-End this block/0-End ")
                                    if (ask == "1") {
                                        testA3 = true
                                    } else if (ask == "-1") {
                                        testA2 = true
                                        testA3 = false
                                    } else {
                                        console.log("The end of SuperAdmin block")

                                        testA4 = false
                                        testA3 = false
                                        testA2 = false
                                        testA1 = false
                                        test1 = false
                                        return Admin.CasinoList

                                    }
                                }
                            }
                        } else {
                            let ask = prompt("What are you want? 1-prev/-1-End from this block/0-End")
                            if (ask == "1") {
                                testA4 = true

                            }
                            if (ask == "-1") {
                                testA4 = false
                                testA1 = false
                            } else {
                                console.log("The end of SuperAdmin block")

                                testA4 = false
                                test1 = false
                                testA1 = false
                                return Admin.CasinoList

                            }
                        }
                    }
                }
            }
        } else {
            console.log("The end of SuperAdmin block")

            test1 = false
        }
    }
}
let CasinoList = Menu()
alert("Hello User") //Демонстрація роботи класу User
let nameUser = prompt("Enter your name")
let moneyUser = Number(prompt("Enter your money"))
let simpleUser = new User(nameUser, moneyUser)
console.log(simpleUser)

let test1 = true
while (test1) {
    console.log(simpleUser)
    let play = prompt("Do you want to play?1-Yes/0-No")
    if (play == "1") {

        simpleUser.play(CasinoList)
    } else {
        let ask = prompt("What are you want? 1-prev/0-End")
        if (ask == "1") {
            test1 = true
        } else {
            console.log("The end of User block")
            test1 = false

        }
    }
}
console.log("Status of casinos", CasinoList)
console.log("The end")

//P.S запускаю код в Google Chrome, дані вводяться за допомогою функції prompt(), виводяться в console.
//При першому запуску дані в консолі можуть відобразитися після закінчення програми, тому бажано перезагрузити сторінку,
//після першого виконнання програми,але перед тим включити консоль. Дякую за увагу))  