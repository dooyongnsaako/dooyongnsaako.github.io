var localStorages = (function(){
    let AccessLocalStorage = {
        SetLocalStorage: function(para){
            localStorage.setItem("cart", JSON.stringify(para));
        },
        GetLocalStorage: function(){
            return JSON.parse(localStorage.getItem("cart"));
        },
        removeLocalStorage: function(){
            localStorage.removeItem("cart");
        }
    };
        
    function AddCart(id, image, itemname, price, quantity){
        this.id = id; 
        this.image = image;
        this.itemname = itemname;
        this.price = price;
        this.quantity = quantity;
    }
    
    if(AccessLocalStorage.GetLocalStorage() === null){
            AccessLocalStorage.SetLocalStorage([]);
    }
        
    return {
        addToCart:function(img, name, prx, qua){
        let addedItem, itemId, addtoStore, LocStore;
        
        if(AccessLocalStorage.GetLocalStorage().length > 0){
            itemId = AccessLocalStorage.GetLocalStorage()[AccessLocalStorage.GetLocalStorage().length - 1].id + 1;
        } else{
            itemId = 0;
        }
        
        addedItem = new AddCart(itemId, img, name, prx, qua);
        LocStore = AccessLocalStorage.GetLocalStorage();
        LocStore.push(addedItem);
        AccessLocalStorage.SetLocalStorage(LocStore);
        
        return true;
        },
    
        store:AccessLocalStorage
    
    };
})();

var DomElements = (function(){
    let eachElement = {
        wrapper: document.querySelector(".wrapper"),

        menuBtn: document.querySelector(".bar-container"),
        sidenav: document.querySelector(".sidenav"),
        closeMenubtn: document.querySelector(".bar-containers"),
    
    
        imgs: document.querySelectorAll(".img-containers"),
        basket: document.querySelector("#basket"),
        cart: document.querySelector(".basket"),
        barbacks: document.querySelector("#barbacks"),
        backBtn: document.querySelector(".backBtn"),
        checkout: document.querySelector(".checkout"),
        
        add: document.querySelector("#add"),
        sub: document.querySelector("#sub"),
        number: document.querySelector("#numbers"),
        numberText: function(){
            return parseInt( this.number.textContent);
        },
        
        digit: document.getElementById("digit"),
        digits: document.getElementById("digits"),
        addLocalCart:document.querySelector(".add"),
        picture: document.querySelector("#pic"),
        itemName: document.querySelector("#itemName"),
        prices: document.querySelector(".prices"),
        detail: document.querySelector(".detail"),
        backBtn: document.querySelector(".backBtn"),
        size: document.querySelectorAll(".size Ul li"),
        defaults: document.querySelectorAll(".size Ul li.default"),
        itemm:document.querySelector(".item"),
        totalNumItems:document.querySelectorAll(".itemDetails"),

    };
    return {
        hereEl: eachElement,
        updateCart: function(locs){
        let cart;
        eachElement.itemm.innerHTML = "";
        
        for(var i=0;i<locs.length;i++){
        cart = locs[i];
        let itemCart = '<div class="itemDetails" ><div class="imgContainers" ><img src="' + cart.image + '" class="imgss" alt=""  ></div><div class="PriceTags" ><span class="spans" >' + cart.itemname + '</span><span class="spans">' + cart.price + '</span><span class="spans">Quantity: '+ cart.quantity +'</span></div><div id="' + cart.id + '"  class="closed" ></div></div>';
        eachElement.itemm.insertAdjacentHTML("afterbegin", itemCart);
        }
        
        },
        numofitemsIncart:function(){
            eachElement.digit.textContent = Array.from(eachElement.totalNumItems).length;
            eachElement.digits.textContent = Array.from(eachElement.totalNumItems).length;
        }
    };
})();

var controller = (function(Dom, storage){
    Dom.hereEl.itemm.addEventListener("click", function(e){
        let elname = e.target.className,
            elid;
        if(elname === "closed"){
            elid = e.target.id;
            for(var i = 0; i < storage.store.GetLocalStorage().length; i++){
                let position = i;
                if(elid == storage.store.GetLocalStorage()[i]){
                    storage.store.GetLocalStorage().splice(position, 1);

                }

            }
        }
        
    });

    Dom.hereEl.menuBtn.addEventListener("click", function(e){
        e.preventDefault();
        Dom.hereEl.sidenav.classList.add("show");
    });
    
    Dom.hereEl.closeMenubtn.addEventListener("click", function(e){
        e.preventDefault();
        Dom.hereEl.sidenav.classList.remove("show");
    });
    
    
    Dom.hereEl.basket.addEventListener("click", function(e){
        e.preventDefault();
        Dom.hereEl.cart.classList.add("show1");
        Dom.hereEl.checkout.classList.add("showCheckout"); 
    });
    
    Dom.hereEl.barbacks.addEventListener("click", function(e){
        e.preventDefault();
        Dom.hereEl.cart.classList.remove("show1");
        Dom.hereEl.checkout.classList.remove("showCheckout"); 
    });
    
    Array.from(Dom.hereEl.imgs).forEach(function(img){
        img.addEventListener("click", function(){
            let url = "https://github.com/dooyongnsaako/lilskiggy/blob/master/products.json";
                ouRequest = new XMLHttpRequest(),
                targetID = this.id;

            ouRequest.open("GET", url, true);

            ouRequest.onreadystatechange = function(){
                if(ouRequest.status == 200 && ouRequest.readyState == 4){
                    var data = JSON.parse(this.responseText);

                    for(var i = 0; i<data[0].product_Array.length; i++) {
                        if(targetID === data[0].product_Array[i].item){
                            Dom.hereEl.picture.src = data[0].product_Array[i].img;
                            Dom.hereEl.itemName.textContent = data[0].product_Array[i].name;
                            Dom.hereEl.prices.textContent = data[0].product_Array[i].price;
                
                        }
                    }
                    
                }
            }
     
           ouRequest.send(null);
            
            Dom.hereEl.wrapper.classList.add("opacity");
            Dom.hereEl.detail.classList.add("itemShow");

            Dom.hereEl.backBtn.addEventListener("click", function(e){
                e.preventDefault();
                Dom.hereEl.detail.classList.remove("itemShow");
                Dom.hereEl.wrapper.classList.remove("opacity");
                
                let value = Dom.hereEl.numberText();
                value = 1;
                Dom.hereEl.number.textContent = value;
                Dom.hereEl.picture.src = "";
            });
            
        });
    });

    Dom.hereEl.add.addEventListener("click", function(e){
        e.preventDefault();
        let value = Dom.hereEl.numberText();
        if(!(value >= 12)){
            let plus = value + 1;
            Dom.hereEl.number.textContent = plus;
        } else{
            value = 0;
            plus = value + 1;
            Dom.hereEl.number.textContent = plus;
        }
    });
    
    Dom.hereEl.sub.addEventListener("click", function(e){
        e.preventDefault();
        let value = Dom.hereEl.numberText();
        if(!(value <= 1)){
            let minus = value - 1;
            Dom.hereEl.number.textContent = minus;
        } else {
            value = 13;
            minus = value - 1;
            Dom.hereEl.number.textContent = minus;
        }
    });

    Dom.numofitemsIncart();
    var storedItems;
    storedItems = storage.store.GetLocalStorage();
    Dom.updateCart(storedItems);
    Dom.hereEl.addLocalCart.addEventListener("click", function(e){
        e.preventDefault();
        let name = Dom.hereEl.itemName.textContent;
        let price = Dom.hereEl.prices.textContent;
        let Quantitys = Dom.hereEl.number.textContent;
        let picdetails = Dom.hereEl.picture.src;
        
        var checkbooleans = storage.addToCart(picdetails, name, price, Quantitys);
        
        if(checkbooleans){
            Dom.updateCart(storage.store.GetLocalStorage());
        }
        let digit = document.getElementById("digit"),
            digits = document.getElementById("digits"),
            totalNumItems = document.querySelectorAll(".itemDetails");
            
            digit.textContent = Array.from(totalNumItems).length;
            digits.textContent = Array.from(totalNumItems).length;
    });

    window.onload = function(){
        let digit = document.getElementById("digit"),
            digits = document.getElementById("digits"),
            totalNumItems = document.querySelectorAll(".itemDetails");
            
        function cartdetails(){
            digit.textContent = Array.from(totalNumItems).length;
            digits.textContent = Array.from(totalNumItems).length;
        }
        cartdetails();
        
    }

})(DomElements, localStorages);
