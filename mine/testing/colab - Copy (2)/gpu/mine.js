var error1 = "RuntimeError: Can not locate element specified by selector \"#gb>DIV>DIV>A\", line 10";
var error2 = "RuntimeError: element INPUT specified by ID:Email was not found, line 12";
var error3 = "RuntimeError: Can not locate element specified by selector \"#accept\", line 19";
var error4 = "RuntimeError: element INPUT specified by ID:password was not found, line 16";
var error5  = "RuntimeError: unhandled confirmEx dialog detected. Dialog message: \"A script on this page may be busy, or it may have stopped responding. You can stop the script now, open the script in the debugger, or let the script continue\."+"\n"+"\n"+"Script: https://colab.research.google.…20201124-085601-RC00_344043294:318\", line 41";
var error6 = "RuntimeError: Can not locate element specified by selector \"#edit-account-list\", line 7";
var error7 = "RuntimeError: element INPUT specified by ID:identifierId was not found, line 6";
var error8 = "RuntimeError: Can not locate element specified by selector \"#passwordNext>DIV>BUTTON\", line 11";

for(i=1; i<=1; i++){
    
    //NORMAL
    iimSet("loop",i);
    var run = iimGetErrorText(iimPlay("colab/gpu/login"));

    //JIKA BELUM LOGOUT
    if(run == error1){
        iimSet("loop",i);
        iimPlay("colab/gpu/logout");
        i--;
        
    //JIKA ADA USER BELUM DIREMOVE
    }else if(run == error2){
        iimSet("loop",i);
        var run2 = iimGetErrorText(iimPlay("colab/gpu/login_del"));
        //JIKA ADA CAPTCHA
        if(run2 == error4){
            iimSet("loop",i);
            var cap = iimGetExtract(iimPlay("colab/gpu/captcha"));
            iimSet("cap",cap);
            iimSet("loop",i);
            var run3 = iimPlay("colab/gpu/login_cap");
            //JIKA SUDAH DIPAKAI
            if(run3 == error3){
                iimSet("loop",i);
                iimPlay("colab/gpu/logout");
            }
        //JIKA FORM BARU
        }else if(run2 == error6){
            iimSet("loop",i);
            var run3 = iimPlay("colab/gpu/login_new");
            //JIKA SUDAH DIPAKAI
            if(run3 == error3){
                iimSet("loop",i);
                iimPlay("colab/gpu/logout");
            //JIKA USER DEL FORM BARU
            }else if(run3 == error7){
                iimSet("loop",i);
                var run4 = iimPlay("colab/gpu/login_del_new");
                //JIKA SUDAH DIPAKAI
                if(run4 == error3){
                    iimSet("loop",i);
                    iimPlay("colab/gpu/logout");
                }
            }
        //JIKA SUDAH LOGIN TAPI SUDAH DIPAKAI
        }else if(run2 == error3){
            iimSet("loop",i);
            iimPlay("colab/gpu/logout");
        }
    //JIKA SUDAH DIPAKAI
    }else if(run == error3){
        iimSet("loop",i);
        iimPlay("colab/gpu/logout");
    
    //JIKA ADA CAPTCHA
    }else if(run == error4){
        iimSet("loop",i);
        var cap = iimGetExtract(iimPlay("colab/gpu/captcha"));
        iimSet("cap",cap);
        iimPlay("colab/gpu/login_cap");
    
    //JIKA NOT RESPONDING
    }else if(run == error5){
        iimSet("loop",i);
        iimPlay("colab/gpu/logout_f");
    
    //JIKA USER DEL FORM BARU
    }else if(run == error7){
        iimSet("loop",i);
        iimPlay("colab/gpu/login_del_new");
    
    }
}