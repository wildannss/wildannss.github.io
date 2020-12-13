// var error1 = "RuntimeError: Can not locate element specified by selector \"#gb>DIV>DIV>A\", line 9";
// var error2 = "RuntimeError: element INPUT specified by ID:Email was not found, line 11";
// var error3 = "RuntimeError: Can not locate element specified by selector \"#accept\", line 24";
// var error4 = "RuntimeError: element INPUT specified by ID:password was not found, line 12";
// var error5  = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue\."+"\n"+"\n"+"Script: https://colab.research.google.…20201124-085601-RC00_344043294:318\", line 40";
// var error6 = "RuntimeError: Can not locate element specified by selector \"#edit-account-list\", line 7";
// var error7 = "RuntimeError: element INPUT specified by ID:identifierId was not found, line 12";
// var error8 = "RuntimeError: Can not locate element specified by selector \"#passwordNext>DIV>BUTTON\", line 18";
// var error9 = "RuntimeError: Can not locate element specified by selector \"#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)\", line 7";
// var error10 = "RuntimeError: element INPUT specified by NAME:password was not found, line 18";
// var error11 = "RuntimeError: element INPUT specified by ID:password was not found, line 16";
// var error12 = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"This page is asking you to confirm that you want to leave - data you have entered may not be saved.\", line 8";

var error11 = /RuntimeError: element IMG specified by ID:captcha-img was not found, line/g;
var error13  = /RuntimeError: Element A is not visible, line 10 Element A is not visible, line/g;
var error14 = /NS_ERROR_FILE_NOT_FOUND: Component returned failure code: 0x80520012 (NS_ERROR_FILE_NOT_FOUND) [nsILocalFile.remove], line/g;


var error1 = /RuntimeError: Can not locate element specified by selector "#gb>DIV>DIV>A", line/g;
var error9 = /RuntimeError: Can not locate element specified by selector "#view_container>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>DIV>FORM>SPAN>SECTION>DIV>DIV>DIV>DIV>UL>LI:nth-of-type(3)>DIV>DIV>DIV:nth-of-type(2)", line/g;
var error6 = /RuntimeError: Can not locate element specified by selector "#edit-account-list", line/g;
var error2 = /RuntimeError: element INPUT specified by ID:Email was not found, line/g;
var error7 = /RuntimeError: element INPUT specified by ID:identifierId was not found, line/g;
var error4 = /RuntimeError: element INPUT specified by ID:password was not found, line/g;
var error10 = /RuntimeError: element INPUT specified by NAME:password was not found, line/g;
var error8 = /RuntimeError: Can not locate element specified by selector "#passwordNext>DIV>BUTTON", line/g;
var error3 = /RuntimeError: Can not locate element specified by selector "#accept", line/g;
var error5  = /RuntimeError: unhandled confirmEx dialog detected. Dialog message: "A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue/g;
var error12 = /RuntimeError: unhandled confirmEx dialog detected. Dialog message: "This page is asking you to confirm that you want to leave - data you have entered may not be saved.", line/g;



// for(a=1; a<=30; a++){

//     iimPlay("colab/gpu/source");

    for(i=1; i<=1; i++){
        
        //NORMAL FORM BARU
        iimSet("loop",i);
        var run = iimGetErrorText(iimPlay("colab/gpu/login_new"));

        //JIKA BELUM LOGOUT
        if(error1.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout");
            i--;
        }else if(error12.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout_f");
            i--;

        //JIKA TIDAK ADA EMAIL DI FORM BARU
        }else if(error7.test(run)){
            //FORM BARU DEL USER
            iimSet("loop",i);
            var run2 = iimGetErrorText(iimPlay("colab/gpu/login_del_new"));
            //JIKA SUDAH DIPAKAI
            if(error3.test(run2)){
                iimSet("loop",i);
                iimPlay("colab/gpu/logout");
            }else if(error9.test(run2)){
                //FORM LAMA
                iimSet("loop",i);
                var run3 = iimGetErrorText(iimPlay("colab/gpu/login_del"));
                if(error6.test(run3)){
                    iimSet("loop",i);
                    var run4 = iimGetErrorText(iimPlay("colab/gpu/login"));
                    //JIKA ADA CAPTCHA
                    if(error4.test(run4)){
                        iimSet("loop",i);
                        var run4 = iimGetErrorText(iimPlay("colab/gpu/login_cap"));
                        //JIKA SUDAH DIPAKAI
                        if(error3.test(run4)){
                            iimSet("loop",i);
                            iimPlay("colab/gpu/logout");
                        }
                    }
                }else if(error4.test(run3)){
                    //JIKA ADA CAPTCHA
                    iimSet("loop",i);
                    var run4 = iimGetErrorText(iimPlay("colab/gpu/login_cap"));
                    //JIKA SUDAH DIPAKAI
                    if(error3.test(run4)){
                        iimSet("loop",i);
                        iimPlay("colab/gpu/logout");
                    }
                }
            }

        //JIKA SUDAH DIPAKAI
        }else if(error3.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout");
        
        //JIKA ADA CAPTCHA
        }else if(error4.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/login_cap");
        
        //JIKA NOT RESPONDING
        }else if(error5.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout_f");
        
        }
    }

// }