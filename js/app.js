//Form
const form = document.querySelector('.form');
const formComplete = document.querySelector('.form-complete');
const inputName = document.querySelector('.form__name');
const inputNumber = document.querySelector('.form__number');
const inputMonth = document.querySelector('.form__month');
const inputYear = document.querySelector('.form__year');
const inputCVC = document.querySelector('.info__cvc__input');
const btnSubmit = document.querySelector('#btn-submit');

//Card
const cardNumber = document.querySelector('#card_number');
const cardName = document.querySelector('#card_name');
const cardMonth =document.querySelector('#card_month');
const cardYear = document.querySelector('#card_year');
const cardCVC = document.querySelector('.card__cvc');

//Error Messages
const nameError = document.querySelector('.error--name');
const numberError = document.querySelector('.error--number');
const expDateError = document.querySelector('.error--exp-date');
const cvcError = document.querySelector('.error--cvc');


//Inputs Control
inputName.addEventListener('input', () => {
    if(inputName.value.length>0){
        cardName.textContent = inputName.value;
    }else{
        cardName.textContent = 'Jane Appleseed';
    }
});
inputName.addEventListener('blur', () =>{
    checkName();
});

inputNumber.addEventListener('input', () => {
    if(inputNumber.value.length>0){
        let formatedNumber = formateNumber(inputNumber.value);
        inputNumber.value = formatedNumber;//Le da el formato nuevo al valor ingresado
        cardNumber.textContent = formatedNumber;//Pone el valor ingresado en la tarjeta
    }else{
        cardNumber.textContent = '0000 0000 0000 0000';
    }
});
inputNumber.addEventListener('blur', () =>{
    checkNumber();
});

inputMonth.addEventListener('input', () => {
    let valor = inputMonth.value.replace(/-/g, ''); // Eliminar todos los signos "-"
    valor = valor.slice(0, 2);    
    if(valor>12){
        valor = '12';
    }
    inputMonth.value = valor;
    cardMonth.textContent = valor.padStart(2, '0');//Rellena con 0 a la izquierda hasta tener 2 digitos
});
inputMonth.addEventListener('blur',()=>{
    checkDate(inputMonth);
});

inputYear.addEventListener('input', () => {
    let valor = inputYear.value.replace(/-/g, '');// Eliminar todos los signos "-"
    valor = valor.slice(0, 2);
    inputYear.value = valor;
    cardYear.textContent = valor.padStart(2, '0');//Rellena con 0 a la izquierda hasta tener 2 digitos
});
inputYear.addEventListener('blur',()=>{
    checkDate(inputYear);
});

inputCVC.addEventListener('input', () => {
    
    let valor = inputCVC.value.replace(/-/g, '');// Eliminar todos los signos "-"
    valor = valor.slice(0, 3);
    inputCVC.value = valor;        
    cardCVC.textContent = valor.padStart(3, '0');//Rellena con 0 a la izquierda hasta tener 3 digitos
    
});
inputCVC.addEventListener('blur',() =>{
    checkCvc();
})

btnSubmit.addEventListener('click',(e) =>{
    e.preventDefault();
    if(checkAllInputs()){
        hiddeElement(form);
        showElement(formComplete);
    }
});


//Check Inputs
function checkAllInputs(){
    let inputErrors = 0;
    let ok = true;
    if(!checkNumber()){
        inputErrors++;
    }
    if(!checkName()){
        inputErrors++;
    }
    if(!checkDate(inputMonth)){
        inputErrors++;
    }
    if(!checkDate(inputYear)){
        inputErrors++;
    }
    if(!checkCvc()){
        inputErrors++;
    }
    if(inputErrors>0){
        ok = false;
    }
    return ok;
}

function checkName(){
    let ok = true;
    if(inputName.value.length<1){
        showError(nameError,inputName,"Can't be blank");
        ok = false;
    }else{
        hideError(nameError,inputName);
    }
    return ok;
}
function checkNumber(){
    let ok = true;
    if(inputNumber.value.length<1){
        showError(numberError,inputNumber,"Can't be blank");
        ok = false;
    }else if(inputNumber.value.length<19){
        showError(numberError,inputNumber,"Please enter the full number");
        ok = false;
    }else if(containsLetters(inputNumber.value)){
        showError(numberError,inputNumber,"Wrong format, numbers only");
        ok = false;
    }else{
        hideError(numberError,inputNumber);
    }
    return ok;
}

function checkDate(date){
    let ok = true;
    if(date.value.length<1){
        showError(expDateError,date,"Can't be blank");
        ok = false;
    }else if(inputMonth.value<1){
        showError(expDateError,date,"Can't be 0");
        ok = false;
    }else{
        hideError(expDateError,date);
    }
    return ok;
}

function checkCvc(){
    let ok = true;
    if(inputCVC.value.length<1){
        showError(cvcError,inputCVC,"Can't be blank");
        ok = false;
    }else if(inputCVC.value.length<3){
        showError(cvcError,inputCVC,'Please enter the full number');
        ok = false;
    }else{
        hideError(cvcError,inputCVC);
    }
    return ok;
}

//Warning Message Visibility
function showError(ePos,eInput,message){
    ePos.classList.remove('hidden');
    ePos.classList.add('visible');
    ePos.textContent = message;
    eInput.classList.add('input-error');
}

function hideError(ePos,eInput){
    ePos.classList.remove('visible');
    ePos.classList.add('hidden');
    eInput.classList.remove('input-error');
}

//Utilities 
function containsLetters(string){
    return /[a-zA-Z]/.test(string);
}

function formateNumber(n){
    let input = n.replace(/\s+/g, '');//Elimina los espacios en blancos
    let number = '';
    let cont = 0;//Contador de digitos
    for(let i = 0; i<input.length;i++){//Recorre la el valor ingresado
        if(cont==4){//Cada 4 digitos agrega un espacio
            cont = 0;//Recinicia el contador
            number = number + ' ';
        }
        number = number + input[i]//Va agregando los digitos
        cont++;//Aumenta el contador
    }
    return number;
}

function hiddeElement(element){
    element.classList.add('hidden');
}
function showElement(element){
    element.classList.remove('hidden'); 
}