class ShipSettings{
    createWindow() {
        this.shipSettingsWindow = WindowFactory.createWindow({
            width: 320,
            text: "Ship Settings"
        });
    
        let controls = [
        {
            name: 'autoChangeConfig',
            labelText: chrome.i18n.getMessage('autochangeconfig'),
            appendTo: this.shipSettingsWindow,
            event: function () {
                $(".configs").prop("disabled", !this.checked );
                window.settings.settings.autoChangeConfig = this.checked;
            }
        },
        {
            name: 'changeFormation',
            labelText: chrome.i18n.getMessage('changedroneformation'),
            appendTo: this.shipSettingsWindow,
            event: function () {
                $(".formations").prop("disabled", !this.checked);
                window.settings.settings.changeFormation = this.checked;
            }
        },
        {
            name: 'changeMode',
            labelText: "Change to flying mode when looking for npcs/boxes",
            appendTo: this.shipSettingsWindow,
            attrs: {
                checked : window.settings.settings.changeMode
            },
            event: function () {
                window.settings.settings.changeMode = this.checked;
            }
        },
        {
            name: 'useAbility',
            labelText: chrome.i18n.getMessage('useability'),
            appendTo: this.shipSettingsWindow,
            event: function () {
                $(".ability").prop("disabled", !this.checked);
                window.settings.settings.useAbility = this.checked;
            }
        },
        {
            name: 'autoCamouflage',
            labelText: "Auto camo",
            appendTo: this.shipSettingsWindow,
            event: function () {
                $(".camo").prop("disabled", !this.checked );
                window.settings.settings.autoCamo = this.checked;
            }
        },
        {
            name: 'attackConfig',
            labelText: chrome.i18n.getMessage('attackconfig'),
            type: "select",
            disabled: true && !window.settings.settings.autoChangeConfig,
            appendTo: this.shipSettingsWindow,
            options: {"1":1, "2":2},
            attrs:{
                class: "configs"
            },
            event: function () {
                window.settings.settings.attackConfig = this.value;
            }
        },
        {
            name: 'flyingConfig',
            labelText: chrome.i18n.getMessage('flyingconfig'),
            type: "select",
            disabled: true && !window.settings.settings.autoChangeConfig,
            appendTo: this.shipSettingsWindow,
            options: {"1":1, "2":2},
            attrs:{
                class: "configs"
            },
            event: function () {
                window.settings.settings.flyingConfig = this.value;
            }
        },
        {
            name: 'attackFormation',
            labelText: chrome.i18n.getMessage('attackformationslot'),
            type: "select",
            disabled: true && !window.settings.settings.changeFormation,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "formations"
            },
            event: function () {
                window.settings.settings.attackFormation = this.value;
            }
        },
        {
            name: 'flyingFormation',
            labelText: chrome.i18n.getMessage('flyingformationslot'),
            type: "select",
            disabled: true && !window.settings.settings.changeFormation,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "formations "
            },
            event: function () {
                window.settings.settings.flyingFormation = this.value;
            }
        },
        {
            name: 'abilitySlot',
            labelText: chrome.i18n.getMessage('abilityslot'),
            type: "select",
            disabled: true && !window.settings.settings.useAbility,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "ability"
            },
            event: function () {
                window.settings.settings.abilitySlot = this.value;
            }
        },
        {
            name: 'camouflageSlot',
            labelText: chrome.i18n.getMessage('camouflageslot'),
            type: "select",
            disabled: true && !window.settings.settings.autoCamo,
            appendTo: this.shipSettingsWindow,
            options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
            attrs:{
                class: "camo"
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
            appendTo: this.shipSettingsWindow,
            attrs:{},
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
                class: "petstuff"
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
