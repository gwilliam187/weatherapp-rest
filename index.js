import express from 'express';

import restApiRouter from './routes/restApi'; 

const app = express();
const port = 8088;

app.use('/api', restApiRouter);

app.get('/', (req, res) => {
	res.send('GET here');
});

app.post('/', (req, res) => {
	res.send('POST here')
});

app.put('/', (req, res) => {
	res.send('PUT here')
});

app.delete('/', (req, res) => {
	res.send('DELETE here')
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});