class AttackWindow {
	createWindow() {
		this.attackWindow = WindowFactory.createWindow({
			width: 320,
			text: chrome.i18n.getMessage("attackdetails")
		});

		this.targetNameTxt = jQuery("<h4>");
		this.targetNameTxt.text("Target: ");

		this.hpTxt = jQuery("<h4>");
		this.hpTxt.text("HP:" );

		this.shdTxt = jQuery("<h4>");
		this.shdTxt.text("SHIELD:" );

		this.shipTxt = jQuery("<h4>");
		this.shipTxt.text("Ship:" );

		this.targetNameTxt.appendTo(this.attackWindow);
		this.hpTxt.appendTo(this.attackWindow);
		this.shdTxt.appendTo(this.attackWindow);
		this.shipTxt.appendTo(this.attackWindow);

  }

	removeTarget() {
		this.targetName.text("Target: ");
		this.hpTxt.text("HP:");
		this.shdTxt.text("SHIELD:" );
	}

	targetName(value) {
		this.targetNameTxt.text("Target: " + (value ? value : '' ));
	}
	hp(value) {
		this.hpTxt.text(chrome.i18n.getMessage("hp") + (value ? value : '' ));
	}
	shd(value) {
		this.shdTxt.text(chrome.i18n.getMessage("shd") + (value ? value :''));
	}
	ship(value){
		this.shipTxt.text("Ship: " + (value ? value:''));
	}
}