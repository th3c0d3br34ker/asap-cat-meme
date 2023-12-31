const router = require('express').Router();
const memeController = require('../controllers/memes')

router.get('/', memeController.list);
router.get('/:id', memeController.show);
router.post('/', memeController.create);
router.put('/:id', memeController.update);
router.delete('/:id', memeController.remove);

module.exports = router;
