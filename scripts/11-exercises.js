// const nums = [10,20,30];

// console.log(nums[2] = 99);

const brat = [1,2,3]
function getLastValue(array) {
    // let lastIndex = array.length-1
    // return lastIndex[0];
    for(let i = 0; i <= array.length-1; i++) {
        return array[array.length-1];
        // console.log(array[array.length-1] );
        // const lastIndex = array.length-1;
        // const cat = []
        // console.log(cat[lastIndex])
        // const lastIndex = array[i];
        // console.log(lastIndex);
        // console.log(array.length-1)
        
        // const trial = array.length-1;
    }
}

console.log(getLastValue([1, 5, 9]));
console.log(getLastValue(brat));
console.log(getLastValue([1, 20, 22,, 24, 5]));
console.log(getLastValue(['hi', 'hello', 'good']));

function arraySwap(array) {
    for(let i = 0; i < array.length; i++)  {
        const firstIndex = array[array.length-1];
        const lastIndex = array[0];

        if(array) {
            array[0] = firstIndex;
            array[array.length-1] = lastIndex;
            console.log(array);
            return;
        }
        

    }
}
console.log(arraySwap([1, 20, 22, 24, 5]));
console.log(arraySwap(['hi', 'hello', 'good']));

// for(let i = 0; i < 10;) {
//     console.log(i += 2);
// }

let i = 0;

while(i < 10) {
    console.log(i += 2);
}

console.log('goat');

for(let i = 5; i >= 0; i--) {
    console.log(i);
}
console.log('fool');

//   for(let i = 1; i <= 5; i++) {
//             console.log(i);
//         }

let a = 5;

while(a >= 0) {
    console.log(a--);
}

const dat = [1, 2, 3];
const increase = [];
let b = 0;

while(b < dat.length) {
    const nums = dat[b];
    increase.push(nums + 1);
    b++;
}

console.log(increase);

function addOne(array) {
    const nums = array;
    const increase = [];
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i];
        increase.push(num + 1);
    }
    console.log(increase)
}

console.log(addOne([1,2,3]));
console.log(addOne([-2,-1,0,99]));

function addNum(array, num) {
    const numbs = array;
    const add = num;
    const sum = [];

    for(let i = 0; i < numbs.length; i++) {
        const numb = numbs[i];
        sum.push(numb + add);
    }
    console.log(sum);
}

console.log(addNum([1,2,3], 2));
console.log(addNum([1,2,3], 3));
console.log(addNum([-2, -1, 0, 99], 2));

function addArrays(array1, array2) {
    const first = array1;
    const second = array2;

    const both = []

    for(let i = 0; i < first.length && i < second.length; i++) {
        const fir = first[i];
        const sec = second[i];
        both.push(fir + sec);
    }
    console.log(both);
}
console.log(addArrays([1,1,2], [1,1,3]));
console.log(addArrays([1,2,3], [4,5,6]));

// function countPositive(nums) {
//     let count = 0;
//     for(let num in nums) {
//         if(num > 0) {
//             count += 1
//         }
  
//     }
//     return count;
// }

// console.log(countPositive([1,-3,5]));
function countPositive(nums) {
    const pos = nums;
    let count = 0;
    for(let i = 0; i < pos.length; i++) {
        if(pos[i] > 0) {
            count++
        }
    }
    return count++
}

console.log(countPositive([1,-3,5]));
console.log(countPositive([-2,3,-5,7,10]));

console.log('NEXT');

function minMax(nums) {
    const miMa = nums;
    const ret = {
        min: 0,
        max: 0
    };
    
    ret.min = miMa[0];
    ret.max = miMa[0];
    for(let i = 0; i < miMa.length; i++) {
        if(miMa[i] < ret.min) {
            ret.min = miMa[i];
        }

        if(miMa[i] > ret.max) {
            ret.max = miMa[i];
        }

    }
    
    if(ret.min == undefined && ret.max == undefined) {
        ret.min = null;
        ret.max = null;
    }
    console.log(`{min: ${ret.min}, max: ${ret.max}}`);
//     return smallest && largest;
}
console.log(minMax([1, -3, 5]));
console.log(minMax([-2,3,-5,7,10]));
console.log(minMax([])); 
console.log(minMax([3]));

function countWords(words) {
    let result = {};
    const str = words;
    for(let i = 0; i < str.length; i++) {
        // let item = str[i];

        if(result[str[i]]) {
            result[str[i]] += 1;
        } else {
            result[str[i]] = 1;
        }
    }
    return result;

}
console.log(countWords(['apple', 'grape', 'apple', 'apple']));


let stringss = ['hello', 'world', 'search', 'good'];

// Set the index to -1 at the start (so we'll assume
// the string 'search' doesn't exist in the array).
// If we find the string 'search' in the array, we
// will update the index.
let index = -1;
for(let i = 0; i < stringss.length; i++) {
    if(stringss[i] === 'search') {
        index = i;
    } 
}

console.log(index);

stringss = ['not','found'];
index = -1;
for (let i = 0; i < stringss.length; i++) {
    if(stringss[i] === 'search') {
        index = i;
    }
}
console.log(index);

// Modifications
stringss = ['hello', 'world', 'search', 'good', 'search'];

// Set the index to -1 at the start (so we'll assume
// the string 'search' doesn't exist in the array).
// If we find the string 'search' in the array, we
// will update the index.
index = -1;
for(let i = 0; i < stringss.length; i++) {
    if(stringss[i] === 'search') {
        index = i;
        break;
    } 
}
console.log('split');

function findIndex(array, word) {
    const strings = array;
    for(let i = 0; i < strings.length; i++) {
        const string = strings[i];
         if(string === word) {
                return i;
            }
    }
    return -1;
}

function unique(array) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        const word = array[i]
        //using the findIndex()function from above, we 
        //can check if the string is already in the
        //result array. If it's not in the result array
        // (index is -1), then add it to the result array.
        if (findIndex(result, word) === -1) {
            result.push(word);
        }
    }
    return result;
}

console.log(unique(['green', 'red', 'blue', 'red']));
console.log(unique(['red', 'green', 'green', 'red']));
console.log(findIndex(['green', 'red', 'blue', 'red'], 'red'));
console.log(findIndex(['green', 'red', 'blue', 'red'], 'yellow'));

// function unique(array) {
//     const one = array;
//     for(let i = 0; i < one.length; i++) {

//     }
// }

console.log('split');

const biscuit = ['egg', 'apple', 'egg', 'egg', 'ham'];
function removeEgg(foods) {
    // To prevent modifying the original array, we
    // can create a copy of the array using .slice()
    const foodsCopy = foods.slice();
    const reversedFoods = foodsCopy.reverse();

    // Advanced technique:
    // Since foods.slice() results in an array, we
    // can also use .reverse() directly like this:
    // foods.slice().reverse();
        
    // This technique is called "method chaining"
    // because we use one method after another
    // (like a chain of methods).
    const result = [];
    let eggsRemoved = 0;
    for(let i = 0; i < reversedFoods.length; i++) {
        if(reversedFoods[i] === 'egg' && eggsRemoved < 2) {
            eggsRemoved++;
            continue;
        }

        result.push(reversedFoods[i]);
        // console.log('goat')
        // if(Foods[i] === 'egg') {
        //     console.log(Foods[length]);
        // }

        // if (food === 'egg') {
        //     console.log(food);
        //     Foods.splice(i, 2);
        //     console.log(trial)
        //     continue;
        // }
        // trial.push(food);
        // console.log(Foods.reverse());
        //The updated version of the exercise
        // if(food == word) {
            // count += 1
            // Foods.reverse()
        //     if(count > 2) {
        //         trial.push(food); 
        //     }
        // } else {
        //     trial.push(food);
        // }
    }
    return result.reverse();
    // console.log(trial);

}

const foods = ['egg', 'apple', 'egg', 'egg', 'ham'];
console.log(removeEgg(foods));
console.log('foods');
// console.log(removeEgg(biscuit));
// console.log(biscuit);
// console.log('split');

for(num = 1; num < 21; num++) {
    // const num = [];
    // num.push(i);
    // if(i % 3 === 0) {
    //     // i.repl = 'Fizz'
    //     console.log(i.replace(i, 'Fizz'))
    // }

    // if(i % 5 === 0) {
    //     console.log('Buzz')
    // }

    // if(i % 5 === 0 && i % 3 === 0) {
    //     console.log('FizzBuzz')
    // }
    // if (num[i] % 3 === 0) {
    //     console.log(num[i] = 'Fizz');
    // }
    if(num % 5 === 0 && num % 3 === 0) {
        console.log('FizzBuzz');
    } else if (num % 5 === 0) {
        console.log('Buzz');
    } else if (num % 3 === 0) {
        console.log('Fizz');
    } else {
        console.log(num);
    }
    // console.log(num);
}