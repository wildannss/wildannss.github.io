// var iim ="VERSION BUILD=8970419 RECORDER=FX"+"\n";
// iim +="SET !DATASOURCE users.csv"+"\n";
// iim +="SET !DATASOURCE_COLUMNS 3"+"\n";
// iim +="SET !DATASOURCE_LINE {{loop}}"+"\n";

// iim +="TAB T=1"+"\n";
// iim +="CLEAR"+"\n";
// iim +="URL GOTO=about:newtab"+"\n";
// iim +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";

// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI>DIV>DIV:nth-of-type(2)>svg\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#yDmH0d>DIV:nth-of-type(5)>DIV>DIV:nth-of-type(2)>DIV:nth-of-type(3)>DIV>SPAN>SPAN\" BUTTON=0";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=5"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=18"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
// iim +="WAIT SECONDS=2"+"\n";
// iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
// iim +="WAIT SECONDS=12"+"\n";
// iim +="CLEAR"+"\n";

for(i=1; i<=2; i++){
    iimSet("loop",i);
    iimPlayCode(iim);

    if(iimGetErrorText()=="RuntimeError: Can not locate element specified by selector \"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\", line 11"){
        iimSet("loop",i);
        var iim ="VERSION BUILD=8970419 RECORDER=FX"+"\n";
        iim +="SET !DATASOURCE users.csv"+"\n";
        iim +="SET !DATASOURCE_COLUMNS 3"+"\n";
        iim +="SET !DATASOURCE_LINE {{loop}}"+"\n";
        iim +="TAB T=1"+"\n";
        iim +="URL GOTO=about:newtab"+"\n";
        iim +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=5"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=18"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=12"+"\n";
        iim +="CLEAR"+"\n";
        iimPlayCode(iim);
    
    }else if(iimGetErrorText()=="RuntimeError: Can not locate element specified by selector \"#gb>DIV>DIV>A\", line 9"){
        iimSet("loop",i);
        var iim = "VERSION BUILD=8970419 RECORDER=FX"+"\n";
        iim +="SET !DATASOURCE users.csv"+"\n";
        iim +="SET !DATASOURCE_COLUMNS 3"+"\n";
        iim +="SET !DATASOURCE_LINE {{loop}}"+"\n";
        iim +="TAB T=1"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";

        iim +="CLEAR"+"\n";
        iim +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=5"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=18"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=12"+"\n";
        iim +="CLEAR"+"\n";
        iimPlayCode(iim);

    }else if(iimGetErrorText()=="RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"This page is asking you to confirm that you want to leave - data you have entered may not be saved.\", line 7"){
        iimSet("loop",i);
        var iim = "VERSION BUILD=8970419 RECORDER=FX"+"\n";
        iim +="SET !DATASOURCE users.csv"+"\n";
        iim +="SET !DATASOURCE_COLUMNS 3"+"\n";
        iim +="SET !DATASOURCE_LINE {{loop}}"+"\n";
        iim +="TAB T=1"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=1"+"\n";
        iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
        iim +="WAIT SECONDS=1"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=12"+"\n";

        iim +="CLEAR"+"\n";
        iim +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=5"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=18"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=12"+"\n";
        iim +="CLEAR"+"\n";
        iimPlayCode(iim);
        
    }else if(iimGetErrorText()=="RuntimeError: Can not locate element specified by selector \"#accept\", line 17"){
        iimSet("loop",i);
        var iim = "VERSION BUILD=8970419 RECORDER=FX"+"\n";
        iim +="SET !DATASOURCE users.csv"+"\n";
        iim +="SET !DATASOURCE_COLUMNS 3"+"\n";
        iim +="SET !DATASOURCE_LINE {{loop}}"+"\n";
        iim +="TAB T=1"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";

        iim +="CLEAR"+"\n";
        iim +="URL GOTO=https://colab.research.google.com/github/wildannss/{{!COL3}}/blob/main/go1.ipynb"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>A\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:identifierId CONTENT={{!COL1}}"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#identifierNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="TAG POS=1 TYPE=INPUT:PASSWORD ATTR=NAME:password CONTENT={{!COL2}}"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#passwordNext>DIV>BUTTON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#accept\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#cell-8uQ12Gz6ZzCb>DIV:nth-of-type(2)>DIV:nth-of-type(4)>COLAB-RUN-BUTTON>DIV>DIV:nth-of-type(2)>IRON-ICON\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=5"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#ok\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=18"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb>DIV>DIV>DIV:nth-of-type(2)>DIV>A>IMG\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="ONDIALOG POS=1 BUTTON=OK CONTENT="+"\n";
        iim +="WAIT SECONDS=2"+"\n";
        iim +="EVENT TYPE=CLICK SELECTOR=\"#gb_71\" BUTTON=0"+"\n";
        iim +="WAIT SECONDS=12"+"\n";
        iim +="CLEAR"+"\n";
        iimPlayCode(iim);

    }

}