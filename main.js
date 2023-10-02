// ! HTML ' den gelenler
const addBtn = document.getElementById('add-btn');
const titleInp = document.getElementById('title-inp');
const priceInp = document.getElementById('price-inp');
const checkBox = document.querySelector('#checked')
const list = document.querySelector("#list");
const totalSpan = document.querySelector('#price-info');
const select = document.querySelector('select');
const userInp =document.querySelector( '#user-inp');




// !olay izleyiciler

addBtn.addEventListener('click', addExpense);
list.addEventListener('click', handleUpdate);
select.addEventListener('change', handleFilter);
userInp.addEventListener('change' , saveUser);
document.addEventListener('DOMContentLoaded' ,getUser);



// !fonksiyonlar

// toplam fiyat bilgisi

let totalPrice = 0

// hem toplam değişkeni hem ara yüzü güncelleyen fonksiyon
function updateTotal(price) {
    // js de tutulan değişkeni günceller
    totalPrice += price;
    // html deki toplam alanını günceller 
    totalSpan.innerText = totalPrice;
}


function addExpense(event) {
    // sayfayı yenilemeyi engeller
    event.preventDefault();

    // inputların değerlerine ulaşma

    const title = titleInp.value;
    const price = priceInp.valueAsNumber;



    // 1-inputlardan  biri dahi boş ise:alert ver ve fonksiyonu durdur

    if (!title || !price) {
        alert('lütfen formu doldurunuz')
        return;
    }

    // 2-inputlar doluysa kart oluştur ve html gönder
    // a- div oluşturma
    const expenseDiv = document.createElement('div');


    // b- class ekleme

    expenseDiv.classList.add('expense');


    if (checkBox.checked === true) {
        expenseDiv.classList.add('paid');

    }

    // c-div'in  içeriğini belirleme

    expenseDiv.innerHTML = `
<h2 id="title">${title}</h2>
<h2 id="price">${price} </h2>
<div class="btns">
    <img id="update" src="images/money.png" alt="">
    <img id="delete" src="images/delete.png" alt="">
</div>

`

    // d-oluşan kartı  html  gönder
    list.appendChild(expenseDiv);

    //  e- toplamı güncelle

    updateTotal(price);

    // 3- inputları temizle

    titleInp.value = "";
    priceInp.value = "";
    checkBox.checked = false






}

// harcamayı siler veya günceller

function handleUpdate(event) {

    // tıklanılan eleman

    const ele = event.target;

    // tıklanılan butonun kapsayıcısına ulaşma

    const parent = ele.parentElement.parentElement;

    // tıklanılan eleman id si delete  ise çalışır

    if (ele.id === 'delete') {
        // sildiğimiz elemanın fiyatına erişme


        const price = Number(parent.children[1].innerHTML);
        updateTotal(-price);



        //   elemanı html den kaldırma

        parent.remove()

    }


    // tıklanılan elemanın günceller

    if (ele.id === 'update') {

        parent.classList.toggle('paid');
    }
}


// note ları filtreler

function handleFilter(event) {
    const selected = event.target.value;

    // listedeki elemanlara erişme

    const items = list.childNodes;

    // listedeki herbir eleman için swicch ile yapacağımız sorgu elemaının gözükeceğine karar vericek

    items.forEach((item) => {


        // seçilen değere göre yapılacak isşleme karar verir

        switch (selected) {

            case "all":
                //  class ında paid olsada olmasada göster 


                item.style.display = "flex";

                break;


            case "paid":
                // class ında paid olmayanlar gizlenecek

                if (item.classList.contains('paid')) {
                    item.style.display = 'flex';
                }
                else {
                    item.style.display = 'none';
                }
                break;



            case "not-paid":

                // class ında paid olanlar gizlenecek


                if (item.classList.contains('paid')) {
                    item.style.display = 'none';
                }
                else {
                    item.style.display = 'flex';
                }
                break;

        }

    })


}


// kullanıcıyı kaydeder

function saveUser(event){

    localStorage.setItem('username' ,event.target.value)
} 



// kullanıcıyı localden alıp inputa yazar

function getUser(){
    // local storage den ismi al
   const username= localStorage.getItem('username')||'';

//    kuulanıcı ismini inputa aktar

userInp.value=username;


}


