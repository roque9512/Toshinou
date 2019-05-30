class Minimap {
	constructor(a) {
		this._api = a;
	}

	createWindow() {
		this.minimap = WindowFactory.createWindow({
			width: 320,
			text: chrome.i18n.getMessage("minimap")
		});

		this.canvas = jQuery("<canvas/>", {
			width: 300,
			height: 150
		});
		this.areaButton = jQuery("<button/>", {
			text: "+",
			width: 10,
			height: 10,
			style: "background-color: rgb(22, 38, 47);"
		})
		this.trail = [];
		this.ctx = this.canvas.get(0).getContext("2d");

		this.canvas.appendTo(this.minimap);
		this.areaButton.appendTo(this.minimap);
		this.mousedown = false;
		this.areaMode = false;
		this.tempArea = {x:0, y:0, w:0, h:0};
		var self = this;
		
		this.areaButton.click(function(e){
			self.areaMode = !self.areaMode;
		});

		this.canvas.click(function (e) {
			if(!self.areaMode){
				var pos = self.minimap.position();
				if(window.globalSettings.windowsToTabs){
					var movable = e.target.parentNode.parentNode.parentNode.style;
				}else{
					var movable = e.target.parentNode.parentNode.style;
				}
				var movable_x = parseInt(movable.left) || 0;
				var movable_y = parseInt(movable.top) || 0;
				var x = ((e.clientX - pos.left) - movable_x) * (window.b1)-window.b3;
				var y = ((e.clientY - pos.top) - movable_y) * (window.b2)-window.b3;

				self._api.move(x,y);
			}
		});

		this.canvas.on('mousedown', function(e) {
			if(self.areaMode){
				self.tempArea.x = (parseInt(e.clientX - self.canvas.offset().left) * window.b1);
				self.tempArea.y = (parseInt(e.clientY - self.canvas.offset().top) * window.b2);
			}
			self.mousedown = true;
		});
	
		this.canvas.on('mouseup', function(e) {
			self.mousedown = false;
		});

		this.canvas.on('mousemove', function(e) {
			if(self.areaMode){
				var mousex = parseInt(e.clientX - self.canvas.offset().left);
				var mousey = parseInt(e.clientY - self.canvas.offset().top);
				if(self.mousedown) {
					self.tempArea.w = (mousex * window.b1 - self.tempArea.x);
					self.tempArea.h = (mousey * window.b2 - self.tempArea.y);
					window.settings.WorkArea = self.tempArea;
				}
			}
		});
	}

	draw() {
		var ct = this.ctx;
		ct.font = "10px Arial";

		ct.clearRect(0, 0, this.canvas.width() + 2, this.canvas.height() + 2);

		ct.strokeStyle = "white";
		ct.lineWidth = 1;
		ct.rect(1, 1, this.canvas.width() - 2, this.canvas.height() - 2);
		ct.stroke();

		ct.fillStyle = 'green';
		this._fillCircle(ct, window.hero.position.x / window.b1, window.hero.position.y / window.b2, 2);

		if(this.trail.length > 30){
			this.trail.splice(0, 1);
		}
		this.trail.push({x:window.hero.position.x/window.b1, y: window.hero.position.y/window.b2});
		if(this.trail.length > 1){
			var inc = 1/this.trail.length;
			for(var i = 1; i < this.trail.length; i++){
				ct.beginPath();
				ct.moveTo(this.trail[i-1].x, this.trail[i-1].y);
				ct.lineTo(this.trail[i].x, this.trail[i].y);
				ct.strokeStyle = "rgba(255, 255, 255, "+inc+")";
				ct.stroke();
				inc += (1/this.trail.length);
			}
		}

		for (var property in this._api.boxes) {
			var box = this._api.boxes[property];
			if (box == null || box.isResource())
				continue;

			ct.fillStyle = BoxType.getColor(box.type);
			this._fillCircle(ct, box.position.x / window.b1, box.position.y / window.b2, 1.3);
		}

		for (var property in this._api.ships) {
			var ship = this._api.ships[property];

			if (ship == null)
				continue;

			ship.update();
			var pos = ship.position;

			if (ship.isNpc) {
				ct.fillStyle = "rgb(255, 0, 245)";
			} else if (ship.isEnemy) {
				ct.fillStyle = "rgb(255, 0, 0)";
				if (ship.cloaked) {
					ct.fillText(ship.name + " | Cloaked", pos.x / window.b1 + 1, pos.y / window.b2 + 13);
				} else {
					ct.fillText(ship.name, pos.x / window.b1 + 1, pos.y / window.b2 + 13);
				}
			} else {
				ct.fillStyle = "rgb(0, 125, 255)";
				ct.fillText(ship.name, pos.x / window.b1 + 1, pos.y / window.b2 + 13);
			}

			this._fillCircle(ct, pos.x / window.b1, pos.y / window.b2, 2);
		}

		if(this._api.destination){
			ct.beginPath();
			ct.moveTo(window.hero.position.x / window.b1, window.hero.position.y / window.b2);
			ct.lineTo(this._api.destination.x / window.b1, this._api.destination.y / window.b2);
			ct.strokeStyle = "rgba(0, 152, 255, 0.9)";
			ct.stroke();
		}

		if(window.settings.WorkArea){
			ct.beginPath();
			ct.rect(window.settings.WorkArea.x / window.b1, window.settings.WorkArea.y / window.b2,
				    window.settings.WorkArea.w / window.b1, window.settings.WorkArea.h / window.b2);
			ct.strokeStyle = 'green';
			ct.lineWidth = 1;
			ct.stroke();
		}


		if (this._api.battlestation) {
			let bs = this._api.battlestation;
			if (bs.isEnemy && bs.factionId != 0) {
				ct.fillStyle = "rgb(255, 0, 0)";
			} else if (bs.factionId == 0) {
				ct.fillStyle = "rgb(76, 76, 76)";
			} else {
				ct.fillStyle = "rgb(0, 255, 0)";
			}

			this._fillCircle(ct, (bs.position.x) / window.b1, bs.position.y / window.b2, 3);

			if (bs.clanTag != "") {
				ct.fillText("[" + bs.clanTag + "] " + bs.name, bs.position.x / window.b1 - 30, bs.position.y / window.b2 - 8);
			} else {
				ct.fillStyle = "white";
				ct.fillText(bs.name, bs.position.x / window.b1 - 20, bs.position.y / window.b2 - 5);
			}

			for (let prop in this._api.battlestation.modules) {
				let mod = this._api.battlestation.modules[prop];
				this._fillCircle(ct, (mod.position.x) / window.b1, mod.position.y / window.b2, 2);
			}
		}

		ct.strokeStyle = "white";
		ct.lineWidth = 1;
		this._api.gates.forEach(gate => {
			var pos = gate.position;
			this._strokeCircle(ct, pos.x / window.b1, pos.y / window.b2, 4);
		});
	}

	_fillCircle(ctx, x, y, r) {
		this._drawCircle(ctx, x, y, r);
		ctx.fill();
	}

	_strokeCircle(ctx, x, y, r) {
		this._drawCircle(ctx, x, y, r);
		ctx.stroke();
	}

	_drawCircle(ctx, x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	}
}
