const express = require('express');
const { Router } = express;
const aplication = express();

//Defining Routes
const routeProducts = Router();

//json
aplication.use(express.json());
aplication.use(express.urlencoded({ extended: true}));

//Public
aplication.use(express.static(__dirname + '/public'));

//Routes
const port = 8080;

class Container {
    constructor(products){
        this.products = products;
    }

    save(object) {
        const id = 1;
        console.log(object);
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


//Endpoints
routeProducts.get('/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const product = products.getById(id);
    if (product) {
      response.json(product);
    } else {
      response.status(404);
      response.json({ error : 'Product not found' });
    }
});

routeProducts.get('/', (request, response) => {
    const productList = products.getAll();
    response.json(productList);
});
  
routeProducts.post('/', (request, response) => {
    const product = request.body;
    products.save(product);
    response.send('ok');
});
  
routeProducts.put('/:id', (request, respuesta) => {
    const id = parseInt(request.params.id);
});
  
routeProducts.delete('/:id', (request, respuesta) => {
    const id = parseInt(request.params.id);
    products.delete(id);
    response.send('Producto Eliminado');
});

aplication.use('/products', routeProducts);
aplication.use('/api/products', routeProducts);



//Server
const server = aplication.listen(port, () => {
    console.log(`Server listening to: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));