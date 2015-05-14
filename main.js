var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

var mainWindow = null;

// App
app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		resizable: false,
		'web-preferences': {
			plugins: true
		},
		title: 'Loading'
	});

	mainWindow.loadUrl('file://' + __dirname + '/app.html');
});

app.on('activate-with-no-open-windows', function () {
	mainWindow.show();
});

// API
ipc.on('do-native-action', function(event, action) {
	switch (action) {
		case 'quit':
			app.quit();
			break;
			
		case 'close':
			mainWindow.hide();
			break;
			
		case 'minimize':
			mainWindow.minimize();
			break;
	}
});