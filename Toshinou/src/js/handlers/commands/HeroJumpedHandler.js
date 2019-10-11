class HeroJumpedHandler{
    static get ID(){
        return 6841; 
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
