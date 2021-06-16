const { Router } = require('express');
const upload = require('../config/fileStoreEngine');

const route = Router();

const ProductController = require('../controllers/ProductController');
const ImageUploadController = require('../controllers/ImageUploadController');

route.get('/product/list/:categorie/:page', ProductController.list);
route.get('/product/search/:query', ProductController.search);
route.post('/product/create', ProductController.create);
route.put('/product/update', ProductController.update);
route.post('/images/upload', upload.single('images'), ImageUploadController.store);
route.delete('/product/delete/:id', ProductController.delete);


module.exports = route;
