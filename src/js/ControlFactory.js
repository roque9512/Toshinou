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
		Object.keys(options).forEach((key) =>{
			let localOption = jQuery("<option>");
			localOption.attr('value', key);
			localOption.text(options[key]);
			localOption.appendTo(select);
		});
		Object.keys(attrs).forEach((name) => {
			if(name == "value")
				select.val(attrs[name]);
			else
				select.attr(name, attrs[name]);
			
		});
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

	static label({
		labelText,
		name,
		appendTo,
		br = true,
		attrs = {}
	}){
		let something = jQuery("<label>");
		something.attr(attrs);
		something.attr("for", name);
		something.html(labelText);
		something.appendTo(appendTo);
	}

	static input({
		labelText = "",
		type,
		appendTo,
		name,
		eventType = "change",
		br = true,
		labelBefore = false,
		event = () => {},
		attrs = {}
	}) {
		let input = jQuery("<input>");
		input.attr("type", type);

		Object.keys(attrs).forEach((attname) => {
			input.attr(attname, attrs[attname]);
		});
		let label = jQuery("<label>");
		label.attr("for", name);
		input.attr("id", name);
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

	static createControl(params) {
		switch(params.type){
			case "checkbox":
			case "range":
			case "number":
				return this.input(params);
			case "label":
				return this.label(params)
			case "select":
				return this.select(params);
			default:
				break;
		}
	}


	static createTable(columns){
		let table = jQuery('<table>');
		table.attr("border", 1);
		let body = jQuery('<tbody>');
		body.appendTo(table);

		let top = jQuery('<tr>');
		columns.forEach((n, i) => {
			let th = jQuery("<th>");
			th.html(n);
			th.appendTo(top);
		});
		top.appendTo(body);
		return table;
	}


	static tableFill(table, rows){
		let _row = jQuery("<tr>")
		rows.forEach((n, i) => {
			let td = jQuery("<td>");
			n['appendTo'] = td;
			this.createControl(n);
			td.appendTo(_row);
		});
		_row.appendTo(table);
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