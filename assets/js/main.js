/* app.js */
const productEl = document.querySelector(".products");
const cartItemEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const toltalIteminCartEl = document.querySelector(".navbarcard-count");

const cartadd = document.querySelector(".cartadd");


// Togller ตะกร้าสินค้า
document.querySelector(".navbarcard").addEventListener('click', () => {
    cartadd.classList.toggle('show-cart-cartadd');
})


// แสดงสินค้า
function renderProducts() {
    products.forEach((element) => {
        productEl.innerHTML += `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-md-2 mt-sm-3">
        <div class="card">
        <div class="imgBox">
        <img src="${element.imgSrc}" alt="${element.name}" class="img-fluid " ></div>
          
            <div class="card-body">
                <h2 class="card-title">${element.name}</h2>
                <p class="card-subtitle">${element.description}</p>
                <h3 class="card-text">$${element.price}</h3>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary w-100 btn-lg" onclick="addTocart( ${element.id})">
                    <span class="fas fa-cart-plus me-1"></span>
                    Add To Cart</button>
            </div>
        </div>
    </div>
        `;

    });
}
renderProducts();

// สร้างตัวแปร Array ว่าง หรือ ข้อมูลใน localstorage ตาม Key  "CART":Key
// let cart = [];
let cart = JSON.parse(localStorage.getItem("CART")) || [];////แปลง String เป็น Array  
updateCart();

// Function เพิ่สินค้าไปยังตะกร้า
function addTocart(id) {
    // console.log(id);
    // ตรวจสอบว่า มีสินค้านี้อยู่ในรถเข็นแล้วหรือไม่
    if (cart.some((item) => item.id === id)) {
        //ถ้า id สินค้าที่อยู่ใน cart === id สินค้าที่รับมาจาก parameter
        // alert("สินค้านี้อยู่ในตะกร้าแล้ว");
        // เพิ่มจำนวนสินค้าฝนรถเข็น เมื่อกดเลือกสินค้าเดิมอีกครั้ง
        changeNumberOfUnits("plus", id);
    }
    else {//ถ้า id สินค้าที่รับมาจาก parameter != id สินค้าที่อยู่ใน cart 
        // สร้างตัวแปร = id ใน product = id จาก parameter หรือไม่
        const item = products.find((element) => element.id == id);
        // console.log(item);
        // นำ object จาก item ไปยัดใส่ array ว่าง

        // cart.push(item);
        cart.push({
            // เพิ่มสมาชิก object เก่าทั้งหมด ตาม id 
            ...item,
            // เพิ่มสมาชิก object ใหม่
            numberOfUnits: 1//จำนวนสินค้าแต่ละรายการที่เพิ่มในรถเข็น
        });

        // console.log(cart);
    }

    Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'เพิ่มสินค้าในตะกร้าแล้ว',
  showConfirmButton: false,
  timer: 1000
})
    // เรียกใช้ Function 
    updateCart();
}

// Function Update Cart เมื่อเพิ่มหรือลดจำนวสินค้าใน รถเข็น
function updateCart() {

    // เรียกใช้ Function แสดงรายการทั้งหมดในรถเข็น
    renderCartItems();
    // เรียกใช้ Function แสดงยอดเงินรวมทั้งหมดในรถเข็น
    renderSubtotal();
    // เรียกใช้ Function บันทึกข้อมูลสินค้าในรถเข็นเข้าไปใน Local Storage
    //    Save cart to localstorage //Keyและ Value
    localStorage.setItem("CART", JSON.stringify(cart));//แปลง Array เป็น String
}

// แสดงยอดเงินรวมทั้งหมดในรถเข็น
function renderSubtotal() {
    // สร้างตัวแปร String
    let totalPrice = 0, totalItems = 0;

    cart.forEach((element) => {
        // คำนวนผลรวมของสินค้าแต่ละรายการ
        // ตัวแปรผลรวม += ราคาสินค้า คูณ จำนวนสินค้า
        totalPrice += element.price * element.numberOfUnits;
        // ตัวแปรจำนวนรวม += จำนวนสินค้าทั้งหมด 
        totalItems += element.numberOfUnits;

   
    });
    if(totalItems < 1 || totalItems==0){
        // btnBuy.style.display = "none";
        btnBuy.setAttribute('Class','btn btn-success disabled w-100');
        toltalIteminCartEl.style.display = "none";
    }else if(totalItems >= 1){
        btnBuy.style.display = "block"
        btnBuy.classList.remove('disabled');
        toltalIteminCartEl.style.display = "block";
    }
    // ชื่อ class แทนที่ข้อความ จำนวนสินค้าทั้งหมด ราคาสินค้ารวม
    subtotalEl.innerHTML = `ยอดรวม (${totalItems} รายการ): $${totalPrice.toFixed(2)}`;
    toltalIteminCartEl.innerHTML = totalItems;
    
    
}

// แสดงรายการทั้งหมดในรถเข็น
function renderCartItems() {
    // element cart element
    cartItemEl.innerHTML = "";//clear ข้อมูลสินค้าตัวเดิมใน รถเข็น
    cart.forEach((element) => {

        cartItemEl.innerHTML += `
        <div class="row  mt-2 shadow">
        <div class="col-lg-4 col-md-12 ">
            <div class="item-info " >

                <div class="row  ">
                    <div class="col-6  ">
                        <span class="fas fa-trash-alt rounded-3 bg-white ps-2"
                            onclick="removeItemFromCart(${element.id})"></span>
                    </div>
                    <div class="col-6   ">
                        <img class=" bg-secondary rounded-3  " src="${element.imgSrc}" alt="${element.name}">
                        <h5 class="fs-6 px-1">${element.name}</h5>
                        </div>
                  
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 text-center">
            <div class="unit-price">
                $ ${element.price}
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 ">
            <div class="row text-center  ">
                <div class="col-4 btn minus" onclick="changeNumberOfUnits('minus',${element.id})">

                <i class="fas fa-minus-circle minusBtn"></i>
           
                </div>
                <div class=" col-2 bg-light number">${element.numberOfUnits}</div>
                <div class="col-4 btn plus fw-bold" onclick="changeNumberOfUnits('plus',${element.id})">
                <i class="fas fa-plus-circle plusBtn"></i>
            
                </div>
            </div>
        </div>
    </div>
    `;
    })
}

// Remove Item From Card ลบสินค้าออกจากตะกร้า ตาม id
function removeItemFromCart(id) {//รับ parametre จาก cart id
    // console.log(id);
    // Array Filter = ใช้ในการคัดกรองสมาชิกภายใน Array ที่ผ่านเงื่อนไขที่กำหนด
    //สร้าง array fillter+ element.id ที่ไม่ท่ากับ id 
    //   แสดง id ที่ไม่รับค่ามาจาก parameter
    cart = cart.filter((element) => element.id !== id);

    updateCart();
}


// Function เพิ่ม และ ลบ จำนวนสินค้าใน รถเข็น change number of Units for an item
function changeNumberOfUnits(action, id) {//รับ parameter 2 ตัว

    cart = cart.map((element) => {//Callback function ต้อง REturn
        let numberOfUnits = element.numberOfUnits;
        // ถ้า id จาก Array cart === id จาก parameter 
        if (element.id === id) {//ถ้าเป็นจริง
            // ถ้า parameter action มีค่าเท่ากับ minus และ จำนวนสินค้าต้องมากกว่า 1
            if (action === "minus" && numberOfUnits > 1) {//ถ้าเป็นจริง
                // จำนวนสินค้า -1
                numberOfUnits--;
            }//ถ้าไม่เป็นจริง
            //ถ้า parameter action มีค่าเท่ากับ plus 
            //และจำนวนสินค้าต้องน้อยกว่า จำนวนสินค้าใน element.instock
            else if (action === "plus" && numberOfUnits < element.instock) {//ถ้าเป็นจริง
                // จำนวนสินค้า +1
                numberOfUnits++;
            }
        }
        return {
            ...element,
            numberOfUnits,
        };
    });
    updateCart();//เรียกใช้ function


}




