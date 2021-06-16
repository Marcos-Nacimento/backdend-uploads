const ProductModel = require('../models/ProductModel');

class ProductController {
    async create(req, res) {
        let { name, price, image, categorie } = req.body;
        
        if(!name || !price || !image || !categorie) {
            return res.status(400).end();
        };

        try {
            const product = await ProductModel.create({
                name,
                price,
                image,
                categorie,
            })

            res.json(product);
        }catch(error) {
            res.status(400).send(error);
        };
    };
    async list(req, res) {
        let {page, categorie} = req.params;

        if(!page || !categorie) {
            return res.status(400).end();
        };

        let options = {limit: 10, page: page};
        let query = ProductModel.aggregate([
            {$match: {categorie: categorie}}
        ]);

        try {
            let products = await ProductModel.aggregatePaginate(query, options);
            res.json(products);
        }catch(error) {
            res.status(400).send(error);
        };
    };
    async delete(req, res) {
        let { id } = req.params;

        if(!id) {
            return res.status(400).end();
        };

        try {
            ProductModel.findByIdAndDelete(id, (err, doc) => {
                if(err) {
                    return res.status(400).send('Não foi possivel deletar o produto.');
                };

                res.status(200).send('Produto deletado com sucesso.');
            });
        }catch(error) {
            res.status(400).send(error);
        };
    };
    async update(req, res) {
        let { id, ...data } = req.body;

        if(!id) {
            return res.status(400).end();
        };

        try {
            let product = await ProductModel.findByIdAndUpdate(id, data, {new: true});
            res.json(product);
        }catch(error) {
            res.status(400).send(error);
        };
    };
    async search(req, res) {
        let { query } = req.params;

        try {
            let results = await ProductModel.collection.aggregate([{
                "$search": {
                    "autocomplete": {
                        "query": `${query}`,
                        "path": "name",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3,
                        }
                    }
                }
            }]).toArray();

            res.send(results);
        }catch(error) {
            res.status(400).send(error);
        };
    };
};

module.exports = new ProductController;