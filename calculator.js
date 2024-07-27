(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var domtoimage = require('./scripts/dom-to-image');
var FileSaver = require('./scripts/FileSaver');

var usingTouch = 'ontouchstart' in window;
var displayMode = ['full','mini']
var calcDisplay = ['show','hide']
var mainColor = '#245b5b'
var filters = []

var methods = {"0": {"index": 0, "name": "English Ordinal", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", "active": false}, "1": {"index": 1, "name": "Full Reduction", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8", "active": false}, "2": {"index": 2, "name": "Single Reduction", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8", "active": false}, "3": {"index": 3, "name": "Full Reduction KV", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,1,2,3,22,5,6,7,8", "active": false}, "4": {"index": 4, "name": "Single Reduction KV", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8", "active": false}, "5": {"index": 5, "name": "English Extended", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800", "active": false}, "6": {"index": 6, "name": "Francis Bacon", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52", "active": false}, "7": {"index": 7, "name": "Franc Baconis", "symbols": "A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52", "active": false}, "8": {"index": 8, "name": "Satanic", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61", "active": false}, "9": {"index": 9, "name": "Reverse Ordinal", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", "active": false}, "10": {"index": 10, "name": "Reverse Full Reduction", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8", "active": false}, "11": {"index": 11, "name": "Reverse Single Reduction", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8", "active": false}, "12": {"index": 12, "name": "Reverse Full Reduction EP", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,1,2,3,22,5,6,7,8", "active": false}, "13": {"index": 13, "name": "Reverse Single Reduction EP", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8", "active": false}, "14": {"index": 14, "name": "Reverse Extended", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800", "active": false}, "15": {"index": 15, "name": "Reverse Francis Bacon", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,Z,Y,X,W,V,U,T,S,R,Q,P,O,N,M,L,K,J,I,H,G,F,E,D,C,B,A", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52", "active": false}, "16": {"index": 16, "name": "Reverse Franc Baconis", "symbols": "Z,z,Y,y,X,x,W,w,V,v,U,u,T,t,S,s,R,r,Q,q,P,p,O,o,N,n,M,m,L,l,K,k,J,j,I,i,H,h,G,g,F,f,E,e,D,d,C,c,B,b,A,a", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52", "active": false}, "17": {"index": 17, "name": "Reverse Satanic", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61", "active": false}, "18": {"index": 18, "name": "Jewish Reduction", "symbols": "a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9", "active": false}, "19": {"index": 19, "name": "Jewish Ordinal", "symbols": "a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27", "active": false}, "20": {"index": 20, "name": "Jewish", "symbols": "a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900", "active": false}, "21": {"index": 21, "name": "ALW Kabbalah", "symbols": "a,l,w,h,s,d,o,z,k,v,g,r,c,n,y,j,u,f,q,b,m,x,i,t,e,p", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", "active": false}, "22": {"index": 22, "name": "KFW Kabbalah", "symbols": "k,f,w,r,m,d,y,t,a,v,q,h,c,x,o,j,e,l,g,b,s,n,i,z,u,p", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", "active": false}, "23": {"index": 23, "name": "LCH Kabbalah", "symbols": "i,l,c,h,p,a,x,j,w,t,o,g,f,e,r,s,q,k,y,z,b,m,v,d,n,u", "values": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25", "active": false}, "24": {"index": 24, "name": "English Sumerian", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120,126,132,138,144,150,156", "active": false}, "25": {"index": 25, "name": "Reverse English Sumerian", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120,126,132,138,144,150,156", "active": false}, "26": {"index": 26, "name": "Primes", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101", "active": false}, "27": {"index": 27, "name": "Trigonal", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,3,6,10,15,21,28,36,45,55,66,78,91,105,120,136,153,171,190,210,231,253,276,300,325,351", "active": false}, "28": {"index": 28, "name": "Squares", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676", "active": false}, "29": {"index": 29, "name": "Reverse Primes", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101", "active": false}, "30": {"index": 30, "name": "Reverse Trigonal", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,3,6,10,15,21,28,36,45,55,66,78,91,105,120,136,153,171,190,210,231,253,276,300,325,351", "active": false}, "31": {"index": 31, "name": "Reverse Squares", "symbols": "z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a", "values": "1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676", "active": false}, "32": {"index": 32, "name": "Septenary", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,6,7,6,5,4,3,2,1,1,2,3,4,5,6,7,6,5,4,3,2,1", "active": false}, "33": {"index": 33, "name": "Chaldean", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,2,3,4,5,8,3,5,1,1,2,3,4,5,7,8,1,2,3,4,6,6,6,5,1,7", "active": false}, "34": {"index": 34, "name": "Keypad", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,9", "active": false}, "35": {"index": 35, "name": "Fibonacci", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "1,1,2,3,5,8,13,21,34,55,89,144,233,233,144,89,55,34,21,13,8,5,3,2,1,1", "active": false}, "36": {"index": 36, "name": "Alphanumeric Qabbala", "symbols": "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z", "values": "10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35", "active": false}, "37": {"index": 37, "name": "Hebrew Reduction", "symbols": "\u05d0,\u05d1,\u05d2,\u05d3,\u05d4,\u05d5,\u05d6,\u05d7,\u05d8,\u05d9,\u05db,\u05dc,\u05de,\u05e0,\u05e1,\u05e2,\u05e4,\u05e6,\u05e7,\u05e8,\u05e9,\u05ea,\u05da,\u05dd,\u05df,\u05e3,\u05e5", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,2,4,5,8,9", "active": false}, "38": {"index": 38, "name": "Hebrew Ordinal", "symbols": "\u05d0,\u05d1,\u05d2,\u05d3,\u05d4,\u05d5,\u05d6,\u05d7,\u05d8,\u05d9,\u05db,\u05dc,\u05de,\u05e0,\u05e1,\u05e2,\u05e4,\u05e6,\u05e7,\u05e8,\u05e9,\u05ea,\u05da,\u05dd,\u05df,\u05e3,\u05e5", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,11,13,14,17,18", "active": false}, "39": {"index": 39, "name": "Hebrew Gematria", "symbols": "\u05d0,\u05d1,\u05d2,\u05d3,\u05d4,\u05d5,\u05d6,\u05d7,\u05d8,\u05d9,\u05db,\u05dc,\u05de,\u05e0,\u05e1,\u05e2,\u05e4,\u05e6,\u05e7,\u05e8,\u05e9,\u05ea,\u05da,\u05dd,\u05df,\u05e3,\u05e5", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,20,40,50,80,90", "active": false}, "40": {"index": 40, "name": "Hebrew Soffits", "symbols": "\u05d0,\u05d1,\u05d2,\u05d3,\u05d4,\u05d5,\u05d6,\u05d7,\u05d8,\u05d9,\u05db,\u05dc,\u05de,\u05e0,\u05e1,\u05e2,\u05e4,\u05e6,\u05e7,\u05e8,\u05e9,\u05ea,\u05da,\u05dd,\u05df,\u05e3,\u05e5", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900", "active": false}, "41": {"index": 41, "name": "Greek Reduction", "symbols": "\u0391,\u0392,\u0393,\u0394,\u0395,\u03dc,\u0396,\u0397,\u0398,\u0399,\u039a,\u039b,\u039c,\u039d,\u039e,\u039f,\u03a0,\u03d8,\u03a1,\u03a3,\u03a4,\u03a5,\u03a6,\u03a7,\u03a8,\u03a9,\u03e1", "values": "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9", "active": false}, "42": {"index": 42, "name": "Greek Ordinal", "symbols": "\u0391,\u0392,\u0393,\u0394,\u0395,\u03dc,\u0396,\u0397,\u0398,\u0399,\u039a,\u039b,\u039c,\u039d,\u039e,\u039f,\u03a0,\u03d8,\u03a1,\u03a3,\u03a4,\u03a5,\u03a6,\u03a7,\u03a8,\u03a9,\u03e1", "values": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27", "active": false}, "43": {"index": 43, "name": "Greek Isopsephy", "symbols": "\u0391,\u0392,\u0393,\u0394,\u0395,\u03dc,\u0396,\u0397,\u0398,\u0399,\u039a,\u039b,\u039c,\u039d,\u039e,\u039f,\u03a0,\u03d8,\u03a1,\u03a3,\u03a4,\u03a5,\u03a6,\u03a7,\u03a8,\u03a9,\u03e1", "values": "1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900", "active": false}};
var defaultMethods = ['English Ordinal', 'Full Reduction', 'Reverse Ordinal', 'Reverse Full Reduction']
var lookupMethod = mapMethodNames();

function mapMethodNames() {
	const mLength = Object.keys(methods).length
	let nameMap = new Map();
	for (i = 0; i < mLength; i++) {
		let method = methods[i]
		nameMap.set(method['name'],method)
		nameMap.set(i,method)
	}
	return nameMap
}

window.onload = ()=> {
	loadMethodMenu();
	checkURL();
	textInput.focus();
	// document.body.innerHTML += "<div style=\"color:white\">this works</div>"
	// enableDefaultMethods(defaultMethods);
}

main = document.getElementById('main')

textInput = document.getElementById('textInput')
textInput.addEventListener('input',()=>{checkGem()})

filterInput = document.getElementById('filterInput')
filterInput.addEventListener('input',()=>{filters = parseIntegers(filterInput.value); checkGem()})

filterButton = document.getElementById('filterButton')
filterButton.addEventListener('click',()=>{
	if (toggleVisible('filterInput', 'visible') === 'visible') {filterInput.focus()} else {textInput.focus()}
	filters = parseIntegers(filterInput.value);
	checkGem();
})

results = document.getElementById('results')
methodMenu = document.getElementById('methodMenu')

openButton = document.getElementById('openButton')
openButton.addEventListener('click',()=>{
	toggleVisible('popUp','visible')
	if (openButton.classList.length > 1) {openButton.classList.remove('clicked')} else {openButton.classList.add('clicked')}
})

closeButton = document.getElementById('closeButton')
closeButton.addEventListener('click',()=>{openButton.click()})

defaultButton = document.getElementById('defaultButton')
defaultButton.addEventListener('click',()=>{enableDefaultMethods(defaultMethods)})

displayModeButton = document.getElementById('displayModeButton')
displayModeButton.addEventListener('click',()=>{displayMode = arrayRotate(displayMode,-1); checkGem();})

calcDisplayButton = document.getElementById('calcDisplayButton')
calcDisplayButton.addEventListener('click',()=>{calcDisplay = arrayRotate(calcDisplay,-1); checkGem();})

toggleAllButton = document.getElementById('toggleAllButton')
toggleAllButton.addEventListener('click',()=>{toggleAllMethods()})

// async function loadMethods() {
//   const data = await $.getJSON('./methods.json');
// 	textInput.style.display = 'inline'
// 	methods = data
// }

// loadMethods();

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

function arrayRotate(arr, count) {
  const len = arr.length
  arr.push(...arr.splice(0, (-count % len + len) % len))
  return arr
}

function toggleVisible(elementName, setting) {
	const elem = document.getElementById(elementName)
	if ([null,'hidden',"collapse",''].includes(elem.style.visibility)) {
		elem.style.visibility = setting
	} else {
		elem.style.visibility = 'hidden'
	}
	return elem.style.visibility
}

function checkURL() {
	const url = String(window.location).replaceAll(' ','_').replaceAll('%20','_');
	const params = (new URL(url)).searchParams;
	let mParam = params.get('m')
	const phrase = params.get('p') // can also use params.getAll()

	if (mParam === null || phrase === null) {return}

	const mLength = Object.keys(methods).length
	for (let i = (mLength-1); i >= 0; i--) {
		let method = methods[i]
		let name = method['name'].replaceAll(' ','_')
		let index = method['index']
		if (mParam.includes(name)) {
			mParam = mParam.replace(name, index)
		}
	}

	const mIndexes = parseIntegers(mParam)

	let methodNames = []
	if (mIndexes.length > 0) {

		for (let mIndex of mIndexes) {
			if (lookupMethod.has(mIndex)) {
				let method = lookupMethod.get(mIndex)
				methodNames.push(method['name'])
			}
		}
		textInput.value = phrase.replaceAll('_',' ')
		checkGem(forceMode = 'full', forceMethods = methodNames)
	}
}

function copyURL(mIndex) {
	const base_url = String(window.location).split('?')[0];
	let method = methods[mIndex]
	const name = method['name'].replaceAll(' ','_')
	const phrase = textInput.value.replaceAll(' ','_')
	const link = `${base_url}?m=${name}&p=${phrase}`
	updateClipboard(link)
}

function updateClipboard(newClip) {
	navigator.clipboard.writeText(newClip).then(() => {
		// copyAlert.style.visibility = 'visible'
	}, () => {
		/* clipboard write failed */
	});
}

function loadMethodMenu() {
	lookupMethod = mapMethodNames();

	const mLength = Object.keys(methods).length
	for (let i = 0; i < mLength; i++) {
		let method = methods[i]

		let methodSelector = document.createElement('div')
		methodSelector.className = 'methodSelector'
		methodSelector.id = `methodSelector-${i}`

		let methodName = document.createElement('span')
		methodName.className = 'methodName'
		methodName.innerText = method['name']
		methodName.id = `methodName-${i}`

		let methodCheckBox = document.createElement('input')
		methodCheckBox.className = 'methodCheckBox'
		methodCheckBox.type = 'checkbox'
		methodCheckBox.id = `methodCheckBox-${i}`

		methodSelector.append(methodCheckBox,methodName)
		methodMenu.appendChild(methodSelector)

		methodCheckBox.addEventListener('click',()=>{toggleMethod(method)})
		methodSelector.addEventListener('click',()=>{toggleMethod(method)})
	}
	for (let i = 0; i < mLength; i++) {
		let method = methods[i]
		if (defaultMethods.includes(method['name'])) {
			toggleMethod(method, override = true)
		} else if (method['name'].includes('Hebrew') || method['name'].includes('Greek')){
			toggleMethod(method, override = true)
		}
	}
}

function toggleAllMethods(setAll = null) {
	const colors = {'on':'green','off':'red'}
	const flip = {'on':'off','off':'on'}
	const tf = {'on':true,'off':false}
	toggleAllButton.setAttribute('on',flip[toggleAllButton.getAttribute('on')])
	let on = toggleAllButton.getAttribute('on')
	toggleAllButton.style['background-color'] = colors[on]

	const mLength = Object.keys(methods).length
	for (let i = 0; i < mLength; i++) {
		let method = methods[i]
		if (setAll === null) {
			toggleMethod(method, override = tf[on])
		} else {
			toggleMethod(method, override = setAll)
		}
	}
	checkGem()
}

function enableDefaultMethods(def = defaultMethods, check=true) {
	const mLength = Object.keys(methods).length
	for (let i = 0; i < mLength; i++) {
		let method = methods[i]
		if (def.includes(method['name'])) {
			toggleMethod(method, override = true)
		} else if (method['name'].includes('Hebrew') || method['name'].includes('Greek')){
			toggleMethod(method, override = true)
		} else {
			toggleMethod(method, override = false)
		}
	}
	if (check) {checkGem()}
}


function toggleMethod(method, override = null) {
	const colors = {false:null,true:'green'}
	let index = method['index']
	let methodSelector = document.getElementById(`methodSelector-${index}`)
	let checkbox = document.getElementById(`methodCheckBox-${index}`)

	if (override === null) {
		method['active'] = !method['active']
		checkbox.checked = !checkbox.checked
		checkGem()
	} else {
		method['active'] = override
		checkbox.checked = override
	}
	methodSelector.style['background-color'] = colors[checkbox.checked]
}

function checkActiveMethods() {
	const menuItems = methodMenu.children
	active = []
	for (let i = 0; i < menuItems.length; i++) {
		let checkbox = menuItems[i].children[0]
		if (checkbox.checked) {
			active.push(true)
		} else {
			active.push(false)
		}
	}
	return active
}

function swapMode(modeArray, selection) {
	if (selection === 'next') {
		modeArray = arrayRotate(modeArray,-1)
	} else if (selection === 'prev') {
		modeArray = arrayRotate(modeArray,-1)
	} else {
		while (modeArray[0] !== selection) {
			modeArray = arrayRotate(modeArray,1)
		}
	}
	return modeArray[0]
}

function parseIntegers(text) {
	let separated = ""
	let intArray = []
	for (let ch of text) {
		if ("0123456789".includes(ch)) {
			separated += ch
		} else {
			separated += '_'
		}
	}
	for (let val of separated.split('_')) {
		if (val.length > 0) {
			intArray.push(Number(val))
		}
	}
	return intArray
}

function checkGem(forceMode = null, forceMethods = []) {
	const mLength = Object.keys(methods).length
	const uInput = textInput.value

	let filterTotal = null
	let numberActive = 0

	results.textContent = ''

	if (forceMode != null) {swapMode(displayMode,forceMode)}

	if (displayMode[0] === 'full') {displayModeButton.style['background-color'] = 'rgb(0,0,0,0.5)'} else {displayModeButton.style['background-color'] = mainColor}
	if (calcDisplay[0] === 'show') {calcDisplayButton.style['background-color'] = 'rgb(0,0,0,0.5)'} else {calcDisplayButton.style['background-color'] = mainColor}
	if (filterInput.style.visibility === 'visible') {filterButton.style['background-color'] = mainColor} else {filterButton.style['background-color'] = 'rgb(0,0,0,0.5)'}

	if (uInput.length > 0 || displayMode[0] === 'mini') {
		for (let i = 0; i < mLength; i++) {

			let method = methods[i]
			if (method['active'] === true) {numberActive += 1;}
			if (filters.length > 0 && filterInput.style.visibility === 'visible') {filterTotal = calcTotal(method, uInput)}

			if (filterTotal === null || filters.includes(filterTotal)) {
				if (['full'].includes(displayMode[0])) {
					if (method['active'] && forceMethods.length === 0) {
						displayFull(i,uInput,method);
					} else if (forceMethods.includes(method['name'])) {
						displayFull(i,uInput,method);
					}
				} else if (['mini'].includes(displayMode[0])) {
					displayMini(i,uInput,method);
				}
			}

		}
	}

	if (uInput.length > 0 && results.children.length < 1) {
		let warning = document.createElement('div')
		warning.className = 'warning'
		results.append(warning)
		if (numberActive < 1 && displayMode[0] != 'mini') {
			warning.innerText = 'No gematria methods selected.'
		} else {
			warning.innerText = 'No results for selected values.'
		}
	}
}

function displayMini(i,uInput,method) {
	const total = calcTotal(method,uInput)

	miniBox = document.createElement('div')
	miniBox.className = 'miniBox'
	results.append(miniBox)

	miniName = document.createElement('div')
	miniName.className = 'miniName'
	miniVal = document.createElement('div')
	miniVal.className = 'miniVal'
	miniValText = document.createElement('b')
	miniValText.className = 'miniValText'
	miniVal.append(miniValText)
	miniName.innerText = method['name']
	miniValText.innerText = total

	hoverButton = document.createElement('div')
	hoverButton.id = method['name'] + '-search'
	hoverButton.className = 'hoverButton'
	miniName.append(hoverButton)

	searchIcon = document.createElement('img')
	searchIcon.className = 'searchIcon'
	searchIcon.src = './ui_images/checkCalc.png'
	searchIcon.alt = 'Check Calculation'
	searchIcon.title = 'Check Calculation'
	hoverButton.append(searchIcon)

	miniBox.addEventListener('mouseover',()=>{toggleVisible(method['name'] + '-search','visible')})
	miniBox.addEventListener('mouseout',()=>{toggleVisible(method['name'] + '-search','visible')})

	const numLen = String(total).length
	if (numLen > 3) {
		miniValText.style.transform = `scaleX(${1-(1/numLen)})`
	}
	miniBox.append(miniName,miniVal)
	miniBox.addEventListener('click',()=>{
		swapMode(calcDisplay,'show')
		checkGem(forceMode = 'full', forceMethods = [method['name']])
		const selected = document.getElementById(method['name'] + '-header')
		selected.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
		selected.style['border-style'] = 'none solid none'
	})

	if (total < 1 && textInput.value.length > 0) {
		miniBox.style.display = 'none'
	} else {
		miniBox.style.display = null
	}

}

function displayFull(i,uInput,method) {
	let resultRow = document.createElement('div')
	resultRow.className = 'resultRow'
	resultRow.id = method['name'] + '-row'
	results.append(resultRow)

	let resultBox = document.createElement('div')
	resultBox.className = 'resultBox'
	resultBox.id = method['name']
	resultRow.append(resultBox)

	let linkBox = document.createElement('hide')
	linkBox.className = 'saveBox'
	linkBox.id = method['name'] + '-linkBox'
	linkIcon = document.createElement('img')
	linkIcon.className = 'linkIcon'
	linkIcon.src = './ui_images/link.png'
	linkIcon.alt = 'Copy Link'
	linkIcon.title = 'Copy Link'
	linkBox.append(linkIcon)

	linkBox.addEventListener('click',()=>{
		copyURL(method['index']);
		linkBox.style['background-color'] = mainColor
	})
	linkBox.onmouseout = ()=>{
		linkBox.style['background-color'] = null
	}

	let mHeader = document.createElement('div')
	mHeader.className = 'mHeader'
	mHeader.id = method['name'] + '-header'

	let mInput = document.createElement('div')
	mInput.className = 'mInput'
	mInput.innerText = `"${uInput}"`

	let mName = document.createElement('div')
	mName.className = 'mName'
	mName.innerText = `${method['name']}`

	let mVals = document.createElement('div')
	mVals.className = 'mVals'

	let saveBox = document.createElement('hide')
	saveBox.className = 'saveBox'
	saveBox.id = method['name'] + '-saveBox'

	let mTop = document.createElement('div')
	mTop.className = 'mTop'

	let saveIcon = document.createElement('img')
	saveIcon.className = 'saveIcon'
	saveIcon.src = './ui_images/save.png'
	saveIcon.alt = 'Save as Image'
	saveIcon.title = 'Save as Image'

	let siteName = document.createElement('div')
	siteName.className = 'siteName'
	siteName.innerText = 'www.gematria.pro'
	saveBox.append(saveIcon)

	mTop.append(saveBox, mHeader, linkBox)

	mHeader.append(mName,mInput)

	resultBox.append(mTop, mVals, siteName)

	if (usingTouch) {
		saveBox.style.visibility = 'visible'
	} else {
		resultRow.addEventListener('mouseover', ()=>{
			document.getElementById(method['name'] + '-saveBox').style.visibility = 'visible';
			document.getElementById(method['name'] + '-linkBox').style.visibility = 'visible';
			document.getElementById(method['name'] + '-header').style['border-style'] = null;
		})
		resultRow.addEventListener('mouseout', ()=>{
			document.getElementById(method['name'] + '-saveBox').style.visibility = 'hidden';
			document.getElementById(method['name'] + '-linkBox').style.visibility = 'hidden';
		})
	}

	if (calcDisplay[0] === "hide") {
		mVals.style.display = 'none'
	} else {
		mVals.style.display = null
	}

	const total = addValues(uInput,method,mVals)

	if (total > 0) {
		mInput.innerText += ` = (${total})`
	} else {
		resultRow.style.display = 'none'
	}

	let phrase = uInput
	if (phrase.length > 80) {phrase = uInput.slice(0,81)+'...'}

	saveBox.addEventListener('click',()=>{
		takeImage(method['name']+ '-row',`www.gematria.pro - (${total}) [${phrase}] - ${method['name']}.png`)
	})
}


function addValues(uInput,method,container) {
	const symbols = method['symbols'].split(',')
	const values = method['values'].split(',')
	const caseSensitive = ((symbols).join("") != (symbols).join("").toLowerCase())
	let grandTotal = 0
	const text_segs = uInput.split(' ')
	let words = []
	for (let seg of text_segs) { if (seg.length > 0) {words.push(seg)} }

	for (let w = 0; w < words.length; w++) {
		let word = words[w]
		let total = calcTotal(method,word)
		grandTotal += total

		let wordBox = document.createElement('div')
		wordBox.className = 'wordBox'
		container.append(wordBox)
		let plus = document.createElement('b')
		container.append(plus)
		if (w != words.length -1) {
			plus.className = 'opBox'
			plus.innerText = '+'
			plus.style['font-size'] = '3vmin'
			plus.style['color'] = mainColor
		} else if (words.length > 1) {

			plus.className = 'opBox'
			plus.innerText = '='
			plus.style['font-size'] = '3vmin'
			plus.style['color'] = mainColor
			let endHolder = document.createElement('div')
			endHolder.className = 'grandTotalBox'
			// endHolder.innerText = grandTotal
			container.append(endHolder)
			let grandTotalBox = document.createElement('div')
			grandTotalBox.className = 'grandTotalText'
			grandTotalBox.innerText = grandTotal
			endHolder.append(grandTotalBox)
			let dummy = document.createElement('div')
			dummy.className = 'dummy'
			// dummy.style['border-style'] = 'none'
			// dummy.style['background-color'] = 'none'
			container.append(dummy)
		}

		for (let i = 0; i < word.length; i++) {
			let ch = word[i]
			let nextCh = "none"
			if (i < (word.length - 1)) {nextCh = word[i+1]}
			if (!caseSensitive) {ch = ch.toLowerCase(); nextCh = nextCh.toLowerCase();}

			let valBox = document.createElement('div')
			valBox.className = 'valBox'
			let s_elem = document.createElement('div')
			s_elem.className = 'symbol'
			s_elem.innerText = ch
			let v_elem = document.createElement('div')
			v_elem.className = 'value'
			valBox.append(s_elem,v_elem)

			function valueOfSymbol(ch,symbols,values) {
				let val = 0
				let index = symbols.indexOf(ch)
				if (index != -1) {
					val = Number(values[index])
				} else if ('0123456789'.includes(ch)) {
					val = Number(ch)
				}
				return val
			}

			let v_val = valueOfSymbol(ch,symbols,values)
			let next_val = valueOfSymbol(nextCh,symbols,values)

			v_elem.innerText = v_val

			if (v_val > 0) {
				wordBox.append(valBox)
			}

			let opBox = document.createElement('div')
			opBox.className = 'opBox'
			opBox.style['font-size'] = '1.5vmin'
			opBox.style['color'] = 'gray'
			if (next_val > 0) {
				opBox.innerText = '+'
				wordBox.append(opBox)
			} else if (i === word.length - 1) {
				opBox.innerText = '='
				wordBox.append(opBox)
			}

			if (i === (word.length - 1)) {
				let totalBox = document.createElement('div')
				totalBox.className = 'totalBox'
				totalBox.innerText = `${total}`
				wordBox.append(totalBox)
			}
		}
	}
	return grandTotal
}

function calcTotal(method,message) {
	const symbols = method['symbols'].split(',')
	const values = method['values'].split(',')
	const text = message.replaceAll(' ','_')
	const caseSensitive = ((symbols).join("") != (symbols).join("").toLowerCase())
	let total = 0

	for (let i = 0; i < text.length; i++) {
		let ch = text[i]
		if (!caseSensitive) {ch = ch.toLowerCase()}
		const v_index = symbols.indexOf(ch)
		if (v_index > -1) {
			total += Number(values[v_index])
		} else if ("0123456789".includes(ch)) {
			total += Number(ch)
		}
	}
	return total
}

function getColor(num) {
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

	return "#" + String(num).repeat(7).slice(0,6)
}

function findClosest (num,list) {
	let leastDif = Math.abs(list[0]-num)
	let val = 0
	for (let i of list) {
		let dif = Math.abs(num-i)
		if (dif < leastDif) {
			leastDif = dif
			val = i
		}
	}
	return val
}

function getMethodColor(name) {
	const available = [11, 13, 16, 17, 18, 20, 21, 22, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 58, 60, 61, 62, 63, 65, 66, 67, 68, 69, 70, 74, 75, 98, 107]
	const colorNames = {"11": ["Teal"], "13": ["Aqua", "Blue"], "16": ["Cyan"], "17": ["Plum", "Navy"], "18": ["Red"], "20": ["Salmon", "Gold"], "21": ["Tomato", "Lime"], "22": ["Coral", "Khaki"], "23": ["SkyBlue"], "25": ["Magenta", "SlateBlue"], "27": ["Olive"], "28": ["CadetBlue"], "29": ["Yellow", "Violet", "SteelBlue", "DarkBlue"], "30": ["Thistle"], "31": ["Fuchsia", "Green"], "32": ["Moccasin", "DarkCyan"], "33": ["Orange"], "34": ["DarkRed", "Purple"], "36": ["DarkSalmon", "Lavender"], "37": ["Crimson"], "38": ["DarkKhaki", "SeaGreen"], "39": ["Orchid", "RoyalBlue"], "40": ["Indigo"], "41": ["DarkMagenta", "DarkSlateBlue"], "42": ["BlueViolet", "LightBlue", "MediumBlue"], "43": ["OliveDrab"], "44": ["DeepSkyBlue"], "45": ["DarkViolet", "LawnGreen", "LightCyan"], "46": ["PeachPuff", "Chartreuse", "Aquamarine", "Turquoise"], "47": ["PaleGreen", "DarkGreen"], "48": ["DodgerBlue"], "49": ["LightSalmon", "DarkOrange", "PowderBlue"], "51": ["IndianRed", "LightCoral", "OrangeRed"], "52": ["LimeGreen", "LightSkyBlue"], "53": ["PapayaWhip"], "54": ["FireBrick", "MediumSlateBlue", "DarkSeaGreen"], "55": ["DarkOrchid"], "58": ["LightYellow", "LightSteelBlue"], "60": ["GreenYellow", "LightGreen", "ForestGreen", "YellowGreen"], "61": ["MidnightBlue"], "62": ["RebeccaPurple", "PaleTurquoise", "DarkTurquoise"], "63": ["MediumPurple"], "65": ["PaleGoldenrod"], "66": ["LemonChiffon"], "67": ["MediumSeaGreen", "LightSeaGreen"], "68": ["MediumOrchid"], "69": ["SpringGreen"], "70": ["CornflowerBlue"], "74": ["DarkOliveGreen"], "75": ["MediumAquamarine", "MediumTurquoise"], "98": ["MediumSpringGreen"], "107": ["LightGoldenrodYellow"]}

	let total = 0
	const abc = ' abcdefghijklmnopqrstuvwxyz'
	const num = ' 12345678912345678912345678'
	for (let ch of name.toLowerCase()) {
		let index = abc.indexOf(ch)
		if (index > -1) {
			total += Number(num[index])
		}
	}
	const colors = colorNames[String(findClosest(total,available))]
	return colors[(name.length % colors.length)]

}

function setMethodColors() {
	const mLength = Object.keys(methods).length
	for (let i = 0; i < mLength; i++) {
		const color = getMethodColor(methods[i]['name'])
		methods[i]['color'] = color
	}
}

function takeImage(elementName,filename) {
	toggleDisplayByClass("saveBox",'collapse')
	toggleDisplayByClass("siteName",'visible')
	let safename = ""
	for (let ch of filename) {
		if (!'\\/<>:\"|?*'.includes(ch)) {
			safename += ch
		}
	}
	domtoimage.toBlob(document.getElementById(elementName))
		.then(function (blob) {
				window.saveAs(blob, safename);
		})
		.then( function () {
			toggleDisplayByClass("siteName",'hidden');
			if (usingTouch) {toggleDisplayByClass("saveBox",'visible');}
			checkGem();
		});
}

function toggleDisplayByClass(className, display) {
	var elems = document.getElementsByClassName(className); //elems is an array
    for(var i = 0; i < elems.length; i++){
        elems[i].style.visibility = display; // or
        // elems[i].style.display = display; // depending on what you're doing
    }
}

var allowInput = true
document.onkeydown = function(event) {checkInput(event)};

function checkInput (event) {
	const key = event.key;
	if (allowInput) {
		switch (key) {
			case 'Escape':
				event.preventDefault()
				openButton.click()
				textInput.scrollIntoView({ behavior: "instant", block: "center", inline: "nearest" })
				break;
			case 'Tab':
				event.preventDefault()
				displayModeButton.click()
				break;
			case 'zzz':
				event.preventDefault()
				swapMode(calcDisplay,'next')
				checkGem();
				break;
			case '\\':
				event.preventDefault()
				filterButton.click()
				break;

		}
	}
}
},{"./scripts/FileSaver":2,"./scripts/dom-to-image":3}],2:[function(require,module,exports){
(function (global){(function (){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  // The one and only way of getting global scope in all environments
  // https://stackoverflow.com/q/3277182/1008999
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    } // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  } // `a.click()` doesn't work for all browsers (#465)


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  } // Detect WebView inside a native macOS app by ruling out all browsers
  // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
  // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos


  var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
  var saveAs = _global.saveAs || ( // probably in some web worker
  typeof window !== 'object' || window !== _global ? function saveAs() {}
  /* noop */
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
  : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4); // 40s

      setTimeout(function () {
        click(a);
      }, 0);
    }
  } // Use msSaveOrOpenBlob as a second approach
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  } // Fallback to using FileReader and a popup
  : function saveAs(blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      // Safari doesn't allow downloading of blob URLs
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null; // reverse-tabnabbing #460
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null; // reverse-tabnabbing #460

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4); // 40s
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    // Default impl options
    var defaultOptions = {
        // Default is to fail on error, no placeholder
        imagePlaceholder: undefined,
        // Default cache bust is false, it will use the cache
        cacheBust: false
    };

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner,
            options: {}
        }
    };

    if (typeof module !== 'undefined')
        module.exports = domtoimage;
    else
        global.domtoimage = domtoimage;


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
                defaults to 1.0.
     * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        copyOptions(options);
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function copyOptions(options) {
        // Copy options to impl options for use in impl
        if(typeof(options.imagePlaceholder) === 'undefined') {
            domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
        } else {
            domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
        }

        if(typeof(options.cacheBust) === 'undefined') {
            domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
        } else {
            domtoimage.impl.options.cacheBust = options.cacheBust;
        }
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || util.width(domNode);
            canvas.height = options.height || util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    if (source.cssText) target.cssText = source.cssText;
                    else copyProperties(source, target);

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;
            if(domtoimage.impl.options.cacheBust) {
                // Cache bypass so we dont have CORS issues with cached images
                // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                var placeholder;
                if(domtoimage.impl.options.imagePlaceholder) {
                    var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                    if(split && split[1]) {
                        placeholder = split[1];
                    }
                }

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        if(placeholder) {
                            resolve(placeholder);
                        } else {
                            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        }

                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    if(placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                    }
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline()) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
                    try {
                        util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                    } catch (e) {
                        console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                    }
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);

},{}]},{},[1]);
