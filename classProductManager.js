class ProductManager {
   
    //Privatizando la propiedad
    #products
    
    constructor() {
        this.#products = []
    }

    //Privatizando el Metodo para Validar productos
    #validateProduct = (title, description, price, thumbnail, code, stock) => {

        // 1) Validando que todos los campos sean Obligatorios 
        if (!title || !description || !price || !thumbnail || !code || !stock) {

            return `Error Producto: ${title} NO fue CARGADO - Faltan Campos`

            // Sì, todos los campos estan bien cargados paso al else   
        } else {

            // Creo que la constante foundCode y le asigno el array de productos
            // le paso el Metodo .find() y comparo el campo 'code' ingresado con cada objeto previo agregado al array
            // Nota: Sì, el 'code' ingresado es igual a uno dentro del Array esta repetido
            const foundCode = this.#products.find(product => product.code === code)

            // 2) Validando que el campo "code" NO este repetido
            if (!foundCode) {

                // Si 'foundCode' es distinto el Campo 'code' NO esta repetido y retorno un true 
                return true

            } else {
                
                // Si el codigo es igual a otro existente, no lo dejo carga y retorno el Error
                return `Error Producto: ${title} NO fue CARGADO - Tiene CODIGO Duplicado`

            }

            

        }


    }

    //Privatizando el Metodo para Generar un Id AutoIncrementable
    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length - 1].id + 1
    
    // Mostrando todo los productos 
    getProducts = () => this.#products

    // Mostrando un Producto buscado por su ID 
    getProductsById = (id) => {

        // Usando el Metodo .find para encontrar un elemento del Array a traves de su ID 
        const product = this.#products.find(product => product.id === id)
        
        if (!product) {
            // SI el Id pasado es distinto al Id encontrado retorno
            return 'Id No encontrado'
        } else {
            // SI el Id pasado es Igual al Id encontrado retorno el elemento encontrado
            return product
        }
        
    }

    // Metodo para Agregar productos al Array 
    addProduct = (title, description, price, thumbnail, code, stock) => {
        
        // Usando el Metodo validateProduct 
        if (this.#validateProduct(title, description, price, thumbnail, code, stock) === true) {
            
            // Sì, todo esta validado procedemos a cargar el producto
            this.#products.push({ id: this.#generateId(), title, description, price, thumbnail, code, stock })

        } else {

            // Si el producto no esta bien cargado reportar el tipo de error 
            console.log(this.#validateProduct(title, description, price, thumbnail, code, stock))

        }

    }
 
}
 

// CORRER EL EJERCICIO CON LA SIGUIENTE RUTA: 
// node ./1-primer_desafio/primer-desafio-backend-vol3/classProductManager.js

// Instanciando un Objeto de la clase ProductManager
const productManager = new ProductManager()

// Tareas del Desafio: 

// 1) Agregando un Primer producto al Array
productManager.addProduct('Manaza', 'fruta', 100, 'URL - WEB', '101', 5000)

// 2) Intentando Agregar 2 productos con el campo 'code' Iguales
productManager.addProduct('Pera', 'fruta', 50, 'URL - WEB', '102', 3000)
productManager.addProduct('Uvas', 'fruta', 50, 'URL - WEB', '102', 3000)

// 3) Intentado Agregar un Producto que le faltan Campos  
productManager.addProduct('Sandia', 'fruta', 100, 'URL - WEB', '104')

// 4) Mostrando Todos los Productos Agregados al Array de Productos
console.log(productManager.getProducts())

// 5) Buscando un Producto dentro del Array a traves de su Id
console.log(productManager.getProductsById(2))

//6) Buscando un Producto que no Existe dentro del Array a traves de su Id
console.log(productManager.getProductsById(3))









