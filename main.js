const express = require('express');
const { Router } = express;
const aplication = express();

//Defining Routes
const routeProducts = Router();


//Routes
const port = 8080;

class Container {
    constructor(products){
        this.products = products;
    }

    save(object) {
        let id = 1;
        this.products.forEach(element => {
            if(element.id >= id){
                id = element.id + 1;
            }
        });
        object.id = id;
        this.products.push(object);
        return id;
    }

    getById(id){
        let selectedObject = null;
        this.products.forEach(element =>{
            if(element.id == id) {
                selectedObject = element;
            }
        });
        return selectedObject;
    }

    getAll() {
        return this.products;
    }

    deleteById(id) {
        let indexSelected = -1;
        this.products.forEach((element, index) => {
            if(element.id == id) {
                indexSelected = index;
            }
        });
        if (indexSelected != -1) {
            this.products.splice(indexSelected, 1);
        }
    }

    deleteAll() {
        this.products = [];
    }

}

const products = new Container([]);

//Testing
products.save({
    title:'Queso',
    price: 1250,
    thumbnail:'https://www.lacteoslatam.com/wp-content/uploads/2022/09/Estudio-de-la-transferencia-de-NaCl-en-el-queso-costeno-picado.jpg'
});
products.save({
    title:'Jamon',
    price: 2100,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_712474-MLA46939913329_082021-O.jpg'
});
products.save({
    title:'Mortadela',
    price: 1340,
    thumbnail:'https://tusuper.com.ar/image/cache/catalog/P2020/Carnes-Fiambres/mortadela---800x800.jpg'
});
products.save({
    title:'Salame',
    price: 1930,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_681853-MLA47272906419_082021-O.jpg'
});

//Endpoints
routeProducts.get('/:id', async (petition, response) => {
    const id = parseInt(petition.params.id);
    const product = products.getById(id);
    if (product) {
      response.json(product);
    } else {
      response.status(404);
      response.json({ error : 'Product not found' });
    }
});

routeProducts.get('/', (petition, response) => {
    const productList = products.getAll();
    response.json(productList);
});
  
routeProducts.post('/', (peticion, respuesta) => {
});
  
routeProducts.put('/:id', (peticion, respuesta) => {
});
  
routeProducts.delete('/:id', (peticion, respuesta) => {
});

aplication.use('/products', routeProducts);

//json
aplication.use(express.json());
aplication.use(express.urlencoded({ extended: true}));



//Server
const server = aplication.listen(port, () => {
    console.log(`Server listening to: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));