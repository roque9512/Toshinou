class GGSettingsWindow {
	createWindow() {
		this.GGSettingsWindow = WindowFactory.createWindow({
			width: 320,
			text: chrome.i18n.getMessage("gghelper")
		});

		let controls = [{
			name: 'ggbot',
			labelText: chrome.i18n.getMessage("ggbot"),
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.ggbot = this.checked;
			}
		},
		{
			name: 'alpha',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Alpha',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.alpha = this.checked;
			}
		},
		{
			name: 'beta',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Beta',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.beta = this.checked;
			}
		},
		{
			name: 'gamma',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Gamma',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.gamma = this.checked;
			}
		},
		{
			name: 'delta',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Delta',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.delta = this.checked;
			}
		},
		{
			name: 'epsilon',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Epsilon',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.epsilon = this.checked;
			}
		},
		{
			name: 'zeta',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Zeta',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.zeta = this.checked;
			}
		},
		{
			name: 'kappa',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Kappa',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.kappa = this.checked;
			}
		},
		{
			name: 'lambda',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Lambda',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.lambda = this.checked;
			}
		},
		{
			name: 'kronos',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Kronos',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.kronos = this.checked;
			}
		},/*
		{
		name: 'hades',
		labelText: chrome.i18n.getMessage("jumpin")+' GG Hades',
		appendTo: this.GGSettingsWindow,
		event: function () {
		window.settings.settings.hades = this.checked;
		}
		},*/
		{
			name: 'kuiper',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Kuiper',
			appendTo: this.GGSettingsWindow,
			event: function () {
				window.settings.settings.kuiper = this.checked;
			}
		}
		]

		controls.forEach((control) => {
			this[control.name] = ControlFactory.createControl(control);
		});
	}
}