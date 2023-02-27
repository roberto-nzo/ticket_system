import express from 'express'
import routes from './controllers'

const router = express.Router()

router.route('/roles/register').post(routes.createRole)
router.route('/roles').get(routes.allRoles)
router.route('/roles/:id').delete(routes.deleteRole).patch(routes.updateRole).get(routes.getRole)

module.exports = router
