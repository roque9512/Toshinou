class ShipSettings{
    createWindow() {
        this.shipSettingsWindow = WindowFactory.createWindow({
            width: 320,
            text: "A-Gemi Ayarlari"
        });
    
        let controls = [
        {
            name: 'useAbility',
            labelText: chrome.i18n.getMessage('useability'),
            type: 'checkbox',
            appendTo: this.shipSettingsWindow,
            attrs:{
                checked: window.settings.settings.useAbility
            },
            event: function () {
                $(".ability").prop("disabled", !this.checked);
                window.settings.settings.useAbility = this.checked;
            }
        },
        {
            name: 'autoCamouflage',
            labelText: "Oto Kamuflaj",
            type: 'checkbox',
            appendTo: this.shipSettingsWindow,
            attrs:{
                checked: window.settings.settings.autoCamo
            },
            event: function () {
                $(".camo").prop("disabled", !this.checked );
                window.settings.settings.autoCamo = this.checked;
            }
        },
        {
            name: 'attackConfig',
            labelText: "Saldiri Konfisi",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"1":1, "2":2},
            attrs:{
                value:window.settings.settings.attackConfig
            },
            event: function () {
                window.settings.settings.attackConfig = this.value;
            }
        },
        {
            name: 'flyingConfig',
            labelText: "Ucus Konfisi",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"1":1, "2":2},
            attrs:{
                value:window.settings.settings.flyingConfig
            },
            event: function () {
                window.settings.settings.flyingConfig = this.value;
            }
        },
        {
            name: 'fleeingConfig',
            labelText: "Kacıs Konfisi: ",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"1":1, "2":2},
            attrs:{
                class: "configs",
                value : window.settings.settings.fleeingConfig
            },
            event: function () {
                window.settings.settings.fleeingConfig = parseInt(this.value);
            }
        },
        {
            name: 'attackFormation',
            labelText: "Saldiri Duzeni",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                value: window.settings.settings.attackFormation
            },
            event: function () {
                window.settings.settings.attackFormation = this.value;
            }
        },
        {
            name: 'flyingFormation',
            labelText: "Ucus Duzeni",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                value: window.settings.settings.flyingFormation
            },
            event: function () {
                window.settings.settings.flyingFormation = this.value;
            }
        },
        {
            name: 'fleeingFormation',
            labelText: "Kacıs Formasyon Slotu: ",
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "formations",
                value : window.settings.settings.fleeingFormation
            },
            event: function () {
                window.settings.settings.fleeingFormation = parseInt(this.value);
            }
        },
        {
            name: 'abilitySlot',
            labelText: "Yetenek Slotu",
            type: "select",
            disabled: true && !window.settings.settings.useAbility,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "ability",
                value: window.settings.settings.abilitySlot
            },
            event: function () {
                window.settings.settings.abilitySlot = this.value;
            }
        },
        {
            name: 'camouflageSlot',
            labelText: "Kamuflaj Slotu",
            type: "select",
            disabled: true && !window.settings.settings.autoCamo,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "camo",
                value: window.settings.settings.autoCamo
            },
            event: function () {
                window.settings.settings.camouflageSlot = this.value;
            }
        },
        {
            name: 'reviveType',
            labelText: chrome.i18n.getMessage('reviveat'),
            type: "select",
            appendTo: this.shipSettingsWindow,
            options: {0:chrome.i18n.getMessage('base'), 1:chrome.i18n.getMessage('gate'), 2:chrome.i18n.getMessage('spot')},
            attrs:{
                value: window.settings.settings.reviveType
            },
            event: function () {
                window.settings.settings.reviveType = this.value;
            }
        },
        {
            name: 'reviveLimit',
            labelText: chrome.i18n.getMessage('revivelimit'),
            type: "number",
            appendTo: this.shipSettingsWindow,
            labelBefore: true,
            attrs:{
                min: 0,
                max: 100,
                step: 1,
                value: 5
            },
            event: function () {
                window.settings.settings.reviveLimit = this.value;
                $('span:last-child', this.label).text(' (' + this.value + ')');
            }
        },
        {
            name: 'enablePet',
            labelText: chrome.i18n.getMessage('enablepet'),
            type: 'checkbox',
            appendTo: this.shipSettingsWindow,
            attrs:{
                checked: window.settings.settings.enablePet
            },
            event: function () {
                window.settings.settings.enablePet = this.checked;
                $(".petstuff").prop("disabled", !this.checked);
            }
        },
        {
            name: "petModule",
            labelText: chrome.i18n.getMessage('petmodule'),
            type: "select",
            disabled: true && !window.settings.settings.enablePet,
            appendTo: this.shipSettingsWindow,
            labelBefore: true,
            options: {2:"Guard Mode", 10:"Kamikaze", 4:"Auto loot", 5:"Collect Resource"}, // , 6:"Enemy locator"
            attrs:{
                class: "petstuff",
                value: window.settings.settings.petModule
            },
            event: function() {
                window.settings.settings.petModule = this.value;
            }
        },
        {
            name: 'petReviveLimit',
            labelText: chrome.i18n.getMessage('petrevivelimit'),
            type: "range",
            appendTo: this.shipSettingsWindow,
            labelBefore: true,
            attrs:{
                min: 0,
                max: 100,
                step: 1,
                value: 5
            },
            event: function () {
                window.settings.settings.petReviveLimit = this.value;
                $('span:last-child', this.label).text(' (' + this.value + ')');
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
    }
}
