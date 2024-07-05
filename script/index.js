const user_name_signup = document.querySelector('#user-name')
const password_signup = document.querySelector('#password')
const user_name_signin = document.querySelector('#sign-in-username')
const password_signin = document.querySelector('#sign-in-pwd')
const sign_up_btn = document.querySelector('.confirm-btn-sign-up')
const sign_in_section = document.querySelector('#sign-in-section')
const sign_up_section = document.querySelector('#sign-up-section')
let user_name_info = ''
let user_pwd_info = ''


// Function to confirm whether the user already signed up else recieve and save the user information
function toSignUp() {
    user_name_info = user_name_signup.value
    user_pwd_info = password_signup.value
    const local_username = localStorage.getItem('username')
    const local_pwd = localStorage.getItem('password') 
    if (local_pwd == null && local_username == null) {
        if (user_name_info == '' || user_pwd_info == '') {
            user_name_signup.style.border = '0.5px solid red'
            password_signup.style.border = '0.5px solid red'
            alert('Please input all of your information')
        } else {
            localStorage.setItem('username', user_name_info)
            localStorage.setItem('password', user_pwd_info)
            sign_in_section.classList.add('sign-in-wraper')
            console.log('user-name', user_name_info)
            console.log('pwd',user_pwd_info)
        }
    } else {
        alert('You have already Signed Up. Please go to Sign In')
    }
}

// Fuction move to signIn section when signIn is clicked
function signInSection() {
    sign_in_section.classList.add('sign-in-wraper')
}
if (localStorage.getItem('username') && localStorage.getItem('password')) {
    signInSection()
}
console.log((localStorage.getItem('username') && localStorage.getItem('password')))
function signUpSection() {
    sign_in_section.classList.remove('sign-in-wraper')
    sign_in_section.classList.add('sign-up-wraper')
}

// Function to confirm username and password from user
function toSignIn() {
    const local_username = localStorage.getItem('username')
    const local_pwd = localStorage.getItem('password') 
    if (user_name_signin.value != local_username || password_signin.value != local_pwd) {
        alert('Wrong User Information !')
    } else if(user_name_signin.value == local_username || password_signin.value == local_pwd) {
        alert('Welcome ot Diary Application')
        location.replace('diary-list.html')
    }
}