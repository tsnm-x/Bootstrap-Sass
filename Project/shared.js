let posterType = [];

function getInfo(id){
    switch(posterType[0]){
        case undefined:
            if(id == "v1"){
                posterType.push({
                    name: "Voyager 1",
                    count: `${document.getElementById("countv1").value}`,
                    img: `voyager-01.jpg`,
                    price: `49.99`,
                    id: "v1"
                })
            } else if(id == "v2"){
                posterType.push({
                    name: "Voyager 2",
                    count: `${document.getElementById("countv2").value}`,
                    img: `voyager-02.jpg`,
                    price: `49.99`,
                    id: "v2"
                })
            }
        break; 
        default:
            for(elem of posterType){
                if(id == elem.id){
                    let count = parseInt(elem.count)
                    let newCount = id=="v1"? parseInt(document.getElementById("countv1").value): parseInt(document.getElementById("countv2").value);
                    elem.count = `${newCount+count}`;
                } else if(id == "v1" && posterType.length < 2 && elem.id !== "v1"){
                    posterType.push({
                        name: "Voyager 1",
                        count: `${document.getElementById("countv1").value}`,
                        img: `voyager-01.jpg`,
                        price: `49.99`,
                        id: "v1"
                    })
                    break;
                } else if(id == "v2" && posterType.length < 2 && elem.id !== "v2"){
                    posterType.push({
                        name: "Voyager 2",
                        count: `${document.getElementById("countv2").value}`,
                        img: `voyager-02.jpg`,
                        price: `49.99`,
                        id: "v2"
                    })
                    break;
                }
            }
        break;
    }
    savingJSON(posterType);
}

function savingJSON(arr){
    let obj = {
        table:[]
    }

    console.log(arr);
    for(elem of arr){
        obj.table.push(elem);
    }
    
    localStorage.setItem("json", JSON.stringify(obj));
    addToCart();
}

function addToCart(){
    let totalCount = 0;
    let totalPrice = 0;
    let data = JSON.parse(localStorage.getItem("json"));
    console.log(data.table[0]);
    if(data.table[0] !== undefined){
        document.getElementsByClassName("offcanvas-body")[0].innerHTML = `<div class="row flex-column" id="canBody" style="height: 87vh;"></div>`;
        for(elem of data.table){
            document.getElementById("canBody").innerHTML += 
            `<div class="row m-1">
                <img src="${elem.img}" class="w-25 col-1">
                <div class="flex-grow-1 col-1 p-1">
                    <p class="fw-bold">${elem.name}</p>
                    <p class="smolFont">$ ${elem.price} USD</p>
                    <div class="text-decoration-none smolFont text-danger handCursor" id="a${elem.id}" onclick="removeItem(this.id)">REMOVE</div>
                </div>
                <div class="col-4"><input type="text" value="${elem.count}" class="border border-dark p-3 ms-4 me-2 w-75 bg-transparent"></div>
            </div>`;
            totalPrice += parseFloat(elem.price)*parseFloat(elem.count);
            totalCount += parseInt(elem.count);
    
        }
        document.getElementsByClassName("offcanvas-body")[0].innerHTML += 
            `<div class="row">
                <div class="border-top border-secondary w-100"></div>
                <div class="row justify-content-between p-1">
                    <div class="col-1 smolFont">SUBTOTAL</div>
                    <div class="col-4 smolFont text-end">$ ${totalPrice} USD</div>
                </div>
                <a class="btn btn-light border-dark rounded-0 p-2" href="order.html">CHECKOUT</a>
            </div>`;
    } else{
        document.getElementsByClassName("offcanvas-body")[0].innerHTML = `<div class="align-self-center">No items found.</div>`
    }
    document.getElementById("cartNum").innerHTML = `${totalCount}`
    if(document.location.href.includes("order.html")){
        displayInfo();
    }

}

function displayInfo(){
    resetData();
    let totalPrice = 0;
    let data = JSON.parse(localStorage.getItem("json"));
    if(data.table[0] !== undefined){
        for(elem of data.table){
            document.getElementById("productDetails").innerHTML += 
            `<div class="col-12 allFstyle p-4 text-dark d-flex flex-md-row align-items-center flex-column">
                <img src="${elem.img}" class="w-25 m-2" alt="">
                <div class="flex-grow-1">
                    <p class="fw-bolder">${elem.name}</p>
                    <p class="small">Quantity: ${elem.count}</p>
                </div>
                <div>$ ${parseFloat(elem.price)*parseFloat(elem.count)} USD</div>
            </div>`;
            document.getElementById("orderedProducts").innerHTML += 
            `<div class="d-flex justify-content-between">
                <p>${elem.name}</p>
                <p>x${elem.count}</p>
            </div>`;
            totalPrice += parseFloat(elem.price)*parseFloat(elem.count);
        }
        document.getElementById("productPrice").innerHTML = `<p class="text-secondary">Posters</p>
            <p>$ ${totalPrice} USD</p>`;
        document.getElementById("orderPrice").innerHTML = `<p>Total</p>
            <p class="subFont fw-bold">$ ${totalPrice} USD</p>`;
    }
}

function resetData(){
    document.getElementById("productDetails").innerHTML = ``;
    document.getElementById("productPrice").innerHTML = `<p class="text-secondary">Posters</p>
            <p>$ 0 USD</p>`;
    document.getElementById("orderedProducts").innerHTML = 
    `<div class="d-flex justify-content-between"></div>` ;
    document.getElementById("orderPrice").innerHTML = `<p>Total</p>
    <p class="subFont fw-bold">$ 0 USD</p>`;
}

function removeItem(id){
   posterType = JSON.parse(localStorage.getItem("json"));
   posterType = posterType.table.filter(val=>{
    if(!id.endsWith(val.id)){
        return val;
    }else if(val.count!="1"){
        let count = parseInt(val.count);
        count --;
        val.count = `${count}`;
        return val;
    }
})
   console.log(posterType);
   savingJSON(posterType);
}

function subscribeUser(){
    document.getElementById("subscribeForm").reset();
    document.getElementById("subscribe").innerHTML += `<div id="popMsg">Thanks For subscribing!</div>`
}

function showModal(){
    
}