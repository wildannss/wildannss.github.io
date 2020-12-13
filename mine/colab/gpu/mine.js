var error1 = /RuntimeError: Can not locate element specified by selector "#gb>DIV>DIV>A"/g;
var error9 = /RuntimeError: Can not locate element specified by selector "#view_container/g;
var error6 = /RuntimeError: Can not locate element specified by selector "#edit-account-list"/g;
var error2 = /RuntimeError: element INPUT specified by ID:Email was not found/g;
var error7 = /RuntimeError: element INPUT specified by ID:identifierId was not found/g;
var error4 = /RuntimeError: element INPUT specified by ID:password was not found/g;
var error10 = /RuntimeError: element INPUT specified by NAME:password was not found/g;
//error8 NOT USED
var error8 = /RuntimeError: Can not locate element specified by selector "#passwordNext>DIV>BUTTON"/g;
var error3 = /RuntimeError: Can not locate element specified by selector "#accept"/g;
var error5  = /RuntimeError: unhandled confirmEx dialog detected. Dialog message: "A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue/g;
var error12 = /RuntimeError: unhandled confirmEx dialog detected. Dialog message: "This page is asking you to confirm that you want to leave - data you have entered may not be saved."/g;
//error11 NOT USED
var error11 = /RuntimeError: element IMG specified by ID:captcha-img was not found/g;
var error13  = /RuntimeError: Element A is not visible/g;
//error14 NOT USED
var error14 = /NS_ERROR_FILE_NOT_FOUND: Component returned failure code/g;

// for(a=1; a<=30; a++){

    // iimPlay("colab/gpu/source");

    for(i=1; i<=1; i++){
        
        //NORMAL FORM BARU
        iimSet("loop",i);
        // iimPlay("colab/gpu/update");
        iimSet("loop",i);
        var run = iimGetErrorText(iimPlay("colab/gpu/login_new"));

        //JIKA BELUM LOGOUT
        if(error1.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout");
            iimPlay("colab/gpu/traffic");
            i--;
        }else if(error12.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout_f");
            iimPlay("colab/gpu/traffic");
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
                iimPlay("colab/gpu/traffic");
            //FORM LAMA
            }else if(error9.test(run2)){
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
                            iimPlay("colab/gpu/traffic");
                        }
                        iimPlay("colab/gpu/traffic");
                    }
                    iimPlay("colab/gpu/traffic");
                }else if(error4.test(run3)){
                    //JIKA ADA CAPTCHA
                    iimSet("loop",i);
                    var run4 = iimGetErrorText(iimPlay("colab/gpu/login_cap"));
                    //JIKA SUDAH DIPAKAI
                    if(error3.test(run4)){
                        iimSet("loop",i);
                        iimPlay("colab/gpu/logout");
                        iimPlay("colab/gpu/traffic");
                    }
                //JIKA SUDAH DIPAKAI
                }else if(error3.test(run3)){
                    iimSet("loop",i);
                    iimPlay("colab/gpu/logout");
                    iimPlay("colab/gpu/traffic");
                }
            }

        //JIKA SUDAH DIPAKAI
        }else if(error3.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout");
            iimPlay("colab/gpu/traffic");
        
        //JIKA ADA CAPTCHA
        }else if(error10.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/login_cap");
            iimPlay("colab/gpu/traffic");
        
        //JIKA NOT RESPONDING
        }else if(error5.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout_f");
            iimPlay("colab/gpu/traffic");
        
        //JIKA ELEMEN BUTTON TIDAK DITEMUKAN
        }else if(error13.test(run)){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout_f");
            iimPlay("colab/gpu/traffic");
        
        }
    }

// }