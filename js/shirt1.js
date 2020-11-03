let menuBtn = document.querySelector(".bar-container"),
    closeMenubtn = document.querySelector(".bar-containers");
menuBtn.addEventListener("click", function(){
    let sidenav = document.querySelector(".sidenav");
    sidenav.classList.add("show");
});
closeMenubtn.addEventListener("click", function(){
    let sidenav = document.querySelector(".sidenav");
    sidenav.classList.remove("show");
});

window.onload = function(){
    let url = "localhost/koozy/products.json";
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.status == 200 && request.readyState == 4){
            alert("data is here");
        }
    }
    request.open("GET", url);
    request.send(null);

   console.log("hi");
}


let imgs = document.querySelectorAll("nav ul li a");

Array.from(imgs).forEach(function(img){
    img.addEventListener("click", function(e){
       e.target.style.display = "none";
    });
});