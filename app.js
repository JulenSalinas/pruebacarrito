const { createApp } = Vue;

createApp({
  template: `
    <div>
      <h1>Lista de Productos Tolkien</h1>
    

      <br><br>


    </div>



    <div id="mySidebar" class="sidebar">
    <div id ="bucle_side" v-for="i in this.carrito">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <h2>{{i["nombre"]}}</h2>
        <p>Precio unitario {{i["precio"]}} {{divisa}}</p>
        <p>Cantidad {{i["cantidad"]}}</p>
        
      </div>
      <h3>El total es: </h3>
      <p v-if="totalPrice > 0">Total del carrito: {{ totalPrice.toFixed(2) }} {{divisa}}</p>

      <button id="btn_compra">Comprar</button>

      <br><br>

      <button id="btn_vaciar" @click="vaciarCarrito()" >Vaciar Carrito</button>


    </div>

<div id="main">
  <button class="openbtn" onclick="openNav()">☰ Carrito</button>  
  
</div>
 

<br>

<h3>Selecciona la Divisa</h3>
  
<select class="form-select" aria-label="Default select example" v-model="divisa" @change="cambiarDivisa">
  <option class ="opcion_moneda" value="USD">USD</option>
  <option class ="opcion_moneda" value="EUR">EUR</option>
</select>

<br>

    <div class="row row-cols-1 row-cols-md-3 g-4">
  <div v-for="item in paginatedProducts" :key="item.id" class="col">
    <div class="card h-100">
      <img :src="item.imagen" class="card-img-top" :alt="item.nombre" style="width: 100%; height: 600px;">
      <div class="card-body">
        <h5 class="card-title">{{ item.nombre }}</h5>
        <p class="card-text">Precio: {{ (item.precio).toFixed(2) }} {{ divisa }}</p>


        <span>Cantidad:</span> <br>
        <input type="number" v-model="item.cantidad" min="1" placeholder="Cantidad" /> <br>

        <br>

        <button class="btn btn-primary" @click="anadirAlCarrito(item)">Añadir al Carrito</button>
      </div>
    </div>
  </div>
</div>


<div class="pagination">
<button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
<span>Página {{ currentPage }} de {{ totalPages }}</span>
<button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
</div>

  `,
  data() {
    return {
      productos:[
        { id: 1, nombre: "Anillo Unico", precio: 900000, imagen: "img/anillounico.webp", cantidad: 1 },
        { id: 2, nombre: "Orcrist", precio: 700000, imagen: "img/orcrist.webp", cantidad: 1 },
        { id: 3, nombre: "Anduril", precio: 100000, imagen: "img/anduril.webp", cantidad: 1 },
        { id: 4, nombre: "Silmarils", precio: 1000000000, imagen: "img/silmarils.webp", cantidad: 1 },
        { id: 5, nombre: "Corona de Morgoth", precio: 8000000, imagen: "img/coronamorgoth.webp", cantidad: 1 },
        { id: 6, nombre: "Lanza Gil-Galad", precio: 500000, imagen: "img/lanzagilgalad.webp", cantidad: 1 },
        { id: 7, nombre: "Mapa Montaña Solitaria", precio: 20000, imagen: "img/mapamontañasolitaria.webp", cantidad: 1 },
        { id: 8, nombre: "Llave Erebor", precio: 100000, imagen: "img/llaveerebor.webp", cantidad: 1 },
        { id: 9, nombre: "Dardo", precio: 800000, imagen: "img/dardo.webp", cantidad: 1 },
        { id: 10, nombre: "Cerveza Poney Pisador", precio: 3000, imagen: "img/cervezaponeypisador.webp", cantidad: 1 },
        { id: 11, nombre: "Daga de Morgul", precio: 90000, imagen: "img/dagamorgul.webp", cantidad: 1 },
        { id: 12, nombre: "La piedra del Arca", precio: 100000000000000, imagen: "img/piedradelarca.webp", cantidad: 1 },
        { id: 13, nombre: "Barco de Cirdan", precio: 60000000, imagen: "img/barcocirdan.webp", cantidad: 1 },
        { id: 14, nombre: "Terreno de Isengard", precio: 2000000000, imagen: "img/isengard.webp", cantidad: 1 },
        { id: 15, nombre: "Baston de Gandalf", precio: 777777777, imagen: "img/bastongandalf.webp", cantidad: 1 },
        { id: 16, nombre: "Mazo de Sauron", precio: 40000000, imagen: "img/mazosauron.webp", cantidad: 1 },
        { id: 17, nombre: "Armadura Uruk-Hai", precio: 20000, imagen: "img/uruk.webp", cantidad: 1 },
        { id: 18, nombre: "Casa de Bilbo Bolsón", precio: 999999999, imagen: "img/casabilbo.webp", cantidad: 1 },
      ],
      currentPage: 1,
      itemsPerPage: 3,
      carrito: [],
      monedas: [],
      divisa: 'USD'
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.productos.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.productos.slice(start, end);
    },

    totalPrice() {
      return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }
  },
  mounted() {
    this.cargarMonedas(); // esto hace que al cargar el componente se inicie la carga de las monedas disponibles desde el API.
  },

 
  
  
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    anadirAlCarrito(item) {
      const existingItem = this.carrito.find((item_carrito) => item_carrito.id === item.id);

      if (existingItem) {
        existingItem.cantidad += 1; // Incremento la cantidad si el producto ya está en el carrito
      } else {
        
        alert(`Añadido al carrito: ${item.nombre}`);
        const diccionario = {
          "id": item.id,
          "nombre": item.nombre,
          "precio": item.precio,
          "cantidad": 1 
        };
        this.carrito.push(diccionario);
      }
      console.log(this.carrito);
    },
    
    vaciarCarrito(){
      this.carrito = [];
    },
 

    cambiarDivisa() {
  
      this.productos.forEach(producto => {
        if (this.divisa === 'USD') {
          producto.precio = producto.precio_original; 

        } else if (this.divisa === 'EUR') {
          producto.precio = producto.precio_original * this.monedas['EUR'];
        }
      });
    },

    async cargarMonedas() {
        const response = await fetch('https://v6.exchangerate-api.com/v6/bdb9aa775e6bb6b7ef94b7f1/latest/USD');
        const data = await response.json();
        this.monedas = data.conversion_rates; // Guardo las tasas de conversión  (creo que no es necesario si tengo 2 divisas pero al querer hacerlo con todas lo he dejado pese a no terminar con todas las monedas)
        
        this.productos.forEach(producto => {
          producto.precio_original = producto.precio; // Guardo el precio original al cargar las monedas en una nueva propiedad llamada precio_original
        });
    },
  },
}).mount('#app');
