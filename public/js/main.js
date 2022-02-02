//fetch info from db sessions table and see if someone is loggedIn or not
let loginText = document.querySelector('.signin');

const getValueFromSessionsDb = async()=>{

    const res = await fetch('/api/users/session',{
        method:'get'
    })

    res.json().then(d=>{
        console.log(d.data)
        if(d.data.loggedIn){
            loginText.text = "Logout"
            console.log("already logged in")
        }else{
            loginText.text = "Login"
            console.log("guest mode")
        }
    })
}

getValueFromSessionsDb();