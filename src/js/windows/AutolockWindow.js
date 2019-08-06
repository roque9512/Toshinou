/*
Created by Freshek on 28.10.2017
*/

class AutolockWindow {
	createWindow() {
		this.autolockWindow = WindowFactory.createWindow({
			width: 320,
			text: "A-Oto Kitleme"
		});

		let options = [
		{
			name: 'lockPlayers',
			type: 'checkbox',
			labelText: 'Oyunculara Otomatik Kilitle (Anahtar: Z)',
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
			labelText: 'NPC lere Otomatik Kilitle (Anahtar: X)',
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
			labelText: 'NPClerin kilitlenmesini engelle',
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