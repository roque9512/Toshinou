class PetUpdateFuel {
	static get ID() {
		return 6023; 
	}

	constructor() {
		this._handler = (e, a) => {
            let command = e.wholeMessage.split("|");
            a.petHasFuel = true;
        }
    }

    get handler() {
        return this._handler;
    }

}