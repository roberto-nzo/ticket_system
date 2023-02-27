import express from 'express'
import routes from './controllers'

const router = express.Router()

router.route('/priority/register').post(routes.createPriority)
router.route('/priority').get(routes.allPriorities)
router.route('/priority/:id').delete(routes.deletePriority).patch(routes.updatePriority).get(routes.getPriority)

module.exports = router
