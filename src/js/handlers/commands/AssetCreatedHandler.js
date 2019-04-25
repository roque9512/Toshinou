class AssetCreatedHandler {
	static get ID() {
		return 21117;
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedCmd = JSON.parse(e.detail);
			let typeObj = parsedCmd.type;
			let type = parseInt(typeObj[Object.keys(typeObj)[0]]);

			let x = parsedCmd[Variables.assetCreateX];
			let y = parsedCmd[Variables.assetCreateY];
			
			if (type == 35 || type == 36) {
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
				if(api.battlestation.isEnemy){
					let base_box = {x:api.battlestation.position.x/window.b1 - 10, y:api.battlestation.position.y/b2-10, w:20,h:20 }
					api.addObstaclesToMap(base_box);
				}
			}

			if (type == 37 || type == 54 || type == 56) {
				if (api.battlestation == null)
					api.battlestation = new Battlestation();
				api.battlestation.factionId = parsedCmd.factionId;
				api.battlestation.modules[parsedCmd.assetId] = new BattlestationModule(x, y, parsedCmd.userName, parsedCmd.factionId);
			}
		}
	}

	get handler() {
		return this._handler;
	}
}
