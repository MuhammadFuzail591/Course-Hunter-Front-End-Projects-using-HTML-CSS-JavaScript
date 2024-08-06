const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showErr(Inpt, Msg){
    const formwhole = Inpt.parentElement;
    formwhole.className = 'form-whole error';
    const smallTag = formwhole.querySelector('small');
    smallTag.innerText = Msg;
}

function showSucc(Inpt){
    const formwhole = Inpt.parentElement;
    formwhole.className = 'form-whole success'
}

form.addEventListener('submit', function(obj) {
    obj.preventDefault();

    if(userName.value === ''){
        showErr(userName, 'User Name is Required..!!')
    }
    else{
        showSucc(userName)
    }

    if(email.value === ''){
        showErr(email,'Email is Required');
    }
    else{
        showSucc(email)
    }

    if(password.value===''){
        showErr(password,'Password is not specified');
    }
    else{
        showSucc(password)
    }

    if(password2.value === ''){
        showErr(password2,'Confirm Password is Required');
    }
    

})
