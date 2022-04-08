const mycart = document.querySelector(".mycart");
const subtotalEl = document.querySelector(".subtotal");
const toltalIteminCartEl = document.querySelector(".navbarcard-count");
const btnBuy = document.getElementById("btnBuy");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Function ADD To Cart
function addTocart(id) {
  console.log(id);
  // ตรวจสอบว่า มีสินค้านี้อยู่ในรถเข็นแล้วหรือไม่
  if (cart.some((item) => item.id === id)) {
    //ถ้า id สินค้าที่อยู่ใน cart === id สินค้าที่รับมาจาก parameter
    // alert("สินค้านี้อยู่ในตะกร้าแล้ว");
    // เพิ่มจำนวนสินค้าฝนรถเข็น เมื่อกดเลือกสินค้าเดิมอีกครั้ง
    changeNumberOfUnits("plus", id);
  } else {
    //ถ้า id สินค้าที่รับมาจาก parameter != id สินค้าที่อยู่ใน cart
    // สร้างตัวแปร = id ใน product = id จาก parameter หรือไม่
    const item = products.find((element) => element.id == id);
    // console.log(item);
    // นำ object จาก item ไปยัดใส่ array ว่าง

    // cart.push(item);
    cart.push({
      // เพิ่มสมาชิก object เก่าทั้งหมด ตาม id
      ...item,
      // เพิ่มสมาชิก object ใหม่
      numberOfUnits: 1, //จำนวนสินค้าแต่ละรายการที่เพิ่มในรถเข็น
    });

    console.log(cart);
  }
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
  localStorage.setItem("CART", JSON.stringify(cart)); //แปลง Array เป็น String
}

// แสดงยอดเงินรวมทั้งหมดในรถเข็น
function renderSubtotal() {
  // สร้างตัวแปร String
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((element) => {
    // คำนวนผลรวมของสินค้าแต่ละรายการ
    // ตัวแปรผลรวม += ราคาสินค้า คูณ จำนวนสินค้า
    totalPrice += element.price * element.numberOfUnits;
    // ตัวแปรจำนวนรวม += จำนวนสินค้าทั้งหมด
    totalItems += element.numberOfUnits;
    // console.log(totalItems,"Total Item");
  });
  if (totalItems < 1 || totalItems == 0) {
    // btnBuy.style.display = "none";
    btnBuy.setAttribute("Class", "btn btn-success disabled w-100");
  } else if (totalItems >= 1) {
    btnBuy.style.display = "block";
    btnBuy.classList.remove("disabled");
  }
  // ชื่อ class แทนที่ข้อความ จำนวนสินค้าทั้งหมด ราคาสินค้ารวม
  subtotalEl.innerHTML = `
    <div class=" fs-3 text-center"> Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}</div>
   `;
//   toltalIteminCartEl.innerHTML = totalItems;
}

// แสดงรายการทั้งหมดในรถเข็น
function renderCartItems() {
  mycart.innerHTML = "";
  // element cart element
  cart.forEach((element) => {
    // console.log(element);
    mycart.innerHTML += `
<div class="row row-c bg-white ">
<div class="col-lg-4 ">

    <div class=" px-2 d-block " >
        <div class="row d-block text-center">
            <img class="img-cart pt-2 " src="${element.imgSrc}" alt="${element.name}">
            <h5 class="fs-2 bg-white p-2">${element.name}</h5>

        </div>
    </div>
</div>
<div class="col-lg-4 text-center ">
    <div class="row  rounded-3 bg-white d-block text-center ">
        <h3 class="py-2 ">ราคาต่อ ชิ้น</h3>
        <h5 class="fs-2  py-2 ">$${element.price}</h5>

    </div>
</div>
<div class="col-lg-4 ">
    <span class="fas fa-trash-alt rounded-3 bg-white p-3" onclick="removeItemFromCart(${element.id})"></span>

  <h3 class="py-2 text-white  text-center ">จำนวน ชิ้น</h3>

    <div class="row   py-2 text-center d-flex justify-content-center ">
        <div class="col-2 rounded-3 bg-white  btn minus" >
            <i class="fas fa-minus-circle" onclick="changeNumberOfUnits('minus',${element.id})"></i>
        </div>
        <div class=" col-2 rounded-3 bg-white mx-2 number">${element.numberOfUnits}</div>

        <div class="col-2 btn plus rounded-3 bg-white ">
            <i class="fas fa-plus-circle" onclick="changeNumberOfUnits('plus',${element.id})"></i>
        </div>
    </div>
</div>
</div> 
    `;
  });
}

// Remove Item From Card ลบสินค้าออกจากตะกร้า ตาม id
function removeItemFromCart(id) {
  //รับ parametre จาก cart id
  // console.log(id);
  // Array Filter = ใช้ในการคัดกรองสมาชิกภายใน Array ที่ผ่านเงื่อนไขที่กำหนด
  //สร้าง array fillter+ element.id ที่ไม่ท่ากับ id
  //   แสดง id ที่ไม่รับค่ามาจาก parameter
  cart = cart.filter((element) => element.id !== id);

  updateCart();
}

// Function เพิ่ม และ ลบ จำนวนสินค้าใน รถเข็น change number of Units for an item
function changeNumberOfUnits(action, id) {
  //รับ parameter 2 ตัว

  cart = cart.map((element) => {
    //Callback function ต้อง REturn
    let numberOfUnits = element.numberOfUnits;
    // ถ้า id จาก Array cart === id จาก parameter
    if (element.id === id) {
      //ถ้าเป็นจริง
      // ถ้า parameter action มีค่าเท่ากับ minus และ จำนวนสินค้าต้องมากกว่า 1
      if (action === "minus" && numberOfUnits > 1) {
        //ถ้าเป็นจริง
        // จำนวนสินค้า -1
        numberOfUnits--;
      } //ถ้าไม่เป็นจริง
      //ถ้า parameter action มีค่าเท่ากับ plus
      //และจำนวนสินค้าต้องน้อยกว่า จำนวนสินค้าใน element.instock
      else if (action === "plus" && numberOfUnits < element.instock) {
        //ถ้าเป็นจริง
        // จำนวนสินค้า +1
        numberOfUnits++;
      }
    }
    return {
      ...element,
      numberOfUnits,
    };
  });
  updateCart(); //เรียกใช้ function
}

// btnBuy.addEventListener('click',()=>{
//     // cart.forEach(element => {
//     //     console.log(element);
//     // });
// BuyOrder();
// });
// function BuyOrder(){
// // alert("Banana")
// }
