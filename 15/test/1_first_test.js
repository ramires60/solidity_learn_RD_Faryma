var Farmer = artifacts.require('Farmer');
var Dog = artifacts.require('Dog');
var Horse = artifacts.require('Horse');


let farmer = null;
let dog = null;
let horse = null;


const DOG_NAME = 'Patron'
const COW_NAME = 'Burenka'
const ANIMAL_SLEEP = 'Z-z-z-z-z-z-z'


const PLANT = "plant";
const MEAT = "meat";
const CHOCOLATE = "chocolate";


contract('Testing Farmer', async (accounts) => {
    it('Farmer has been deployed to BC', async () => {
        farmer = false;
        let deployStatus = false;
        try {
            farmer = await Farmer.deployed()
            if (farmer.address) {
                deployStatus = true
            }
        } catch (e) {

        }
        assert.equal(deployStatus, true, 'Farmer is not deployed')
    })

})

contract("Dog + Farmer", async (accounts) => {
    dog = false;
    farmer =false;
    it("Dog and Farmer are deployed to blockchain", async () => {
        let isDeployed = false;

        try {
            dog = await Dog.deployed();
            farmer = await Farmer.deployed();
            if (dog.address&&farmer.address) {
                isDeployed = true

            }
        } catch (e) {

        }
        assert.equal(isDeployed, true, "Dog and Farmer is not deployed");
    });

    it("Dog can sleep", async () => {
        let result = await dog.sleep();
        assert.equal(result, ANIMAL_SLEEP, "Dog does not sleep as expected");
    });

  
    it("Dog can eat plant", async () => {

        let canEatPlant = false;
        try {
            canEatPlant = await dog.eat(PLANT);
        } catch (e) {

        }

        assert.equal(canEatPlant, 'Nom-nom', "Dog can eat plant");
    });


    it("Dog can eat meat", async () => {
        let canEatMeat = false;
        try {
            canEatMeat = await dog.eat(MEAT);
        } catch (e) {
        }
        assert.equal(canEatMeat, 'Nom-nom', "Dog can eat meat");
    })


    it("Dog cannot eat chocolate", async () => {
         
        let canEatChocolate = false;

        try {
            canEatChocolate = await dog.eat(CHOCOLATE);
        } catch (e) {
        }
        assert.equal(canEatChocolate, 'It is bad for me', "Dog cannot eat chocolate");
    })

    it("Dog cannot eat non-food", async () => {
         
        let result = false;

        try {
            result = await dog.eat('not-food');
        } catch (e) {
        }
        assert.equal(result, 'Foooo!', "Dog cannot eat chocolate");
    })

    it("Dog cannot eat plastic", async () => {
         
        let result = false;

        try {
            result = await dog.eat('plastic');
        } catch (e) {
        }
        assert.equal(result, 'Foooo!', "Dog cannot eat chocolate");
    })

    it("Farmer can call Dog, Dog says Gaff-Gaff", async () => {
         
        let result = false;

        try {
            result = await farmer.callByAddress(dog.address);
        } catch (e) {
        }
        assert.equal(result, 'Gaff-Gaff', "Dog cant be called");
    })

    it("Farmer can feed Dog with meat, plant", async () => {
        let checklist = ['meat', 'plant']
        let result;

        for (let i = 0; i<checklist.length; i++) {
        try {
        result=false;
        result = await farmer.feedByAddress(dog.address, checklist[i]);
            } catch (e) {
        }
    assert.equal(result, 'Nom-nom', "Dog cant eat this");
    
    }
    })

    it("Farmer cannot feed Dog with not-food, plastic and anything else.", async () => {
        let checklist = ['not-food', 'plastic', 'anything else']
        let result;

        for (let i = 0; i<checklist.length; i++) {
        try {
        result=false;
        result = await farmer.feedByAddress(dog.address, checklist[i]);
            } catch (e) {
        }
    assert.equal(result, 'Foooo!', "Dog can eat this");
    
    }
    })

});


//testing contract Horse

contract("Horse + Farmer", async (accounts) => {
    cow = false;
    farmer =false;
    it("Horse and Farmer are deployed to blockchain", async () => {
        let isDeployed = false;

        try {
            horse = await Horse.deployed();
            farmer = await Farmer.deployed();
            if (horse.address&&farmer.address) {
                isDeployed = true

            }
        } catch (e) {

        }
        assert.equal(isDeployed, true, "Horse and Farmer is not deployed");
    });

    it("Horse can sleep", async () => {
        let result = await horse.sleep();
        assert.equal(result, ANIMAL_SLEEP, "Horse does not sleep as expected");
    });

  
    it("Horse can eat plant", async () => {

        let canEatPlant = false;
        try {
            canEatPlant = await horse.eat(PLANT);
        } catch (e) {

        }

        assert.equal(canEatPlant, 'Nom-nom', "Horse can eat plant");
    });


    it("Horse cannot eat non-food", async () => {
         
        let result;
        let checklist = ['not-food', 'plastic', 'meat']
        for (let i = 0; i < checklist.length; i++) {
            try {
                result = await horse.eat(checklist[i]);
            } catch (e) {
            }
            assert.equal(result, 'Foooo!', "Horse cannot eat this");
                    
        }
    })

    
    it("Farmer can call Horse, Horse says Igogo!", async () => {
         
        let result = false;

        try {
            result = await farmer.callByAddress(horse.address);
        } catch (e) {
        }
        assert.equal(result, 'Igogo!', "Horse cant be called");
    })

    it("Farmer can feed Horse with plant", async () => {
        let result=false;

        try {
        result = await farmer.feedByAddress(horse.address, PLANT);
            } catch (e) {
        }
    assert.equal(result, 'Nom-nom', "Horse cant eat this");
    
    
    })

    it("Farmer cannot feed Horse with meat, plastic and fingers.", async () => {
        let checklist = ['meat', 'plastic', 'fingers']
        let result;

        for (let i = 0; i<checklist.length; i++) {
        try {
        result=false;
        result = await farmer.feedByAddress(horse.address, checklist[i]);
            } catch (e) {
        }
    assert.equal(result, 'Foooo!', "Horse can eat this");
    
    }
    })

});
