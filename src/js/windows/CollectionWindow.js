/*
Created by Freshek on 14.10.2017
*/

class CollectionWindow {
	createWindow() {
		this.collectionWindow = WindowFactory.createWindow({
			width: 320,
			maxHeight: 300,
			text: "Collection"
		});

		let controls = [
			{
				name: 'bonusBox',
				type: 'checkbox',
				labelText: 'Collect boxes',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.bonusBox
				},
				event: function () {
					window.settings.settings.bonusBox = this.checked;
				}
			},
			{
				name: 'eventBox',
				type: 'checkbox',
				labelText: 'Collect Event Boxes',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.eventBox
				},
				event: function () {
					window.settings.settings.eventBox = this.checked;
				}
			},
			{
				name: 'materials',
				type: 'checkbox',
				labelText: 'Collect materials',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.materials
				},
				event: function () {
					window.settings.settings.materials = this.checked;
				}
			},
			{
				name: 'cargoBox',
				type: 'checkbox',
				labelText: 'Collect cargo',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.cargoBox
				},
				event: function () {
					window.settings.settings.cargoBox = this.checked;
				}
			},
			{
				name: 'greenOrGoldBooty',
				type: 'checkbox',
				labelText: 'Collect green or gold booty',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.greenOrGoldBooty
				},
				event: function () {
					window.settings.settings.greenOrGoldBooty = this.checked;
				}
			},
			{
				name: 'blueBooty',
				type: 'checkbox',
				labelText: 'Collect blue booty',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.blueBooty
				},
				event: function () {
					window.settings.settings.blueBooty = this.checked;
				}
			},
			{
				name: 'redBooty',
				type: 'checkbox',
				labelText: 'Collect red booty',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.redBooty
				},
				event: function () {
					window.settings.settings.redBooty = this.checked;
				}
			},
			{
				name: 'masqueBooty',
				type: 'checkbox',
				labelText: 'Collect masque booty',
				appendTo: this.collectionWindow,
				attrs: {
					checked : window.settings.settings.masqueBooty
				},
				event: function () {
					window.settings.settings.masqueBooty = this.checked;
				}
			},
		];

		controls.forEach((control) => {
			this[control.name] = ControlFactory.createControl(control);
		});
	}
}