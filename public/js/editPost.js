const title = document.querySelector("#title").value.trim()
const description = document.querySelector("#description").value.trim()

//function to update the post
const updatePost = async(title,desc)=>{
    const postId = parseInt(document.querySelector(".form-editPost").dataset.postid)
    console.log(title,desc,postId)
    const resp = await fetch(`/api/posts/${postId}`,{
        method:'put',
        body:JSON.stringify({
            title:title,
            description:desc
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (resp.ok) {
        document.location.replace('/');
    } else {
        console.log("error updating post")
    }
}
//when the update button is ungrayed
document.querySelector(".go").addEventListener("click",function(e){
    e.preventDefault();
    updatePost(document.querySelector("#title").value.trim(),document.querySelector("#description").value.trim())
})
//gets trigged when a key is pressed
function gray(){
   if((document.querySelector("#title").value.trim() === title) && (document.querySelector("#description").value.trim() === description)){
       console.log("no change")
       document.querySelector(".go").disabled = true;

   }else{
       console.log("a change")
       document.querySelector(".go").disabled = false;
   }
}