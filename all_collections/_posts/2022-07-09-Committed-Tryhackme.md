---
layout: post
title: Committed
date: 2022-07-09 03:40:52
categories: [Git, Tryhackme]
---
> VOiD XD

This is short writup for an easy room [Committed](https://tryhackme.com/room/committed) (One of our developers accidentally committed some sensitive code to our GitHub repository. Well, at least, that is what they told us...) on [tryhackme](https://tryhackme.com)
Go check it out.


Checking the file type.
```bash
file commited.zip 
commited.zip: Zip archive data, at least v1.0 to extract, compression method=store
```
Unzipping the file

```bash
unzip commited.zip  
Archive:  commited.zip
   creating: commited/
   creating: commited/.git/
   creating: commited/.git/logs/
   creating: commited/.git/logs/refs/
   creating: commited/.git/logs/refs/heads/
  inflating: commited/.git/logs/refs/heads/dbint  
  inflating: commited/.git/logs/refs/heads/master  
  inflating: commited/.git/logs/HEAD  
   creating: commited/.git/refs/
   creating: commited/.git/refs/tags/
   creating: commited/.git/refs/heads/
 extracting: commited/.git/refs/heads/dbint  
 extracting: commited/.git/refs/heads/master  
   creating: commited/.git/info/
  inflating: commited/.git/info/exclude  
 extracting: commited/.git/COMMIT_EDITMSG  
   creating: commited/.git/objects/
   creating: commited/.git/objects/da/
 extracting: commited/.git/objects/da/b5a1b99756122e83df66ea1a86d81257b2ec47  
   creating: commited/.git/objects/dc/
 extracting: commited/.git/objects/dc/1ca4ca1d54e7a4ac6757c9b98bd1be0a8ed2f0  
   creating: commited/.git/objects/26/
 extracting: commited/.git/objects/26/bcf1aa99094bf2fb4c9685b528a55838698fbe  
   creating: commited/.git/objects/69/
 extracting: commited/.git/objects/69/d6211898e43bfe15ab5a4cad1690b9be1115f8  
   creating: commited/.git/objects/74/
 extracting: commited/.git/objects/74/2b40ee5d0597b0595f60998305605186ab29db  
   creating: commited/.git/objects/9e/
 extracting: commited/.git/objects/9e/cdc566de145f5c13da74673fa3432773692502  
   creating: commited/.git/objects/info/
   creating: commited/.git/objects/3a/
 extracting: commited/.git/objects/3a/8cc16f919b8ac43651d68dceacbb28ebb9b625  
   creating: commited/.git/objects/b0/
 extracting: commited/.git/objects/b0/eda7db60a1cb0aea86f053816a1bfb7e2d6c67  
   creating: commited/.git/objects/94/
 extracting: commited/.git/objects/94/a7ea670b13f698012abd246ab08b76d95643c8  
   creating: commited/.git/objects/28/
 extracting: commited/.git/objects/28/c36211be8187d4be04530e340206b856198a84  
   creating: commited/.git/objects/c7/
 extracting: commited/.git/objects/c7/18c75179d46ba5a1d21dc351a39c0dfb257d3d  
   creating: commited/.git/objects/08/
 extracting: commited/.git/objects/08/178a40f4b3585566b539985399f51bbcc7ae22  
   creating: commited/.git/objects/6e/
 extracting: commited/.git/objects/6e/1ea88319ae84175bfe953b7791ec695e1ca004  
   creating: commited/.git/objects/0b/
 extracting: commited/.git/objects/0b/8b1d537ea651d504d29c1556d7dcbcf76a5d57  
   creating: commited/.git/objects/pack/
   creating: commited/.git/objects/40/
 extracting: commited/.git/objects/40/754840a68f85ad8d963f1556a3f24b51cef4fa  
   creating: commited/.git/objects/16/
 extracting: commited/.git/objects/16/1979c948240de867b5c0a4079d7e2c7f6d4e04  
   creating: commited/.git/objects/c5/
 extracting: commited/.git/objects/c5/6c470a2a9dfb5cfbd54cd614a9fdb1644412b5  
   creating: commited/.git/objects/38/
 extracting: commited/.git/objects/38/0dd9b32cc8429638c09cc857cc0ef2ff8f8e50  
   creating: commited/.git/objects/df/
 extracting: commited/.git/objects/df/e24c9e9ae78d8339e44d0c9e32dde9b9efe148  
   creating: commited/.git/objects/45/
 extracting: commited/.git/objects/45/b137061d385e2f5c05cccc7fd13873f2ce18b1  
   creating: commited/.git/objects/0e/
 extracting: commited/.git/objects/0e/1d395f33767d795f3ff66ceac6c792629d40d2  
   creating: commited/.git/objects/b3/
 extracting: commited/.git/objects/b3/7056e8583abc13547fe146c7ee9d905ac8488c  
   creating: commited/.git/objects/44/
 extracting: commited/.git/objects/44/f3cb396ce178127b2dca6fa903113152710129  
 extracting: commited/.git/objects/44/7ef7f1f03534fbea17f61ef3c2e610fcf23693  
 extracting: commited/.git/objects/44/1daaaa600aef8021f273c8c66404d5283ed83e  
   creating: commited/.git/objects/54/
 extracting: commited/.git/objects/54/d0271a615735240d22dcd737b4bf26cbe9d43f  
   creating: commited/.git/objects/4e/
 extracting: commited/.git/objects/4e/ca752261f327712539fc04f81e7f335a69b429  
 extracting: commited/.git/objects/4e/16af9349ed8eaa4a29decd82a7f1f9886a32db  
   creating: commited/.git/objects/fd/
 extracting: commited/.git/objects/fd/132b91ad2a752dd39ce22bc1c55c0e5c38ab84  
  inflating: commited/.git/index     
   creating: commited/.git/hooks/
  inflating: commited/.git/hooks/fsmonitor-watchman.sample  
  inflating: commited/.git/hooks/pre-push.sample  
  inflating: commited/.git/hooks/pre-merge-commit.sample  
  inflating: commited/.git/hooks/pre-rebase.sample  
  inflating: commited/.git/hooks/post-update.sample  
  inflating: commited/.git/hooks/prepare-commit-msg.sample  
  inflating: commited/.git/hooks/update.sample  
  inflating: commited/.git/hooks/commit-msg.sample  
  inflating: commited/.git/hooks/applypatch-msg.sample  
  inflating: commited/.git/hooks/pre-applypatch.sample  
  inflating: commited/.git/hooks/pre-commit.sample  
  inflating: commited/.git/hooks/pre-receive.sample  
  inflating: commited/.git/config    
 extracting: commited/.git/HEAD      
   creating: commited/.git/branches/
  inflating: commited/.git/description  
  inflating: commited/main.py        
  inflating: commited/Readme.md  
```

Contents in the directory
```bash
ls -la                    
total 20
drwxrwxr-x 3 kali kali 4096 Feb 13 03:50 .
drwxr-xr-x 3 kali kali 4096 Jul  9 11:35 ..
drwxrwxr-x 8 kali kali 4096 Feb 13 03:50 .git
-rw-rw-r-- 1 kali kali  982 Feb 13 03:50 main.py
-rw-rw-r-- 1 kali kali  393 Feb 13 03:50 Readme.md
```

File contents :

#### Readme.md
```bash
# Commited 
---

## About the Project

Commited is our project created to manage our databases, Commited will bring help our database management team by simplfying database management by using our python scripts.

## Project Status

Completed.

## Team

Our development team consists of finest developers and we work simultaneously using our cool version control methodology. We are the BEST.

```

#### main.py
```py
cat main.py

import mysql.connector

def create_db():
    mydb = mysql.connector.connect(
    host="localhost",
    user="", # Username Goes Here
    password="" # Password Goes Here
    )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE DATABASE commited")


def create_tables():
    mydb = mysql.connector.connect(
    host="localhost",
    user="", #username Goes here
    password="", #password Goes here
    database="commited"
    )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")
    

def populate_tables():
    mydb = mysql.connector.connect(
    host="localhost",
    user="",
    password="",
    database="commited"
    )

    mycursor = mydb.cursor()

    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    val = ("John", "Highway 21")
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")


create_db()
create_tables()
populate_tables()
```

The above code is simple it just create a database named "commited" then create a table and insert values in it, nothing unusual here.

As it's a git directory we can check commit logs.

```bash
git log                                             
commit 28c36211be8187d4be04530e340206b856198a84 (HEAD -> master)
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:49:32 2022 -0800

    Finished

commit 9ecdc566de145f5c13da74673fa3432773692502
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:40:19 2022 -0800

    Database management features added.

commit 26bcf1aa99094bf2fb4c9685b528a55838698fbe
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:32:49 2022 -0800

    Create database logic added

commit b0eda7db60a1cb0aea86f053816a1bfb7e2d6c67
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:30:43 2022 -0800

    Connecting to db logic added

commit 441daaaa600aef8021f273c8c66404d5283ed83e
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:28:16 2022 -0800

    Initial Project.
```

Lets check the commits one by one.


```bash
git show 441daaaa600aef8021f273c8c66404d5283ed83e
commit 441daaaa600aef8021f273c8c66404d5283ed83e
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:28:16 2022 -0800

    Initial Project.

diff --git a/Readme.md b/Readme.md
new file mode 100644
index 0000000..69d6211
--- /dev/null
+++ b/Readme.md
@@ -0,0 +1,10 @@
+# Commited 
+---
+
+## About the Project
+
+Commited is our project created to manage our databases, Commited will bring help our database management team by simplfying database management by using our python scripts.
+
+## Team
+
+Our development team consists of finest developers and we work simultaneously using our cool version control methodology. We are the BEST.
diff --git a/main.py b/main.py
new file mode 100644
index 0000000..dfe24c9
--- /dev/null
+++ b/main.py
@@ -0,0 +1 @@
+print("Hello World\n")
```
It contains nothing except a `print("Hello World\n")`

```bash
git show b0eda7db60a1cb0aea86f053816a1bfb7e2d6c67
commit b0eda7db60a1cb0aea86f053816a1bfb7e2d6c67
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:30:43 2022 -0800

    Connecting to db logic added

diff --git a/main.py b/main.py
index dfe24c9..44f3cb3 100644
--- a/main.py
+++ b/main.py
@@ -1 +1,10 @@
-print("Hello World\n")
+import mysql.connector
+
+mydb = mysql.connector.connect(
+  host="localhost",
+  user="", # Username Goes Here
+  password="" # Password Goes Here
+)
+
+print(mydb)
+
```
Nothing important here too , just removed the hello world with mysql connect functionality.

```bash
git show 26bcf1aa99094bf2fb4c9685b528a55838698fbe
commit 26bcf1aa99094bf2fb4c9685b528a55838698fbe
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:32:49 2022 -0800

    Create database logic added

diff --git a/main.py b/main.py
index 44f3cb3..447ef7f 100644
--- a/main.py
+++ b/main.py
@@ -6,5 +6,8 @@ mydb = mysql.connector.connect(
   password="" # Password Goes Here
 )
 
-print(mydb)
+mycursor = mydb.cursor()
+
+mycursor.execute("CREATE DATABASE commited")
+
```
Same here database create functionality added.

```bash
git show 9ecdc566de145f5c13da74673fa3432773692502
commit 9ecdc566de145f5c13da74673fa3432773692502
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:40:19 2022 -0800

    Database management features added.

diff --git a/main.py b/main.py
index 447ef7f..161979c 100644
--- a/main.py
+++ b/main.py
@@ -1,13 +1,49 @@
 import mysql.connector
 
-mydb = mysql.connector.connect(
-  host="localhost",
-  user="", # Username Goes Here
-  password="" # Password Goes Here
-)
+def create_db():
+    mydb = mysql.connector.connect(
+    host="localhost",
+    user="", # Username Goes Here
+    password="" # Password Goes Here
+    )
 
-mycursor = mydb.cursor()
+    mycursor = mydb.cursor()
 
-mycursor.execute("CREATE DATABASE commited")
+    mycursor.execute("CREATE DATABASE commited")
 
 
+def create_tables():
+    mydb = mysql.connector.connect(
+    host="localhost",
+    user="", #username Goes here
+    password="", #password Goes here
+    database="commited"
+    )
+
+    mycursor = mydb.cursor()
+
+    mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")
+    
+
+def populate_tables():
+    mydb = mysql.connector.connect(
+    host="localhost",
+    user="",
+    password="",
+    database="commited"
+    )
+
+    mycursor = mydb.cursor()
+
+    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
+    val = ("John", "Highway 21")
+    mycursor.execute(sql, val)
+
+    mydb.commit()
+
+    print(mycursor.rowcount, "record inserted.")
+
+
+create_db()
+create_tables()
+populate_tables()
```
Nothing here too , just the table creation and poputating table with values.

```bash
git show 28c36211be8187d4be04530e340206b856198a84
commit 28c36211be8187d4be04530e340206b856198a84 (HEAD -> master)
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:49:32 2022 -0800

    Finished

diff --git a/Readme.md b/Readme.md
index 69d6211..0b8b1d5 100644
--- a/Readme.md
+++ b/Readme.md
@@ -5,6 +5,10 @@
 
 Commited is our project created to manage our databases, Commited will bring help our database management team by simplfying database management by using our python scripts.
 
+## Project Status
+
+Completed.
+
 ## Team
 
 Our development team consists of finest developers and we work simultaneously using our cool version control methodology. We are the BEST.
```
Creation of Readme.md

So we get nothing till now, so now what.
Lets check the other branches.
```bash
git branch     
  dbint
  list
* master
```

Here we have a dbint branch, it looks intresting, lets switch branch.
```bash
git switch dbint 
Switched to branch 'dbint'
```

Getting git commit logs again
```bash
git log                                          
commit 4e16af9349ed8eaa4a29decd82a7f1f9886a32db (HEAD -> dbint)
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:48:08 2022 -0800

    Reminder Added.

commit c56c470a2a9dfb5cfbd54cd614a9fdb1644412b5
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:46:39 2022 -0800

    Oops

commit 3a8cc16f919b8ac43651d68dceacbb28ebb9b625
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:45:14 2022 -0800

    DB check

commit 6e1ea88319ae84175bfe953b7791ec695e1ca004
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:43:34 2022 -0800

    Note added

commit 9ecdc566de145f5c13da74673fa3432773692502
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:40:19 2022 -0800

    Database management features added.

commit 26bcf1aa99094bf2fb4c9685b528a55838698fbe
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:32:49 2022 -0800

    Create database logic added

commit b0eda7db60a1cb0aea86f053816a1bfb7e2d6c67
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:30:43 2022 -0800

    Connecting to db logic added

commit 441daaaa600aef8021f273c8c66404d5283ed83e
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:28:16 2022 -0800

    Initial Project.

```

We can see some new commits here. Lets check them out one by one.

```bash
git show 6e1ea88319ae84175bfe953b7791ec695e1ca004
commit 6e1ea88319ae84175bfe953b7791ec695e1ca004
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:43:34 2022 -0800

    Note added

diff --git a/Note b/Note
new file mode 100644
index 0000000..4eca752
--- /dev/null
+++ b/Note
@@ -0,0 +1,3 @@
+# Branch DBint
+
+This branch is being used to test the code with the mysql server. 
diff --git a/Readme.md b/Readme.md
index 69d6211..4075484 100644
--- a/Readme.md
+++ b/Readme.md
@@ -8,3 +8,4 @@ Commited is our project created to manage our databases, Commited will bring hel
 ## Team
 
 Our development team consists of finest developers and we work simultaneously using our cool version control methodology. We are the BEST.
+

```
Nothing of intrest , lets move on.

```bash
git show 3a8cc16f919b8ac43651d68dceacbb28ebb9b625
commit 3a8cc16f919b8ac43651d68dceacbb28ebb9b625
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:45:14 2022 -0800

    DB check

diff --git a/main.py b/main.py
index 161979c..54d0271 100644
--- a/main.py
+++ b/main.py
@@ -3,8 +3,8 @@ import mysql.connector
 def create_db():
     mydb = mysql.connector.connect(
     host="localhost",
-    user="", # Username Goes Here
-    password="" # Password Goes Here
+    user="root", # Username Goes Here
+    password="flag{find_your_own_flag}" # Password Goes Here
     )
 
     mycursor = mydb.cursor()
@@ -15,8 +15,8 @@ def create_db():
 def create_tables():
     mydb = mysql.connector.connect(
     host="localhost",
-    user="", #username Goes here
-    password="", #password Goes here
+    user="root", #username Goes here
+    password="flag{find_your_own_flag}", #password Goes here
     database="commited"
     )
 
@@ -28,8 +28,8 @@ def create_tables():
 def populate_tables():
     mydb = mysql.connector.connect(
     host="localhost",
-    user="",
-    password="",
+    user="root",
+    password="flag{find_your_own_flag}",
     database="commited"
     )
```
Bingo we got our flag.
But lets check the last log.

```bash
git show 4e16af9349ed8eaa4a29decd82a7f1f9886a32db
commit 4e16af9349ed8eaa4a29decd82a7f1f9886a32db (HEAD -> dbint)
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:48:08 2022 -0800

    Reminder Added.

diff --git a/Note b/Note
index 4eca752..fd132b9 100644
--- a/Note
+++ b/Note
@@ -1,3 +1,7 @@
 # Branch DBint
 
-This branch is being used to test the code with the mysql server. 
+This branch is being used to test the code with the mysql server.
+
+## Reminder
+
+Please don't hardcode password, use enviroment variables where possible. 
```

lets see what was in the third branch

```bash
git switch list                                     
Switched to branch 'list'

git log        
commit 28c36211be8187d4be04530e340206b856198a84 (HEAD -> list, master)
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:49:32 2022 -0800

    Finished

commit 9ecdc566de145f5c13da74673fa3432773692502
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:40:19 2022 -0800

    Database management features added.

commit 26bcf1aa99094bf2fb4c9685b528a55838698fbe
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:32:49 2022 -0800

    Create database logic added

commit b0eda7db60a1cb0aea86f053816a1bfb7e2d6c67
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:30:43 2022 -0800

    Connecting to db logic added

commit 441daaaa600aef8021f273c8c66404d5283ed83e
Author: fumenoid <fumenoid@gmail.com>
Date:   Sun Feb 13 00:28:16 2022 -0800

    Initial Project.

```

All the same.

Moral of the story, never hardcode passwords and commit it.
That all for this writeup.