class Ship extends Movable {
	constructor(x, y, id, isnpc, name, factionId, modifier, clanDiplomacy, cloaked, ship = null) {
		super(x, y);
		this.id = id;
		this.isNpc = isnpc;
		this.name = name;
		this.factionId = factionId;
		this.isAttacked = false;
		this.modifier = modifier;
		this.clanDiplomacy = clanDiplomacy;
		this.cloaked = cloaked;
		this.ship = ship;
		this.firstAttacker = null;
		this.heroAttacked = false;
		this.targetShip = null;
	}

	setTarget(targetX, targetY, time) {
		this.target = new Vector2D(targetX, targetY);
		this.timeToTarget = parseInt(time);
		this.lastUpdate = $.now();
	}

	get range(){
		return window.settings.getNpc(this.name).range;
	}

	get isEnemy() {
		return (window.hero.factionId != this.factionId && this.clanDiplomacy != 1 && this.clanDiplomacy != 2 || this.clanDiplomacy == 3);
	}

	get percentOfHp() {
		return (this.hp && this.maxHp) ? MathUtils.percentFrom(this.hp, this.maxHp) : 100;
	}

	get ish(){
		for(var i = 0; i < this.modifier.length; i++){
			var mod = this.modifier[i];
			if(mod.modifier == 32 && mod.activated){
				return true;
			}
		}
		return false;
	}

	update() {
		if (this.target == null)
			return;

		let diff = $.now() - this.lastUpdate;

		if (diff > this.timeToTarget) {
			this.position.set(this.target.x, this.target.y);
			return this.position;
		}

		let dx = this.target.x - this.position.x;
		let dy = this.target.y - this.position.y;

		let sx = dx / this.timeToTarget;
		let sy = dy / this.timeToTarget;

		this.lastUpdate = $.now();
		this.position.set(this.position.x + sx * diff, this.position.y + sy * diff);
	}
}