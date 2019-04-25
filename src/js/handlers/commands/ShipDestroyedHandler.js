class ShipDestroyedHandler {
	static get ID() {
		return 28665; 
	}

	constructor() {
		this._handler = function (e, a) {
			let parsed = JSON.parse(e.detail);
			let id = parsed[Variables.shipDestroyedId];
			
			// Check if pet was destroyed.
			if(window.pet){
				if(id == window.pet.id && window.settings.settings.enablePet && window.petReviveCount < window.settings.settings.petReviveLimit){
					if(a.currentModule == 10){
						api.moduleCooldown = $.now();
					}
					a.petDead = true;
					window.petReviveCount++;
					a.currentModule = -1;
					window.pet = null;
				}
			}

			if (a.targetShip && id == a.targetShip.id) {
				a.resetTarget("enemy");
			}

			let ship = a.ships[id];

			if (ship != null) {
				delete a.ships[id];
				if(a.isShipOnBlacklist(id)){
					var index = a._blackListedNpcs.indexOf(id);
					a._blackListedNpcs.splice(index, 1);
				}
				if(window.enemy && id == window.enemy.id){
					a.enemyLastSight = $.now();
				}
			}
		}
	}

	get handler() {
		return this._handler;
	}
}
