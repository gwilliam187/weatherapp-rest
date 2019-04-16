import express from 'express';

const router = express.Router();

router.route('/users')
	// Creates a user
	.post((req, res) => {

	})
	
	// Gets all users
	.get((req, res) => {

	});

router.route('/users/:userId')
	// Gets a user with specified ID
	.get((req, res) => {

	});

// router.get('/', (req, res) => {
// 	res.send('API GET here');
// });

// router.post('/', (req, res) => {
// 	res.send('API POST here')
// });

// router.put('/', (req, res) => {
// 	res.send('API PUT here')
// });

// router.delete('/', (req, res) => {
// 	res.send('API DELETE here')
// });

export default router;