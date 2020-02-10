/**
 * @description (This algorithm takes the upper limit number and calculate the median of all the prime numbers from 0 to upperlimit)
 * @param {int} upperLimit 
 * @returns {array} (array of medians)
 */
const getMedianPrimeNumbers = (upperLimit) =>{
    // 0 and 1 are not prime numbers
    var primeNumbers = [false,false]

    // Total number of prime numbers in the range
    var count = 0

        for(var i=2; i<upperLimit; i++){
            if(primeNumbers[i] == undefined){

                // Assume that every number is a prime number if it is not false
                primeNumbers[i] = true

                /* Grab the prime number and shift it to the count index 
                location to make an array of prime numbers within the same array
                (avoiding bad space complexity)*/
                primeNumbers[count] = i
                count++
            }

            // Make all the multiples of this prime number false (means they are not prime numbers)
            if(primeNumbers[i] && i*i <= upperLimit){
                primeNumbers[i] = false
                for(var j= i*i; j<= upperLimit; j = j+i ){
                    primeNumbers[j] = false
                }
            }    
        }

        // If the count is even then return two medians else return one median
        if(count % 2 == 0){
            const md1 = primeNumbers[(count / 2) - 1]
            const md2 = primeNumbers[(count / 2)]
            return [md1,md2]
        }
        else{
            const median = primeNumbers[((count+1) / 2) - 1]
            return [median]
        }
}

module.exports = getMedianPrimeNumbers