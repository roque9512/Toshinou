class MovementDoneEventHandler {
	constructor() {
		this._handler = function () {
			window.movementDone = true;
			api.destination = null;
		}
	}

	get handler() {
		return this._handler;
	}
}