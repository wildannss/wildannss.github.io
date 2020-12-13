//
// This imacros script created by 9kw.eu
// Find more here: http://www.9kw.eu/
//
// The script fill the captcha of recaptcha v2 demo.
//
// Last update: 9 December 2016
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

// Step 1: Config for 9kw.eu for your apikey
var apikey = "";

// And priority (prio, credits +1-20)
var prio = "1";

// And confirm (+6 credits)
var confirm = 0; //1=ON, 0=OFF

// And sandbox mode (selfsolve)
var sandbox = 0; //1=ON, 0=OFF

//imacros-js:showsteps yes

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

// Timeout
var maxtimeout = '';//60-3999 seconds as maximum time (default 300s)

// Header
if(maxtimeout == ""){
	maxtimeout = 300;
}
var imacros_header = "SET !EXTRACT_TEST_POPUP NO\n";
imacros_header += "SET !ERRORIGNORE YES\n";
imacros_header += "SET !TIMEOUT_PAGE "+maxtimeout+"\n";
imacros_header += "SET !TIMEOUT_STEP "+maxtimeout+"\n";
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
var anti_timeout_opacity = "";
var anti_timeout_left = "";
var anti_timeout_top = "";
var anti_timeout_transition = "";

// Browser
var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
Components.utils.import("resource://gre/modules/Services.jsm");
Services.prefs.setBoolPref("accessibility.blockautorefresh", 0);//better auto refresh
var imacros_version = Services.prefs.getCharPref("extensions.imacros.version");
var utils = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindowUtils);

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
	
	// initial click macro (recaptcha v2 click)	
	var el1 = frameDoc2.getElementsByClassName('recaptcha-checkbox-checkmark')[0];
	var ev1 = frameDoc2.createEvent("MouseEvent");
	ev1.initMouseEvent("click", true, true, window, null, 23, 2, 0, 0, false, false, false, false, 0, null);
	el1.dispatchEvent(ev1);

	var recaptcha_ready = "";
	for (i = 0; i < 10; i++){
		try {
			if(frameDoc2.getElementsByClassName('recaptcha-checkbox-checkmark').length > 0){
				iframes = document.getElementsByTagName('iframe');
				if(iframes.length >= 2) {
					for (i2 = 0; i2 < iframes.length; i2++) {
						frameDoc = iframes[i2].contentDocument;

						if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility != 'hidden' && document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity != 0){
							scripts = iframes[i2].contentDocument.getElementsByTagName('script');
							for (i3 = 0; i3 < scripts.length; i3++) {
								index = scripts[i3].innerHTML.indexOf('recaptcha.frame.Main.init');
								if(index > -1){
									recaptcha_ready = 1;
								}
							}
						}
					}
				}
			}
		}catch(err){
		}
		if(recaptcha_ready == 1){
			break;
		}
		wait(0.5)
	}
	if(recaptcha_ready != 1){
		alert("No captcha found.");
	}
	frameDoc1 = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].contentDocument;

	anti_timeout_transition = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition;
	anti_timeout_top = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top;
	anti_timeout_left = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left;
	anti_timeout_visibility = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility;
	anti_timeout_opacity = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity;
	
	document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = anti_timeout_opacity;
	document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition = anti_timeout_transition;
	document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top = anti_timeout_top;
	document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left = anti_timeout_left;
	document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility = anti_timeout_visibility;
	
	//Wait a random number of seconds
	//wait(Math.floor(Math.random()*3 + 2));
	var checkOK;
	var more_correct_solutions;
	var captchaid;
	var multi_captcha = 0;
	var multi_click_captcha = 0;
	var descs;
	var boxes;
	var multi_captchaid = new Array();
	var last_new_content = "";
	var previousid = "";
	
	// Step 2: Save the captcha picture
	for(var i3=1;i3<=30;i3++){
		captchaid = "";
		var verify_fail = 0;	
		// macro for checking captcha checkbox
		if(frameDoc2.getElementsByClassName('recaptcha-checkbox-checked').length > 0){
			previousid = "";
			
			if(window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
				wait(3);
				Services.prefs.setBoolPref("dom.allow_scripts_to_close_windows", 1);
				iimPlayCode("TAB CLOSE\n")
			}
			end =+ new Date();
			if(logFile){
				log_message('Captcha is solved\n\rTime spent: '+Math.floor((end-start)/1000));
			}
		}else{
			wait(0.5);
			var click_captcha = 0;
			try{
				frameDoc1.getElementsByClassName('rc-imageselect-candidate')[0].innerHTML;
				click_captcha = 1;
			}catch(err){}
			
			if(click_captcha == 0){
			try{
				frameDoc1.getElementsByClassName('rc-canvas-canvas')[0].innerHTML;
				click_captcha = 1;
			}catch(err){}
			}
			
			if(i3 > 1){
				if(more_correct_solutions < 1 && multi_captcha == 0 || 
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' || 
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0 || 
				frameDoc2.getElementsByClassName('rc-anchor-error-msg-container')[0].style.display != 'none' && multi_captcha == 0 &&
				frameDoc2.getElementsByClassName('rc-anchor-error-msg-container')[0].innerText == 'Verification expired. Check the checkbox again.' || 
				click_captcha == 1
				){
					if(frameDoc2.getElementsByClassName('recaptcha-checkbox-checked').length == 0){
						if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' ||
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0){
							var el1 = frameDoc2.getElementsByClassName('recaptcha-checkbox-checkmark')[0];
							var ev1 = frameDoc2.createEvent("MouseEvent");
							ev1.initMouseEvent("click", true, true, window, null, 23, 2, 0, 0, false, false, false, false, 0, null);
							el1.dispatchEvent(ev1);
						}else{
							click_button("recaptcha-reload-button");
						}
						wait(3)
						
						anti_timeout_transition = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition;
						anti_timeout_top = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top;
						anti_timeout_left = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left;
						anti_timeout_visibility = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility;
						anti_timeout_opacity = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity;
	
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = anti_timeout_opacity;
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition = anti_timeout_transition;
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top = anti_timeout_top;
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left = anti_timeout_left;
						document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility = anti_timeout_visibility;

						click_captcha = 0;
					}
				}
			}
			wait(0.5);
			click_captcha = 0;
			try{
				frameDoc1.getElementsByClassName('rc-imageselect-candidate')[0].innerHTML;
				click_captcha = 1;
			}catch(err){}
			
			if(click_captcha == 0){
				try{
					frameDoc1.getElementsByClassName('rc-canvas-canvas')[0].innerHTML;
					click_captcha = 1;
				}catch(err){}
			}

			if(click_captcha == 1){
				continue;
			}
			
			boxes = frameDoc1.getElementsByClassName("rc-image-tile-target");
			if(boxes.length > 1){
				for (i = 0; i < boxes.length; i++) {
					var i_high = i + 1;
					if(boxes.length > 10 && i < 9){
						frameDoc1.getElementsByClassName("rc-image-tile-wrapper")[i].innerHTML += "<span style='position: absolute;width: 20px;left: -6px;top: 0px;border: 1px red black;color:rgb(0, 0, 0);background: rgba(255, 255, 255, 0.9);font: bold 18px Helvetica, Sans-Serif;padding: 0px 0px 0px 6px;'>0"+i_high+"</span>";
					}else{
						frameDoc1.getElementsByClassName("rc-image-tile-wrapper")[i].innerHTML += "<span style='position: absolute;width: 20px;left: -6px;top: 0px;border: 1px red black;color:rgb(0, 0, 0);background: rgba(255, 255, 255, 0.9);font: bold 18px Helvetica, Sans-Serif;padding: 0px 0px 0px 6px;'>"+i_high+"</span>";
					}
				}

				var descs = "";
				var text_title = 0;
				try{
					descs = frameDoc1.getElementsByClassName('rc-imageselect-desc-no-canonical')[0].innerText;
					if (!descs || descs.length == 0) {
						text_title = 1;
						descs = frameDoc1.getElementsByClassName('rc-imageselect-desc')[0].innerText;
					}
					descs = descs.replace(/(\r\n|\n|\r)/gm,"");
				}catch(err){}
				
				if(removeTags(descs) != removeTags(last_new_content)){
					if(descs.match(/Click verify once there are none left/g) || frameDoc1.getElementsByClassName('rc-imageselect-error-dynamic-more')[0].style.display != 'none'){
						multi_click_captcha = 1;
						multi_captcha = 1;
					}
					
					descs = descs.replace("Select all squares with ", ""); 
					descs = descs.replace("Select all images with a ", ""); 
					descs = descs.replace("Select all images with ", ""); 
					descs = descs.replace("Select all drinks ", ""); 
					descs = descs.replace("Select all ", ""); 
					descs = descs.replace("Click verify once there are none left.", "");
					descs = descs.replace("If there are none, click skip", "");
					descs = descs.replace(".", "");
					descs = descs.replace(" .", "");
					descs = descs.replace(". ", "");
					descs = descs.toUpperCase();

					var new_content;
					if(boxes.length > 9 || boxes.length == 8){
						new_content = "<strong style=\"font: bold 18px Helvetica, Sans-Serif;\">"+descs+"?</strong><br><span style=\"font: 18px Helvetica, Sans-Serif;\"><nobr>Select all images with \""+descs+"\"</nobr><br><nobr>Example answer: ";
						if(boxes.length > 9){
							new_content += "2,5,6 or 020506";
						}else{
							new_content += "2,5,6 or 256";
						}
						new_content += "</nobr><br><strong><nobr>If there is no match, answer with \"0\"</nobr></strong></span>";
					}else{
						new_content = "<strong style=\"font: bold 18px Helvetica, Sans-Serif;\">"+descs+"?</strong><br><span style=\"font: 17px Helvetica, Sans-Serif;\"><nobr>Select all images with \""+descs+"\"</nobr><br><nobr>Example answer: 2,5,6 or 256</nobr><br>";
						new_content += "<strong><nobr>If there is no match, answer with \"0\"</nobr></strong></span>";
					}
					
					last_new_content = new_content;
					if(text_title == 1){
						frameDoc1.getElementsByClassName('rc-imageselect-desc')[0].innerHTML = new_content;
					}else{
						frameDoc1.getElementsByClassName('rc-imageselect-desc-no-canonical')[0].innerHTML = new_content;
					}
				}
					
				if(boxes.length > 9){
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transform = "scale(.68)";
				}else{
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transform = "scale(.70)";
				}
			}
			
			if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' ||
			document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0 
			){
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = anti_timeout_opacity;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition = anti_timeout_transition;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top = anti_timeout_top;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left = anti_timeout_left;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility = anti_timeout_visibility;
			}
			
			var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'html:canvas');
			var selection_element = document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode;
			var selection;
			
			var de = document.documentElement;
			var box = selection_element.getBoundingClientRect();
			var new_top = box.top + window.pageYOffset - de.clientTop;
			var new_left = box.left + window.pageXOffset - de.clientLeft;
			var new_height = selection_element.offsetHeight;
			var new_width = selection_element.offsetWidth;

			if(boxes.length > 9){
				selection = {
					top: new_top,
					left: new_left,
					width: new_width*0.68,
					height: (new_height - frameDoc1.getElementsByClassName('rc-footer')[0].offsetHeight)*0.68,
				};
			}else{
				selection = {
					top: new_top,
					left: new_left,
					width: new_width*0.70,
					height: (new_height - frameDoc1.getElementsByClassName('rc-footer')[0].offsetHeight)*0.70,
				};
			}
			if(selection.height > 400){
				selection.height = 399;
			}
			canvas.height = selection.height;
			canvas.width = selection.width;
			var context = canvas.getContext('2d');
			context.fillStyle = "rgba(255,255,255,0)";  
			context.fillRect(0, 0, selection.width, selection.height);
			wait(1.5)//or it's too fast
			
			context.drawWindow(
				window,
				selection.left,
				selection.top,
				selection.width,
				selection.height,
				'rgba(255, 255, 255, 0)'
			);
			wait(0.9)//or it's too fast
			
			if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' || 
			document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0){
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = anti_timeout_opacity;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition = anti_timeout_transition;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top = anti_timeout_top;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left = anti_timeout_left;
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility = anti_timeout_visibility;
			}
			
			//Step 3: Open a new tab, and go to 9kw.eu, and submit the captcha picture
			var answer;
			if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility != 'hidden' && 
			document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity != 0){
				verify_fail = 0;
				wait(1);
				try{
				if(window.document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].contentDocument.getElementById("recaptcha-verify-button").getAttribute('aria-disabled') == "true"){
					verify_fail = 1;
				}
				}catch(err){}

				if(verify_fail == 1){
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = 0;
					wait(3);
					break;
				}
						
				var canvasdata = canvas.toDataURL('image/png', '').split(',')[1];
				if(
					canvasdata == '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' || 
					canvasdata == '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RtaCPMiWcBr3wXb3nHH/zegibTI+RdYAlw3HDccjxHHnBHewnhH6OiTSNsN88+u4+65YHsCcrUkrAbRkopeAsNnJnnDtvphygCCFk15IUcfXOuVFm8w6Mr7fh7gai4YU9BdetGFT/2WYkiYJa+pSKwEjqDHbjuAZ6POifWT9OWCV1jBjRRehwkPcPVneJfo0OkKV35BEG8r4cw6rR8BlY8VzXFnrVvCL4nlRx9e6z3hTNxw3HI8Nx93nXz7RW19/p7e++U7/7qvv9fOvftDffPNEP//yO7319RP97Mvv9fNvvtXPvnyit755on/322/1N9881s9/+51+9s1j/c2X3+nnX3+nt775Xn/z5e/wtf/le/386x/01teP9e+++U4/+/I7vf3bx3r7q8f6+dff6d/99ol+/uUT/c1X3+mtb57Y93+nn335WD//+rHe+u1jvfXNE/3s62/1s28e69999VhvfflEP/v6id6yx/j8v3ynn9vjfvb193rrm+/01tc/6Of2PG+e/2O9/c1T/ey33+vnXz7Rz7/5Tm9/+URvffWdfvb1t/qbr3/Q219+q//zcPj+fwEO3/8NOHy/4fAfjcNXfwaHr/4dHL76Czh89SscvvorcfjKcPjq3+Dw1Z/D4Vvg8NW/weGrP4PDV090d/fxud77/oXe/uFcbz95qrcfn+qdb8/03g/P9fb3z/XW96d6+9tTvf3bc7335FTv/HCqt7871TtPTvXO4xd677szvfPkB7375Fw/f3Kudx+f652nL/X290/11pNneuvxud774bl+/gO+//aT53rvh1O9/e1Tvf3kud75Fj/31tNTvffdc739+KXeffJM7377XO99+0LvfftMb/9wpvd++1zvPnmu9354rr/5/rmePH6qt5681Fu/O9fb3z/TW0+e6+3vnuutH17orcfnevvbU7335FzvPTnTk29P9fYPz/X2D8/13u9e6J3Hp3r78bneenKmt354oXcfv9T/fXA4NRxO9Tffny2ce0cAABgXSURBVP47OJz+BRzwz/84Dqd6+/vT/yAcTn+Fw+mvcDj9Nzic/gqH078dh9/9f4zD7/4KHH733+Jwx3C48+1TPMa353rnfwEOd/4CDnd+hcOd7091d+/spX7xwwu98+ytnpy91JOn7/Xh0zd68vStnpy+1Qdnb/Tu6Uu9f/paH/7wTm+fvtQH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' || 
					canvasdata == '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'
				){
					continue;
				}
				
				var imacros_main2 = "CODE:"+imacros_header;
				imacros_main2 += "TAB OPEN\n";
				imacros_main2 += "TAB T=2\n";
				imacros_main2 += "URL GOTO=http://www.9kw.eu/grafik/form_base64_recaptcha.html\n";
				//The apikey is used to identify each of our customers, which you can get from the our page. It is assigned to the CONTENT.
				imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:apikey CONTENT="+apikey+"\n";
				//Priority in our system like min. 0 to max. 20 (cost +0-20)
				imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:prio CONTENT="+prio+"\n";
				//Options for the form. See more under http://www.9kw.eu/grafik/form.html and http://www.9kw.eu/api.html
				imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:case-sensitive CONTENT=NO\n";
				imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:nomd5 CONTENT=YES\n";
				if(maxtimeout != ""){
					if(parseInt(maxtimeout) > 60){
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:maxtimeout CONTENT="+maxtimeout+"\n";
					}
				}
				if(previousid != ""){
					imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:previousid CONTENT="+captchaid+"\n";
				}
				if(sandbox == "1"){
					imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:selfsolve CONTENT=YES\n";
				}else{
					imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:selfsolve CONTENT=NO\n";					
				}
				if(confirm == "1"){
					imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:confirm CONTENT=YES\n";
				}else{
					imacros_main2 += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:/index.cgi ATTR=NAME:confirm CONTENT=NO\n";					
				}
				//We need only numbers for this captcha
				if(boxes.length > 1){
					imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:numeric CONTENT=4\n";
				}
				imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:source CONTENT=imacros\n";
				if(!window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
					imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:pageurl CONTENT="+window.location.host+"\n";
				}
				// recaptcha v2 for non text captcha or recaptcha for text captcha
				if(boxes.length > 1){
					imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:oldsource CONTENT=recaptchav2\n";
					if(boxes.length > 8 && boxes.length < 10){
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:cols CONTENT=3\n";
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:rows CONTENT=3\n";
					}else if(boxes.length > 10){
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:cols CONTENT=4\n";
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:rows CONTENT=4\n";
					}else{
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:cols CONTENT=2\n";
						imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:rows CONTENT=4\n";
					}
				}else{
					imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:oldsource CONTENT=recaptcha\n";
				}
				//The path of the captcha picture saved is assigned to the CONTENT
				imacros_main2 += "TAG POS=1 TYPE=INPUT ATTR=NAME:file-upload-01 CONTENT="+canvasdata+"\n";
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transform = 'none';//"scale(1.00)"
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
				previousid = captchaid;

				//Clean the !EXTRACT variable for the next task
				var imacros_main4 = "SET !EXTRACT NULL\n";
				iimPlay(imacros_main4)

				//Display extracted data (only for debug)
				//iimDisplay("captchaid: "+captchaid+"\nanswer: "+answer)
				
				if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' || 
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0){
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = anti_timeout_opacity;
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transition = anti_timeout_transition;
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.top = anti_timeout_top;
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.left = anti_timeout_left;
					document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility = anti_timeout_visibility;
				}
				
				//Step 5: Fill the recognized characters to the verification box (Click the pictures 1..16)
				if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility != 'hidden' && 
				document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity != 0){
					if(boxes.length > 1){
						var myarray;
						
						if(answer.match(/,/)){
							myarray = answer.split(',');
						}else{
							myarray = answer.split('');
						}
						if(myarray.length < 1){
							if(autoretry != 1){
								alert_message("No answer found. Check the history on 9kw.eu!");

								if(breakOnError){
									return false;
								}else{
									break;
								}
							}else{
								if(document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.visibility == 'hidden' || document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity == 0){
									more_correct_solutions = 0;
									multi_captcha = 0;
									multi_click_captcha = 0;
								}
							}
						}else{
							for(var i = 0;i < myarray.length; i++){
								if(myarray[i].match(/^[0-9]+$/) && myarray.length > 1 || myarray[i].match(/^[0-9]+$/) && myarray.length == 1 && myarray[i] != '0'){
									if(boxes.length > 10 && answer.match(/^[0-9]+$/)){
										try{
											var two_values;
											if(myarray[i+1].match(/^[0-9]+$/)){
												two_values = myarray[i]+myarray[i+1];
											}else{
												two_values = myarray[i];
											}
											i += 1;
											if(parseInt(two_values) != 10){
												two_values = two_values.replace("0", "");
											}
											two_values = parseInt(two_values) - 1;
											if(two_values == ""){
												two_values = 0;
											}
											
											if(boxes.length >= two_values){
												var ev = frameDoc1.createEvent("MouseEvent");
												ev.initMouseEvent("click", true, true, window, null, 23, 2, 0, 0, false, false, false, false, 0, null);
												if(hasClass(boxes[two_values].parentNode,'rc-imageselect-tileselected') == false){
													boxes[two_values].dispatchEvent(ev);
													wait(0.1)
												}
											}
										}catch(err){
										}
									}else{
										try{
											myarray[i] = parseInt(myarray[i]) - 1;
											if(myarray[i] == ""){
												myarray[i] = 0;
											}
											
											var ev = frameDoc1.createEvent("MouseEvent");
											ev.initMouseEvent("click", true, true, window, null, 23, 2, 0, 0, false, false, false, false, 0, null);
											if(hasClass(boxes[myarray[i]].parentNode,'rc-imageselect-tileselected') == false){
												boxes[myarray[i]].dispatchEvent(ev);
												wait(0.1)
											}
										}catch(err){									
										}
									}
									wait(0.4)
								}
							}
						}
					}else{//text captcha
						SearchFrame("TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:default-response CONTENT="+answer,0);
					}
						
					//Click the Verify button
					if(boxes.length > 0){
						verify_fail = 0;
						try{
						if(window.document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].contentDocument.getElementById("recaptcha-verify-button").getAttribute('aria-disabled') == "true"){
							verify_fail = 1;
						}
						}catch(err){}

						if(verify_fail == 1){
							document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.opacity = 0;
							wait(3);
							break;
						}

						if(boxes.length > 0 && multi_click_captcha == 0 || multi_click_captcha == 1 && answer == "0"){
							click_button("recaptcha-verify-button");
						}
					}else{//text captcha
						SearchFrame("TAG POS=1 TYPE=DIV ATTR=ID:recaptcha-verify-button",0);
					}
				}else{
					more_correct_solutions = 0;
					multi_captcha = 0;
					multi_click_captcha = 0;
				}
			}else{
				more_correct_solutions = 0;
				multi_captcha = 0;
				multi_click_captcha = 0;
			}
			document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].parentNode.parentNode.style.transform = 'none';//"scale(1.00)"
			canvas = "";
			context = "";
		}
		wait(0.8)
			
		// Submit
		var display_reset;
		var test_checked = 0;
		var solved_OK;
		var solved_NotOK = 0;
		try{
			if(frameDoc2.getElementsByClassName('recaptcha-checkbox-checked').length > 0){
				test_checked = 1;
				solved_OK = 1;
				multi_captcha = 0;
				display_reset = 0;

				if(mysubmit_js == 1){
					eval(mysubmit);
				}else{
					SearchFrame(mysubmit,0);
				}
			}else{
				solved_OK = 0;
				if(frameDoc1.getElementsByClassName('rc-imageselect-incorrect-response')[0].style.display != 'none' || 
				frameDoc1.getElementsByClassName('rc-imageselect-error-select-more')[0].style.display != 'none' || 
				frameDoc1.getElementsByClassName('rc-imageselect-error-dynamic-more')[0].style.display != 'none'
				){
					if(frameDoc1.getElementsByClassName('rc-imageselect-incorrect-response')[0].style.display != 'none' || 
					frameDoc1.getElementsByClassName('rc-imageselect-incorrect-response')[0].style.display != 'none' &&
					frameDoc1.getElementsByClassName('rc-imageselect-error-select-more')[0].style.display != 'none' && 
					frameDoc1.getElementsByClassName('rc-imageselect-error-dynamic-more')[0].style.display != 'none'
					){
						solved_NotOK = 1;
						
						multi_captchaid[captchaid] = 0;
						var imacros_main5 = "CODE:TAB OPEN\n";
						imacros_main5 += "TAB T=2\n";
						imacros_main5 += "URL GOTO=http://www.9kw.eu/index.cgi?source=imacros&action=usercaptchacorrectback&apikey="+apikey+"&correct=2&id="+captchaid+"\n";
						imacros_main5 += "WAIT SECONDS = 1\n";
						imacros_main5 += "TAB CLOSE\n";
						iimPlay(imacros_main5)
					}
					multi_captcha = 1;
					display_reset = 1;
					more_correct_solutions = 1;
				}else{
					more_correct_solutions = "";
				}
			}
		}catch(err){}
			
		//Step 6: Check and send the captcha feedback back to the captcha service (OK:1, NotOK:2, EN: Right/False, DE: Richtig/Falsch)
		var feedback;
		if(more_correct_solutions < 1 && multi_captcha == 0 || solved_OK == 1){
			feedback = 1;
		}else{
			feedback = 2;
		}
			
		if(captchaid.length > 0 && solved_OK == 1 || captchaid.length > 0 && solved_NotOK == 1 || captchaid.length > 0 && multi_captcha != 1){
			if(solved_NotOK != 1){
				multi_captchaid[captchaid] = 1;
			}
			solved_NotOK = 0;
			previousid = "";
	
			for(var captchaid_temp in multi_captchaid){
				if(multi_captchaid[captchaid_temp] == 1){
					multi_captchaid[captchaid_temp] = 0;
					var imacros_main5 = "CODE:TAB OPEN\n";
					imacros_main5 += "TAB T=2\n";
					imacros_main5 += "URL GOTO=http://www.9kw.eu/index.cgi?source=imacros&action=usercaptchacorrectback&apikey="+apikey+"&correct="+feedback+"&id="+captchaid_temp+"\n";
					imacros_main5 += "WAIT SECONDS = 1\n";
					imacros_main5 += "TAB CLOSE\n";
					iimPlay(imacros_main5)
				}
			}

			if(window.location.host.match(/^\d+\.\d+\.\d+\.\d+\:\d+$/)){
				if(frameDoc2.getElementsByClassName('recaptcha-checkbox-checked').length > 0){
					wait(3);
					Services.prefs.setBoolPref("dom.allow_scripts_to_close_windows", 1);
					iimPlayCode("TAB CLOSE\n")
				}
			}
		}else{
			multi_captchaid[captchaid] = 1;
		}
		if(display_reset == 1 && test_checked == 0){
				frameDoc1.getElementsByClassName('rc-imageselect-incorrect-response')[0].style.display = "none";
				frameDoc1.getElementsByClassName('rc-imageselect-error-select-more')[0].style.display = "none";
				frameDoc1.getElementsByClassName('rc-imageselect-error-dynamic-more')[0].style.display = "none";
		}
		if(feedback == "1" && solved_OK == 1){
			break;
		}else{
			multi_captcha = 1;
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

function click_button(special){
	var x_selection_element = window.document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0];
	var x_selection_element_main = window.document.querySelectorAll('iframe[title*="recaptcha challenge"]')[0].contentDocument.getElementById(special);
	var x_selection;

	var de = window.document.documentElement;
	var box = x_selection_element.getBoundingClientRect();
	var box_main = x_selection_element_main.getBoundingClientRect();
	var new_top = (box_main.top + box.top) + window.pageYOffset - de.clientTop;
	var new_left = (box_main.left + box.left) + window.pageXOffset - de.clientLeft;
	new_left -= window.scrollX;
	new_top -= window.scrollY;
	
	x_selection = {
		top: new_top,
		left: new_left
	};

	utils.sendMouseEvent("mousedown", parseInt(15)+x_selection.left, parseInt(15)+x_selection.top, 0, 1, 0);
	utils.sendMouseEvent("mousemove", parseInt(15)+x_selection.left, parseInt(15)+x_selection.top, 0, 0, 0);
	utils.sendMouseEvent("mouseup", parseInt(15)+x_selection.left, parseInt(15)+x_selection.top, 0, 1, 0);
}