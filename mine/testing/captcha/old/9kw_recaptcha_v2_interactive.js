//
// This imacros script created by 9kw.eu
// Find more here: http://www.9kw.eu/
//
// The script fill the captcha of keycaptcha v2 demo (puzzle).
//
// Last update: 18 November 2016
//
// For iMacros 8.9.7
// See http://forum.imacros.net/viewtopic.php?t=26543
//
// Note for users with firefox with the message "Firefox prevented this page from automatically reloading.":
// UNCHECK the option "warn me when pages try to redirect" in your browser
// You find the checkbox under Options > Advanced > General > Accessibility
//
// More informations with iMacros for Firefox and speed up javascript:  
// http://wiki.imacros.net/iMacros_for_Firefox#Javascript_Scripting_Interface
//
// You can use more instances with Firefox:
// http://kb.mozillazine.org/Opening_a_new_instance_of_Firefox_with_another_profile
// https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles
// http://kb.mozillazine.org/Command_line_arguments
// Like -P "My Profile" -no-remote or -ProfileManager
//
const XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest");

// Step 1: Config for 9kw.eu for your apikey
var apikey = "";

// And priority (prio, credits +1-20)
var prio = "0";

// And sandbox mode (selfsolve)
var sandbox = 0; //1=ON, 0=OFF

// Use cookies
var allcookies = 0; //1=ON, 0=OFF

// Loops
var max_loop = 1;//your loops like "Play (Loop)"
var max_wait = "";//wait time in seconds after every run (optional)
var autoretry = 1;//1=ON,0=OFF

// Url
var myurl = "URL GOTO=https://www.google.com/recaptcha/api2/demo\n";
myurl += "";//extra line
myurl += "";//extra line

// Example for "demo.csv"
//var myurl = "URL GOTO={{!COL1}}\n";

// Submit
var mysubmit_js = "0";//1=Javascript,0=iim (optional)
var mysubmit = "TAG POS=1 TYPE=INPUT:SUBMIT FORM=NAME:NoFormName ATTR=*\n";
//var mysubmit = "URL GOTO=javascript:window.document.form.submit();\n";//javascript as iim
//var mysubmit = "document.getElementById('recaptcha-demo-submit').click();";//Pure javascript
mysubmit += "";//extra line

// Replayspeed
var replayspeed = "FAST";//MEDIUM

// Limit
var max_loop_limit = 500;

// CSV
var csv_active = 0;//1=ON,0=OFF
var csv_file = '';//Example C:\\imacros\\demo.csv (optional)
var csv_columns = 1;

// Proxy
var proxy_active = 0;//1=ON,0=OFF
var proxy_check = 1;//1=ON,0=OFF
var proxy_http = 0;// 1=ON (http), 0=OFF (socks5)
var proxy_csv_file = '';//Example C:\\imacros\\proxy.csv (optional)
var proxy_timeout = 3;//timeout in seconds

// Header
var imacros_header = "SET !EXTRACT_TEST_POPUP NO\n";
imacros_header += "SET !ERRORIGNORE YES\n";
imacros_header += "SET !TIMEOUT_PAGE 999\n";
imacros_header += "SET !TIMEOUT_STEP 999\n"
imacros_header += "SET !REPLAYSPEED "+replayspeed+"\n";
imacros_header += "SET !EXTRACT null" + "\n";

// Debug
var breakOnError = true;
var onBreakAlert = true;
var logFile = false;
var logFileName = 'iimLog.txt';

// Main
var logFilePath = getiMacrosFolder('Logs')+'\\'+logFileName;
var csv;
var myip;

var anti_timeout_visibility = "";
var anti_timeout_left = "";
var anti_timeout_top = "";
var anti_timeout_transition = "";

// Browser
var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
Components.utils.import("resource://gre/modules/Services.jsm");
Services.prefs.setBoolPref("accessibility.blockautorefresh", 0);//better auto refresh
var imacros_version = Services.prefs.getCharPref("extensions.imacros.version");

if(proxy_active == 1){
	Services.prefs.setIntPref("network.proxy.type", false);
	
	myip = get_my_ip();
	if(myip == "" || myip.length < 3){
		alert_message('Error with your ip.');
	}
}
var last_proxy = "";
var document;
var last_csv = 1;

var httpRequestObserver =  {  
  observe: function(subject, topic, data)  {  
    if (topic == "http-on-modify-request") {  
      var httpChannel = subject.QueryInterface(Components.interfaces.nsIHttpChannel);  
      if (
      	/funcaptcha.com|solvemedia.com|keycaptcha.com|confidenttechnologies.com/.test(httpChannel.originalURI.host) ||
      	/google.com\/recaptcha|gstatic.com\/recaptcha/.test(httpChannel.URI.spec) 
      
      ) {  
	      httpChannel.setRequestHeader("Accept-Language", "en,en-US;de;q=0.5", false);  
      }
    }  
  },  
  
  get observerService() {  
    return Components.classes["@mozilla.org/observer-service;1"]  
                     .getService(Components.interfaces.nsIObserverService);  
  },  
  
  register: function()  
  {  
    this.observerService.addObserver(this, "http-on-modify-request", false);  
  },  
  
  unregister: function()  
  {  
    this.observerService.removeObserver(this, "http-on-modify-request");  
  }  
}; 
var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
observerService.addObserver(httpRequestObserver, "http-on-modify-request", false);
httpRequestObserver.register();

(function() {
	// Syntaxcheck: API Key, prio
	if(apikey.match(/^[a-zA-Z0-9]+$/) && apikey.length <= 50 && apikey.length >= 5){}else{alert_message("API Key \""+apikey+"\" is wrong.");return false;}
	var d = parseFloat(prio); if(d >= 0 && d <= 20){}else{alert_message("Prio \""+prio+"\" is not in the set range.");return false;}

	// only valid number
	if (/[^\d]/.test(max_loop)) {
		alert_message('Please enter a valid number for loop play');
		return false;
	}
	
	max_loop = parseInt(max_loop);
	if(max_loop > max_loop_limit){
		alert_message('Loop limit exceed (' + max_loop_limit + ') , edit the following variable to use your own limit.\n\nvar max_loop_limit = ' + max_loop_limit + ';');
		return false;
	}	
	
	last_csv = 1;
	for(var loop = 1; loop <= max_loop; loop++){
		proxy_find();
		var function_code_9kw = "";
		function_code_9kw = recaptchav2_9kw();
		if(function_code_9kw == false && breakOnError == true){
			return false;
		}
		if (/[\d]/.test(max_wait)) {
			wait(max_wait);
		}
		last_csv += 1;
	}
})();

httpRequestObserver.unregister();
observerService.removeObserver(httpRequestObserver, "http-on-modify-request");
//End

// functions
// recaptcha v2
function recaptchav2_9kw(){
	var imacros_first_9kw = "";
	imacros_first_9kw += "CODE:"+imacros_header;
	if(!window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
		imacros_first_9kw += "TAB CLOSEALLOTHERS";
	}
	imacros_first_9kw += "\n";
	imacros_first_9kw += "TAB T=1\n";
	
	if(csv_active == 1){
		if(csv_file.length == 0){
			fp.displayDirectory = imns.Pref.getFilePref('defsavepath');//DataSources=defdatapath
			fp.init(window, "Select a File (CSV Data)", Components.interfaces.nsIFilePicker.modeOpen);
			fp.appendFilter("iMacros File (*.csv)", "*.csv");

			if(fp.show() == 0){
				csv_file = fp.file.path;
			}
		}
		imacros_first_9kw += "SET !DATASOURCE \""+csv_file+"\" "+"\n";
		imacros_first_9kw += "SET !DATASOURCE_COLUMNS " + csv_columns + "\n"; 
		imacros_first_9kw += "SET !DATASOURCE_LINE " + last_csv + "\n"; 
	}
	if(!window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
		imacros_first_9kw += myurl;
	}
	iimPlay(imacros_first_9kw)
	wait(0.5)

	// After url goto! (really important)
	document = window.document;

	// start execution
	var start = new Date(), end; // for benchmarking
	
	// check if we passed the test without images
	var frameDoc1;
	var frameDoc2;
	var token = "";
	for (i = 0; i < 10; i++){
		try {
			var iframes = document.getElementsByTagName('iframe');
			if(iframes.length >= 1){
				for (i = 0; i < iframes.length; i++) {
					frameDoc2 = iframes[i].contentDocument;
					if(frameDoc2 && frameDoc2.getElementById("recaptcha-token") != null){
						token = frameDoc2.getElementById("recaptcha-token").value;
						if(token){
							break;
						}
					}
				}
			}
		}catch(err){
		}
		if(token){
			break;
		}
		wait(1)
	}		
	
	if(token.length < 1){
		if(logFile){
			log_message("No captcha found.");
		}
		return false;
	}else{
		if(window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
			Services.prefs.setBoolPref("dom.allow_scripts_to_close_windows", 0);//no tab close for jd2 or with pure javascript without addon
		}
	}
	var x = document.getElementById("g-recaptcha-response");
	x.style.display = "";
	
	var sitekey = document.getElementsByClassName('g-recaptcha')[0].innerHTML;
	var rx = new RegExp('k=([^\&]+)\&','i');
	sitekey = sitekey.match(rx)[1];
	
	//Wait a random number of seconds
	//wait(Math.floor(Math.random()*3 + 2));
	var checkOK;
	var captchaid;
	var descs;
	var boxes;
	var last_new_content = "";
	
	// Step 2: Save the captcha picture
	for(var i3=1;i3<=10;i3++){
		captchaid = "";
		
		//Step 3: Open a new tab, and go to 9kw.eu, and submit the captcha picture
		var answer;
		var imacros_main2 = "CODE:"+imacros_header;
		imacros_main2 += "TAB OPEN\n";
		imacros_main2 += "TAB T=2\n";
		imacros_main2 += "URL GOTO=http://www.9kw.eu/grafik/form_base64.html\n";
		//The apikey is used to identify each of our customers, which you can get from the our page. It is assigned to the CONTENT.
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:apikey CONTENT="+apikey+"\n";
		//Priority in our system like min. 0 to max. 20 (cost +0-20)
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:prio CONTENT="+prio+"\n";
		//Options for the form. See more under http://www.9kw.eu/grafik/form_base64.html and http://www.9kw.eu/api.html
		imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:case-sensitive CONTENT=NO\n";
		imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:nomd5 CONTENT=YES\n";
		imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:interactive CONTENT=YES\n";
		imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:base64 CONTENT=NO\n";
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:maxtimeout CONTENT=3999\n";
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:useragent CONTENT="+window.navigator.userAgent.split(' ').join('<SP>')+"\n";
		if(allcookies == "1"){
			imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:cookies CONTENT="+unescape(window.document.cookie).split(' ').join('<SP>')+"\n";
		}
		if(sandbox == "1"){
			imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:selfsolve CONTENT=YES\n";
		}else{
			imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:selfsolve CONTENT=NO\n";					
		}
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:source CONTENT=imacros\n";
		if(!window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
			imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:pageurl CONTENT="+window.location.host+"\n";
		}
		// recaptcha v2 for non text captcha or recaptcha for text captcha
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:oldsource CONTENT=recaptchav2\n";
		//The path of the captcha picture saved is assigned to the CONTENT
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:file-upload-01 CONTENT=\""+sitekey+"\"\n";
		//Submit the formdata to 9kw.eu
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=TYPE:submit\n";
		//Clean the !EXTRACT variable for the next task
		imacros_main2 += "SET !EXTRACT NULL\n";
		//Extract the characters that are recoginzed from the picture of captcha.
		imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:result EXTRACT=TXT\n";
		iimPlay(imacros_main2)
		answer = iimGetLastExtract();

		//Step 4: Check the captcha answer (text or nothing like #EANF# = Extraction Anchor Not Found)
		if(answer == "#EANF#" || answer == "ERROR NO USER"){
			answer = "";
			iimPlay("CODE:TAB CLOSE\n")
			continue;
		}
			
		//Extract the captchaid from your captcha submit
		var imacros_main3 = "CODE:";
		imacros_main3 += "SET !EXTRACT NULL\n";
		imacros_main3 += "TAG POS=1 TYPE=INPUT ATTR=NAME:captchaid EXTRACT=TXT\n";
		imacros_main3 += "SET captchaid {{!EXTRACT}}\n";
		imacros_main3 += "TAB CLOSE\n";
		iimPlay(imacros_main3)
		captchaid = iimGetLastExtract();

		//Clean the !EXTRACT variable for the next task
		var imacros_main4 = "SET !EXTRACT NULL\n";
		iimPlay(imacros_main4)

		//Display extracted data (only for debug)
		//iimDisplay("captchaid: "+captchaid+"\nanswer: "+answer)
			
		//Step 5: Fill the recognized characters to the verification box
		if(answer.length > 50){
			document.getElementById('g-recaptcha-response').value = answer;
			wait(0.8)

			if(window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
				var xhr = new XMLHttpRequest();
				xhr.open("GET", window.location.href + "&do=solve&response=" + answer, true);
				xhr.send();
			}
			
			// Submit
			if(mysubmit_js == 1){
				eval(mysubmit);
			}else{
				SearchFrame(mysubmit,0);
			}
		}

		//Step 6: Check and send the captcha feedback back to the captcha service (OK:1, NotOK:2, EN: Right/False, DE: Richtig/Falsch)
		if(captchaid.length > 0 && answer.length > 50){
			end =+ new Date();
			if(logFile){
				log_message('Captcha is solved\n\rTime spent: '+Math.floor((end-start)/1000));
			}
		
			if(window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
				Services.prefs.setBoolPref("dom.allow_scripts_to_close_windows", 1);
				iimPlayCode("TAB CLOSE\n")
			}
		}
		if(answer.length > 20){
			break;
		}
	}
	return;
}

// random between 1 and 9
function rand(){
	return Math.floor(Math.random()*9) + 1;
}

// wait function like wait(2) for two seconds
function wait(waittime){
	iimPlay("CODE: WAIT SECONDS="+waittime+"\n");
	return;
}

// wait function like wait(2) for two seconds
function getextract(shortcode){
	iimPlay("CODE: "+shortcode);
	return iimGetLastExtract();
}

// date functione
function tempfile_date() {
	now = new Date();
	year = "" + now.getFullYear();
	month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
	return year + month + day + "_" + hour + minute + second;
}

// find frame with true or false as return
function SearchOK(checkcode,firstframenumber,lastframenumber){
	var check = "CODE:"+"SET !REPLAYSPEED "+replayspeed+"\n";
	check += "SET !ERRORIGNORE YES" + "\n";
	check += "SET !TIMEOUT_STEP 0" + "\n"; 
	check += "FRAME F={{i}}" + "\n"; 
	check += "SET !ERRORIGNORE NO" + "\n";
			
	if (checkcode != ""){
		check += checkcode + "\n"; 
	}else{
		return 0;
	}
		
	if(/^\d+$/.test(firstframenumber)) {
		frame = firstframenumber;
	}else{
		frame = 1;
	}
	
	if(/^\d+$/.test(lastframenumber)) {
		frame2 = lastframenumber;
	}else{
		frame2 = 50;
	}

	for(var i=frame;i<=frame2;i++){
		iimSet("i",i)

		if(iimPlay(check) == true){
			return 1;
		}
	}
	return 0;
}

// find frame with the framenumber as return
function SearchFrame(checkcode,firstframenumber){
	var check = "CODE:"+"SET !REPLAYSPEED "+replayspeed+"\n";
	check += "SET !ERRORIGNORE YES" + "\n";
	check += "SET !TIMEOUT_STEP 0" + "\n"; 
	check += "FRAME F={{i}}" + "\n"; 
	check += "SET !ERRORIGNORE NO" + "\n";
	
	if (checkcode != ""){
		check += checkcode + "\n"; 
	}else{
		return 0;
	}
		
	if(/^\d+$/.test(firstframenumber)) {
		frame = firstframenumber;
	}else{
		frame = 1;
	}

	for(var i=frame;i<=50;i++){
		iimSet("i",i)

		//if the result of the macro is true save frame number and break
		if(iimPlay(check) == true){
			frame = i;
			break;
		}
	}
	//return frame number
	return frame;
}

// Get the imacros folder
function getiMacrosFolder(folderName){
   var pname;
   switch (folderName){
      case "Macros" :
         pname = "defsavepath";
         break;
      case "DataSources" :
         pname = "defdatapath";
         break;
      case "Downloads" :
         pname = "defdownpath";
         break;
      case "Logs" :
         pname = "deflogpath";
         break;
      default :
         throw folderName + " is not a valid iMacros folder name";
         break;
   }
   return imns.Pref.getFilePref(pname).path;
}

// Logfunction
function log_message(msg) {
	var time = new Date().toString().replace(/\s+GMT.*/, '');
	msg = time + ' - ' + msg + '\n';
	var file_o = imns.FIO.openNode(logFilePath);
	imns.FIO.appendTextFile(file_o, msg);
}

// Logfunction
function alert_message(msg){
	if(logFile){
		log_message(msg);
	}

	iimDisplay(msg);

	if(onBreakAlert){
		alert(msg);
	}
}

// Load *.js file
function loadScriptFromURL(url) {
	var request = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1'].createInstance(Components.interfaces.nsIXMLHttpRequest),
	async = false;
	request.open('GET', url, async);
	request.send();
	if(request.status !== 200){
		var message = 'an error occurred while loading script at url: ' + url + ', status: ' + request.status;
		iimDisplay(message);
		return false;
	}
	eval(request.response);
	return true;
}

// Sleep in javascript as workaround
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function removeTags(element){
    var rex = /(<([^>]+)>)/ig;
    return(element.replace(rex , ""));
}

function get_my_ip (){
	var ip_code = "SET !EXTRACT_TEST_POPUP NO\n";
	ip_code += "SET !ERRORIGNORE YES\n";
	ip_code += "SET !TIMEOUT_PAGE "+proxy_timeout+"\n";
	ip_code += "URL GOTO=http://www.showmemyip.com/\n";
	ip_code += "SET !EXTRACT NULL\n";
	ip_code += "TAG POS=1 TYPE=SPAN ATTR=CLASS:ipaddress EXTRACT=TXT\n";
	ip_code += "SET !VAR1 {{!EXTRACT}}\n";
	iimPlayCode(ip_code);
	return iimGetLastExtract();
}

function read_file_raw(csv_file_name){
	const CRLF = "\r\n";
	const LF = "\n";
	var lines = new Array();
	var file_i = imns.FIO.openNode(csv_file_name);
	var text = imns.FIO.readTextFile(file_i); // Read file into one string
	var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;
	lines = text.split(eol);
	return lines;
}

function read_file(csv_file_name){
	const CRLF = "\r\n";
	const LF = "\n";
	var lines = new Array();
	var file_i = imns.FIO.openNode(imns.Pref.getFilePref('defdatapath').path+'\\'+csv_file_name);
	var text = imns.FIO.readTextFile(file_i); // Read file into one string
	var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;
	lines = text.split(eol);
	return lines;
}

function count_rows(csv_file_name){
	// COUNT THE NUMBERS OF NON-BLANK ROWS IN CSV FOR LOOP
	const CRLF = "\r\n";
	const LF = "\n";

	var lines = new Array();

	var file_i = imns.FIO.openNode(imns.Pref.getFilePref('defdatapath').path+'\\'+csv_file_name);
	var text = imns.FIO.readTextFile(file_i); // Read file into one string

	// Determine end-of-line marker
	var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;

	// Split into lines (number of lines) NUMBER OF LINES IN CSV
	lines = text.split(eol);
	var count=0;
	for(var i=0;i< lines.length; i++){
		if (lines[i]!="") count++;
	}
	// FINISH COUNTING count = Number of LInes
	return count;
}

function proxy_find() {
	if(proxy_active == 1){
		var newcsv;
		
		if(proxy_csv_file.length == 0){
			fp.displayDirectory = imns.Pref.getFilePref('defsavepath');//DataSources=defdatapath
			fp.init(window, "Select a File (Proxy)", Components.interfaces.nsIFilePicker.modeOpen);
			fp.appendFilter("iMacros File (*.csv)", "*.csv");

			if(fp.show() == 0){
				proxy_csv_file = fp.file.path;
			}
		}
		var csv = read_file_iim(proxy_csv_file);
		newcsv = csv.split("\n");
		
		var my_next_proxy = 0;
		if(last_proxy.length > 0){
			if((parseFloat(last_proxy)+1) < newcsv.length-2){
				my_next_proxy = parseFloat(last_proxy)+1;
			}
		}
		
		var new_proxy = "";
		for(iproxy=my_next_proxy;iproxy<=newcsv.length-2;iproxy++){
			var values = newcsv[iproxy].split(":");
			var ProxyIP = values[0];
			var ProxyPort = values[1];

			Services.prefs.setIntPref("network.proxy.type", 1);
			if(proxy_http == 1){
				Services.prefs.setCharPref("network.proxy.http", ProxyIP);
				Services.prefs.setIntPref("network.proxy.http_port", ProxyPort);
			}else{
				Services.prefs.setCharPref("network.proxy.http", "");
				Services.prefs.setIntPref("network.proxy.http_port", 0);
				
				Services.prefs.setCharPref("network.proxy.socks", ProxyIP);
				Services.prefs.setIntPref("network.proxy.socks_port", ProxyPort);
			}
			Services.prefs.setIntPref("network.proxy.type", 1);

			var my_new_ip;
			if(proxy_check == 1){
				my_new_ip = get_my_ip();
			}

			if(my_new_ip != "#EANF#" && myip != my_new_ip && my_new_ip.length > 3 && myip.length > 3){
				new_proxy = newcsv[iproxy];
				break;
			}else{
				if(proxy_check == 1){
					Services.prefs.setCharPref("network.proxy.http", "");
					Services.prefs.setIntPref("network.proxy.http_port", 0);
						
					Services.prefs.setCharPref("network.proxy.socks", "");
					Services.prefs.setIntPref("network.proxy.socks_port", 0);
					Services.prefs.setIntPref("network.proxy.type", 0);
				}
				continue;
			}
		}
		if(new_proxy.length == 0){
			alert_message('No (new) proxy found.');
		}
		return new_proxy;
	}
}

function read_file_iim(path) {
    var content = '', l = 1, f, res = '';

    do {
        content += res && (res + "\n");
        f = "CODE: "+"\n";
        f += "SET !EXTRACT null" + "\n"; 
        f += "SET !DATASOURCE \""+path+"\" "+"\n";
        f += "SET !DATASOURCE_COLUMNS 1" + "\n"; 
        f += "SET !DATASOURCE_LINE " + l + "\n"; 
        f += "SET !EXTRACT {{!col1}}" + "\n";
        iimPlay(f);
        res = iimGetLastExtract();
        l++;
    } while (res && res != '#EANF#');

    return content;
}

function eventFire(el, etype){
	if(el.fireEvent){
		el.fireEvent('on' + etype);
	}else{
		var evObj = window.document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}