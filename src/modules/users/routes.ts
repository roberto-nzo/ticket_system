import express from 'express'
import routes from './controllers'
import Protection from '../../middleware/authMiddleware'

const protection = new Protection()

const router = express.Router()

router.route('/users/register').post(routes.registerUser)
router.route('/users').get(routes.allUsers)
router.route('/users/:id').delete(routes.deleteUser).patch(routes.updateUser).get(routes.getOne)
router.route('/users/login').post(routes.loginUser)

module.exports = router
