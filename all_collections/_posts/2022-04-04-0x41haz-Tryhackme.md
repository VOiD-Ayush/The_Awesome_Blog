---
layout: post
title: 0x41haz
date: 2022-04-04 10:18:00
categories: [Pwn, Tryhackme]
---
> VOiD XD

This is short writup for [0x41haz](https://tryhackme.com/room/0x41haz) (Simple Reversing Challenge) on [tryhackme](https://tryhackme.com)
Go check it out.

### Binary [0x41haz.0x41haz]
```bash
# first some basic file checks
file 0x41haz.0x41haz
0x41haz.0x41haz: ELF 64-bit MSB *unknown arch 0x3e00* (SYSV)

# Simple google search for "MSB *unknown arch 0x3e00* (SYSV)" returns this intresting blog.
https://pentester.blog/?p=247
We get to know that 6th byte tells about endianness changing it to 01 makes elf readable.

I used ghex to change 6th byte you can use any hex editor of your choice.

file 0x41haz.0x41haz
0x41haz.0x41haz: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=6c9f2e85b64d4f12b91136ffb8e4c038f1dc6dcd, for GNU/Linux 3.2.0, stripped
```
```bash
# running binary with dummy password 
┌──(void㉿kali)-[~/tryhackme/0x41haz]
└─$ ./0x41haz.0x41haz
=======================
Hey , Can You Crackme ?
=======================
Its jus a simple binary 

Tell Me the Password :
dummypass
Is it correct , I dont think so.

```

```bash
# decompiling binary using radare2

r2 0x41haz.0x41haz

[0x00001080]> aaa
[x] Analyze all flags starting with sym. and entry0 (aa)
[x] Analyze function calls (aac)
[x] Analyze len bytes of instructions for references (aar)
[x] Finding and parsing C++ vtables (avrr)
[x] Type matching analysis for all functions (aaft)
[x] Propagate noreturn information (aanr)
[x] Use -AA or aaaa t

[0x00001165]> pdf @ main
            ; DATA XREF from entry0 @ 0x109d
/ 219: int main (int argc, char **argv, char **envp);
|           ; var char *s @ rbp-0x40
|           ; var int64_t var_16h @ rbp-0x16
|           ; var int64_t var_eh @ rbp-0xe
|           ; var int64_t var_ah @ rbp-0xa
|           ; var size_t var_8h @ rbp-0x8
|           ; var int64_t var_4h @ rbp-0x4
|           0x00001165      55             push rbp
|           0x00001166      4889e5         mov rbp, rsp
|           0x00001169      4883ec40       sub rsp, 0x40
|           0x0000116d      48b832404032.  movabs rax, 0x6667243532404032 ; '2@@25$gf'
|           0x00001177      488945ea       mov qword [var_16h], rax
|           0x0000117b      c745f2735426.  mov dword [var_eh], 0x40265473 ; 'sT&@'
|           0x00001182      66c745f64c00   mov word [var_ah], 0x4c     ; 'L'
|           0x00001188      488d3d790e00.  lea rdi, str._nHey___Can_You_Crackme___n ; 0x2008 ; "=======================\nHey , Can You Crackme ?\n=======================" ; const char *s
|           0x0000118f      e89cfeffff     call sym.imp.puts           ; int puts(const char *s)
|           0x00001194      488d3db50e00.  lea rdi, str.Its_jus_a_simple_binary__n ; 0x2050 ; "It's jus a simple binary \n" ; const char *s
|           0x0000119b      e890feffff     call sym.imp.puts           ; int puts(const char *s)
|           0x000011a0      488d3dc40e00.  lea rdi, str.Tell_Me_the_Password_: ; 0x206b ; "Tell Me the Password :" ; const char *s
|           0x000011a7      e884feffff     call sym.imp.puts           ; int puts(const char *s)
|           0x000011ac      488d45c0       lea rax, [s]
|           0x000011b0      4889c7         mov rdi, rax                ; char *s
|           0x000011b3      b800000000     mov eax, 0
|           0x000011b8      e893feffff     call sym.imp.gets           ; char *gets(char *s)
|           0x000011bd      488d45c0       lea rax, [s]
|           0x000011c1      4889c7         mov rdi, rax                ; const char *s
|           0x000011c4      e877feffff     call sym.imp.strlen         ; size_t strlen(const char *s)
|           0x000011c9      8945f8         mov dword [var_8h], eax
|           0x000011cc      837df80d       cmp dword [var_8h], 0xd
|       ,=< 0x000011d0      7416           je 0x11e8
|       |   0x000011d2      488d3daf0e00.  lea rdi, str.Is_it_correct___I_dont_think_so. ; 0x2088 ; "Is it correct , I don't think so." ; const char *s
|       |   0x000011d9      e852feffff     call sym.imp.puts           ; int puts(const char *s)
|       |   0x000011de      bf00000000     mov edi, 0
|       |   0x000011e3      e878feffff     call sym.imp.exit
|       |   ; CODE XREF from main @ 0x11d0
|       `-> 0x000011e8      c745fc000000.  mov dword [var_4h], 0
|       ,=< 0x000011ef      eb34           jmp 0x1225
|       |   ; CODE XREF from main @ 0x122b
|      .--> 0x000011f1      8b45fc         mov eax, dword [var_4h]
|      :|   0x000011f4      4898           cdqe
|      :|   0x000011f6      0fb65405ea     movzx edx, byte [rbp + rax - 0x16]
|      :|   0x000011fb      8b45fc         mov eax, dword [var_4h]
|      :|   0x000011fe      4898           cdqe
|      :|   0x00001200      0fb64405c0     movzx eax, byte [rbp + rax - 0x40]
|      :|   0x00001205      38c2           cmp dl, al
|     ,===< 0x00001207      7506           jne 0x120f
|     |:|   0x00001209      8345fc01       add dword [var_4h], 1
|    ,====< 0x0000120d      eb16           jmp 0x1225
|    ||:|   ; CODE XREF from main @ 0x1207
|    |`---> 0x0000120f      488d3d940e00.  lea rdi, str.Nope           ; 0x20aa ; "Nope" ; const char *s
|    | :|   0x00001216      e815feffff     call sym.imp.puts           ; int puts(const char *s)
|    | :|   0x0000121b      bf00000000     mov edi, 0
|    | :|   0x00001220      e83bfeffff     call sym.imp.exit
|    | :|   ; CODE XREFS from main @ 0x11ef, 0x120d
|    `--`-> 0x00001225      8b45fc         mov eax, dword [var_4h]
|      :    0x00001228      3b45f8         cmp eax, dword [var_8h]
|      `==< 0x0000122b      7cc4           jl 0x11f1
|           0x0000122d      488d3d7b0e00.  lea rdi, str.Well_Done___   ; 0x20af ; "Well Done !!" ; const char *s
|           0x00001234      e8f7fdffff     call sym.imp.puts           ; int puts(const char *s)
|           0x00001239      b800000000     mov eax, 0
|           0x0000123e      c9             leave
\           0x0000123f      c3             ret

here we have to focus on three lines : 

|           0x000011c4      e877feffff     call sym.imp.strlen         ; size_t strlen(const char *s)
|           0x000011c9      8945f8         mov dword [var_8h], eax
|           0x000011cc      837df80d       cmp dword [var_8h], 0xd
|       ,=< 0x000011d0      7416           je 0x11e8

This checks if the string length is equal to 13

# Lets confirm our finding

┌──(void㉿kali)-[~/tryhackme/0x41haz]
└─$ ./0x41haz.0x41haz
=======================
Hey , Can You Crackme ?
=======================
Its jus a simple binary 

Tell Me the Password :
aaaaaaaaaaaaa
Nope

Further analysing : 
|           0x00001169      4883ec40       sub rsp, 0x40
|           0x0000116d      48b832404032.  movabs rax, 0x6667243532404032 ; '2@@25$gf'
|           0x00001177      488945ea       mov qword [var_16h], rax
|           0x0000117b      c745f2735426.  mov dword [var_eh], 0x40265473 ; 'sT&@'
|           0x00001182      66c745f64c00   mov word [var_ah], 0x4c     ; 'L'

As it is compared at the end string will be : 2@@25$gfsT&@L
Note : This was at the start of the main function so it was really easy to find password.
```

```bash
# Confirming out password
./0x41haz.0x41haz
=======================
Hey , Can You Crackme ?
=======================
Its jus a simple binary 

Tell Me the Password :
2@@25$gfsT&@L
Well Done !!
```

> Final flag : THM{Its easy find yourself}
            
Thank you thats all for today's challange!
