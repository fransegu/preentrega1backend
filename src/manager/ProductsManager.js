import fs from "fs";


class ProductManager {
  constructor(path) {
      this.path = path
  }
  async getProducts(queryObj) {
    const {limit}= queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, 'utf-8')
        const productData = JSON.parse(productsFile)
        return limit ? productData.slice(0, +limit) : productData;
      } else {
        return []
      }}
    catch(error){
      return error
    }}
  async addProduct (product){
    try {
      let {title, description, price, thumbnail, code, stock, status, category} = product
        if (!title || !description || !price || !thumbnail || !stock || !code || !status || !category) {
          console.log("Complete todos los campos")
          return
        }
    let products = await this.getProducts({})
    const id = !products.length ? 1 : products[products.length - 1].id + 1;
    const codeSearched = products.some(p => p.code === code);

    codeSearched ? console.log("Codigo ya agregado") : null;
    const newProduct = {id, ...product}
    products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    console.log('Producto agregado')
          }
    catch (error) {
          console.log(error)
          return error
      }}
    async getProductById(id) {
        try {
            const product = await this.getProducts({})
            const productfind = product.find(p=>p.id===id)
            if(!productfind){
                return 'No se encontro el producto'
            } else {
                return productfind
            }
        } catch (error) {
            return error
        }
      }
      async deleteProductById(id) {
        try {
            const product = await this.getProducts({})
            const newArrayId = product.find(p=>p.id!==id)
            let message = ''
            if (!newArrayId){
              console.log(`El producto con ID: ${id} no existe`)
            }else{
              const newArrayProducts = product.filter(p=> p.id !== id)
            await fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))
            console.log(`El producto con ID: ${id} se eliminó exitosamente`);}
        } catch (error) {
            return error
        }
      }
      async updateProduct(id, update) {
        try { 
          const products = await this.getProducts({})
          const prodIndex = products.findIndex(p=> p.id == id)
          if (prodIndex !== -1) {
            for (const key in update) {
            if (key == "code" && products[prodIndex].code !== update.code) {                        
              const isCodeAlreadyAdded = products.some((prod)=> prod.code === update.code)
              if (isCodeAlreadyAdded) {
                console.log("El producto ya existe")
                return
            }                        
        }
        if (products[prodIndex].hasOwnProperty(key)){
          products[prodIndex][key] = update[key]
        }else{
          console.log('No existe tal propiedad en nuestra base de datos')
          return
      }                                            
  }
  await fs.promises.writeFile(this.path, JSON.stringify(products))
  console.log(`El producto con ID: ${id} fue actualizado`) 
    }else {
    console.log(`El producto con ID: ${id} no existe`)
}}
catch (error) {
    return error
}
}}

export const manager= new ProductManager("products.json");