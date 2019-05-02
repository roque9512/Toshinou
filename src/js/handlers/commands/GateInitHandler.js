class GateInitHandler {
	static get ID() {
		return 14647; 
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedJson = JSON.parse(e.detail);

			let id = parsedJson[Variables.gateId];
			let typeId = parsedJson[Variables.gateType];

			if (typeId != 84 && typeId != 42 && typeId != 43) {
				a.gates.push(new Gate(parsedJson.x, parsedJson.y, parsedJson.factionId, id, typeId));
			}
		}
	}

	get handler() {
		return this._handler;
	}
}