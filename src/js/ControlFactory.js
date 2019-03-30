class ControlFactory {

	static info({
		labelText,
		spanText,
		appendTo}) {
		let info = jQuery("<div>");

		let label = jQuery("<label>");
		label.html(labelText);
		label.appendTo(info);

		let span = jQuery("<span>");
		span.html(spanText);
		span.appendTo(info);

		info.appendTo(appendTo);

		return info;
	}

	static select({
		labelText,
		name,
		appendTo,
		br = true,
		disabled = false,
		eventType = "change",
		event = () => {},
		attrs = {},
		options = {}
	}) {

	let select = jQuery("<select>");
	select.attr('id', name);
	Object.keys(attrs).forEach((name) => {
		select.attr(name, attrs[name]);
	});

	Object.keys(options).forEach((key) =>{
		let localOption = jQuery("<option>");
		localOption.attr('value', key);
		localOption.text(options[key]);
		localOption.appendTo(select);
	});
	if(window.settings.settings[name] != null){
		select.val(window.settings.settings[name]);
	}
	let label = jQuery("<label>");
	label.html(labelText);
	label.appendTo(appendTo);


	select.appendTo(appendTo);
	if (br) {
		jQuery("<br>").appendTo(appendTo);
	}


	select[eventType](function (ev) {
		this.select = select;
		if (labelText) {
		this.label = label;
		}
		event.call(this, ev);
	});
	select.prop("disabled", disabled );
    

	return {
		select,
		label
	};

	}

	static checkbox({
		labelText,
		appendTo,
		eventType = "change",
		event = () => {},
		attrs = {}
	}) {
		return this.createControl({
			labelText,
			appendTo,
			eventType,
			event,
			attrs
		});
	}

	static createControl({
		type = "checkbox",
		name,
		labelText,
		labelBefore = false,
		appendTo,
		br = true,
		eventType = "change",
		event = () => {},
		attrs = {},
	}) {
		let input = jQuery("<input>");
		input.attr("type", type);
		input.attr("id", name);


		Object.keys(attrs).forEach((attname) => {
			input.attr(attname, attrs[attname]);
		});

		if(type == "checkbox"){
			if(window.settings.settings[name] != null){
				input.prop('checked',window.settings.settings[name]);
			}else if(window.settings.settings.npcs[labelText]){
				input.prop('checked', true);
			}
		}else if(type == "range" || type == "number"){
			input.attr('value',window.settings.settings[name]);
			if(labelText.indexOf('<span>') != -1)
				labelText = labelText.replace(/[0-9]{1,3}/, window.settings.settings[name]);
		}

		let label = jQuery("<label>");
		label.attr("for", name);
		label.html(labelText);

		if (labelBefore) 
			label.appendTo(appendTo);

		input.appendTo(appendTo);

		if (!labelBefore)
			label.appendTo(appendTo);

		if (br)
			jQuery("<br>").appendTo(appendTo);

		input[eventType](function (ev) {
			this.input = input;
			this.label = label;
			event.call(this, ev);
		});


		return {
			input,
			label
		};
	}

	static emptyDiv(appendTo) {
		return jQuery("<div>").appendTo(appendTo);
	}

	static btn({
		labelText,
		appendTo
	}) {
		let btn = jQuery("<button>", {
			class: 'btn'
		});
		btn.html(labelText);
		btn.appendTo(appendTo);
		return btn;
	}
}