---
layout: post
title: Dig Dug
date: 2022-05-14 06:58:00
categories: [DNS, Tryhackme]
---

This is short writup for [Dig Dug](https://tryhackme.com/room/digdug) (Turns out this machine is a DNS server - it's time to get your shovels out!) on [Tryhackme](https://tryhackme.com)
Go check it out.

> Target IP : 10.10.141.105

### Challenge Discription

Oooh, turns out, this `10.10.141.105` machine is also a DNS server! If we could `dig` into it, I am sure we could find some interesting records! But... it seems weird, this only responds to a special type of request for a `givemetheflag.com` domain?


### Enumeration

Rustscan and nmap did not give anything interesting in particular just a ssh port open.

As the challenge suggest we have to use `dig` (linux command) more info [here](https://linux.die.net/man/1/dig).

```bash
whatis dig
dig (1)              - DNS lookup utility

# manual gives a important syntax

Simple Usage

A typical invocation of dig looks like:

    dig @server name type

where:

server
    is the name or IP address of the name server to query. This can be an IPv4 address in dotted-decimal notation or an IPv6 address in colon-delimited notation. When the supplied server argument is a hostname, dig resolves that name before querying that name server. If no server argument is provided, dig consults /etc/resolv.conf and queries the name servers listed there. The reply from the name server that responds is displayed. 
name
    is the name of the resource record that is to be looked up. 
type
    indicates what type of query is required - ANY, A, MX, SIG, etc. type can be any valid query type. If no type argument is supplied, dig will perform a lookup for an A record. 
```

### Getting our flag
```bash
dig @10.10.141.105 givemetheflag.com

; <<>> DiG 9.18.0-2-Debian <<>> @10.10.141.105 givemetheflag.com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 94
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;givemetheflag.com.		IN	A

;; ANSWER SECTION:
givemetheflag.com.	0	IN	TXT	"flag{get your own flag}"

;; Query time: 204 msec
;; SERVER: 10.10.141.105#53(10.10.141.105) (UDP)
;; WHEN: Sat May 14 02:56:26 EDT 2022
;; MSG SIZE  rcvd: 86

```

Thats all for this challenge.