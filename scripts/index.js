let bagItems;
let bagItemsCount=[];
let objlength=0;
let cartItems=[];


onLoad();

function onLoad(){
    let cartItemsStr = localStorage.getItem('cartItems');
    cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
    let bagItemsStr = localStorage.getItem('bagItems');
    //let bagItemsCountStr = localStorage.getItem('bagItemsCount');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    //bagItemsCount = bagItemsCountStr ? JSON.parse(bagItemsCountStr) : [];
    displayItemsOnHomePage();
    displayBagIcon()
    
    
}


function addToBag(id){
    bagItems.push(id);
    let index = cartItems.findIndex(product => product.product_id == id);
        
        if(cartItems.length<=0){
            cartItems.push({
                product_id:id,
                quantity:1,
            })
        }
        else if(index==-1){
            cartItems.push({
                product_id:id,
                quantity:1,
            })
        }
        else{
            cartItems[index].quantity = cartItems[index].quantity+1;
        }
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
    bagItems.push(id);
    localStorage.setItem('bagItems' , JSON.stringify(bagItems));
    displayBagIcon();
    //bagItemsCountf();
    console.log(cartItems);
}


    


function displayBagIcon(){
    let bagCountEl = document.querySelector(".bag-items");
    let bagCount=0;
        for(let i=0;i<cartItems.length;i++){
            bagCount = bagCount +  cartItems[i].quantity
        }
    if(bagCount>0){
        
        bagCountEl.style.visibility='visible';
        bagCountEl.innerHTML = bagCount;
    }else{
        bagCountEl.style.visibility='hidden';
    }
    
} 

function getImagePath(){
    const path = window.location.pathname;
    return path.includes('index.html') ? '/images' : '../images';
  } 
  

function displayItemsOnHomePage(){
    let itemscontainerEl = document.querySelector
    (".items-container");
    if(!itemscontainerEl){
        return;
    }
    let innerHtml='';
    items.forEach(item => {
        let image = getImagePath(item.id);
    innerHtml += `
    <div class="item-container">
        <img class="item-image" src="${image + item.image}" alt="item image">
        <div class="rating">${item.rating.stars}⭐ |${item.rating.count}</div>
        <div class="company-name"> ${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs${item.current_price}</span>
            <span class="original-price">Rs${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`;
})
itemscontainerEl.innerHTML= innerHtml;
}  