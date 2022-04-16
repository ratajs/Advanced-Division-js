function advdiv(n1, n2, r, rstr1, rstr2) {
	if(!rstr1 && rstr1!=="")
		rstr1 = "[";
	if(!rstr2 && rstr2!="")
		rstr2 = "]";
	if(n2==0)
		return false;
	if(!r)
		r = 0;
	var sign = (parseFloat(n1) < 0 ? parseFloat(n2) >= 0 : parseFloat(n2) < 0) ? "-" : "";
	n1 = Math.abs(n1);
	n2 = Math.abs(n2);
	r = Math.abs(r);
	var times10 = function(nstring) {
		if(nstring.indexOf(".") > -1 && nstring.indexOf(".")==nstring.length - 2)
			return nstring.replace(".", "");
		if(nstring.indexOf(".") > -1)
			return nstring.split(".")[0] + nstring.split(".")[1].split("")[0] + "." + nstring.split(".")[1].slice(1);
		return nstring + "0";
	};
	var n1string = n1.toString();
	var n2string = n2.toString();
	while(n2string.indexOf(".") > -1) {
		if(n1string.indexOf(".") < 0) {
			n1string+= r.toString()[0];
			if(r.toString().length > 1)
				r = parseInt(r.toString().slice(1)+r.toString()[0]);
		}
		else
			n1string = times10(n1string);
		n2string = times10(n2string);
	};
	n1 = parseFloat(n1string);
	n2 = parseInt(n2string);
	var res = "";
	var n1s = n1string.split("");
	var n1s1 = n1string.split(".")[0].split("");
	var carry = 0;
	var newcarry = 0;
	var over = false;
	for(var i = 0; i < n1s1.length; i++) {
		res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s1[i])) / n2).toString();
		carry = (parseInt(times10(carry.toString())) + parseInt(n1s1[i])) - n2 * Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s1[i])) / n2);
	};
	if(res=="") {
		res = "0";
		i++;
	};
	var doti = i;
	res+= ".";
	var carries = new Array();
	var rcount = -1;
	var x;
	if(n1s.indexOf(".") < 0)
		n1s.push(".");
	for(i++; i==i; i++) {
		if(i >= n1s.length) {
			rcount++;
			over = true;
			n1s.push(parseInt(r.toString().split('')[(rcount) % r.toString().length]));
		};
		newcarry = (parseInt(times10(carry.toString())) + parseInt(n1s[i])) - n2 * Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[i])) / n2);
		if(over) {
			if(newcarry==0 && r==0) {
				res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[i])) / n2).toString();
				return sign+res.replace(/^0+|0$/gm, "").replace(/^\./, "0.").replace(/\.$/, "");
			};
			for(x = 0; x < carries.length; x++) {
				if(over && carries[x]==newcarry && (x % r.toString().length)==((rcount + 1) % r.toString().length)) {
					res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[i])) / n2).toString();
					result = sign + ((res.slice(0, i - rcount + x)+"["+res.slice(i - rcount + x)+"]").replace(/^0+/gm, "").replace(/^\./, "0."));
					if(result[result.indexOf("[") - 1]==result[result.indexOf("]") - 1])
						result = result.slice(0, result.indexOf("[") - 1)+"["+result[result.indexOf("[") - 1]+result.slice(result.indexOf("[") + 1, result.indexOf("]") - 1)+"]";
					if(result.indexOf("]")==result.indexOf("[") + 3 && result[result.indexOf("[") + 1]==result[result.indexOf("[") + 2])
						result = result.slice(0, result.indexOf("[") + 2)+"]";
					return result.replace("[", rstr1).replace("]", rstr2);
				};
			};
		};
		res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[i])) / n2).toString();
		if(over)
			carries.push(carry);
		carry = newcarry;
	};
};
