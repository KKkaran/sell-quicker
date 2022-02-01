document.querySelector(".shortlist").addEventListener("click",function(){
    if(document.querySelector("#categ").value){
        let value = document.querySelector("#categ").value

        let array = document.querySelector(".posts").getElementsByClassName("card")

        for(let g=0;g<array.length;g++){
            array[g].style.display = "none"
        }
        console.log(value)
        //document.querySelector(`.${value}`).style.display = "block"
        let posts = document.querySelectorAll(`.${value}`)
        console.log(posts)
        for(let g=0;g<posts.length;g++){
            posts[g].style.display = "block"
        }
    }
})