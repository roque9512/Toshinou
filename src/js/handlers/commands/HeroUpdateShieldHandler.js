class HeroUpdateShieldHandler {
	static get ID() {
		return 19; 
	}
  
	constructor() {
		this._handler = (e, a) => {
			let parsedJson = JSON.parse(e.detail);
			
			if(window.hero){
				window.hero.maxShd = parsedJson[Variables.heroInitMaxShd];
				window.hero.shd = parsedJson[Variables.heroUpdateShd]; 
			}
		}
	}

	get handler() {
		return this._handler;
	}
}
  