const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Function to be called when error is to be shown in any small Tag
function showErr(Inpt, Msg){
    const formwhole = Inpt.parentElement;
    formwhole.className = 'form-whole error';
    const smallTag = formwhole.querySelector('small');
    smallTag.innerText = Msg;
}

//Function to run on successful done of any event
function showSucc(Inpt){
    const formwhole = Inpt.parentElement;
    formwhole.className = 'form-whole success'
}

//Function to get name of element with first letter Capital 
function getElName(Input){
    return title = Input.id.charAt(0).toUpperCase() + Input.id.slice(1);
}

//Function that check whether every passed object's value is provided if not it will show an error
function SubmitFunc(Input){
    Input.forEach(function(Input){
        if(Input.value === ''){
            showErr(Input, `${getElName(Input)} is Required`);
        }
        else{
            showSucc(Input);
        }
    });
}

//Function to check whether the passed value is in valid email format abcd@fzl.com
function validateEmail(m) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailRegex.test(m.value)){
        showSucc(m);
    }
    else{
        showErr(m, 'Email is not valid..!!');
    }
  }

//Fuction to check Lengths to implement checking on max and min size of fields..
function checkLength(inputVal, min, max){
    if(inputVal.value.length < min){
        showErr(inputVal, `${getElName(inputVal)} must be at least ${min} characters..!!!`);
    }
    else if(inputVal.value.length > max){
        showErr(inputVal, `${getElName(inputVal)} must be less than ${max} characters..!!!`);

    }
    else{
        showSucc(inputVal);
    }
}

//Function To Check Password Match....
function PassMatch(Input1, Input2){
    if(Input1.value !== Input2.value){
        showErr(Input2, 'Passwords Do Not Match...!!');
    }
}

//Fuction to Check if Email value is Passed or not, If not then it shows "Email is Required" otherwise shoe "Email is not valid"
function EmailCheck(input){
    if(input.value !== ''){
        validateEmail(email);
    }
    else{
        SubmitFunc([email]);
    }
}

form.addEventListener('submit', function(obj) {
    obj.preventDefault();
  
    SubmitFunc([userName, password, password2]);
    checkLength(userName,5,20);
    checkLength(password,6,15);
    EmailCheck(email);
    PassMatch(password, password2);
})


