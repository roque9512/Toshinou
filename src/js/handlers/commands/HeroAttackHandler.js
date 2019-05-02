/*
Created by Freshek on 07.10.2017
*/

class HeroAttackHandler {
  static get ID() {
    return 22121; 
  }

	constructor() {
		this._handler = function (e, a) {
			let shipAttackCmd = JSON.parse(e.detail);

			let attackerId = shipAttackCmd[Variables.attackerId];
			let attackedShipId = shipAttackCmd[Variables.heroAttackedId];

			let ship = a.ships[attackedShipId];
			if (attackedShipId == window.hero.id) {
				window.hero.hp = shipAttackCmd[Variables.attackHp];
				window.hero.shd = shipAttackCmd[Variables.attackShd];
			}

			if (ship) {
				if (api.targetShip && attackedShipId == api.targetShip.id) {
					api.lastAttack = $.now();
					api.lastAttackSinceLock = $.now();
					ship.heroAttacked = true;
				}
				
				if (attackerId == window.hero.id) {
					window.attackWindow.hp(shipAttackCmd[Variables.attackHp]);
					window.attackWindow.shd(shipAttackCmd[Variables.attackShd]);
					window.attackWindow.targetName(ship.name);
				}

				ship.hp = shipAttackCmd[Variables.attackHp];
				ship.shd = shipAttackCmd[Variables.attackShd];

				if (attackerId != window.hero.id)
					ship.isAttacked = true;
			}
		}
	}

	get handler() {
		return this._handler;
	}
}
