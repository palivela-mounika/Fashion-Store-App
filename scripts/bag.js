let convenience = 0;
let bagItemObjects;
//let cartItems = cartItems;

onLoad();

function onLoad(){
  let cartItemsStr = localStorage.getItem('cartItems');
  cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
  
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function placeOrder(){
    let orderTextEl = document.querySelector(".place-order-text");
    orderTextEl.textContent = "ORDER PLACED!!";

    cartItems=[];
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryEl = document.querySelector('.bag-summary');
    let totalItem =cartItems.length;
    let totalMRP=0;
    let totalDiscount =0;


    cartItems.forEach(bagItem => {
      let index = items.findIndex(bagi =>  bagi.id == bagItem.product_id);
        totalMRP +=  (items[index].original_price) * bagItem.quantity;
        totalDiscount += ((items[index].original_price)*  bagItem.quantity)- (items[index].current_price * bagItem.quantity);
    })
    if(totalMRP==0){
      convenience =0;
      }
      else{
      convenience = 99;}
     let finalPayment = totalMRP - totalDiscount +convenience;
    bagSummaryEl.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ ${convenience} </span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order" onClick = "placeOrder()">
            <div class="">PLACE ORDER</div>
          </button>`
}

function addProduct(){

}

function loadBagItemObjects(){
  let cartItemsStr = localStorage.getItem('cartItems');
  cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
  //cartItems = localStorage.getItem('cartItems') ;
  //reduceFromCart();
  
}




function displayBagItems(){
    let containerEl = document.querySelector(".bag-items-container");
    let innerHtml =''
    console.log(cartItems)
    cartItems.forEach(bagItem =>{
        innerHtml = generateItemHtml(items, bagItem);
        console.log(innerHtml)
        containerEl.innerHTML += innerHtml;
    });
    
    
}

function generateItemHtml(items, item){
  let index = items.findIndex(eachItem => eachItem.id == item.product_id);
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src=${items[index].image} alt="product image">
            </div>
            <div class="item-right-part">
              <div class="company">${items[index].company}</div>
              <div class="item-name">${items[index].item_name}</div>
              <div class="price-container">
                <span class="current-price">RS ${(items[index].current_price)}</span>
                <span class="original-price">Rs ${items[index].original_price}</span>              
                <span class="discount-percentage">(${items[index].discount_percentage}% OFF)</span>
              </div>
              <div class= "toggleCount"> 
              <span onclick="reduceFromCart(${item.product_id})" class="plus_minus_buttons"> - </span>
              <span class="quantity_count" > ${item.quantity} </span>
              <span onclick="increaseFromCart(${item.product_id})" class="plus_minus_buttons">  + </span>
              </div>
              <div class="return-period">
                <span class="return-period-days">15 days</span> return available
              </div> 
            </div> `           
}

/*<div class="remove-from-cart" onClick="removeFromBag(${item.product_id})">X</div>
<div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${items.delivery_date}</span>
              </div> */
function reduceFromCart(proId){
  let ind;
  for(let i=0;i<cartItems.length;i++){
    if(proId == cartItems[i].product_id){
      ind=i;
    }
  }
  if(ind!=-1){
    cartItems[ind].quantity= cartItems[ind].quantity -1;  
    if( cartItems[ind].quantity <=0){
      removeFromBag(proId)
    }
  }
  localStorage.setItem('cartItems' , JSON.stringify(cartItems));
  console.log(cartItems);
  loadBagItemObjects();
  displayBagIcon();
    displayBagItems();  
    displayBagSummary();
}


function increaseFromCart(proId){
  let ind;
  for(let i=0;i<cartItems.length;i++){
    if(proId == cartItems[i].product_id){
      ind=i;
    }
  }
  if(ind!=-1){
    cartItems[ind].quantity= cartItems[ind].quantity + 1;  
  }
  localStorage.setItem('cartItems' , JSON.stringify(cartItems));
  console.log(cartItems);
  loadBagItemObjects();
  displayBagIcon();
    displayBagItems();  
    displayBagSummary();
}

function removeFromBag(itemId){
    cartItems= cartItems.filter(bagItem => bagItem.product_id != itemId);
    console.log(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();  
    displayBagSummary();
};