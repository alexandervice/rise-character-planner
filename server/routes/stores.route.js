const StoreController = require("../controllers/stores.controller");

module.exports = app => {
    app.post('/api/stores/create', StoreController.createNewStore);
    app.get('/api/stores/find/all', StoreController.findAllStores);
    app.get('/api/stores/find/:id', StoreController.findOneStore);
    // Patch only changes values in the req.body
    app.patch('/api/stores/update/:id', StoreController.updateStore); 
    app.delete('/api/stores/delete/:id', StoreController.deleteStore);
}
