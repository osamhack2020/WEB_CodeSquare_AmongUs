const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

//Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

let urlinfo = db.get('urlinfo').value();

server.get('/urlinfo', (req, res) => {
	return res.json(urlinfo);
});

server.delete('/urlinfo/:name', (req, res) => {
	//const infoId = parseInt(req.params.id, 10);
	/*
	if(!infoId) {
		return res.status(400).json({err: 'Incorrect id'});
	}
	*/
	let retval = db.get('urlinfo').remove({name: req.params.name}).write();
	if(retval.length === 0) {
		return res.status(400).json({err: 'Invalid name'});
	}
	return res.status(204).send();

});

server.post('/urlinfo', (req, res) => {
	const name = req.body['name'] || '';
	const addr = req.body['addr'] || '';

	if(!name.length){
		return res.status(400).json({err: 'Incorrect name'});
	}
	if(!addr.length){
		return res.status(400).json({err: 'Incorrect address'});
	}
	if(db.get('urlinfo').find({name: name}).value()) {
		return res.status(400).json({err: 'User '+name+' aleady exists'});
	}

	const id = urlinfo.reduce((maxId, name) => {
               return name.id > maxId ? name.id : maxId;
        }, 0) + 1;

        const newInfo = {
                id: id,
                name: name,
                addr: addr
        };
        db.get('urlinfo').push(newInfo).write();
        return res.status(201).json(newInfo);
});

server.use(router);

let port = 8890;
server.listen(port, () => {
  console.log(`JSON Server is running, port(${port})`)
});
