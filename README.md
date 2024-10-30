# SymboleoWeb
A web based IDE created for the symboleo language using monaco-languageclient. `Read the prerequisites` if this is your first time using this. If you want to contribute, first have a look at the [`developer documentation`](README_DEVELOPER.md).

# Try the tool online!
Open the link below `after whitelisting` and wait for your code editor to pop-up. To learn about the Symboleo specification language itself, [click here](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE)<br /><br />
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#snapshot/44bd8b4b-80fa-4106-955e-d8062a38e612)

# Features of SymboleoWeb
A Symboleo specification as seen in SymboleoWeb. <br /><br />
![SymboleoWeb-Editor (1)](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/8c787c47-e2b1-485e-b503-0696e83328a5)

In the above example, the contract specification contains an error in line 18, which is correctly highlighted as such. Furthermore, hovering over an error gives useful insights into how the error might be resolved. For example, in line 6, the editor suggests how to properly auto-complete a parameter type that starts with B (user-defined types are also suggested)

![SymboleoWeb-JS](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/297531db-820e-4c4a-afcc-ab21f44805bd)

Finally, as shown in above screenshot, once the server recognizes an error-free Symboleo specification, it automatically invokes Symboleo2SC to generate the corresponding smart contract code in JavaScript, including the different assets, roles, obligations, events, etc. The user can view (and even edit, although this is not recommended) the generated files directly in SymboleoWeb or (more likely) download them for direct deployment over the Hyperledger Fabric platform. Instructions to download generated code are given below.

# Prerequisites - Whitelist Gitpod for popups
   1. `Chrome`<br /><br />
       A. Settings -> Privacy and Security<br /><br />
       B. Click on Site Settings<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/e009594f-bcef-4017-a2a5-c460bf851c9f)
       C. Scroll down to pop-ups and redirects<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/84e9dcf8-414c-4e49-b2cc-9ebc2097b675)
       D. Scroll down to allowed to send pop-ups and use redirects<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/18afe763-b32a-4790-adfd-07a8c4c251cb)
       E. Add [*.]gitpod.io as your whitelist to allow popups from gitpod<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/b7c1866a-e2be-47ff-bfa1-9e2a1f088725)
  2. `Microsoft Edge`<br /><br />
       A. Settings -> Cookies and Site Permissions<br /><br />
       B. Scroll down and click on Pop-ups and redirects<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/b37ac99b-6817-4b83-824b-8e7721f43d82)
       C. Click on Add next to Allow<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/2b19f8d1-b3bc-49bc-84d2-acdb0b9682a3)
       D. Add [*.]gitpod.io in the website tab as shown below and click Add<br /><br />
       ![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/b8677724-78a3-44f3-8c71-616f68dd5c94)

`If you do not/cannot whitelist gitpod, after launching gitpod wait for terminal to pop - look for ports as shown below`<br /><br />
![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/641bf8df-2b5d-4b40-99f1-5aa9c3b6655e)
Once BOTH Ports are green as shown in picture, Click on the link next to PORT 3000

# Download generated JS files

1. When you enter **error free** code in Symboleo-Web IDE, a new `src-gen` folder is created in gitpod as shown below <br /> <br />
![image-22](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/defc4d57-a8da-4e3e-9b89-969e4be9c02f)

2. Right click and download <br /> <br />
![image-23](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/5fa2fe91-b6b6-49fd-a7d9-4bdf98212c1a)

3. File Explorer opens. Point to an **EMPTY FOLDER**. Pointing to a folder with files will not download the code. Click on select folder

4. Allow to view files
![image-24](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/a458d377-46a6-4669-b14c-1ed3cee5d4a2)

5. Save changes to your folder
![image-25](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/787c3927-a9e1-4932-a7c6-98581c10c286)

6. You have successfully downloaded the code generated by Symboleo-web
