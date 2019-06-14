class MessagesHandler {

	static get ID() {
		return 1129; 
	}

	constructor() {
		this._handler = (e, a) => {
			// 'STM' "server_restart_n_seconds" [5] == seconds
			// {"message":"0", "A", "STM", "server_restart_n_seconds", "30"}
			// {"message":"0|A|STM|msg_pet_out_of_fuel"}
			let _events = {
				'CRE': 'credits',
				'BAT': 'ammo',
				'XEN': 'ggEnergy',
				'URI': 'uridium',
				'EP': 'experience',
				'HON': 'honor',
			};
			let s = e.wholeMessage.split("|");
			s.splice(0, 1);
			s = JSON.parse(s.join('|'));
			let message = s.message.split('|');

			if ("KIK" == message[1]) {
				this.connection({
					connected: false,
					status: 'off'
				});
			}

			if ("A" == message[1]) {
				if(message[2] == "STM"){
					if(message[3] == "msg_pet_out_of_fuel"){
						// pet out of fuel
						a.petHasFuel = false;
						window.pet = null;
						a.currentModule = -1;
					}
				}
				this.connection({
					connected: true,
					status: 'on'
				});
			}else if("n" == message[1]){
				if("EMP" == message[2]){
					let emp_ship_id = message[3];
					if(a.targetShip && emp_ship_id == a.targetShip.id){
						console.log("saimon emp");
						this.attacking = false;
						this.lockedShip = null;
						a.lockShip(a.targetShip);
					}
				}
			}

			if (_events.hasOwnProperty(message[3])) {
				this[_events[message[3]]](message);
			}
		};
	}

	credits(message) {
		let event = new CustomEvent("addCredits", {
			detail: {
			credits: message[4],
			totatCredits: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	ammo(message) {
		let ammoTypes = {
			'ammunition_laser_lcb-10': 'LCB-10',
			'ammunition_laser_mcb-25': 'MCB-25',
			'ammunition_laser_mcb-50': 'MCB-50',
		};

		let event = new CustomEvent("addAmmo", {
			detail: {
			ammo: message[5],
			ammoType: ammoTypes[message[4]] ? ammoTypes[message[4]] : message[4]
			}
		});
		window.dispatchEvent(event);
	}

	ggEnergy(message) {
		let event = new CustomEvent("addGgEnergy", {
			detail: {
			energy: message[4]
			}
		});
		window.dispatchEvent(event);
	}

	uridium(message) {
		let event = new CustomEvent("addUridium", {
			detail: {
			uridium: message[4],
			totatUridium: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	experience(message) {
		let event = new CustomEvent("addExperience", {
			detail: {
			experience: message[4],
			totalExperience: message[5],
			lvl: message[6]
			}
		});
		window.dispatchEvent(event);
	}

	honor(message) {
		let event = new CustomEvent("addHonor", {
			detail: {
			honor: message[4],
			totalHonor: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	connection({connected,status}) {
		window.dispatchEvent(new CustomEvent("connection", {
			detail: {
			connected,
			status
			}
		}));
	}

	get handler() {
		return this._handler;
	}

}