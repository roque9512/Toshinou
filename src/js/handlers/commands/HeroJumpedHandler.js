class HeroJumpedHandler{
    static get ID(){
        return 20063; 
    }
    constructor(){
        this._handler = function(e,a){
            let parsedJson = JSON.parse(e.detail);
            a.jumped = true;
        }
    }
    get handler() {
		return this._handler;
	}
}
