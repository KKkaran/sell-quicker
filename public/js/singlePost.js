document.querySelector('.addComment').addEventListener('submit',async function(e){
    
    e.preventDefault();
    let comment_text = document.querySelector("#commentText").value.trim();
    if(comment_text){
        const res = await fetch("/api/users/session",{
            method:'get'
        }).then(d=>d.json()).then(f=>{
            console.log(f)
            let user_id = f.data.id;
            let post_id = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])

            const resp = fetch("/api/comments/",{
                method:'post',
                body:JSON.stringify({
                    comment_text:comment_text,
                    user_id:user_id,
                    post_id:post_id
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            resp.then(r=>r.json()).then(g=>{
                if(g.success){
                    document.location.replace('/')
                }
            })

        })
    }else{
        console.log("please comment something")
    }


})