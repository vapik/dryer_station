;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['DeviceSettings/DeviceSettingsEdit.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var item=__fest_context;__fest_buf+=("<td class=\"setting-devices-table__id\">");try{__fest_buf+=(__fest_escapeHTML(item.id))}catch(e){__fest_log_error(e.message + "2");}__fest_buf+=("</td><td colspan=\"5\"><form class=\"setting-devices-table-form pure-form\">");try{__fest_attrs[0]=__fest_escapeHTML(item.id)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"settings-devices-table-form__input\" type=\"hidden\" name=\"id\" value=\"" + __fest_attrs[0] + "\"/>");try{__fest_attrs[0]=__fest_escapeHTML(item.name)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"setting-devices-table-form__input\" type=\"text\" required=\"required\" placeholder=\"Name\" name=\"name\" value=\"" + __fest_attrs[0] + "\"/>");try{__fest_attrs[0]=__fest_escapeHTML(item.ip)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"setting-devices-table-form__input\" type=\"text\" required=\"required\" placeholder=\"IP\" name=\"ip\" value=\"" + __fest_attrs[0] + "\"/>");try{__fest_attrs[0]=__fest_escapeHTML(item.idDev)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"setting-devices-table-form__input\" type=\"number\" required=\"required\" placeholder=\"ID\" size=\"3\" name=\"idDev\" value=\"" + __fest_attrs[0] + "\"/><button class=\"setting-devices-table-form__button-apply pure-button\" type=\"button\">Изменить</button><button class=\"setting-devices-table-form__button-cancel pure-button\" type=\"button\">Отменить</button></form></td>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();