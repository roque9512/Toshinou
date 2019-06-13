class ShipAttackHandler {
	static get ID() {
		return 10222; 
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

			// Set attacker's targetship
			if(a.ships[attackerId]){
				if(window.enemy && window.enemy.id == attackerId)
					window.enemy.targetShip = attackedShipId;
				a.ships[attackerId].targetShip = attackedShipId;
			}
		}
	}
	
	get handler() {
		return this._handler;
	}
}