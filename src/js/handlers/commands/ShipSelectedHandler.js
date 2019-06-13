class ShipSelectedHandler {
	static get ID() {
		return 19378;  
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedJson = JSON.parse(e.detail);

			let ship = a.ships[parsedJson.userId];
			if(ship != null){
				ship.maxHp = parsedJson[Variables.selectMaxHp];
				ship.maxShd = parsedJson[Variables.selectMaxShd];
				ship.hp = parsedJson[Variables.selectHp];
				ship.shd = parsedJson.shield;

				window.attackWindow.hp(ship.hp);
				window.attackWindow.shd(ship.shd);
				window.attackWindow.targetName(ship.name);
				window.attackWindow.ship(ship.ship);

				
				a.lockedShip = ship;
			}
		}
	}

	get handler() {
		return this._handler;
	}
}