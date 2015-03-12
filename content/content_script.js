//var background = chrome.extension.getBackgroundPage();
var server_script = "http://veron.sincerus.sk/recorder.php"
var coordinates = new Array(); 
var coordinates_package = '';

//var coordinates = new Array(); 
//var coordinates_package = '';
//var scrolls_package = '';
//var clickCounter = 0;

var posx = 0; 
var posy = 0;

var screenWidth = screen.width;
var screenHeight = screen.height;

function newCoord(event, x, y, target)
{
  this.event=event;
  this.x=x;
  this.y=y;
  this.time = Date.now();
  this.target = target
}

function grabCoordinates(e){
    if (!e) 
      var e = window.event;
    
    this.posx = e.screenX;
    this.posy = e.screenY;

    if (e.target != null)
      this.target = e.target.localName;
    
    var coord = new newCoord('m', posx, posy, target);
	background.coordinates.push(coord);
    //coordinates.push(coord);
}

function elementOut(e){
    if (!e)
      var e = window.event;
    
    if (e && e.toElement == null) {
      var e = window.event;
      var coord = new newCoord('out', posx, posy, target);
      coordinates.push(coord);
    }
}

function elementIn(e){
    if (!e)
      var e = window.event;
    if (e && e.fromElement == null) {
      var e = window.event;
      var coord = new newCoord('in', posx, posy, target);
      coordinates.push(coord);
    }
}

function clickDown(e){
    this.posx = e.screenX;
    this.posy = e.screenY;
    var coord = new newCoord('m-down', posx, posy, target);
    coordinates.push(coord);
}

function clickUp(e){
    this.posx = e.screenX;
    this.posy = e.screenY;
    var coord = new newCoord('m-up', posx, posy, target);
    coordinates.push(coord);
    saveCoordinates();
}

var scrollYOld = 0;

function scrollDocument(e) {
  var evt=window.event || e;
  
  var eventName = (scrollY - scrollYOld < 0)? "s-up" : "s-down";             
  var coord = new newCoord(eventName, window.scrollX, window.scrollY, target);
  coordinates.push(coord);
  
  scrollYOld = window.scrollY;
}

document.onscroll = scrollDocument;
var element = document.getElementById('main_content_container');
if (element == null)
	element = document;

element.onmousemove = grabCoordinates;
element.onmouseout = elementOut;
element.onmouseover = elementIn;
element.onmousedown = clickDown;
element.onmouseup = clickUp;

