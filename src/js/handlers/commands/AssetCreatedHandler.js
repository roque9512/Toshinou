class AssetCreatedHandler {
	static get ID() {
		return 21117;//up
	}

	/**
	 * Other Types:
	 * 33 Healing Pod
	 */
	
	constructor() {
		this._handler = function (e, a) {
			let parsedCmd = JSON.parse(e.detail);
			let typeObj = parsedCmd.type;
			let type = parseInt(typeObj[Object.keys(typeObj)[0]]);

			try {
				let x = parsedCmd[Variables.assetCreateX];
				let y = parsedCmd[Variables.assetCreateY];
				
				if (type == 35 || type == 36 || type == 47 || type == 46) {
					if (api.battlestation == null) {
						api.battlestation = new Battlestation(x, y, parsedCmd.assetId, parsedCmd.userName, parsedCmd.clanTag, parsedCmd.factionId, parsedCmd[Variables.battlestationClanDiplomacy].type);
					} else {
						api.battlestation.setPosition(x, y);
						api.battlestation.id = parsedCmd.assetId;
						api.battlestation.name = parsedCmd.userName;
						api.battlestation.clanTag = parsedCmd.clanTag;
						api.battlestation.factionId = parsedCmd.factionId;
						api.battlestation.clanDiplomacy = parsedCmd[Variables.battlestationClanDiplomacy].type;
					}
				} else if (type == 34 || type == 37 || (type > 47 && type < 59)) {
					if (api.battlestation == null) {
						api.battlestation = new Battlestation();
					}
					api.battlestation.modules[parsedCmd.assetId] = new BattlestationModule(x, y, parsedCmd.userName, parsedCmd.factionId);
				} else {
					if (window.settings.viewOthersObjetsInMap) {
						console.log(parsedCmd);
						a.others.push(new Other(x, y, type));
					}
				}
			} catch (exception) {
				if (window.globalSettings.debug) {
					console.log(exception.message);
					console.log(parsedCmd);
				}
			};
		}
	}

	get handler() {
		return this._handler;
	}
}
