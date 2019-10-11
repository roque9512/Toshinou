class ModifierUpdateHandler {
	static get ID() {
		return 20440;  
	}

	constructor() {
		this._handler = (e, a) => {
            let command = JSON.parse(e.detail);
            
            if(command.userId == window.hero.id && command.modifier == 26){
                if(command.count == 1 ){
                    window.invertedMovement = true;
                }else{
                    window.invertedMovement = false;
                }

            }
            var ship = a.ships[command.userId];
            // Update ships modifier
            if(ship){
                // Check if ship already has the modifier
                for(var i = 0; i < ship.modifier.length; i++){
                    var mod = ship.modifier[i];
                    if(mod.modifier == command.modifier){
                        ship.modifier[i] = command;
                        return;
                    }
                }
                a.ships[command.userId].modifier.push(command);
            }
        }
    }

    get handler() {
        return this._handler;
    }

}


