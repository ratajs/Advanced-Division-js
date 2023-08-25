function advdiv(n1, n2, minstr, decstr, rstr1, rstr2) {
	var neg = false, over = false;
	var carry = 0, newcarry = 0, rcount = -1, x, y, d;
	var res = "", result;
	var times10;
	var carries = [];
	var n1s;
	var n2i, n1mc, n2mc, m1, m2;
	var sign, n1m, n2m;
	var n1s1;
	var nre;

	RegExp.escape = str => str.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

	if(typeof minstr=="undefined")
		minstr = "-";
	if(typeof decstr=="undefined")
		decstr = ".";
	if(typeof rstr1=="undefined") {
		rstr1 = "[";
		rstr2 = "]";
	};
	if(typeof rstr2=="undefined")
		rstr2 = "";

	if(n1.length==0 || n2.length==0 || /^\d*$/.test(minstr) || /^\d*$/.test(decstr) || /^\d*$/.test(rstr1) || /^\d+$/.test(rstr2))
		return false;

	nre = new RegExp("^("+RegExp.escape(minstr)+")?\\d*("+RegExp.escape(decstr)+"\\d*("+RegExp.escape(rstr1)+"\\d*"+RegExp.escape(rstr2)+")?)?$");

	if(!nre.test(n1) || !nre.test(n2))
		return false;

	if(n1.slice(0, minstr.length)==minstr) {
		n1 = n1.slice(minstr.length);
		neg = true;
	};
	if(n2.slice(0, minstr.length)==minstr) {
		n2 = n2.slice(minstr.length);
		neg = !neg;
	};

	sign = neg ? minstr : "";

	n1 = n1.replace(decstr, ".");
	n2 = n2.replace(decstr, ".");

	if(n1[0]==".")
		n1 = "0"+n1;

	if(n2[0]==".")
		n2 = "0"+n2;

	r1 = (n1.indexOf(rstr1) > -1) ? (new RegExp(RegExp.escape(rstr1)+"(.+)"+RegExp.escape(rstr2)).exec(n1.slice(n1.indexOf(".") + 1)) || ["0", "0"])[1] : "0";
	if(r1!="0")
		n1 = n1.slice(0, n1.indexOf(".") + n1.slice(n1.indexOf(".") + 1).indexOf(rstr1));
	n1 = n1.replace(/^0+/, "0").replace(r1=="0" ? /\.0*$/ : /\.*$/, "");
	r2 = (n2.indexOf(rstr1) > -1) ? (new RegExp(RegExp.escape(rstr1)+"(.+)"+RegExp.escape(rstr2)).exec(n2.slice(n2.indexOf(".") + 1)) || ["0", "0"])[1] : "0";
	if(r2!="0")
		n2 = n2.slice(0, n2.indexOf(".") + n2.slice(n2.indexOf(".") + 1).indexOf(rstr1));
	n2 = n2.replace(/^0+/, "0").replace(r2=="0" ? /\.0*$/ : /\.*$/, "");


	if(n2=="0" && /^[0\.]+$/.test(r2))
		return false;

	if(n1=="0" && /^[0\.]+$/.test(r1))
		return "0";

	if(r2!="0") {
		n1m = n1.replace(".", "");
		n2m = n2.replace(".", "");

		n1mc = parseInt(n1m+r1) - parseInt(n1m);
		n2mc = parseInt(n2m+r2) - parseInt(n2m);

		if(n1.indexOf(".") > -1)
			m1 = Math.pow(10, n1.length - n1.indexOf(".") - 1 + r1.toString().length) - Math.pow(10, n1.length - n1.indexOf(".") - 1);
		else
			m1 = Math.pow(10, r1.toString().length) - 1;

		if(n2.indexOf(".") > -1)
			m2 = Math.pow(10, n2.length - n2.indexOf(".") - 1 + r2.toString().length) - Math.pow(10, n2.length - n2.indexOf(".") - 1);
		else
			m2 = Math.pow(10, r2.toString().length) - 1;

		return sign+advdiv((n1mc * m2).toString(), (m1 * n2mc).toString(), minstr, decstr, rstr1, rstr2);
	};

	times10 = function(nstring) {
		if(nstring.indexOf(".") > -1 && nstring.indexOf(".")==nstring.length - 2)
			return nstring.replace(".", "");
		if(nstring.indexOf(".") > -1)
			return nstring.split(".")[0] + nstring.split(".")[1].split("")[0] + "." + nstring.split(".")[1].slice(1);
		return nstring + "0";
	};

	while(n2.indexOf(".") > -1) {
		if(n1.indexOf(".") < 0) {
			n1+= r1.toString()[0];
			if(r1.toString().length > 1)
				r1 = parseInt(r1.toString().slice(1)+r1.toString()[0]);
		}
		else
			n1 = times10(n1);
		n2 = times10(n2);
	};

	n2i = parseInt(n2);
	n1s = n1.split("");
	n1s1 = n1.split(".")[0].split("");

	for(x = 0; x < n1s1.length; x++) {
		d = Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s1[x])) / n2i);
		res+= d.toString();
		carry = (parseInt(times10(carry.toString())) + parseInt(n1s1[x])) - n2i * d;
	};

	if(res=="") {
		res = "0";
		x++;
	};

	res+= ".";
	if(n1s.indexOf(".") < 0)
		n1s.push(".");

	for(x++; ; x++) {
		if(x >= n1s.length) {
			rcount++;
			over = true;
			n1s.push(parseInt(r1.toString().split('')[(rcount) % r1.toString().length]));
		};

		newcarry = (parseInt(times10(carry.toString())) + parseInt(n1s[x])) - n2i * Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2i);

		if(over) {
			if(newcarry==0 && r1==0) {
				res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2i).toString();
				return sign+res.replace(/^0+|0$/g, "").replace(/^\./, "0.").replace(/\.$/, "").replace(".", decstr);
			};
			for(y = 0; y < carries.length; y++) {
				if(over && carries[y]==newcarry && (y % r1.toString().length)==((rcount + 1) % r1.toString().length)) {
					res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2i).toString();
					result = ((res.slice(0, x - rcount + y)+"["+res.slice(x - rcount + y)+"]").replace(/^0+/g, "").replace(/^\./, "0."));
					if(result[result.indexOf("[") - 1]==result[result.indexOf("]") - 1])
						result = result.slice(0, result.indexOf("[") - 1)+"["+result[result.indexOf("[") - 1]+result.slice(result.indexOf("[") + 1, result.indexOf("]") - 1)+"]";
					if(result.indexOf("]")==result.indexOf("[") + 3 && result[result.indexOf("[") + 1]==result[result.indexOf("[") + 2])
						result = result.slice(0, result.indexOf("[") + 2)+"]";
					return sign+result.replace(/[.[\]]/g, m => (m[0]=="." ? decstr : (m[0]=="[" ? rstr1 : rstr2)));
				};
			};
		};

		res+= Math.floor((parseInt(times10(carry.toString())) + parseInt(n1s[x])) / n2i).toString();
		if(over)
			carries.push(carry);
		carry = newcarry;
	};
};
