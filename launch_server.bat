@echo off
@title MoopleDEV Server v83
set CLASSPATH=.;dist\*
java -Xmx300m -Dwzpath=wz\ -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd net.server.Server
pause