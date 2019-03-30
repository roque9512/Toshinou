class Settings {
	constructor() {
		this.defaults = {
			pause: false,
			palladium: false,
			refresh: false,
			moveRandomly: false,
			killNpcs: false,
			fleeFromEnemy: false,
			jumpFromEnemy: false,
			dodgeTheCbs: false,
			avoidAttackedNpcs: false,
			circleNpc: false,
			dontCircleWhenHpBelow25Percent: false,
			resetTargetWhenHpBelow25Percent: false,
			repairWhenHpIsLowerThanPercent: 30,
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
			hades: false,
			kuiper: false,
			lockNpc: false,
			lockPlayers: false,
			excludeNpcs: false,
			autoAttack: false,
			autoAttackNpcs: false,
			npcCircleRadius : 500,
			npcs: {},
			bonusBox: false,
			materials: false,
			cargoBox: false,
			greenOrGoldBooty: false,
			redBooty: false,
			blueBooty: false,
			masqueBooty: false,
			collectBoxWhenCircle: false,
			autoChangeConfig: false,
			attackConfig: 1,
			flyingConfig: 1,
			changeFormation: false,
			attackFormation: -2,
			flyingFormation: -2,
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
			changeMode: false
		};
		chrome.storage.local.get(this.defaults, items => {
			this.settings = items;
		});
	}


	setNpc(name, val) {
		if(this.settings.npcs[name] == null){
			this.settings.npcs[name] = 500;
		}else{
			this.settings.npcs[name] = val;
		}
	}

	getNpc(name) {
		return !this.settings.npcs[name];
	}
}