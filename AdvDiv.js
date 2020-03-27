function advdiv(n1, n2, r, rstr1, rstr2) {
  if(n2==0)
    return false;
  var sign = (parseInt(n1)<0 ? parseInt(n2)>=0 : parseInt(n2)<0) ? "-" : "";
  n1 = Math.abs(n1);
  n2 = Math.abs(n2);
  r = Math.abs(r);
  if(n1.toString().indexOf(".")>-1) {
    n2*= Math.pow(10, n1.toString().length - n1.toString().indexOf(".") - 1);
    n1*= Math.pow(10, n1.toString().length - n1.toString().indexOf(".") - 1);
  };
  var res = "";
  var n1s = n1.toString().split("");
  var n1s1 = n1.toString().split(".")[0].split("");
  var carry = 0;
  var newcarry = 0;
  var over = false;
  for(var i = 0; i<n1s1.length; i++) {
    res+= Math.floor((10*carry+parseInt(n1s1[i]))/n2).toString();
    carry = (10*carry+parseInt(n1s1[i])) - n2 * Math.floor((10*carry+parseInt(n1s1[i]))/n2);
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
      over = true;
      n1s[i] = r;
    };
    newcarry = (10*carry+parseInt(n1s[i])) - n2 * Math.floor((10*carry+parseInt(n1s[i]))/n2);
    if((newcarry==0 && r==0) || carries.indexOf(newcarry)>-1) {
      res+= Math.floor((10*carry+parseInt(n1s[i]))/n2).toString();
    };
    if(newcarry==0 && r==0)
      return (sign + res).replace(/^0+|0$/gm, "").replace(/^\./, "0.").replace(/\.$/, "");
    if(carries.indexOf(newcarry)>-1) {
      return new Array(sign, res.slice(0, doti+carries.indexOf(newcarry)+1), rstr1, res.slice(doti+carries.indexOf(newcarry)+1), rstr2).join("").replace(/^0+/gm, "").replace(/^\./, "0.");
    };
    res+= Math.floor((10*carry+parseInt(n1s[i]))/n2).toString();
    carry = newcarry;
    if(over)
      carries[i-doti] = carry;
  };
};
