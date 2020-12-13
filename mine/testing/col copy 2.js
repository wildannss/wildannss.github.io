//ERORR MASIH LOGIN
var error1 = "RuntimeError: Can not locate element specified by selector \"#accept\", line 17";
var error2  = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue\."+"\n"+"\n"+"Script: https://colab.research.google.…20201124-085601-RC00_344043294:318\", line 40";
var error3  = "RuntimeError: Element A is not visible, line 10 Element A is not visible, line 10";
var error5 = "RuntimeError: Can not locate element specified by selector \"#gb>DIV>DIV>A\", line 8";

//ERORR BELUM LOGIN
var error4 = "RuntimeError: Can not locate element specified by selector \"#passwordNext>DIV>BUTTON\", line 29";
var error6 = "RuntimeError: Can not locate element specified by selector \"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\", line 10";

//NORMAL
var iimMain ="VERSION BUILD=8970419 RECORDER=FX"+"\n";

iimMain +="SET !DATASOURCE users.csv"+"\n";
iimMain +="SET !DATASOURCE_COLUMNS 3"+"\n";
iimMain +="SET !DATASOURCE_LINE {{loop}}"+"\n";
iimMain +="TAB T=1"+"\n";
iimMain +="URL GOTO=about:newtab"+"\n";
iimMain +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";

iimMain +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=2"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\" BUTTON=0";

iimMain +="WAIT SECONDS=2"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI>DIV>DIV:nth-of-type(2)>svg\" BUTTON=0";

iimMain +="WAIT SECONDS=2"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#yDmH0d>DIV:nth-of-type(5)>DIV>DIV:nth-of-type(2)>DIV:nth-of-type(3)>DIV>SPAN>SPAN\" BUTTON=0";


iimMain +="WAIT SECONDS=5"+"\n";
iimMain +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";

iimMain +="WAIT SECONDS=5"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=5"+"\n";
iimMain +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=3"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=2"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=5"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=1800"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=1"+"\n";
iimMain +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";

iimMain +="WAIT SECONDS=1"+"\n";
iimMain +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";

iimMain +="WAIT SECONDS=150"+"\n";
iimMain +="CLEAR"+"\n";

//LOGIN LANGSUNG
var iimMain2 ="VERSION BUILD=8970419 RECORDER=FX"+"\n";

iimMain2 +="SET !DATASOURCE users.csv"+"\n";
iimMain2 +="SET !DATASOURCE_COLUMNS 3"+"\n";
iimMain2 +="SET !DATASOURCE_LINE {{loop}}"+"\n";
iimMain2 +="TAB T=1"+"\n";
iimMain2 +="URL GOTO=about:newtab"+"\n";
iimMain2 +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";

iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=5"+"\n";
iimMain2 +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";

iimMain2 +="WAIT SECONDS=5"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=5"+"\n";
iimMain2 +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=3"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=2"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=5"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=1800"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=1"+"\n";
iimMain2 +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";

iimMain2 +="WAIT SECONDS=1"+"\n";
iimMain2 +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";

iimMain2 +="WAIT SECONDS=150"+"\n";
iimMain2 +="CLEAR"+"\n";

//LOGOUT BELUM PLAY
var iim2 = "VERSION BUILD=8970419 RECORDER=FX"+"\n";

iim2 +="SET !DATASOURCE users.csv"+"\n";
iim2 +="SET !DATASOURCE_COLUMNS 3"+"\n";
iim2 +="SET !DATASOURCE_LINE {{loop}}"+"\n";
iim2 +="TAB T=1"+"\n";

iim2 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
iim2 +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
iim2 +="CLEAR"+"\n";

//LOGOUT SUDAH PLAY
var iim3 = "VERSION BUILD=8970419 RECORDER=FX"+"\n";

iim3 +="SET !DATASOURCE users.csv"+"\n";
iim3 +="SET !DATASOURCE_COLUMNS 3"+"\n";
iim3 +="SET !DATASOURCE_LINE {{loop}}"+"\n";
iim3 +="TAB T=1"+"\n";

iim3 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
iim3 +="WAIT SECONDS=1"+"\n";
iim3 +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
iim3 +="WAIT SECONDS=1"+"\n";
iim3 +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
iim3 +="WAIT SECONDS=150"+"\n";
iim3 +="CLEAR"+"\n";


// iimPlayCode(iimMain);
// iimSet("loop","1");
// alert(iimGetErrorText());

var loop = 0;
for(i=1; i<100; i++){
    iimSet("loop",+i);
    iimPlayCode(iimMain2);
    // if(iimGetErrorText(iimPlayCode(iimMain))==error5){
    //     iimPlayCode(iim2);
    // }else if(iimGetErrorText(iimPlayCode(iimMain))==error1){
    //     iimPlayCode(iim2);
    // }else if(iimGetErrorText(iimPlayCode(iimMain))==error6){
    //     iimPlayCode(iimMain2);
    // }else if(iimGetErrorText(iimPlayCode(iimMain))==error1){
    //     iimPlayCode(iim3);
    // }
}