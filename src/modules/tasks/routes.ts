import express from 'express'
import routes from './controllers'
import Protection from '../../middleware/authMiddleware'

const router = express.Router()
const protection = new Protection()

router.route('/tasks/register').post(routes.createTask)
router.route('/tasks').get(routes.allTasks)
router.route('/tasks/:id').delete(protection.protect_admin, routes.deleteTask).patch(protection.protect_admin, routes.updateTask).get(protection.protect, routes.getOne)

module.exports = router
