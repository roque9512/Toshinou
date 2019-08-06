class GlobalSettings {
  constructor() {
    let self = this;
    chrome.storage.local.get({
      headerColor: "#4B0082",
      headerOpacity: "0.9",
      windowColor: "#4B0082",
      windowOpacity: "0.9",
      timerTick: 300,
      refreshToReconnect: false,
      speedFormat: 'hour',
      windowsToTabs: true,
      venomHp: 60000,
      cyborgHp:100000,
      diminisherShd: 60000
    }, items => {
      self._settings = items;
    });
  }
  get headerColor() {
    return this._settings.headerColor;
  }

  get headerOpacity() {
    return this._settings.headerOpacity;
  }

  get windowColor() {
    return this._settings.windowColor;
  }

  get windowOpacity() {
    return this._settings.windowOpacity;
  }

  get timerTick() {
    return this._settings.timerTick;
  }

  get speedFormat() {
    return this._settings.speedFormat;
  }

  get refreshToReconnect(){
    return this._settings.refreshToReconnect;
  }
  
  get windowsToTabs() {
    return this._settings.windowsToTabs;
  }

  get venomHp() {
    return this._settings.venomHp;
  }

  get cyborgHp() {
    return this._settings.cyborgHp;
  }

  get diminisherShd() {
    return this._settings.diminisherShd;
  }
}
