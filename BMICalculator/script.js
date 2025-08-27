const form = document.querySelector('form')
form.addEventListener('submit', function(e){
    e.preventDefault();
    const height = parseInt(document.querySelector('#height').value);
    const weight = parseInt(document.querySelector('#weight').value);
    const results = document.querySelector('#results');    
    const div = document.querySelector('#weight-guide');

    if(height <= 0 || isNaN(height)){
        results.textContent = "Please enter a valid height";
    }else if (weight<=0 || isNaN(weight)){
        results.textContent = 'Please enter a valid weight';
    }else {
        const bmi = (weight * 10000)/ (height*height);
        const BMI = parseFloat(bmi.toFixed(2));
        results.textContent = `Your BMI: ${BMI}`;

        const h2Elm = document.createElement('h2');

        if (BMI < 18.6){ 
            h2Elm.textContent = 'You are Under weight';
        }else if (BMI > 18.6 && BMI <= 24.9){
            h2Elm.textContent = 'You are in Normal range';
        }else if(BMI > 24.9){
            h2Elm.textContent = 'You are Over weight, need control!';
        }

        div.innerHTML = '';   // clear old message
        div.append(h2Elm);    // append new message
    }
});
