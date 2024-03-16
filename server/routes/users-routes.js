const { getUsers, login, register } = require('../controllers/users-controller');
const { checkUser } = require('../middlewares/users-middleware');

const router = require('express').Router();

router.get('/', getUsers);
router.post('/', checkUser);
router.post('/login', login);
router.post('/register', register);

module.exports = router;