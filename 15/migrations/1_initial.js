var Farmer = artifacts.require('Farmer');
var Dog = artifacts.require('Dog');
var Cow = artifacts.require('Cow');
var Horse = artifacts.require('Horse');
var Wolf = artifacts.require('Wolf');

let farmer = null;
let dog = null;
let cow = null;
let wolf = null;
let horse = null;



async function addAnimal(address) {
    let result = await farmer.addAnimal(address);
    //console.log(result);

}

async function feedAnimal(address, food) {
    let result = await farmer.feedByAddress(address, food);
    console.log(result);

}

async function callAnimal(address) {
    let result = await farmer.callByAddress(address);
    console.log('Animal says ' + result);

}

module.exports = async (deployer) => {


    try {
        //deploying Farmer
        try {
            farmer = await Farmer.deployed();
        } catch (e) {
            await deployer.deploy(Farmer);
        }
        if (!farmer) {
            farmer = await Farmer.deployed();
        }
        console.log('Farmer address');
        console.log(farmer.address)

        //deploying Dog
        try {
            dog = await Dog.deployed();
        } catch (e) {
            await deployer.deploy(Dog, 'Patron');
        }
        if (!dog) {
            dog = await Dog.deployed();
        }


        //deploying Cow
        try {
            cow = await Cow.deployed();
        } catch (e) {
            await deployer.deploy(Cow, 'Burenka');
        }
        if (!cow) {
            cow = await Cow.deployed();
        }

        //deploying Horse
        try {
            horse = await Horse.deployed();
        } catch (e) {
            await deployer.deploy(Horse, 'Butsefal');
        }
        if (!horse) {
            horse = await Horse.deployed();
        }


        //deploying Wolf
        try {
            wolf = await Wolf.deployed();
        } catch (e) {
            await deployer.deploy(Wolf, 'Predator');
        }
        if (!wolf) {
            wolf = await Wolf.deployed();
        }


        await callAnimal(cow.address);
        await callAnimal(horse.address)

        // await addAnimal(dog.address);
        // console.log('Dog address - ' + dog.address)

        await feedAnimal(wolf.address, 'meat')


        await callAnimal(dog.address)


    } catch (e) {
        console.error(e);
    }




}


