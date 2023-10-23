
pragma solidity >0.8.2;



abstract contract Animal{
    string name;

    constructor(string memory _name){
        name = _name;
    }

    function getName() public view returns (string memory){
        return Animal.name;
    }

    function eat(string calldata _food) virtual view public returns(string memory){
        return "Animals eats";
    }

    function sleep() view public returns(string memory){
        return "Z-z-z-z-z-z-z";
    }

    function speak() virtual view public returns (string memory){
        return "Animal speaks";
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}
abstract contract Herbivore is Animal{

    string canEat = "plant";
    function eat(string calldata _food) override virtual view public returns(string memory){
        if (compare(_food, canEat)){
            return "Nom-nom";
        } else return  "Foooo!";
        

    }

}
//модіфікатори тута
abstract contract Omnivorous is Animal {
    string canEat1 = "plant";
    string canEat2 = "meat";
    string chocolate = "chocolate";



    function eat(string calldata _food) override virtual view public returns(string memory){
        if (compare(_food, canEat1)){
            return "Nom-nom";
        } else if (compare(_food, canEat2)){
            return "Nom-nom";
        } else if (compare(_food, chocolate)){
            return "It is bad for me";
        } else return  "Foooo!";
        

}
}

abstract contract Predator is Animal {
     string canEat = "meat";

    function eat(string calldata _food) override virtual view public returns(string memory){
        if (compare(_food, canEat)){
            return "Nom-nom";
        } else return  "Foooo!";
        

    }
}

contract Tiger is Predator {
    constructor(string memory _name) Animal(_name){
  }



  function speak() public view override virtual returns (string memory){
return "RRRRRRR-MEOW";
  }

}

contract Wolf is Predator {
    constructor(string memory _name) Animal(_name){
  }



  function speak() public view override virtual returns (string memory){
return "Woooof-Woooof";
  }

}


contract Dog is Omnivorous {
    constructor(string memory _name) Animal(_name){
  }
  function speak() public view override virtual returns (string memory){
return "Gaff-Gaff";
  }




}

contract Cow is Herbivore {
    constructor(string memory _name) Animal(_name){
  }
  function speak() public view override virtual returns (string memory){
return "Mooooooo!";
  }
}


contract Horse is Herbivore {
    constructor(string memory _name) Animal(_name){
  }
  function speak() public view override virtual returns (string memory){
return "Igogo!";
  }
}

contract Farmer {

    address[] public animals;

    function addAnimal(address animalAddress) public  {
        animals.push(animalAddress);
 }
    function getAnimal(uint256 index) view public returns(Animal)
    {return Animal(animals[index]);
    }

    function feedByIndex(uint256 index, string calldata food) view public returns (string memory){
return getAnimal(index).eat(food);
    }
    function callByIndex(uint256 index) view public returns (string memory){
return getAnimal(index).speak();
    }

        function feedByAddress(address animal, string calldata food) view public returns (string memory){
return Animal(animal).eat(food);
    }
    function callByAddress(address animal) view public returns (string memory){
return Animal(animal).speak();
    }




}

