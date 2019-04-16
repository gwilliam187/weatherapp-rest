import mongoose from 'mongoose';

const uri = 'sgu.pdm-commsult.intranet';
const port = '27017';
const user = 'commsult-admin';
const pass = 'password';
const auth_dbName = 'admin';

mongoose.connect(`mongodb://${ user }:${ pass }@${ uri }:${ port }/${ auth_dbName }`,
		{ useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to MongoDB') })

console.log('what')