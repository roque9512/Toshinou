/*
Created by Freshek on 28.10.2017
*/

class AutolockWindow {
	createWindow() {
		this.autolockWindow = WindowFactory.createWindow({
			width: 320,
			text: "Autolocker"
		});

		let options = [
		{
			name: 'lockPlayers',
			type: 'checkbox',
			labelText: 'Autolock Players (key: z)',
			appendTo: this.autolockWindow,
			attrs:{
				checked: window.settings.settings.lockPlayer
			},
			event: function () {
				window.settings.settings.lockPlayers = this.checked;
			}
		},
		{
			name: 'lockNpc',
			type: 'checkbox',
			labelText: 'Autolock NPCs (key: x)',
			appendTo: this.autolockWindow,
			attrs:{
				checked: window.settings.settings.lockNpc
			},
			event: function () {
			window.settings.settings.lockNpc = this.checked;
			}
		},
		{
			name: 'excludeNpcs',
			type: 'checkbox',
			labelText: 'Exclude NPCs from locking',
			appendTo: this.autolockWindow,
			attrs:{
				checked: window.settings.settings.excludeNpcs
			},
			event: function () {
			window.settings.settings.excludeNpcs = this.checked;
			}
		}
		];

		options.forEach((option) => {
			this[option.name] = ControlFactory.createControl(option);
		});

	}
}