window.globalSettings = new GlobalSettings();
let api;
let state = false;

// gets how many times the page reloaded
// it fixes the fake unsafe js
let refreshCounter;
chrome.storage.local.get("refreshCount", function(result) {
	refreshCounter = result["refreshCount"];
});


$(document).ready(function () {
	api = new Api();

	let preloader = $("#preloader").attr("wmode", "opaque");
	$("#preloader").remove();

	let check = SafetyChecker.check();

	// Try to fix false positive on JS Change
	// it refreshes the page 3 times
	if(refreshCounter > 0 && !check){
		api.changeRefreshCount(refreshCounter-1);
		window.location.reload();
	}


	if (check !== true) {
		let warning = jQuery("<div>");
		warning.css({
			top: 0,
			left: 0,
			position: "absolute",
			width: "100%",
			height: "100%",
			backgroundColor: "gray",
			textAlign: "center"
		});

		jQuery("<h1>").text("The tool detected changes in the game.").appendTo(warning);
		jQuery("<h2>").text("Loading stopped! Your account has to stay safe.").appendTo(warning);
		jQuery("<h3>").text("Reason: UNSAFE JS").appendTo(warning);

		warning.appendTo("body");
		throw new Error("Safety tests failed!");
	}
    preloader.appendTo($("#container"));

    window.settings = new Settings();
    window.initialized = false;
	window.reviveCount = 0;
	window.petReviveCount = 0;
    window.count = 0;
    window.movementDone = true;
    window.statusPlayBot = false;
    window.saved = false;
    window.loaded = false;
	window.fleeingFromEnemy = false;
	window.stayInPortal = false;
	window.debug = false;
	window.enemy = null;
	window.pet = null;
	window.invertedMovement = false;
    window.tickTime = window.globalSettings.timerTick;
    let hm = new HandlersManager(api);

	hm.registerCommand(AssetCreatedHandler.ID, new AssetCreatedHandler());
    hm.registerCommand(BoxInitHandler.ID, new BoxInitHandler());
    hm.registerCommand(ResourceInitHandler.ID, new ResourceInitHandler());
    hm.registerCommand(ShipAttackHandler.ID, new ShipAttackHandler());
    hm.registerCommand(ShipCreateHandler.ID, new ShipCreateHandler());
    hm.registerCommand(ShipMoveHandler.ID, new ShipMoveHandler());
    hm.registerCommand(AssetRemovedHandler.ID, new AssetRemovedHandler());
    hm.registerCommand(HeroInitHandler.ID, new HeroInitHandler(init));
    hm.registerCommand(ShipDestroyedHandler.ID, new ShipDestroyedHandler());
    hm.registerCommand(ShipRemovedHandler.ID, new ShipRemovedHandler());
    hm.registerCommand(GateInitHandler.ID, new GateInitHandler());
    hm.registerCommand(ShipSelectedHandler.ID, new ShipSelectedHandler());
    hm.registerCommand(MessagesHandler.ID, new MessagesHandler());
    hm.registerCommand(HeroDiedHandler.ID, new HeroDiedHandler());
    hm.registerCommand(HeroUpdateHitpointsHandler.ID, new HeroUpdateHitpointsHandler());
    hm.registerCommand(HeroUpdateShieldHandler.ID, new HeroUpdateShieldHandler());
	hm.registerCommand(HeroPetUpdateHandler.ID, new HeroPetUpdateHandler());
	hm.registerCommand(HeroAttackHandler.ID, new HeroAttackHandler());
	hm.registerCommand(ModifierUpdateHandler.ID, new ModifierUpdateHandler());
	hm.registerCommand(HeroJumpedHandler.ID, new HeroJumpedHandler());
	hm.registerCommand(PetUpdateFuel.ID, new PetUpdateFuel());
	hm.registerCommand(QuickslotHandler.ID, new QuickslotHandler());



    hm.registerEvent("updateHeroPos", new HeroPositionUpdateEventHandler());
    hm.registerEvent("movementDone", new MovementDoneEventHandler());
    hm.registerEvent("isDisconnected", new HeroDisconnectedEventHandler());
    hm.registerEvent("isConnected", new HeroConnectedEventHandler());

    hm.listen();
});

function init() {
	if (window.initialized)
		return;

	window.attackWindow = new AttackWindow();
	window.attackWindow.createWindow();

	window.autolockWindow = new AutolockWindow();
	window.autolockWindow.createWindow();

	window.collectionWindow = new CollectionWindow();
	window.collectionWindow.createWindow();

	window.generalSettingsWindow = new GeneralSettingsWindow();
	window.generalSettingsWindow.createWindow();

	window.GGSettingsWindow = new GGSettingsWindow();
	window.GGSettingsWindow.createWindow();

	window.minimap = new Minimap(api);
	window.minimap.createWindow();

	window.npcSettingsWindow = new NpcSettingsWindow();
	window.npcSettingsWindow.createWindow();

	window.shipSettings = new ShipSettings();
	window.shipSettings.createWindow();

	window.statisticWindow = new StatisticWindow();
	window.statisticWindow.createWindow();

	api.startTime = $.now();
	window.setInterval(logic, window.tickTime);
	
	Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

	// set refreshcount to 3 if page loaded until here
	api.changeRefreshCount(3);

	$(document).keyup(function (e) {
		let key = e.key;

		if (key == "x" && (!window.settings.settings.autoAttackNpcs || (!api.lastAutoLock || $.now() - api.lastAutoLock > 1000)) ||
		key == "z" && (!window.settings.settings.autoAttack || (!api.lastAutoLock || $.now() - api.lastAutoLock > 1000))) {
			let maxDist = 1000;
			let finDist = 1000000;
			let finalShip;

			for (let property in api.ships) {
				let ship = api.ships[property];
				let dist = ship.distanceTo(window.hero.position);

				if (dist < maxDist && dist < finDist && ((ship.isNpc && window.settings.settings.lockNpc && key == "x" &&
				 (!window.settings.settings.excludeNpcs || window.settings.getNpc(ship.name).blocked)) ||
				  (!ship.isNpc && ship.isEnemy && window.settings.settings.lockPlayers && key == "z"))) {
					finalShip = ship;
					finDist = dist;
				}
			}
			if (finalShip != null) {
				api.lockShip(finalShip);
				api.lastAutoLock = $.now();
				api.autoLocked = true;
			}
		}
	});

	window.settings.settings.pause = true;
	$(document).on('click', '.cnt_minimize_window', () => {
		if (window.statusMiniWindow) {
			window.mainWindow.slideUp();
		} else {
			window.mainWindow.slideDown();
		}
		window.statusMiniWindow = !window.statusMiniWindow;
	});

	let cntBtnPlay = $('.cnt_btn_play .btn_play');
	cntBtnPlay.on('click', (e) => {
		if (window.statusPlayBot) {
			cntBtnPlay.html("Play");
			cntBtnPlay.removeClass('in_stop').addClass('in_play');
			api.resetTarget("all");
			window.fleeingFromEnemy = false;
			window.settings.settings.pause = true;
		} else {
			cntBtnPlay.html("Stop");
			cntBtnPlay.removeClass('in_play').addClass('in_stop');
			window.settings.settings.pause = false;
		}
		window.statusPlayBot = !window.statusPlayBot;
	});
	let saveBtn = $('.saveButton .btn_save');
	saveBtn.on('click', (e) => {
		chrome.storage.local.set(window.settings.settings);
	});
	let clearBtn = $('.clearButton .btn_clear');
	clearBtn.on('click', (e) => {
		chrome.storage.local.set(window.settings.defaults);
	});
	
	/* Start the bot again after auto-refresh */
	chrome.storage.local.get({"refreshed" :false}, function(v){
		if(v.refreshed && window.settings.settings.enableRefresh){
			let cntBtnPlay = $('.cnt_btn_play .btn_play');

			cntBtnPlay.html("Stop");
			cntBtnPlay.removeClass('in_play').addClass('in_stop');
			window.settings.settings.pause = false;
		}
	});
	chrome.storage.local.set({"refreshed" :false});
}


function logic() {
	let circleBox = null;
	if (api.isDisconnected) {
		if (window.fleeingFromEnemy) 
			window.fleeFromEnemy = false;
		if (api.disconnectTime && $.now() - api.disconnectTime > 5000 && (!api.reconnectTime || (api.reconnectTime && $.now() - api.reconnectTime > 15000)) && window.reviveCount < window.settings.settings.reviveLimit) 
			api.reconnect();
		if(api.disconnectTime && $.now() - api.disconnectTime > 120000 && window.settings.settings.enableRefresh)
			window.location.reload();
		return;
	}

	window.minimap.draw();

	if(window.settings.settings.pause || api.jumped || (window.settings.settings.palladium && window.hero.mapId != 93)) return;

	if (api.heroDied) {
		api.resetTarget("all");
		return;
	}


	if (!window.settings.palladium && !window.settings.settings.ggbot && window.settings.settings.workmap != 0 &&  window.hero.mapId != window.settings.settings.workmap) {
		api.goToMap(window.settings.settings.workmap);
		return;
	} else {
		api.rute = null;
	}
	
	if(window.settings.settings.fleeFromEnemy  && window.enemy){
		if(window.settings.settings.stopFleeing && $.now() - api.enemyLastSight > 2500){
			let enemy = api.findEnemy();
			if(enemy){
				window.enemy = enemy;
				return;
			}
			window.enemy = null;
			return;
		}

		if(api.fleeingMode())
			return;
		api.fleeFromEnemy(window.enemy);

		window.fleeingFromEnemy = true;

		return;
	}else{
		window.fleeingFromEnemy = false;
		window.stayInPortal = false;
	}

	if(api.sleeping()){
		return;
	}

	if ((api.startTime && $.now() - api.startTime >= window.settings.settings.refreshTime * 60000)
	 && window.settings.settings.enableRefresh && !window.settings.settings.ggbot) {
		if ((api.Disconected && !state) || window.settings.settings.palladium) {
			chrome.storage.local.set({"refreshed" :true});
			window.location.reload();
			state = true;
		} else {
			let gate = api.findNearestGate();
			if (gate.gate) {
				let x = gate.gate.position.x;
				let y = gate.gate.position.y;
				if (window.hero.position.distanceTo(gate.gate.position) < 200 && !state) {
					window.location.reload();
					chrome.storage.local.set({"refreshed" :true});
					state = true;
				}
				api.resetTarget("all");
				api.move(x, y);
				window.movementDone = false;
				return;
			}
		}
	}

	if(window.settings.settings.useAbility && window.hero.skillName == "solace"){
		if(MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < 70) {
			if(api.useAbility())
				return;
		}
	}

	if(api.isRepairing){
		if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.settings.repairEndPercent) {
			if (window.settings.settings.ggbot) {
				api.fleeingMode();
				let gg_half_x = 10400;
				let gg_half_y = 6450;
				let f = Math.atan2(window.hero.position.x - gg_half_x, window.hero.position.y - gg_half_y) + 0.5;
				let s = Math.PI / 180;
				f += s;
				let x = 10400 + 6000 * Math.sin(f);
				let y = 6450 + 6000 * Math.cos(f);
				api.move(x,y);
				return
			} else if(window.settings.settings.palladium){
				
				// To be improved
				api.fleeingMode();
				let fog_half_x = 21700;
				let fog_half_y = 22250;
				let f = Math.atan2(window.hero.position.x - fog_half_x, window.hero.position.y - fog_half_y) + 0.5;
				let s = Math.PI / 180;
				f += s;
				let x = 21700 + 4000 * Math.sin(f);
				let y = 22250 + 2000 * Math.cos(f);
				api.move(x,y);
				return;
			} else {
				if(window.hero.mapId == 28){
					for(var mod_id in api.battlestation.modules){
						let bs_module = api.battlestation.modules[mod_id];
						if(bs_module.name == "RepairDock" && window.hero.position.distanceTo(bs_module.position) < 400){
							return;
						}
					}
				}
				let gate = api.findNearestGate();
				if (gate.gate) {
					// This check is to to avoid unecessary movement spam while in gate.
					if(window.hero.position.distanceTo(gate.gate.position) > 200){
						api.resetTarget("all");
						let x = gate.gate.position.x + MathUtils.random(-100, 100);
						let y = gate.gate.position.y + MathUtils.random(-100, 100);
						api.move(x, y);
						window.movementDone = false;
						api.fleeingMode();
						api.isRepairing = true;
					}
					return;
				}
			}
		}else {
			api.isRepairing = false;
		}
	}

	if ($.now() - api.resetBlackListTime > api.blackListTimeOut) {
		api._blackListedBoxes = [];
		api.resetBlackListTime = $.now();
	}

	/*GG BOT for Alpha, Beta and Gamma Gates*/
	if(window.settings.settings.ggbot){
		window.settings.settings.moveRandomly = true;
		window.settings.settings.killNpcs = true;
		window.settings.settings.circleNpc = true;
		window.settings.settings.resetTargetWhenHpBelow25Percent = true;
		window.settings.settings.dontCircleWhenHpBelow25Percent = false;

		if (api.targetBoxHash == null) {
			api.jumpInGG(2, window.settings.settings.alpha);
			api.jumpInGG(3, window.settings.settings.beta);
			api.jumpInGG(4, window.settings.settings.gamma);
			api.jumpInGG(5, window.settings.settings.delta);
			api.jumpInGG(53, window.settings.settings.epsilon);
			api.jumpInGG(54, window.settings.settings.zeta);
			api.jumpInGG(70, window.settings.settings.kappa);
			api.jumpInGG(71, window.settings.settings.lambda);
			api.jumpInGG(72, window.settings.settings.kronos);
			api.jumpInGG(74, window.settings.settings.hades);
			api.jumpInGG(82, window.settings.settings.kuiper);
		}
	}

	if(window.settings.settings.enablePet && window.petReviveCount < window.settings.settings.petReviveLimit && api.petHasFuel){
		// We wait 5 seconds to give time for the repair function to execute
		if(api.petDead){
			setTimeout(() => {
				api.callPet(4);
				api.petDead = false;
			}, 1000);
		}else if(window.pet == null && $.now() - api.petActivateTimer > 5000){
			api.callPet(0);
			return;
		}else if(window.settings.settings.enablePet && window.settings.settings.petModule != 0 && $.now() - api.petActivateTimer > 2000){
			// If using kamikaze module
			if(window.settings.settings.petModule == 10){
				// check for the 30s cooldown
				// extra 5s because of the repair process
				if($.now() - api.moduleCooldown > 35000){
					api.changePetModule(window.settings.settings.petModule);
				}else{
					// if kamikaze on cooldown, change to guard mode
					api.changePetModule(2);
				}
			}else{
				api.changePetModule(window.settings.settings.petModule);
			}
		}
	}

	if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.settings.repairStartPercent || api.isRepairing) {
		api.isRepairing = true;
		return;
	}

	if (window.X1Map) {
		return;
	}

	if(window.settings.settings.ggbot && Object.keys(api.ships).length <= api._blackListedNpcs.length){
		api._blackListedNpcs = [];
	}

	if (api.targetBoxHash == null && api.targetShip == null) {
		let box = api.findNearestBox();
		let ship = api.findNearestShip();

		if ((ship.distance > 1000 || !ship.ship) && (box.box)) {
			if (!(MathUtils.percentFrom(window.hero.shd, window.hero.maxShd) < 90) && window.settings.settings.palladium) {
				api.flyingMode();
			}
			api.collectBox(box.box);
			api.targetBoxHash = box.box.hash;
			return;
		} else if (!api.lockedShip &&ship.ship && ship.distance < 1000 && window.settings.settings.killNpcs) {
			api.lockShip(ship.ship);
			api.triedToLock = true;
			api.targetShip = ship.ship;
			return;
		} else if (ship.ship && window.settings.settings.killNpcs) {
			ship.ship.update();
			api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
			api.targetShip = ship.ship;
			return;
		} else if(!window.settings.settings.palladium ){
			if (api.flyingMode())
				return
		}
	}

	if (!api.attacking && api.lockedShip &&
		!api.isShipOnBlacklist(api.lockedShip.id) &&
		(window.settings.settings.killNpcs && api.lockedShip.isNpc)) {
			api.startLaserAttack();
			api.lastAttack = $.now();
			api.attacking = true;
	}

	if(api.targetShip && api.targetShip.ish){
		api.resetTarget("enemy");
	}
	// firstAttacker is null if npc is not attacked 
	if(api.targetShip && api.targetShip.firstAttacker != window.hero.id && api.targetShip.firstAttacker != null){
		api.resetTarget("enemy");
	}

	// npc killing stuck
	if ((api.targetShip && $.now() - api.lockTime > 5000 && ($.now() - api.lastAttack > 5000)) || !api.attacking && ($.now() - api.lastAttack > 8000)){
		api.resetTarget("enemy");
	}

	// Failsafe in case attack starts too early
	if (api.lockedShip && ($.now() - api.lockTime > 2500 && $.now() - api.lockTime < 6000) && $.now() - api.lastAttack > 2000 && api.lockedShip.distanceTo(hero.position) < 1200) {
		api.startLaserAttack();
		api.lastAttack = $.now();
		return;
	}

	if (api.targetShip && window.settings.settings.killNpcs) {
		if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
			api.targetShip.update();
			let dist = api.targetShip.distanceTo(window.hero.position);
			if (dist < 600) {
				api.lockShip(api.targetShip);
				api.triedToLock = true;
				return;
			}
		}
	}

	if (api.targetBoxHash && $.now() - api.collectTime > 7000) {
		let box = api.boxes[api.targetBoxHash];
		if (box && box.distanceTo(window.hero.position) > 1000) {
			api.collectTime = $.now();
		} else {
			delete api.boxes[api.targetBoxHash];
			api.blackListHash(api.targetBoxHash);
			api.resetTarget("box");
		}
	}

	if (api.targetBoxHash && $.now() - api.collectTime > 3000) {
		let box = api.boxes[api.targetBoxHash];
		if (box && (box.distanceTo(window.hero.position) > 300)) {
			api.collectTime = $.now();
		} else if(box && box.tries < 2){
			api.collectBox(box);
			api.collectTime = $.now();
			return;
		} else {
			delete api.boxes[api.targetBoxHash];
			api.blackListHash(api.targetBoxHash);
			api.resetTarget("box");
		}
	}

	let x;
	let y;

	/*Dodge the CBS*/
	if (window.settings.settings.dodgeTheCbs && api.battlestation != null) {
		if (api.battlestation.isEnemy) {
			let result = api.checkForCBS();
			if (result.walkAway) {
				if (api.targetBoxHash) {
					let box = api.boxes[api.targetBoxHash];
					if (box && box.distanceTo(result.cbsPos) < 1800) {
						delete api.boxes[api.targetBoxHash];
						api.blackListHash(api.targetBoxHash);
						api.resetTarget("box");
					}
				}else if(api.targetShip){
					if(api.targetShip.distanceTo(result.cbsPos) < 1800){
						api.blackListId(api.targetShip.id);
						api.resetTarget("enemy");
					}
				}
				let f = Math.atan2(window.hero.position.x - result.cbsPos.x, window.hero.position.y - result.cbsPos.y) + 0.5;
				let s = Math.PI / 180;
				f += s;
				x = result.cbsPos.x + 1800 * Math.sin(f);
				y = result.cbsPos.y + 1800 * Math.cos(f);
				api.move(x, y);
				api.resetTarget("all");
				window.movementDone = false;
				return;
			}
		}
	}

	if(api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.settings.moveRandomly){
		if(window.settings.settings.autoCamo){
			api.quickSlot(window.settings.settings.camouflageSlot);
		}

		if (window.settings.settings.palladium) {
			// Palladium fog.
			x = MathUtils.random(13000, 30400);
			y = MathUtils.random(19000, 25500);
		} else if(window.settings.WorkArea){
			x = MathUtils.random(window.settings.WorkArea.x, window.settings.WorkArea.x + window.settings.WorkArea.w);
			y = MathUtils.random(window.settings.WorkArea.y, window.settings.WorkArea.y + window.settings.WorkArea.h);
		} else if ( !window.settings.settings.palladium && !window.bigMap) {
			x = MathUtils.random(200, 20800);
			y = MathUtils.random(200, 12900);
		} else if (!window.settings.settings.palladium && window.bigMap) {
			x = MathUtils.random(500, 41500);
			y = MathUtils.random(500, 25700);
		}
	}


	if (api.targetShip && window.settings.settings.killNpcs && api.targetBoxHash == null) {
		api.targetShip.update();
		let dist = api.targetShip.distanceTo(window.hero.position);

		if(api.attacking){
			api.combatMode();
			if(window.settings.settings.useAbility && window.hero.skillName && dist < window.settings.settings.npcCircleRadius){
				// Make hp and shield heren a user option.
				if((window.hero.skillName == "cyborg" && api.targetShip.hp > window.globalSettings.cyborgHp)||
					(window.hero.skillName == "venom" && api.targetShip.hp > window.globalSettings.venomHp))
				{
					api.useAbility();
				} else if(window.hero.skillName == "diminisher" && api.targetShip.shd > window.globalSettings.diminisherShd){ // this one too
					api.useAbility();
				} else if(window.hero.skillname == "sentinel"){
					api.useAbility();
				}
			}
		}
		if (window.settings.settings.ggbot && 
			api.targetShip.percentOfHp <= 25 &&
			api.targetShip.position.distanceTo(new Vector2D(20990, 13490)) < 80) {
			console.log("GG bottom right corner");
			x = 20495;
			y = 13363;
		} else if(window.settings.settings.ggbot && 
			api.targetShip.percentOfHp <= 25 &&
			api.targetShip.position.distanceTo(new Vector2D(0, 0)) < 80) {
			console.log("GG top left corner");
			x = 450;
			y = 302;
		} else if ((dist > 600 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id) && $.now() - api.lastMovement > 1000)) {
			x = api.targetShip.position.x - MathUtils.random(-50, 50);
			y = api.targetShip.position.y - MathUtils.random(-50, 50);
			api.lastMovement = $.now();
		} else if (api.lockedShip && window.settings.settings.dontCircleWhenHpBelow25Percent && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id ) {
			let d = api.targetShip.range;
			d -= d * 0.38; // Reduces range to npc by 38%
			
			let f = Math.atan2(api.targetShip.position.x - window.hero.position.x , api.targetShip.position.y - window.hero.position.y);
			if(api.targetShip.target)
				f = Math.atan2(api.targetShip.position.x - api.targetShip.target.x, api.targetShip.position.y - api.targetShip.target.y);


			x = api.targetShip.position.x + Math.sin(f) * d;
			y = api.targetShip.position.y + Math.cos(f) * d;
			api.lastMovement = $.now();

		} else if (window.settings.settings.ggbot && Object.keys(api.ships).length > 1 && window.settings.settings.resetTargetWhenHpBelow25Percent && api.lockedShip && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id) {
			console.log("Resetting target");
			api.resetTarget("enemy");
		} else if ((!window.settings.settings.ggbot && !api.attacking) ||
					(dist > 300 && api.lockedShip && 
					api.lockedShip.id == api.targetShip.id &&
					!window.settings.settings.circleNpc)) 
		{
			x = api.targetShip.position.x + MathUtils.random(-100, 100);
			y = api.targetShip.position.y + MathUtils.random(-100, 100);
		} else if (window.settings.settings.ggbot || (api.lockedShip && api.lockedShip.id == api.targetShip.id)) {
			if (window.settings.settings.circleNpc) {
				let enemy = api.targetShip.position;
				let cx = enemy.x;
				let cy = enemy.y;
				if(api.lockedShip && api.lockedShip.percentOfHp < 25 || dist > 700){
					cx = api.targetShip.target.x;
					cy = api.targetShip.target.y;
				}
				let f = Math.atan2(window.hero.position.x - cx, window.hero.position.y - cy) + 0.5;
				let s = Math.PI / 180;
				f += s;
				x = cx + api.targetShip.range * Math.sin(f);
				y = cy + api.targetShip.range * Math.cos(f);
				let nearestBox = api.findNearestBox();
				if (nearestBox && nearestBox.box && nearestBox.distance < 300) {
					circleBox = nearestBox;
				}
			}
		} else {
			console.log("Resetting target on end");
			api.resetTarget("enemy");
		}
	}

	if (x && y) {
		if (circleBox) {
			api.collectBox(circleBox.box);
			circleBox = null;
		}else{
			api.move(x, y);
		}
		window.movementDone = false;
	}
	window.dispatchEvent(new CustomEvent("logicEnd"));
}

