

const getMedianPrimeNumbers = (upperLimit) =>{

    var primeNumbers = [false,false]
    var count = 0

    for(var i=2; i<=upperLimit; i++){

        // Assume that every number is a prime number if it is not false
        if(primeNumbers[i] == undefined){
            primeNumbers[i] = true
            primeNumbers[count] = i
            count++
        }
        
        if(primeNumbers[i] && i*i <= upperLimit){
            primeNumbers[i] = false
            for(var j= i*i; j<= upperLimit; j = j+i ){
                primeNumbers[j] = false
            }
            
        }    
        
    }

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