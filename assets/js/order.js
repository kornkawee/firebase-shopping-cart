import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1uwGn2ocXedWpgrQPMZrcLSemFxAj688",
  authDomain: "firestoretutorial-f54a8.firebaseapp.com",
  projectId: "firestoretutorial-f54a8",
  storageBucket: "firestoretutorial-f54a8.appspot.com",
  messagingSenderId: "979847911780",
  appId: "1:979847911780:web:8d65a7c0bd7e65acc7c271",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//---------------- Import Firestore Form Firebase libary ----------------------------------
import {
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

//สร้างตัวแปร object เรียกใช้งาน Firebase FireStore
const db = getFirestore();
// สร้างตัวแปรอ้างอิงไปยัง id


const tbodyorder = document.getElementById("tbodyorder");
const orderTotal = document.querySelector(".spanOrder");

let orderLenght = 0;

let numOrder = 0;

function AddItemToTable(id, name, numberOfUnits, orderid, totalprice) {
  // console.log(id);

  let trow = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  let btndel = document.createElement("button");

  btndel.setAttribute("class", "btn btn-danger");
  // เซ็ต Id ให้ปุ่ม  + เก็บค่า Id ไว้ที่ปุ่ม
  btndel.setAttribute("data-id", id);
  // ใส่ข้อความให้ปุ่ม
  btndel.textContent = "ยกเลิกคำสั่งซื้อ";
  btndel.addEventListener("click", (event) => {
    let id = event.target.getAttribute("data-id");
    deletaOrder(id);
  });

  td1.appendChild(btndel);
  td2.innerHTML = ++numOrder;
  td3.innerHTML = orderid;
  td4.innerHTML = name;
  td5.innerHTML = numberOfUnits;
  td6.innerHTML = totalprice;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);

  tbodyorder.appendChild(trow);


}

async function deletaOrder(id) {
  // console.log(id);
  const ref = await doc(db, "cart", id);
  deleteDoc(ref)
    .then(() => {
      //    alert("data Delete Successfully : ลบข้อมูลสำเร็จ!");
      Swal.fire({
        icon: "success",
        title: "ยกเลิกคำสั่งซื้อสำเร็จ",
        // text: "You clicked the button!",
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
      });
    })
    .catch((error) => {
      alert("Someting Wrong!:" + error);
    });
}

function AddAllItemsToTable(Odereded) {
  // console.log(Odereded);

  orderLenght = Odereded.length;

  // console.log(orderLenght,"orderLenght");
  orderTotal.textContent = orderLenght;
  if (orderLenght == 0) {
    orderTotal.style.display = "none";
  }

  numOrder = 0;
  tbodyorder.innerHTML = "";


  // Loop Parameter ที่รับเข้ามา
  Odereded.forEach((element) => {
    // เรียกใช้ Function AddItemToTable()
    //+นำค่าที่ Loop ไปใส่ใน function AddItemToTable(4 ค่า)

    AddItemToTable(
      element.id,
      element.data().Name,
      element.data().NumberOfUnits,
      element.data().OrderID,
      element.data().TotalPrice
    );

  });
}

// Function ดึงข้อมูลจาก database แบบ RealTime
async function GetAllDataRealTime() {
  // สร้างตัวแปร = อ้างอิงไปยัง ตารางใน db=firestore ,"ชื่อตาราง"
  const dbRef = await collection(db, "cart");

  // function  onSnapshot ส่งตัวแปร(รับค่า parameter 1 ตัว)
  onSnapshot(dbRef, (querySnapdhot) => {
    // สร้าง Array = [ค่าว่าง];
    let ordered = [];
    // นำค่าจาก parameter มา loop
    querySnapdhot.forEach((doc) => {
      // ยำค่าที่ loopได้ ไปยัดใส่ array student
      // AddItemToTable(doc);
      ordered.push(doc);
      // console.log(doc.id);
      // AddAllItemsToTable(students);
    });
    // console.log(students);
    // เรียกใช้ function(ส่งค่าใน Array ไปยังfunction)
    AddAllItemsToTable(ordered);
  });
}
window.onload = GetAllDataRealTime;
