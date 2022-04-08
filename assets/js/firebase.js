
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC1uwGn2ocXedWpgrQPMZrcLSemFxAj688",
    authDomain: "firestoretutorial-f54a8.firebaseapp.com",
    projectId: "firestoretutorial-f54a8",
    storageBucket: "firestoretutorial-f54a8.appspot.com",
    messagingSenderId: "979847911780",
    appId: "1:979847911780:web:8d65a7c0bd7e65acc7c271"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
//---------------- Import Firestore Form Firebase libary ----------------------------------
import{getFirestore, doc,onSnapshot, getDoc, setDoc, collection, addDoc, updateDoc,deleteDoc, deleteField}
from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

//สร้างตัวแปร object เรียกใช้งาน Firebase FireStore
const db = getFirestore();

// สร้างตัวแปรอ้างอิงไปยัง id
const btnBuy = document.getElementById("btnBuy");

btnBuy.addEventListener('click',AddDocument_AutoID);


let cart = JSON.parse(localStorage.getItem("CART")) || [];////แปลง String เป็น Array  
// console.log(cart);

  function AddDocument_AutoID(){
  // alert("Banana");
  // สร้างตัวแปร String
  let totalPrice = 0, totalItems = 0 ,totalPriceAll =0;
  cart.forEach((element) => {
      // คำนวนผลรวมของสินค้าแต่ละรายการ
      // ตัวแปรผลรวม += ราคาสินค้า คูณ จำนวนสินค้า
      totalPrice += element.price * element.numberOfUnits;
      // ตัวแปรจำนวนรวม += จำนวนสินค้าทั้งหมด 
      totalItems += element.numberOfUnits;
      // totalPriceAll +=totalPrice;


  let ref = collection(db,"cart");
  const docRef =  addDoc(
    ref, {
     OrderID:element.id,
     Name: element.name,
     NumberOfUnits:element.numberOfUnits,
     TotalPrice:totalPrice.toFixed(2)
    }
  )
  .then(()=>{
    //   alert("Data Add Successfully!");
    Swal.fire(
        {
         icon:  'success',
        title:  'สั่งซื้อสำเร็จ',
        // text: 'You clicked the button!',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'green',
        },
       )
    })
    .catch((error)=>{
      alert("Someting Wrong!:"+ error);
    });

  });

}



