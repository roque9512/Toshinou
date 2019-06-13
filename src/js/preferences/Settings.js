class Settings {
	constructor() {
		this.defaults = {
			pause: false,
			palladium: false,
			refresh: false,
			moveRandomly: false,
			killNpcs: false,
			fleeFromEnemy: false,
			stopFleeing: false,
			jumpFromEnemy: false,
			dodgeTheCbs: false,
			avoidAttackedNpcs: false,
			circleNpc: false,
			dontCircleWhenHpBelow25Percent: false,
			resetTargetWhenHpBelow25Percent: false,
			repairStartPercent: 30,
			repairEndPercent: 100,
			ggbot: false,
			alpha: false,
			beta: false,
			gamma: false,
			delta: false,
			epsilon: false,
			zeta: false,
			kappa: false,
			lambda: false,
			kronos: false,
			kuiper: false,
			lockNpc: false,
			lockPlayers: false,
			excludeNpcs: false,
			autoAttack: false,
			autoAttackNpcs: false,
			npcCircleRadius : 500,
			npcs: {},
			bonusBox: false,
			eventBox: false,
			materials: false,
			cargoBox: false,
			greenOrGoldBooty: false,
			redBooty: false,
			blueBooty: false,
			masqueBooty: false,
			collectBoxWhenCircle: false,
			attackConfig: 1,
			flyingConfig: 1,
			fleeingConfig: 1,
			attackFormation: -2,
			flyingFormation: -2,
			fleeingFormation: -2,
			useAbility: false,
			abilitySlot: -1,
			autoCamo: false,
			camouflageSlot: -1,
			reviveType: 0,
			reviveLimit: 5,
			enableRefresh: false,
			refreshTime: 60,
			refreshed: false,
			workmap: 0,
			enablePet: false,
			petModule: 0,
			petReviveLimit: 10,
			changeMode: false,
			sabSwitcher: false,
			sabSlot: -1,
			mainAmmoSlot: -1,
			workArea : null
		};
		chrome.storage.local.get(this.defaults, items => {
			this.settings = items;
		});
	}

	// :|
	setNpc(name, blocked) {
		if(this.settings.npcs[name] == null){
			this.settings.npcs[name] = {blocked: blocked, priority: 1, range:this.settings.npcCircleRadius};
		}else{
			this.settings.npcs[name].blocked = blocked;
		}
	}

	setNpcPriority(name, priority){
		if(this.settings.npcs[name] == null){
			this.settings.npcs[name] = {blocked: false, priority: priority, range: this.settings.npcCircleRadius};
		}else{
			this.settings.npcs[name].priority = priority;
		}
	}

	setNpcRange(name, range){
		if(this.settings.npcs[name] == null){
			this.settings.npcs[name] = {blocked: false, priority: 1, range: range};
		}else{
			this.settings.npcs[name].range = range;
		}
	}

	getNpc(name) {
		return {
			blocked: !this.settings.npcs[name] ?  false: this.settings.npcs[name].blocked,
			priority: !this.settings.npcs[name] ? 1: this.settings.npcs[name].priority,
			range: !this.settings.npcs[name] ? this.settings.npcCircleRadius: this.settings.npcs[name].range,
		}
	}

	get WorkArea(){
		return this.settings.workArea[window.hero.mapId];
	}

	set WorkArea({x, y, w, h}){
		if((w-x) == 0 || (h - y) == 0){
			this.settings.workArea[window.hero.mapId] = null;
		}else{
			this.settings.workArea[window.hero.mapId] = {x, y, w, h};
		}
	}
}