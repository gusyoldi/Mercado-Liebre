const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
	// Root - Show all products
	index: (req, res) => {
	  res.render('products', {products, toThousand});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId = req.params.id;
		const product = products.find((p) => Number(p.id) === Number(productId));
		res.render('detail', {product, toThousand})
	},

	//Create - Form to create
	create: (req, res) => {
    res.render('product-create-form');
    },

	// Create -  Method to store
	store: (req, res) => {
		let id = products[products.length - 1].id + 1;
		let image = "default-image.png";
		
		if (req.file) {
		  image = req.file.filename;
		}
	
		let newProduct = {
		  id,
		  ...req.body,
		  image,
		};
	
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
	
		res.redirect("/");
	  },

	  // Update - Form to edit
  
	  edit: (req, res) => {
  
		const productId = req.params.id;
		const product = products.find((p) => Number(p.id) === Number(productId));
		
  
		  res.render('product-edit-form', {product})
	  },
	  
	  // 	// Update - Method to update
	  	update: (req, res) => {

			const productId = req.params.id;
			let product = products.find((p) => Number(p.id) === Number(productId));

			let image = product.image;
			if (req.file) {
				image = req.file.filename;
			}

			product = {
				...req.body,
				id: productId,
				image,
			};

			const updateProducts = products.map(p => {
				if (p.id == product.id) {
					return (p = { ...product });
				}
				return p;
			});

			fs.writeFileSync(productsFilePath, JSON.stringify(updateProducts), "UTF-8");

			res.redirect('/')
	  	
	  	},
		  
		  	// Delete - Delete one product from DB
		  	
			  destroy : (req, res) => {
		  		productId = req.params.id;
				let finalProducts = products.filter(p => p.id != productId);

				fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(finalProducts), 'UTF-8');

				res.redirect("/");
		  	}
		  };






module.exports = productsController;