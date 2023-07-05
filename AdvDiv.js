function advdiv(n1, n2, r1, r2, rstr1, rstr2) {
	var over = false;
	var carry = 0, newcarry = 0, rcount = -1, x, y, d;
	var n1string, n2string, res = "", result;
	var times10;
	var carries = [];
	var n1s;
	var n1mc, n2mc, m1, m2;
	var sign, n1m, n2m;
	var n1s1;

	if(!rstr1 && rstr1!=="")
		rstr1 = "[";
	if(!rstr2 && rstr2!="")
		rstr2 = "]";
	if(n2==0 && r2==0)
		return false;
	if(!r1)
		r1 = 0;
	sign = (parseFloat(n1) < 0 ? parseFloat(n2) >= 0 : parseFloat(n2) < 0) ? "-" : "";
	n1 = Math.abs(n1);
	n2 = Math.abs(n2);
	r1 = Math.abs(r1);
	r2 = Math.abs(r2);
	n1string = n1.toString();
	n2string = n2.toString();

	if(r2!=0) {
		n1m = n1string.replace(".", "");
		n2m = n2string.replace(".", "");

		n1mc = parseInt(n1m+r1.toString()) - parseInt(n1m);
		n2mc = parseInt(n2m+r2.toString()) - parseInt(n2m);

		if(n1string.indexOf(".") > -1)
			m1 = Math.pow(10, n1string.length - n1string.indexOf(".") - 1 + r1.toString().length) - Math.pow(10, n1string.length - n1string.indexOf(".") - 1);
		else
			m1 = Math.pow(10, r1.toString().length) - 1;

		if(n2string.indexOf(".") > -1)
			m2 = Math.pow(10, n2string.length - n2string.indexOf(".") - 1 + r2.toString().length) - Math.pow(10, n2string.length - n2string.indexOf(".") - 1);
		else
			m2 = Math.pow(10, r2.toString().length) - 1;

		return advdiv(n1mc * m2, m1 * n2mc, 0, 0, rstr1, rstr2);
	};

	times10 = function(nstring) {
		if(nstring.indexOf(".") > -1 && nstring.indexOf(".")==nstring.length - 2)
			return nstring.replace(".", "");
		if(nstring.indexOf(".") > -1)
			return nstring.split(".")[0] + nstring.split(".")[1].split("")[0] + "." + nstring.split(".")[1].slice(1);
		return nstring + "0";
	};

	while(n2string.indexOf(".") > -1) {
		if(n1string.indexOf(".") < 0) {
			n1string+= r1.toString()[0];
			if(r1.toString().length > 1)
				r1 = parseInt(r1.toString().slice(1)+r1.toString()[0]);
		}
		else
			n1string = times10(n1string);
		n2string = times10(n2string);
	};
	n1 = parseFloat(n1string);
	n2 = parseInt(n2string);
	n1s = n1string.split("");
	n1s1 = n1string.split(".")[0].split("");
	for(x = 0; x < n1s1.length; x++) {
		d = Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s1[x])) / n2);
		res+= d.toString();
		carry = (parseInt(times10(carry.toString())) + parseInt(n1s1[x])) - n2 * d;
	};
	if(res=="") {
		res = "0";
		x++;
	};
	res+= ".";
	if(n1s.indexOf(".") < 0)
		n1s.push(".");
	for(x++; x==x; x++) {
		if(x >= n1s.length) {
			rcount++;
			over = true;
			n1s.push(parseInt(r1.toString().split('')[(rcount) % r1.toString().length]));
		};
		newcarry = (parseInt(times10(carry.toString())) + parseInt(n1s[x])) - n2 * Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2);
		if(over) {
			if(newcarry==0 && r1==0) {
				res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2).toString();
				return sign+res.replace(/^0+|0$/gm, "").replace(/^\./, "0.").replace(/\.$/, "");
			};
			for(y = 0; y < carries.length; y++) {
				if(over && carries[y]==newcarry && (y % r1.toString().length)==((rcount + 1) % r1.toString().length)) {
					res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2).toString();
					result = sign + ((res.slice(0, x - rcount + y)+"["+res.slice(x - rcount + y)+"]").replace(/^0+/gm, "").replace(/^\./, "0."));
					if(result[result.indexOf("[") - 1]==result[result.indexOf("]") - 1])
						result = result.slice(0, result.indexOf("[") - 1)+"["+result[result.indexOf("[") - 1]+result.slice(result.indexOf("[") + 1, result.indexOf("]") - 1)+"]";
					if(result.indexOf("]")==result.indexOf("[") + 3 && result[result.indexOf("[") + 1]==result[result.indexOf("[") + 2])
						result = result.slice(0, result.indexOf("[") + 2)+"]";
					return result.replace("[", rstr1).replace("]", rstr2);
				};
			};
		};
		res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2).toString();
		if(over)
			carries.push(carry);
		carry = newcarry;
	};
};
