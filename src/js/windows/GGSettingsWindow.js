class GGSettingsWindow {
	createWindow() {
		this.GGSettingsWindow = WindowFactory.createWindow({
			width: 320,
			text: chrome.i18n.getMessage("gghelper")
		});

		let controls = [{
			name: 'ggbot',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("ggbot"),
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.ggbot
			},
			event: function () {
				window.settings.settings.ggbot = this.checked;
			}
		},
		{
			name: 'alpha',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Alpha',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.alpha
			},
			event: function () {
				window.settings.settings.alpha = this.checked;
			}
		},
		{
			name: 'beta',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Beta',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.beta
			},
			event: function () {
				window.settings.settings.beta = this.checked;
			}
		},
		{
			name: 'gamma',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Gamma',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.gamma
			},
			event: function () {
				window.settings.settings.gamma = this.checked;
			}
		},
		{
			name: 'delta',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Delta',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.delta
			},
			event: function () {
				window.settings.settings.delta = this.checked;
			}
		},
		{
			name: 'epsilon',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Epsilon',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.epsilon
			},
			event: function () {
				window.settings.settings.epsilon = this.checked;
			}
		},
		{
			name: 'zeta',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Zeta',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.zeta
			},
			event: function () {
				window.settings.settings.zeta = this.checked;
			}
		},
		{
			name: 'kappa',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Kappa',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.kappa
			},
			event: function () {
				window.settings.settings.kappa = this.checked;
			}
		},
		{
			name: 'lambda',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Lambda',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.lambda
			},
			event: function () {
				window.settings.settings.lambda = this.checked;
			}
		},
		{
			name: 'kronos',
			type: 'checkbox',
			labelText: chrome.i18n.getMessage("jumpin")+' GG Kronos',
			appendTo: this.GGSettingsWindow,
			attrs: {
				checked: window.settings.settings.kronos
			},
			event: function () {
				window.settings.settings.kronos = this.checked;
			}
		}
		]

		controls.forEach((control) => {
			this[control.name] = ControlFactory.createControl(control);
		});
	}
}