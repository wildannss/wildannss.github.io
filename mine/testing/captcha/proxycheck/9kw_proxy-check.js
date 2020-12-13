
//
// Proxy Checker from 9kw.eu
//
// For iMacros 8.9.7
// See http://forum.imacros.net/viewtopic.php?t=26543 and http://forum.imacros.net/viewtopic.php?t=12440
//
var proxy_csv_file = 'E:\\Tests\\whichproxy.csv';//output workingproxy.csv and notworkingproxy.csv
var proxy_http = 0; // 1=ON (http), 0=OFF (socks5)
var timeout = 5; // seconds

Components.utils.import("resource://gre/modules/Services.jsm");
Services.prefs.setIntPref("network.proxy.type", 0);
var csv_9kw = read_file_iim_9kw(proxy_csv_file);
var newcsv_9kw = csv_9kw.split("\n");

// manual proxy configuration
//prefs.setIntPref("network.proxy.type", 1);

// use the proxy server for all protocols
//prefs.setBoolPref("network.proxy.share_proxy_settings", true);

// HTTP Proxy
//prefs.setCharPref("network.proxy.http", ip);
//prefs.setIntPref("network.proxy.http_port", port);

// SOCKS Host
//prefs.setCharPref("network.proxy.socks", ip);
//prefs.setIntPref("network.proxy.socks_port", port);

// SSL Proxy
//prefs.setCharPref("network.proxy.ssl", ip);
//prefs.setIntPref("network.proxy.ssl_port", port);

// Automatich proxy configuration URL
//prefs.setCharPref("network.proxy.autoconfig_url", YOURVALUE);
//prefs.setIntPref("network.proxy.type", 2);

// get your proxy
//var proxy_http = Services.prefs.getCharPref("network.proxy.http");
//var proxy_http_port = Services.prefs.getIntPref("network.proxy.http_port");

//var proxy_socks = Services.prefs.getCharPref("network.proxy.socks");
//var proxy_socks_port = Services.prefs.getIntPref("network.proxy.socks_port");

var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

// get your ip without any proxy
var myip_9kw = get_my_ip_9kw();
if(myip_9kw == "" || myip_9kw.length < 3){
		throw "Error with your ip."
}

var workingproxy_9kw = "";
var notworkingproxy_9kw = "";
for(i_9kw=0;i_9kw<=newcsv_9kw.length-2;i_9kw++){
	var values_9kw = newcsv_9kw[i_9kw].split(":");
	var ProxyIP_9kw = values_9kw[0];
	var ProxyPort_9kw = values_9kw[1];

	Services.prefs.setIntPref("network.proxy.type", 1);
	if(proxy_http == 1){
		Services.prefs.setCharPref("network.proxy.http", ProxyIP_9kw);
		Services.prefs.setIntPref("network.proxy.http_port", ProxyPort_9kw);
	}else{
		Services.prefs.setCharPref("network.proxy.http", "");
		Services.prefs.setIntPref("network.proxy.http_port", 0);
		
		Services.prefs.setCharPref("network.proxy.socks", ProxyIP_9kw);
		Services.prefs.setIntPref("network.proxy.socks_port", ProxyPort_9kw);
	}
	Services.prefs.setIntPref("network.proxy.type", 1);

	var my_new_ip_9kw = get_my_ip_9kw();
	
	Services.prefs.setCharPref("network.proxy.http", "");
	Services.prefs.setIntPref("network.proxy.http_port", 0);
		
	Services.prefs.setCharPref("network.proxy.socks", "");
	Services.prefs.setIntPref("network.proxy.socks_port", 0);
	Services.prefs.setIntPref("network.proxy.type", 0);
	
	if(my_new_ip_9kw != "#EANF#" && myip_9kw != my_new_ip_9kw && my_new_ip_9kw.length > 3 && myip_9kw.length > 3){
		workingproxy_9kw += newcsv_9kw[i_9kw]+"\n";
	}else{
		notworkingproxy_9kw += newcsv_9kw[i_9kw]+"\n";
	}
}
writeTextToFile_9kw(proxy_csv_path+'workingproxy.csv',workingproxy_9kw);
writeTextToFile_9kw(proxy_csv_path+'notworkingproxy.csv',notworkingproxy_9kw);

function get_my_ip_9kw (){
	var ip_code_9kw = "SET !EXTRACT_TEST_POPUP NO\n";
	ip_code_9kw += "SET !ERRORIGNORE YES\n";
	ip_code_9kw += "SET !TIMEOUT_PAGE "+timeout+"\n";
	ip_code_9kw += "URL GOTO=http://www.showmemyip.com/\n";
	ip_code_9kw += "SET !EXTRACT NULL\n";
	ip_code_9kw += "TAG POS=1 TYPE=SPAN ATTR=CLASS:ipaddress EXTRACT=TXT\n";
	ip_code_9kw += "SET !VAR1 {{!EXTRACT}}\n";
	iimPlayCode(ip_code_9kw);
	return iimGetLastExtract();
}

function read_file_iim_9kw(path_9kw) {
    var content_9kw = '', l_9kw = 1, f_9kw, res_9kw = '';

    do {
        content_9kw += res_9kw && (res_9kw + "\n");
        f_9kw = "CODE: "+"\n";
        f_9kw += "SET !EXTRACT null" + "\n"; 
        f_9kw += "SET !DATASOURCE \""+path_9kw+"\" "+"\n";
        f_9kw += "SET !DATASOURCE_COLUMNS 1" + "\n"; 
        f_9kw += "SET !DATASOURCE_LINE " + l + "\n"; 
        f_9kw += "SET !EXTRACT {{!col1}}" + "\n";
        iimPlay(f);
        res_9kw = iimGetLastExtract();
        l_9kw++;
    } while (res_9kw && res_9kw != '#EANF#');

    return content_9kw;
}

function writeTextToFile_9kw(fileFullPath_9kw, text_9kw){
   try{
	  removeFile(fileFullPath_9kw);
      var file_o_9kw = imns.FIO.openNode(fileFullPath_9kw);
      imns.FIO.appendTextFile(file_o_9kw, text_9kw);
   }catch (e_9kw){
      window.alert("Error writing to file: " + e_9kw);
   }
}

function removeFile_9kw(fileFullPath_9kw)
{
	iimPlayCode("SET !ERRORIGNORE YES\nFILEDELETE NAME="+fileFullPath_9kw);
}