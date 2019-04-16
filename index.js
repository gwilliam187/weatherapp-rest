import express from 'express';
import bodyParser from 'body-parser';

import restApiRouter from './routes/restApi'; 
import mongo from './db/mongodb/mongo';

const app = express();
const port = 8088;

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', restApiRouter);

// app.get('/', (req, res) => {
// 	res.send('GET here');
// });

// app.post('/', (req, res) => {
// 	res.send('POST here')
// });

// app.put('/', (req, res) => {
// 	res.send('PUT here')
// });

// app.delete('/', (req, res) => {
// 	res.send('DELETE here')
// });

app.listen(port, () => {
	console.log('Listening on port ' + port);
});