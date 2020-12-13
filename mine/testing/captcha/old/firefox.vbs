' More informations under http://wiki.imacros.net/iimPlay()
'
' Or use the commandline like:
' start "" "C:\Program Files\Mozilla Firefox\firefox.exe" imacros://run/?m=9kw_recaptcha_v2.js
'
'initialize Scripting Interface
Dim iim1, i, s
Set iim1 = CreateObject ("imacros")
'i = iim1.iimOpen("-fx", false) 'Use open Firefox instance if available
i = iim1.iimOpen("-fx", true) 'Always open new instance

if iret<0 then
	msgbox "Could not connect to a FIREFOX web browser."
end if

i = iim1.iimInit()

' setting variables
' i = iim1.iimSet("-tray", "")

' find current folder
Dim myname, mypath
myname = WScript.ScriptFullName
mypath = Left(myname, InstrRev(myname, "\"))

' play macro
i = iim1.iimPlay(mypath & "9kw_recaptcha_v2.js")

wscript.sleep 360000
if i<0 then
	s = iim1.iimGetErrorText()
	'
	' All error codes
	' http://wiki.imacros.net/Error_and_Return_Codes
	'
	msgbox "The Scripting Interface returned error code: "+cstr(i)

	' Set WshShell = WScript.CreateObject("WScript.Shell")
	' Command = mypath & "startagain.bat"
	' WshShell.Run Command
Else
	' msgbox "Press OK to close Firefox"

	' Set WshShell = WScript.CreateObject("WScript.Shell")
	' Command = mypath & "stopscript.bat"
	' WshShell.Run Command 
end if
' exit iMacros
i = iim1.iimClose
WScript.Quit(i)