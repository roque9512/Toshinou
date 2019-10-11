class GateInitHandler {
	static get ID() {
		return 16297; 
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedJson = JSON.parse(e.detail);

			let id = parsedJson[Variables.heroInitMaxHp];
			let typeId = parsedJson[Variables.selectHp]; 

			if (typeId != 84 && typeId != 42 && typeId != 43) {
				a.gates.push(new Gate(parsedJson.x, parsedJson.y, parsedJson.factionId, id, typeId));
			}
		}
	}

	get handler() {
		return this._handler;
	}
}