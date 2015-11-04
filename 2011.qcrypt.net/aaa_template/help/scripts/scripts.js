/**********************************/
/* JAVASCRIPT ETH WCMS-Templates  */
/* Author:Y. Serrano              */
/**********************************/
/*
$Id: scripts.js 7024 2011-09-21 10:02:55Z yserrano $
$Rev: 7024 $
$Release: 1.1.7 $
*/

// Puts the included jQuery into our own namespace
var jwcd = { "jQuery": jQuery.noConflict(true) };


/********************************************************************************
Browsercheck
********************************************************************************/

function lib_bwcheck(){ //Browsercheck (needed)
    this.ver=navigator.appVersion;
    this.agent=navigator.userAgent;
    this.dom=document.getElementById?1:0;
    this.opera5=this.agent.indexOf("Opera 5")>-1;
    this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0; 
    this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
    this.ie7=(this.ver.indexOf("MSIE 7")>-1 && this.dom)?1:0; 
    this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
    this.ie=this.ie4||this.ie5||this.ie6;
    this.mac=this.agent.indexOf("Mac")>-1;
    this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
    this.ns4=(document.layers && !this.dom)?1:0;
    this.bw=(this.ie7 || this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5);
    return this;
}

var bw=new lib_bwcheck();

/********************************************************************************
printpage
********************************************************************************/

function printpage() {
    if (window.print)
        window.print();
    else alert("Please use the printfunction in your browser.\n\nBitte benutzen Sie die Printfunktion Ihres Webbrowsers.");
}




/********************************************************************************
You don't have to change anything below this
********************************************************************************/

if(document.layers){ //NS4 resize fix...
    scrX= innerWidth; scrY= innerHeight;
    onresize= function(){if(scrX!= innerWidth || scrY!= innerHeight){history.go(0);} };
}

/********************************************************************************
You don't have to change anything below this
********************************************************************************/

//ChangeText object constructor.
function makeChangeTextObj(obj){
try {
        this.css = bw.dom?document.getElementById(obj).style:bw.ie4?document.all[obj].style:bw.ns4?document.layers[obj]:0;
        this.writeref = bw.dom?document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj].document:0;
        this.writeIt = b_writeIt;
    } catch (ex) {
 return null;
    }   
}

function b_writeIt(text,num){
    if (bw.ns4){
        this.writeref.write(text);
        this.writeref.close();
    }
    else this.writeref.innerHTML = messages[num];
}

//The mouoseover function. Calls the writeIt method to write the text to the div.
function changeText(num) {
        if (document.getElementById("pageicons-text"))
            if(bw.bw && !(bw.ns4)) 
                oMessage.writeIt('<span id="pageicons-text">'+messages[num]+'</span>', num);
}

//The init function. Calls the object constructor and initiates some properties.
function changeTextInit() {
    //Fixing the browsercheck for opera... this can be removed if the browsercheck has been updated!!
    bw.opera5 = (navigator.userAgent.indexOf("Opera")>-1 && document.getElementById)?true:false;
    if (bw.opera5) bw.ns6 = 0;
    
    oMessage = new makeChangeTextObj('pageicons-text');
    oLinks = new makeChangeTextObj('servicenav2');

    //Both layers are hidden by default to prevent users from mousing over them and creating errors while the page loads.
    oMessage.css.visibility= "visible";
    oLinks.css.visibility= "visible";
}

//If the browser is ok, the init function is called on pageload. 
if (bw.bw) onload = changeTextInit;


/********************************************************************************
Set cursor into search field
********************************************************************************/

function setfocus() {
  // die FORM heisst 'search', das INPUT-feld 'q'
  document.search.q.focus();
}

function setup() {
    //problematic in some cases setfocus();
    if (!(bw.ns4))
            if (document.getElementById("pageicons-text"))
                changeTextInit();
    // setup width
    if (navigator.userAgent.toLowerCase().indexOf('msie') > 0) {
        window.onresize = calcWidth;
        calcWidth();
        window.onbeforeprint=preparePrint;
        window.onafterprint=calcWidth;
    }
}

function preparePrint() {
        document.getElementById("bodymargins").style['width'] = "auto";
        if (document.getElementById("contentblock-3col") != null)
            document.getElementById("contentblock-3col").style['width'] = "auto"; 
        if (document.getElementById("contentblock-2col") != null)
            document.getElementById("contentblock-2col").style['width'] = "auto"; 
}

/**********************************************************************************   
ChangeText 
*   Copyright (C) 2001 <a href="/dhtmlcentral/thomas_brattli.asp">Thomas Brattli</a>
*   This script was released at DHTMLCentral.com
*   Visit for more great scripts!
*   This may be used and changed freely as long as this msg is intact!
*   We will also appreciate any links you could give us.
*
*   Made by <a href="/dhtmlcentral/thomas_brattli.asp">Thomas Brattli</a> 
*********************************************************************************/

/********************************************************************************
Javascript min-width implementation
*********************************************************************************/

// return the width for different browsers
function myWindowWidth() {
  if (document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else if (window.innerWidth) {
    return window.innerWidth;
  } else {
    return 0;
  }
}


// calculate the width of the different elements, depending on the col mode
function calcWidth() {
    newWindowWidth = myWindowWidth();
    var maximage = 50;
    var contentblock = null;
    var bodymarginspace = null;
    var contentblockspace = null;
    var windowspace = null;

    // 3col
    if (document.getElementById("contentblock-3col") != null) {
        if (navigator.userAgent.toLowerCase().indexOf('msie') > 0) {
            // for IE Win
            contentblock = "contentblock-3col";
            bodymarginspace = 522; //269
            contentblockspace = 249;
            threshold = 525;
            windowspace = 273;
        } else {
            // for others
            contentblock = "contentblock-3col";
            bodymarginspace = 540; //269
            contentblockspace = 270;
            threshold = 525;
            windowspace = 270;
        }
        
    // 2col
    } else if (document.getElementById("contentblock-2col") != null) {
        if (navigator.userAgent.toLowerCase().indexOf('msie') > 0) {
            // for IE Win
            contentblock = "contentblock-2col";
            bodymarginspace = 273;
            contentblockspace = 0;
            threshold = 275; 
            windowspace = 273;
        } else {
            // for others
            contentblock = "contentblock-2col";
            bodymarginspace = 270;
            contentblockspace = 0;
            threshold = 275; 
            windowspace = 270;
        }
    } 
    
    if (document.getElementById("contentblock-1col") == null) {
        try {
            for (i = 0; i < document.images.length; ++i) {
        
                if (document.images[i].width) {
                    if (document.sitename.width) {
                        if (document.images[i].width > maximage && document.sitename.width != document.images[i].width && document.sitename.height != document.images[i].height ) {
                            maximage = document.images[i].width;
                        } 
                    } else {
                        if (document.images[i].width > maximage) {
                            maximage = document.images[i].width;
                        } 
                    }
                }
            }
        } catch (e) {
            // do nothing, fallback for ie
        }
        
        if (myWindowWidth() > (maximage + threshold)) {
            document.getElementById(contentblock).style['width'] = myWindowWidth() - windowspace  + "px"; 
            document.getElementById("bodymargins").style['width'] = "auto";
        } else {
            document.getElementById("bodymargins").style['width'] = maximage + bodymarginspace + "px"; 
            document.getElementById(contentblock).style['width'] = maximage + contentblockspace + "px";
        }
    }
}

