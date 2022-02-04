let id;
//these 2 methods below are called when to create a new post
const postPost2 = async(id)=>{
    //e.preventDefault();
    //this is for posting a post
    let title = document.querySelector("#postTitle")
    let description = document.querySelector("#description")
    let category_id = parseInt(document.querySelector("#categ").value)
    console.log(title.value)
    console.log(description.value)
    console.log(category_id)
    if(title.value.trim() && description.value.trim() && category_id){
        const resp = await fetch('/api/posts',{
            method:'post',
            body: JSON.stringify({
                
                title:title.value,
                description:description.value,
                creator_id:id,
                category_id: category_id
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.ok){
            document.location.replace('/');
        }else{
            console.log("some erro")
        }
    }
}
const getId = async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/users/session',{
        method:'get'
    })

    res.json().then(d=>{
        id = d.data.id
        postPost2(id);
    })
}

//this is called when page refreshes to get the user id and get all his posts to display in the dashboard stuff.
const getId2 = async(e)=>{
    console.log("in history")
    const res = await fetch('/api/users/session',{
        method:'get'
    })

    res.json().then(d=>d.data.id).then((f)=>{
        console.log("this is f:" + f)
        fetch(`/users/` + f,{
            method:'get'
        }).then(g=>g.json()).then(h=>{
            console.log(h)
            let owner = h.username
            const dad = $("<div>").addClass("dad")
            if(h.posts.length>0){
                h.posts.forEach(element => {
                    const a = $("<div>");a.addClass(`card`).attr("data-postId",element.id);
                    const b = $("<div>");b.addClass("card-header  text-gray")
                    const c = $("<div>");c.addClass("d-flex justify-content-between")
                    const date = $("<div>").html(element.date).addClass("text-gray-700 hover:bg-blue-200 ")
                    const by = $("<span>").html(` by ${owner}`)
                    const d = $("<div>").addClass("d-flex text-gray-700 ")
                    const link = $("<a />", {
                        name : "link",
                        href : `/singlePost/${element.id}`,
                        text : element.title,
                        class: "text-gray-700 hover:bg-blue-200 "
                    });
                    //const editIcon = $("<a>")
                    //deleteIcon
                    const deleteIcon = $("<a>").attr("href",`/api/posts/del/${element.id}`)
                    const img = $("<img>")
                    img.attr("alt","DeleteIcon")
                    img.attr('width', 20);
                    img.attr('height', 20);
                    img.attr('src',"https://cdn-icons-png.flaticon.com/128/3096/3096687.png");
                    deleteIcon.append(img)

                    //editIcon
                    const editIcon = $("<a>").attr("href",`/api/posts/edit/${element.id}`)
                    const img2 = $("<img>")
                    img2.attr("alt","editIcon")
                    img2.attr('width', 20);
                    img2.attr('height', 20);
                    img2.attr('src',"https://cdn-icons-png.flaticon.com/128/2919/2919592.png");
                    editIcon.append(img2)

                    const desc = $("<div>").addClass("card-body bg-gray-700 text-white")
                    const html = $("<h4>").addClass("card-text").html(element.description)
                    desc.append(html)
                    a.append(b.append(c.append(d.append(link,deleteIcon,editIcon),date)),desc)
                    const br = $("<br>")
                    dad.append(a,br)
                });
    
                $(".oldPosts").append(dad)
            }else{
                $(".oldPosts").append($("<h3>").text("No posts"))
            }
        
        })
    })

}


document.querySelector(".go").addEventListener("click",getId)

getId2()

