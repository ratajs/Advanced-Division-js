function advdiv(n1, n2, r, rstr1, rstr2) {
  if(n2==0)
    return false;
  var sign = (parseInt(n1)<0 ? parseInt(n2)>=0 : parseInt(n2)<0) ? "-" : "";
  n1 = Math.abs(n1);
  n2 = Math.abs(n2);
  r = Math.abs(r);
  var times10 = function(nstring) {
    if(nstring.indexOf(".")>-1 && nstring.indexOf(".")==nstring.length - 2)
      return nstring.replace(".", "");
    if(nstring.indexOf(".")>-1)
      return nstring.split(".")[0] + nstring.split(".")[1].split("")[0] + "." + nstring.split(".")[1].slice(1);
    return nstring + "0";
  };
  var n1string = n1.toString();
  var n2string = n2.toString();
  while(n1string.indexOf(".")>-1 || n2string.indexOf(".")>-1) {
    n1string = (parseFloat(times10(n1string)) + parseFloat(r.toString()[0])).toString();
    n2string = times10(n2string);
    if(r.toString().length > 1)
      r = parseInt(r.toString().slice(1)+r.toString()[0])
  };
  n1 = parseInt(n1string);
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
  carries[0] = carry;
  for(i++; i==i; i++) {
    if(i>=n1s.length) {
      if(typeof rcount=="undefined")
	var rcount = 0;
      else
	rcount++;
      over = true;
      n1s[i] = parseInt(r.toString().split('')[(rcount) % r.toString().length]);
    };
    newcarry = (parseInt(times10(carry.toString()))+parseInt(n1s[i])) - n2 * Math.floor((parseInt(times10(carry.toString()))+parseInt(n1s[i]))/n2);
    if((newcarry==0 && r==0) || carries.filter((v, k) => (k % r.toString().length)==((i - doti) % r.toString().length)).indexOf(newcarry)>-1) {
      res+= Math.floor((parseInt(times10(carry.toString()))+parseInt(n1s[i]))/n2).toString();
    };
    if(newcarry==0 && r==0)
      return sign+res.replace(/^0+|0$/gm, "").replace(/^\./, "0.").replace(/\.$/, "");
    if(carries.filter((v, k) => (k % r.toString().length)==((i - doti) % r.toString().length)).indexOf(newcarry) > -1)
      return sign+(new Array(res.slice(0, doti+carries.indexOf(newcarry) + 1), rstr1, res.slice(doti+carries.indexOf(newcarry) + 1), rstr2).join("").replace(/^0+/gm, "").replace(/^\./, "0."));
    res+= Math.floor((parseInt(times10(carry.toString()))+parseInt(n1s[i])) / n2).toString();
    carry = newcarry;
    if(over)
      carries[i - doti] = carry;
  };
};
