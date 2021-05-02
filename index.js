const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(
	http,
	{
		cors: {
			origin: 'http://localhost:3000',
			method: ['GET', 'POST']
		}
	}
);

app.use(cors());

io.on('connection', (socket) => {
	console.log('Conectou');

	socket.on('disconnect', () => {
		console.log('Desconectou');
	});
	socket.on('message', (message) => {
		io.emit('serverMessage', { message: message });
	});
	socket.emit('welcome', ('Bem vindo(a)'));
	socket.broadcast.emit('serverMessage', { message: 'Algum fulano se conectou' });
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
	console.log('Servindo');
});