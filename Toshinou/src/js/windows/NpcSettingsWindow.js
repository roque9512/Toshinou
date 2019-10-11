class NpcSettingsWindow {
	createWindow() {
		this.npcSettingsWindow = WindowFactory.createWindow({
			width: 320,
			maxHeight: 300,
			text: chrome.i18n.getMessage("excludenpcto")
		});

		let controls = [];
		let columns = ["Block", "Name", "Priority","Range"];
		let table = ControlFactory.createTable(columns);
		this.knownNpcList.forEach((n, i) => {
			controls.push([
				{
					type:'checkbox',
					name: n,
					attrs: {
						  class: n,
						  checked: window.settings.getNpc(n).blocked
					},
					event: function () {window.settings.setNpc(n,this.checked);}
				},
				{
					type:'label',
					name: n,
					attrs: {
						style: 'font-weight:normal; color:white; font-size: 15px;' 
					}, 
					labelText: n.replace(/(\}|\{|\:|\.|\(|\)|\-|\=|\[|\]|\\|\/|\<|\>)/g, "")
				},
				{
					type:'number',
					name:n,
					attrs:{
						class: "ranges "+n,
						style: "width:50px;",
						value: window.settings.getNpc(n).priority
					}, 
					event:function(){
						window.settings.setNpcPriority(n, this.value);
					}
				},
				{
					type:'number',
					name:n,
					attrs:{
						class: 'ranges '+n,
						style:"width:50px;",
						value: window.settings.getNpc(n).range
					}, 
					event:function(){
						window.settings.setNpcRange(n, this.value);
					}
				}
			]);
		});
		controls.forEach((control) => {
			ControlFactory.tableFill(table, control);
		});
		table.appendTo(this.npcSettingsWindow);
  }


	get knownNpcList() {
		return [
			"\\ Purpose XXI //",
			"\\ Attend IX //",
			"-=[ Streuner ]=-",
			"-=[ Aider Streuner ]=-",
			"-=[ Recruit Streuner ]=-",
			"-=[ Lordakia ]=-",
			"* Lordakium Spore *",
			"-=[ Devolarium ]=-",
			"-=[ Mordon ]=-",
			"-=[ Sibelon ]=-",
			"-=[ Saimon ]=-",
			"-=[ Lordakium ]=-",
			"-=[ Sibelonit ]=-",
			"-=[ Kristallin ]=-",
			"-=[ Kristallon ]=-",
			"-=[ StreuneR ]=-",
			"-=[ Protegit ]=-",
			"-=[ Cubikon ]=-",
			"-=[ Interceptor ]=-",
			"-=[ Barracuda ]=-",
			"-=[ Saboteur ]=-",
			"-=[ Annihilator ]=-",
			"-=[ Battleray ]=-",
			"-=[ Deadly Battleray ]=-",
			"( Uber Battleray )",
			"..::{ Boss Streuner }::..",
			"..::{ Boss Lordakia }::..",
			"..::{ Boss Mordon }::..",
			"..::{ Boss Saimon }::..",
			"..::{ Boss Devolarium }::..",
			"..::{ Boss Sibelonit }::..",
			"..::{ Boss Sibelon }::..",
			"..::{ Boss Lordakium }::...",
			"..::{ Boss Kristallin }::..",
			"..::{ Boss Kristallon }::..",
			"..::{ Boss StreuneR }::..",
			"( UberStreuner )",
			"( UberLordakia )",
			"( UberMordon )",
			"( UberSaimon )",
			"( UberDevolarium )",
			"( UberSibelonit )",
			"( UberSibelon )",
			"( UberLordakium )",
			"( UberKristallin )",
			"( UberKristallon )",
			"( UberStreuneR )",
			"( Uber Interceptor )",
			"( Uber Barracuda )",
			"( Uber Saboteur )",
			"( Uber Annihilator )",
			"( Uber Battleray )",
			"-=[ Referee-Bot ]=-",
			"<=< Icy >=>",
			"<=< Ice Meteoroid >=>",
			"<=< Super Ice Meteoroid >=>",
			"-=[ Skoll ]=-",
			"<=< Skoll's Icy >=>",
			"-=[ Santa -1100101 ]=-",
			"<=< Gygerthrall >=>",
			"<=< Blighted Gygerthrall >=>",
			"-=[ Blighted Kristallon ]=-",
			"<=< Plagued Gygerthrall >=>",
			"-=[ Plagued Kristallin ]=-",
			"-=[ Plague Rocket ]=-",
			"..::{ Boss Lordakium }::... δ21",
			"..::{ Boss Lordakium }::... δ23",
			"..::{ Boss Lordakium }::... δ25",
			"-={ demaNeR Escort }=-",
			"-={ Demaner Corsair }=-",
			"-={ demaNeR Freighter }=-",
			"-=[ Hitac 2.0 ]=-",
			"-=[ Hitac-Minion ]=-"
		];
	}
}
