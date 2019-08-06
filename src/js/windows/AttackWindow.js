class AttackWindow {
	createWindow() {
		this.attackWindow = WindowFactory.createWindow({
			width: 320,
			text: "S-Saldiri Detaylari"
		});

		this.targetNameTxt = jQuery("<h4>");
		this.targetNameTxt.text("Hedef: ");

		this.hpTxt = jQuery("<h4>");
		this.hpTxt.text("Can:" );

		this.shdTxt = jQuery("<h4>");
		this.shdTxt.text("Kalkan:" );

		this.shipTxt = jQuery("<h4>");
		this.shipTxt.text("Gemi:" );
		
		this.bosluk = jQuery("<h4>");
		this.bosluk.text(" - ");
		
		this.sly = jQuery("<h4>");
		this.sly.text("Bu Botu SlayerViper Türkçeleştirmiştir!");

		this.targetNameTxt.appendTo(this.attackWindow);
		this.hpTxt.appendTo(this.attackWindow);
		this.shdTxt.appendTo(this.attackWindow);
		this.shipTxt.appendTo(this.attackWindow);
		this.bosluk.appendTo(this.attackWindow);
		this.sly.appendTo(this.attackWindow);

  }

	removeTarget() {
		this.targetName.text("Hedef: ");
		this.hpTxt.text("Can:");
		this.shdTxt.text("Kalkan:" );
		this.bosluk.text(" - ");
		this.sly.text("Bu Botu SlayerViper Türkçeleştirmiştir!");
	}

	targetName(value) {
		this.targetNameTxt.text("Hedef: " + (value ? value : '' ));
	}
	hp(value) {
		this.hpTxt.text(chrome.i18n.getMessage("hp") + (value ? value : '' ));
	}
	shd(value) {
		this.shdTxt.text(chrome.i18n.getMessage("shd") + (value ? value :''));
	}
	ship(value){
		this.shipTxt.text("Gemi: " + (value ? value:''));
	}
	bosluk(value) {
		this.bosluk.text(" - " + value);
	}
    sly(value) {
		this.sly.text("Bu Botu SlayerViper Türkçeleştirmiştir!" + value);
	}
}

