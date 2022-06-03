const main = document.querySelector('#container-cards');
const select = document.querySelector('#select-products');
const btnCreate = document.querySelector('#btn-create');
let imgSelected = ' ';
let idProduct = 0;
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('#close-modal');
const newProduct = document.querySelector('#new-product');
const newPrice = document.querySelector('#new-price');
const newImage = document.querySelector('#new-image');
const btnNewProduct = document.querySelector('#btn-new-create');
const filterXPrice = document.querySelector('#filterXPrice');
const filterXCategory = document.querySelector('#filterXCategory');
const counter_label = document.getElementById('counter-label')

// AGREGAR AL CARRITO
const shopping_card = document.querySelector('#products');
const overlay = document.querySelector("#overlay");
const popup= document.querySelector("#popup");
const btn_close_popup = document.querySelector("#btn-close-popup");
const shoppingCart_container= document.querySelector(".shoppingCart-container");
const totel =document.querySelector('#total');
let games_cart=[];


window.addEventListener('load', listProducts);
select.addEventListener('change', renderCards);
btnCreate.addEventListener('click',showModal);
btnNewProduct.addEventListener('click', createNewProducts);
newImage.addEventListener('change', importImage);
closeModal.addEventListener('click', removeModal);
filterXPrice.addEventListener('change', filterPrice);
filterXCategory.addEventListener('change', filterCategory);

function filterPrice(event) {
    const responseFilter = event.target.value === 'gratuito'
    ? products.filter(element => element.price < 15)
    : event.target.value === '$15.00 - $40.00'
    ? products.filter(element => element.price >= 15 && element.price <= 40)
    : event.target.value === '$41.00 - $60.00'
    ? products.filter(element => element.price >= 41 && element.price <= 60)
    : event.target.value === '$61.00'
    ? products.filter(element => element.price >= 61)
    : null;

    main.innerHTML = '';
    responseFilter.map(element => createProducts(element))
}
function filterCategory(event) {
  const category = event.target.value === "Accion"
  ? products.filter(element => element.genero === "Acción")
  : event.target.value === 'Aventura'
  ? products.filter(element => element.genero === "Aventura")
  : event.target.value === "Disparo"
  ? products.filter(element => element.genero === "Juego de disparos")
  : event.target.value === "Deportes"
  ? products.filter(element => element.genero === "Deportes")
  : event.target.value === "Terror"
  ? products.filter(element => element.genero === "Terror")
  : null;

  main.innerHTML = ''
  category.map(element => createProducts(element))
}

function removeModal() {
    modal.style.display = 'none';
}

function importImage(event) {
    const currentImage = event.target.files[0];
    const objectURL = URL.createObjectURL(currentImage);
    imgSelected = objectURL
}

function createNewProducts() {
    idProduct++;
    const titleProduct = newProduct.value;
    const priceProduct = newPrice.value;
    const id = idProduct;

    const newelement = {id:id, name:titleProduct, price:priceProduct, image:imgSelected};

    products.push(newelement);
    listProducts();
    modal.style.display = 'none';
}

function showModal() {
    modal.style.display = 'flex';

}

function renderCards() {
    products.map(element => {
        element.name === select.value ? createProducts(element) : null;
    })
}

function listProducts() {
    select.innerHTML = '';
    const anyOption = document.createElement('option');
    select.appendChild(anyOption);
    anyOption.textContent = 'Select Products'; 
    products.map(element => {
        const options = document.createElement('option');
        options.value = element.name;
        options.textContent = element.name;
        select.appendChild(options);
    })
}

function createProducts(products) {
    const {name, image, id, price} = products;

    const card = document.createElement('div');
    card.classList.add('card-product');

    const imgCard = document.createElement('img');
    imgCard.setAttribute('src', image);
    imgCard.setAttribute('alt', `${id}-${name}`);    
    imgCard.classList.add('img-product');
    
    const nameCard = document.createElement('p');
    nameCard.textContent = name;
    nameCard.classList.add('name-product');

    const priceCard = document.createElement('p');
    priceCard.textContent = price;
    priceCard.classList.add('price-product');

    const btnCard = document.createElement('button');
    btnCard.setAttribute('id', id);
    btnCard.classList.add('btn-add');
    btnCard.textContent = 'Add to cart'
    btnCard.addEventListener('click', add_cart)

    card.appendChild(imgCard);
    card.appendChild(nameCard);
    card.appendChild(priceCard);
    card.appendChild(btnCard);

    main.appendChild(card);

}

shopping_card.addEventListener('click', show_cart)


function show_cart(){
  overlay.classList.add('activate');
  popup.classList.add('activate');
}

btn_close_popup.addEventListener('click', close_cart)

function close_cart(){
  overlay.classList.remove('activate');
  popup.classList.remove('activate');
}

const subtract_games = (event) => {
  let resta = Number(counter_label.textContent)-1;
  let item = event.target.getAttribute('id') 
  games_cart.splice(parseInt(games_cart.indexOf(item)),1)
  show_games_cart();
  counter_label.textContent = resta;
}

const show_games_cart = () => {
  shoppingCart_container.innerHTML = '';
  let lista = [...new Set(games_cart)]; 
  
  lista.forEach(item => {

      const todos_productos = products.filter(products => {
          return products.id === parseInt(item);
      })
      let cont = 0;
      let total=0;

      for(let id of games_cart) {
          if(id === item) {
            cont++;
            total += parseFloat(todos_productos[0].price);
          }
          
      }
  
      const card = document.createElement('div');
      const imagen = document.createElement('img');
      const cardContent = document.createElement('div');
      const deletec = document.createElement('p');
      const title_card=document.createElement('h2');
      const info=document.createElement('p');
      const containerQuantityNumber= document.createElement('div');
      const quantity =document.createElement('h4');
      const quantityNumber=document.createElement('div');
      const sum =document.createElement('p');
      const number=document.createElement('p');
      const subtract=document.createElement('p');
      const pricecart=document.createElement('p');

      sum.setAttribute('id', todos_productos[0].id);
      subtract.setAttribute('id',todos_productos[0].id);

      card.classList.add('card');
      cardContent.classList.add('cardContent');
      deletec.classList.add('delete');
      containerQuantityNumber.classList.add('quantityNumber');
      quantity.style.fontStyle='oblique';
      quantityNumber.classList.add('numberQuantity');
      sum.classList.add('circle');
      subtract.classList.add('circle');
      pricecart.classList.add('price');

      deletec.textContent='X';
      imagen.src=todos_productos[0].image;
      title_card.textContent=todos_productos[0].name;
      info.textContent=todos_productos[0].plataforma;
      quantity.textContent='Cantidad';
      sum.textContent='+';
      number.textContent=cont;
      subtract.textContent='-';
      pricecart.textContent=`$${total}`;

      card.appendChild(imagen);
      cardContent.appendChild(title_card);
      cardContent.appendChild(info);
      cardContent.appendChild(containerQuantityNumber);
      containerQuantityNumber.appendChild(quantity);
      containerQuantityNumber.appendChild(quantityNumber);
      quantityNumber.appendChild(subtract);
      quantityNumber.appendChild(number);
      quantityNumber.appendChild(sum);
      cardContent.appendChild(pricecart);
      card.appendChild(deletec);
      card.appendChild(cardContent);

      sum.addEventListener('click', add_cart);
      subtract.addEventListener('click', subtract_games);

      shoppingCart_container.appendChild(card);

      deletec.setAttribute('id',todos_productos[0].id);
      deletec.addEventListener('click', delete_cart)
      
      function delete_cart(event) {
        let cantidad = Number(counter_label.textContent)-cont;
        counter_label.textContent = cantidad;
        let item = event.target.getAttribute('id');
        games_cart = games_cart.filter((id_games) => {
        return id_games !== item;
        });

          show_games_cart();
      }
  })
}

const add_cart = (event) => {
  let sumar = Number(counter_label.textContent)+1
  games_cart.push(event.target.getAttribute('id'));
  show_games_cart();
  counter_label.textContent = sumar;
}