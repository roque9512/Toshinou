class ShipCreateHandler {
	static get ID() {
		return 32127; 
	}

	constructor() {
		this._handler = function (e, a) {
			e.detail = e.wholeMessage.split("|").slice(1).join("");

			let shipCreateCmd = JSON.parse(e.detail);
			let ship = new Ship(shipCreateCmd.x, shipCreateCmd.y, shipCreateCmd.userId, shipCreateCmd.npc, shipCreateCmd.userName, shipCreateCmd.factionId, shipCreateCmd.modifier, shipCreateCmd[Variables.clanDiplomacy].type, shipCreateCmd.cloaked, a.getShipName(shipCreateCmd.typeId));
			a.ships[shipCreateCmd.userId] = ship;
			if(!ship.isNpc && ship.isEnemy && !window.enemy){
				window.enemy = ship;
				a.enemyLastSight = $.now();
			}
		}
	}

	get handler() {
		return this._handler;
	}
}