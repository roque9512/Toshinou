class GeneralSettingsWindow {
	createWindow() {
	this.botSettingsWindow = WindowFactory.createWindow({
		width: 320,
		text: chrome.i18n.getMessage("general")
	});

	let controls = [
	{
		name: 'palladium',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("palladiumbot"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.palladium
		},
		event: function () {
			window.settings.settings.palladium = this.checked;
			window.settings.settings.moveRandomly = this.checked;
			window.settings.settings.circleNpc = this.checked;
			window.settings.settings.killNpcs = this.checked;
			let palladiumBlackList = [
				"-=[ Battleray ]=-",
				"( Uber Annihilator )", 
				"( Uber Saboteur )", 
				"( Uber Barracuda )",
			];
			palladiumBlackList.forEach(npc => {
				window.settings.setNpc(npc, true);
			});
		}
	},
	{
		name: 'moveRandomly',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("moverandomly"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.moveRandomly
		},
		event: function () {
			window.settings.settings.moveRandomly = this.checked;
		}
	},
	{
		name: 'killNpcs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("killnpcs"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.killNpcs
		},
		event: function () {
			window.settings.settings.killNpcs = this.checked;
		}
	},
	{
		name: 'fleeFromEnemy',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("fleefromenemy"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.fleeFromEnemy
		},
		event: function () {
			window.settings.settings.fleeFromEnemy = this.checked;
		}
	},
	{
		name: 'stopFleeing',
		type: 'checkbox',
		labelText: "Stop fleeing when enemy gone",
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.stopFleeing
		},
		event: function () {
			window.settings.settings.stopFleeing = this.checked;
		}
	},
	{
		name: 'jumpFromEnemy',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("jumpandreturn"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.jumpFromEnemy
		},
		event: function () {
			window.settings.settings.jumpFromEnemy = this.checked;
		}
	},
	{
		name: 'dodgeTheCbs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("dodgethecbs"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.dodgeTheCbs
		},
		event: function () {
			window.settings.settings.dodgeTheCbs = this.checked;
		}
	},
	{
		name: 'avoidAttackedNpcs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("avoidattackednpc"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.avoidAttackedNpcs
		},
		event: function () {
			window.settings.settings.avoidAttackedNpcs = this.checked;
		}
	},
	{
		name: 'circleNpc',
		labelText: chrome.i18n.getMessage("circle"),
		type: "checkbox",
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.circleNpc
		},
		event: function () {
			window.settings.settings.circleNpc = this.checked;
		}
	},
	{
		name: 'npcCircleRadius',
		labelText: "Circle radius <span> ("+window.settings.settings.npcCircleRadius+"px)</span>",
		type: 'range',
		appendTo: this.botSettingsWindow,
		labelBefore: true,
		attrs: {
			min: 1,
			max: 1000,
			step: 1,
			value: window.settings.settings.npcCircleRadius
		},
		event: function (ev) {
			window.settings.settings.npcCircleRadius = this.value;
			$('span:last-child', this.label).text(' (' + this.value + 'px)');
		}
	},
	{
		name: 'dontCircleWhenHpBelow25Percent',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("dontcirclewhenhp"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.dontCircleWhenHpBelow25Percent
		},
		event: function () {
			window.settings.settings.dontCircleWhenHpBelow25Percent = this.checked;
		}
	},
	{
		name: 'repairStartPercent',
		labelText: "Repair when HP <span> ("+window.settings.settings.repairStartPercent+"%)</span>",
		type: 'range',
		appendTo: this.botSettingsWindow,
		labelBefore: true,
		attrs: {
			min: 0,
			max: 100,
			step: 1,
			value: window.settings.settings.repairStartPercent
		},
		event: function (ev) {
			window.settings.settings.repairStartPercent = this.value;
			$('span:last-child', this.label).text(' (' + this.value + '%)');
		}
	},
	{
		name: 'repairEndPercent',
		labelText: 'Stop repairing at: <span> ('+window.settings.settings.repairEndPercent+'%)</span> ',
		type: 'range',
		appendTo: this.botSettingsWindow,
		labelBefore: true,
		attrs: {
			min: 0,
			max: 100,
			step: 1,
			value: window.settings.settings.repairEndPercent
		},
		event: function (ev) {
			window.settings.settings.repairEndPercent = this.value;
			$('span:last-child', this.label).text(' (' + this.value + '%)');
		}
	},
	{
		name: 'workmap',
		labelText: chrome.i18n.getMessage('workmap'),
		type: 'select',
		appendTo: this.botSettingsWindow,
		options: {0:"any", 2:"1-2", 3:"1-3", 4:"1-4", 6:"2-2", 7:"2-3", 8:"2-4", 10:"3-2", 11:"3-3", 12:"3-4", 13:"4-1", 14:"4-2", 15:"4-3", 16:"4-4", 29:"4-5", 17:"1-5", 18:"1-6", 19:"1-7", 20:"1-8", 21:"2-5", 22:"2-6", 23:"2-7", 24:"2-8", 25:"3-5", 26:"3-6", 27:"3-7", 28:"3-8"},
		attrs: {
			value : window.settings.settings.workmap
		},
		event: function (ev) {
			window.settings.settings.workmap = this.value;
		}
	},
	{
		name: 'enableRefresh',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("enablerefresh"),
		appendTo: this.botSettingsWindow,
		attrs: {
			checked : window.settings.settings.enableRefresh
		},
		event: function () {
			window.settings.settings.enableRefresh = this.checked;
		}
	},
	{
		name: 'refreshTime',
		labelText: chrome.i18n.getMessage("refreshtime"),
		type: 'number',
		labelBefore: true,
		appendTo: this.botSettingsWindow,
		attrs:{
			size: 2,
			min: 30,
			max: 120,
			value: window.settings.settings.refreshTime
		},
		event: function () {
			window.settings.settings.refreshTime = this.value;
		}
	},

	];

	controls.forEach((control) => {
		this[control.name] = ControlFactory.createControl(control);
	});

	let saveButton = jQuery('<div class="saveButton"><button class="btn_save save btn">💾 Save Settings</button></div>');
	this.botSettingsWindow.append(saveButton);
	let clearButton = jQuery('<div class="clearButton"><button class="btn_clear save btn">♲ Clear Saved Settings</button></div>');
	this.botSettingsWindow.append(clearButton);
	}
}
