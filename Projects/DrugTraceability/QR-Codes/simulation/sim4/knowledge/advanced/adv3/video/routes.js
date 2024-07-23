const { Router } = require('express');
const controller = require('./hist/controller');

const router = Router();

router.post('/decrypt', controller.decryptedData);

module.exports = router;


// router.post('/scan', controller.scanQrCode);
// // manufacturer
// router.post('/scan/manufacturer', manuController.scanCodeForManufacturer);
// router.post('/display-manufacturer', manuController.displayManufacturerInfo);

// // primary distributor
// router.post('/scan/primary-distributor', primDistController.scanCodeForPrimaryDistributor); 
// router.post('/display-distributor', primDistController.displayPrimaryDistributorInfo);

// // secondary distributor
// router.post('/scan/secondary-distributor', seconDistController.scanCodeForSecondaryDistributor);
// router.post('/display-secondary-distributor', seconDistController.displaySecondaryDistributorInfo);

// // retailer
// router.post('/scan/retailer', retailerController.scanCodeForRetailer);
// router.post('/display-retailer', retailerController.displayRetailerInfo);

// // entities
// router.post('/update-pack-entity-info', controller.updatePackEntityInfo);
// router.post('/update-box-entity-info', controller.updateBoxEntityInfo);

