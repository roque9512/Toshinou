class ShipRemovedHandler {
	static get ID() {
		return 17570; 
	}

	constructor() {
		this._handler = function (e, a) {
			let parsed = JSON.parse(e.detail);
			let id = parsed.userId;

			if (a.targetShip && id == a.targetShip.id)
				a.resetTarget("enemy");

			let ship = a.ships[id];

			if (ship != null){
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
