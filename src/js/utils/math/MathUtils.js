 class MathUtils {
	static random(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	static percentFrom(val, val2) {
		return (val / val2) * 100;
	}
	static circle(radius, center){
		let enemy = api.targetShip.position;
		let f = Math.atan2(window.hero.position.x - enemy.x, window.hero.position.y - enemy.y) + 0.5;
		let s = Math.PI / 180;
		let rot = MathUtils.random(-10, 10);
		f += s;
		x = enemy.x + window.settings.settings.npcCircleRadius * Math.sin(f);
		y = enemy.y + window.settings.settings.npcCircleRadius * Math.cos(f);

	}
}