import express from 'express';

import { Tree } from '../db/mongodb/models/treeModel';

import { viewUsers, addUser, deleteUser } from './handlers/userHandler';
import { viewCities, addCity, editCity, deleteCity } from './handlers/cityHandler';
import { viewTrees, addTree, editTree, deleteTree } from './handlers/treeHandler';

const router = express.Router();

router.route('/users')
	.get((req, res) => viewUsers(req, res))
	.post((req, res) => addUser(req, res));

router.route('/users/:userId')
	.delete((req, res) => deleteUser(req, res));


router.route('/cities')
	.get((req, res) => viewCities(req, res))
	.post((req, res) => addCity(req, res));

router.route('/cities/:cityId')
	.put((req, res) => editCity(req, res))
	.delete((req, res) => deleteCity(req, res));


router.route('/trees')	
	.get((req, res) => viewTrees(req, res))
	.post((req, res) => addTree(req, res));

router.route('/trees/:treeId')
	.put((req, res) => editTree(req, res))
	.delete((req, res) => deleteTree(req, res));

export default router;