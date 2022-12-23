//get total
let id
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let sumbit=document.getElementById("Submit");


let mood='create';
let tmp;
let searchMood="title";




function getTotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value) - +discount.value; 
        total.innerHTML=result;  
        total.style.background='#040';
    }
    else{
        total.innerHTML=""
        total.style.background="#a00d02";
    }
}


let datPro;

if(localStorage.product!=null){
    datPro=JSON.parse(localStorage.product)
}
else{
    datPro=[];
}

sumbit.onclick=function(){

    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !='' && price.value !='' && category.value !='' 
    && count.value <= 100) {
        if(mood==='create'){
        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datPro.push(newpro);
            }
        }
        else{
            datPro.push(newpro);
        }
    }
        else {
        datPro[tmp]=newpro;
        mood="Create";
        sumbit.innerHTML="Create";
        count.style.display="block";
    }

    cleardata()
}

localStorage.setItem('product',JSON.stringify(datPro))
    

showData()

}




function cleardata(){
    title.value='';
    price.value='';
    ads.value='';
    count.value='';
    discount.value='';
    category.value='';
    taxes.value='';
    total.innerHTML='';
}


function showData(){
    getTotal()
    let table='';
    for(let i=0;i<datPro.length;i++){
        table+=`<tr>
        <td>${i+1}</td> 
        <td>${datPro[i].title}</td>
        <td>${datPro[i].price}</td>
        <td>${datPro[i].taxes}</td>
        <td>${datPro[i].ads}</td>
        <td>${datPro[i].discount}</td>
        <td>${datPro[i].total}</td>
        <!--<td>${datPro[i].count}</td>-->
        <td>${datPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelet=document.getElementById("deleteall");
    if(datPro.length >0){
        btndelet.innerHTML=`<button onclick="deleteall()" id="delete">Delete All (${datPro.length}) </button>`;
    }
    else {
        btndelet.innerHTML='';
    }
}
showData()


function DeleteData(i){
    datPro.splice(i,1);
    localStorage.product=JSON.stringify(datPro);
    showData()
}


function deleteall(){
    localStorage.clear();
    datPro.splice(0);
    showData();
}
//update data

function updateData(i){
    title.value=datPro[i].title;
    price.value=datPro[i].price;
    ads.value=datPro[i].ads;
    taxes.value=datPro[i].taxes;
    discount.value=datPro[i].discount;
    
    getTotal()
    count.style.display="none";
    category.value=datPro[i].category;    
    sumbit.innerHTML="Update";
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })

    localStorage.product=JSON.stringify(datPro);
    showData()
}

function Search(id){
    let search=document.getElementById("search");
    if(id==="searchtitle"){
        search.placeholder='Search By Title';
    }
    
    else{
        searchMood="category";
        search.placeholder='Search By Category';
    }
    search.focus()
    search.value="";
}

//Search By category or title
function searchData(value){
    let table='';
    if(searchMood==='title'){        
        for(let i=0;i<datPro.length;i++){
            if(datPro[i].title.includes(value.toLowerCase())){
                table+=`<tr>
                <td>${i+1}</td> 
                <td>${datPro[i].title}</td>
                <td>${datPro[i].price}</td>
                <td>${datPro[i].taxes}</td>
                <td>${datPro[i].ads}</td>
                <td>${datPro[i].discount}</td>
                <td>${datPro[i].total}</td>
                <!--<td>${datPro[i].count}</td>-->
                <td>${datPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td></tr>`;
                
            }
        }
    }


    else{
        for(let i=0;i<datPro.length;i++){
            if(datPro[i].category.includes(value.toLowerCase())){
                table+=`<tr>
                <td>${i+1}</td> 
                <td>${datPro[i].title}</td>
                <td>${datPro[i].price}</td>
                <td>${datPro[i].taxes}</td>
                <td>${datPro[i].ads}</td>
                <td>${datPro[i].discount}</td>
                <td>${datPro[i].total}</td>
                <!--<td>${datPro[i].count}</td>-->
                <td>${datPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td></tr>`;
                
            }
        }

    }



    document.getElementById('tbody').innerHTML=table;
}


