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
          labelText: 'Autolock Players (key: z)',
          appendTo: this.autolockWindow,
          event: function () {
            window.settings.settings.lockPlayers = this.checked;
          }
        },
        {
          name: 'lockNpc',
          labelText: 'Autolock NPCs (key: x)',
          appendTo: this.autolockWindow,
          event: function () {
            window.settings.settings.lockNpc = this.checked;
          }
        },
        {
          name: 'excludeNpcs',
          labelText: 'Exclude NPCs from locking',
          appendTo: this.autolockWindow,
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