//ERORR MASIH LOGIN
var error1 = "RuntimeError: Can not locate element specified by selector \"#accept\", line 17";
var error2  = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue\."+"\n"+"\n"+"Script: https://colab.research.google.…20201124-085601-RC00_344043294:318\", line 40";
var error3  = "RuntimeError: Element A is not visible, line 10 Element A is not visible, line 10";
var error4 = "RuntimeError: Can not locate element specified by selector \"#gb>DIV>DIV>A\", line 9";
var error8 = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"This page is asking you to confirm that you want to leave - data you have entered may not be saved.\", line 7";

//ERORR BELUM LOGIN
var error5 = "RuntimeError: Can not locate element specified by selector \"#passwordNext>DIV>BUTTON\", line 15";
var error6 = "RuntimeError: Can not locate element specified by selector \"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\", line 13";
// var error7 = "RuntimeError: element INPUT specified by ID:identifierId was not found, line 11";
var error7 = "RuntimeError: element INPUT specified by ID:Email was not found, line 11";
var error9 = "NS_ERROR_FILE_NOT_FOUND: Component returned failure code: 0x80520012 (NS_ERROR_FILE_NOT_FOUND) [nsILocalFile.remove], line 16";
var error10 = "RuntimeError: element INPUT specified by ID:password was not found, line 7";
var error11 = "RuntimeError: element IMG specified by ID:captcha-img was not found, line 7";

for(i=1; i<=100; i++){
    iimSet("loop",i);
    var run = iimGetErrorText(iimPlay("colab/gpu/iim1"));

    if(run == error4){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim3");
        i--;
    
    }else if(run == error7){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim2");

    }else if(run == error1){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim3");
        i--;

    }else if(run == error8){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim4");

    }else if(run == error9){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim6");

    }else if(run == error10){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim5");

    }else if(run == error11){
        iimSet("loop",i);
        iimPlay("colab/gpu/iim5");

    }
}