class QuickslotHandler{
	static get ID(){
		return 28598;
	}

	constructor(){
		this._handler = function (e, a) {
			let cmd = JSON.parse(e.detail);

			for(var key in cmd){
				var thing  = cmd[key];
				if(typeof(thing) == "string"){
					if(thing.indexOf("ability") != -1){
						a.abilityReady = cmd.activatable;
					}
				}
			}

	    }
	}
	get handler() {
		return this._handler;
	}
}
