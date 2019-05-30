class ShipAttackHandler {
	static get ID() {
		return 7247; 
	}

	constructor() {
		this._handler = function (e, a) {
			let shipAttackCmd = JSON.parse(e.detail);

			let attackerId = shipAttackCmd[Variables.attackerId];
			let attackedShipId = shipAttackCmd[Variables.attackedId];

			let ship = a.ships[attackedShipId];
			if(ship){
				if(ship.firstAttacker == null && (window.pet == null || window.pet.id != attackerId)){
					ship.firstAttacker = attackerId;
				}
			}
		}
	}
	
	get handler() {
		return this._handler;
	}
}