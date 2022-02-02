const loginUser = async(e)=>{
    e.preventDefault();
    //try to fetch the data with the info user provided and
    //see if it was correct and then we log him in
    let email = document.querySelector("#exampleInputEmail1").value;
    let password = document.querySelector("#exampleInputPassword1").value
    console.log(email)
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        if(response.status == 400){
          alert("No user with that email!!")
        }else{
          alert("Incorrect Password. Try again")
        }
    }

    console.log('tryin to login the user')
}
const signupUser = async(e)=>{
  e.preventDefault()
  console.log("in signup")

  let username = document.querySelector("#usernameSignup").value.trim()
  let email = document.querySelector("#emailSignup").value.trim()
  let password = document.querySelector("#passwordSignup").value.trim()

  console.log(username,email,password)
  if(username && email && password){

    const resp = await fetch("/api/users",{
      method: 'post',
        body: JSON.stringify({
         username:username,
         email:email,
         password:password
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if(resp.ok){
      document.location.replace('/')
    }else {
     console.log("error in signing up") 
    }

  }
  
}


document.querySelector(".form-login").addEventListener('submit', loginUser)
document.querySelector(".form-signup").addEventListener('submit', signupUser)