// Action sender
var ipc = require('ipc');
var shell = require('shell');
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var webview = document.getElementById("game");
var indicator = document.getElementById("loading");

var doAction = function(action) {
	ipc.send('do-native-action', action);
};

// Application Buttons
var btn_close = document.getElementById('btn-close');
var btn_minimize = document.getElementById('btn-minimize');

btn_close.addEventListener('click', function(e) {
	e.preventDefault();
	doAction('close');
}, false);

btn_minimize.addEventListener('click', function(e) {
	e.preventDefault();
	doAction('minimize');
}, false);

// Ready window actions
onload = function() {
	document.getElementsByTagName('body')[0].className += ' ready';
		
	webview.addEventListener('did-finish-load', function(e) {
		webview.insertCSS('.app { border-radius: 0px!important; }');
	});
	
	webview.addEventListener('new-window', function(e) {
		shell.openExternal(e.url);
	});
}

// Show loading stuff	
var loadstart = function() {
	indicator.classList.remove("hide");
	webview.classList.add("hide");
}

var loadstop = function() {
  indicator.classList.add("hide");
  webview.classList.remove("hide");
}

webview.addEventListener("did-start-loading", loadstart);
webview.addEventListener("did-stop-loading", loadstop);

// Menus
var menu = new Menu();
var template = [{
	label: 'Trivia Crack',
	submenu: [{
		label: 'About Trivia Crack',
		selector: 'orderFrontStandardAboutPanel:'
	}, {
		type: 'separator'
	}, {
		label: 'Services',
		submenu: []
	}, {
		type: 'separator'
	}, {
		label: 'Hide Trivia Crack',
		accelerator: 'Command+H',
		selector: 'hide:'
	}, {
		label: 'Hide Others',
		accelerator: 'Command+Shift+H',
		selector: 'hideOtherApplications:'
	}, {
		label: 'Show All',
		selector: 'unhideAllApplications:'
	}, {
		type: 'separator'
	}, {
		label: 'Quit',
		accelerator: 'Command+Q',
		click: function() {
			doAction('quit');
		}
	}, ]
}, {
	label: 'Edit',
	submenu: [{
		label: 'Undo',
		accelerator: 'Command+Z',
		selector: 'undo:'
	}, {
		label: 'Redo',
		accelerator: 'Shift+Command+Z',
		selector: 'redo:'
	}, {
		type: 'separator'
	}, {
		label: 'Cut',
		accelerator: 'Command+X',
		selector: 'cut:'
	}, {
		label: 'Copy',
		accelerator: 'Command+C',
		selector: 'copy:'
	}, {
		label: 'Paste',
		accelerator: 'Command+V',
		selector: 'paste:'
	}, {
		label: 'Select All',
		accelerator: 'Command+A',
		selector: 'selectAll:'
	}, ]
}, {
	label: 'Window',
	submenu: [{
		label: 'Minimize',
		accelerator: 'Command+M',
		selector: 'performMiniaturize:'
	}, {
		label: 'Close',
		accelerator: 'Command+W',
		click: function() {
			doAction('close');
		}
	}, {
		type: 'separator'
	}, {
		label: 'Bring All to Front',
		selector: 'arrangeInFront:'
	}, ]
}, {
	label: 'Help',
	submenu: [{
		label: 'GitHub Issues',
		click: function() {
			shell.openExternal("https://github.com/shatteringlass/trivia_crack/issues");
		}
	}]
}, ];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
