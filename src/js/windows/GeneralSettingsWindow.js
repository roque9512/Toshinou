class GeneralSettingsWindow {
	createWindow() {
	this.botSettingsWindow = WindowFactory.createWindow({
	width: 320,
	text: chrome.i18n.getMessage("general")
	});

	let controls = [
	{
		name: 'palladium',
		labelText: chrome.i18n.getMessage("palladiumbot"),
		appendTo: this.botSettingsWindow,
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
		event: function () {
			window.settings.settings.moveRandomly = this.checked;
		}
	},
	{
		name: 'killNpcs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("killnpcs"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.killNpcs = this.checked;
		}
	},
	{
		name: 'fleeFromEnemy',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("fleefromenemy"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.fleeFromEnemy = this.checked;
		}
	},
	{
		name: 'jumpFromEnemy',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("jumpandreturn"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.jumpFromEnemy = this.checked;
		}
	},
	{
		name: 'dodgeTheCbs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("dodgethecbs"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.dodgeTheCbs = this.checked;
		}
	},
	{
		name: 'avoidAttackedNpcs',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("avoidattackednpc"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.avoidAttackedNpcs = this.checked;
		}
	},
	{
		name: 'circleNpc',
		labelText: chrome.i18n.getMessage("circle"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.circleNpc = this.checked;
		}
	},
	{
		name: 'npcCircleRadius',
		labelText: chrome.i18n.getMessage("circleradius"),
		type: 'range',
		appendTo: this.botSettingsWindow,
		labelBefore: true,
		attrs: {
			min: 1,
			max: 800,
			step: 1,
			value: 500
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
		event: function () {
			window.settings.settings.dontCircleWhenHpBelow25Percent = this.checked;
		}
	},
	{
		name: 'resetTargetWhenHpBelow25Percent',
		type: 'checkbox',
		labelText: chrome.i18n.getMessage("resettarget"),
		appendTo: this.botSettingsWindow,
		event: function () {
			window.settings.settings.resetTargetWhenHpBelow25Percent = this.checked;
		}
	},
	{
		name: 'repairWhenHpIsLowerThanPercent',
		labelText: chrome.i18n.getMessage("repairwhenhp"),
		type: 'range',
		appendTo: this.botSettingsWindow,
		labelBefore: true,
		attrs: {
			min: 0,
			max: 100,
			step: 1,
			value: 30
		},
		event: function (ev) {
			window.settings.settings.repairWhenHpIsLowerThanPercent = this.value;
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
			value:60
		},
		event: function () {
			window.settings.settings.refreshTime = this.value;
		}
	},

	];

	controls.forEach((control) => {
		if(control.type == "select"){
			this[control.name] = ControlFactory.select(control);
		}else{
			this[control.name] = ControlFactory.createControl(control);
		}
	});

	let saveButton = jQuery('<div class="saveButton"><button class="btn_save save btn">💾 Save Settings</button></div>');
	this.botSettingsWindow.append(saveButton);
	let clearButton = jQuery('<div class="clearButton"><button class="btn_clear save btn">♲ Clear Saved Settings</button></div>');
	this.botSettingsWindow.append(clearButton);
	}
}
