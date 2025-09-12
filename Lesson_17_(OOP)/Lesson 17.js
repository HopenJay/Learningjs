class Car {
    #brand;
    #model;
    #speed = 0;
    isTrunkOpen; 
    constructor (brand) {
        this.#brand = brand.brand;
        this.#model = brand.model;
        this.displayInfo();
        this.go();
        this.go();
        this.go();
        this.go();
        this.go();
        this.brake();
        this.closeTrunk();
        this.displayInfo();
    };
    displayInfo() {
        console.log(this.#brand, this.#model, `Speed : ${this.#speed} km/h`, this.isTrunkOpen);
    }
    go() {
        if(this.#speed >= 0 && this.#speed <= 200) {
            this.#speed += 5;
        }
    };
    brake() {
        if(!(this.#speed >= 0 && this.#speed <= 200)) {
            this.#speed -= 5;
        }
    };
    closeTrunk() {
        if(this.#speed > 0) {
            this.isTrunkOpen = false;
        };
        return;
    };
    openTrunk() {
        if(this.#speed === 0) {
            this.isTrunkOpen = true;
        };
        return;
    };
}

const car1 = new Car({
    brand: 'Toyota',
    model: 'corolla',
})

const car2 = new Car({
    brand: 'Tesla',
    model: 'model 3'
});

class RaceCar extends Car {
    acceleration;
    speed;
    constructor (brand) {
        super(brand);
        this.acceleration = brand.acceleration;
        this.speed = this.acceleration;
    }
    go() {
        if(this.speed >= 0 && this.speed <= 300) {
            this.speed += this.acceleration;
        }
        if (this.speed > 300) {
            this.speed = 300;
        }
    };
    closeTrunk() {
        return console.log('Race cars do not have a trunk.');
    };
    openTrunk() {
        return console.log('Race cars do not have a trunk.');
    };
}

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

console.log(car1, car2, raceCar);
// TODO: 30/08/2025: check all my answer against supersimpledev own. And find out if js have added property property for child classes.
//NOTE TO SELF: next time use the general name for the product with the word Details. For example carDetails make a lot mire sens than brand.
//Unless a class will always need a specific method, it's not really a great idea to br calling your methods in the constructor function. It's more safer to call it individually unless it's a gerally needed method.