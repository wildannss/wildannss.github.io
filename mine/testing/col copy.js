//var loop;
//for(i=1; i<3; i++){
//    iimSet(loop,i);
//}
var iim1;
iim1 ="VERSION BUILD=8970419 RECORDER=FX"+"\n";

iim1 +="SET !DATASOURCE users.csv";
iim1 +="SET !DATASOURCE_COLUMNS 3";
iim1 +="SET !DATASOURCE_LINE {{$loop}}";
iim1 +="TAB T=1"+"\n";
iim1 +="URL GOTO=about:newtab"+"\n";
iim1 +="CLEAR"+"\n";
iim1 +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";

iim1 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0";

iim1 +="WAIT SECONDS=5";
iim1 +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}";

iim1 +="WAIT SECONDS=5";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0";

iim1 +="WAIT SECONDS=5";
iim1 +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0";

iim1 +="WAIT SECONDS=3";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0";
iim1 +="SET !ERRORIGNORE NO";

iim1 +="WAIT SECONDS=2";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0";

iim1 +="WAIT SECONDS=5";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0";

iim1 +="WAIT SECONDS=1800";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0";

iim1 +="WAIT SECONDS=1";
iim1 +="ONDIALOG POS=1 BUTTON=OK CONTENT=";

iim1 +="WAIT SECONDS=1";
iim1 +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0";

iim1 +="WAIT SECONDS=150";

//iimPlay(iim1);

var error = iimGetErrorText(iim1);

iimDisplay(error);