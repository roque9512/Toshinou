class GateInitHandler {
	static get ID() {
		return 6800;//up
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedJson = JSON.parse(e.detail);
			try {
				let id = parsedJson[Variables.gateId];
				let typeId = parsedJson[Variables.gateType];

				if (id != 150000450 && id != 150000451 && id != 150000449 && id != 150000282 && id != 150000281 && id != 150000280 && typeId != 84 && typeId != 42 && typeId != 43) {
					a.gates.push(new Gate(parsedJson.x, parsedJson.y, parsedJson.factionId, id, typeId));
				}
			} catch (exception) {
				console.error(exception.message);
				console.log(parsedJson);  
			};
		}
	}

	get handler() {
		return this._handler;
	}
}