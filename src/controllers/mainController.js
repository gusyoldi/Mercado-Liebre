const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
	index: (req, res) => {
		
		//BUSCANDO ULTIMOS VISITADOS
		let ultimosVisitados = products.filter(product => product.category == 'visited');

		//BUSCANDO EN OFERTA
		let enOferta = products.filter(product => product.discount != 0);

		res.render('index', { ultimosVisitados, enOferta, toThousand });
	},
	
	search: (req, res) => {
		res.render('results');
	},
};

module.exports = mainController;
