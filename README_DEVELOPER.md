# Symboleo-web

Follow this documentation if you would like to package your existing Symboleo eclipse IDE to work as a browser IDE

For a video Walkthrough (OS in video is MACOS)

1. [Video 1](https://uottawa-my.sharepoint.com/personal/salfu014_uottawa_ca/_layouts/15/guestaccess.aspx?share=EX9p_QTCi5pIieRkfS-pWHwBLZQKcXYTYf2ROVHXTt9y5w&referrer=Teams.TEAMS-ELECTRON&referrerScenario=MeetingChicletGetLink.view.view) - Setting up the new workspace
2. [Video 2](https://uottawa-my.sharepoint.com/personal/salfu014_uottawa_ca/_layouts/15/guestaccess.aspx?share=EcRybpTsdG9BoDKeQDIrjVMBF8prdcfmnp-QbkbrQm4geg&referrer=Teams.TEAMS-ELECTRON&referrerScenario=MeetingChicletGetLink.view.view) - Setting up maven
3. [Video 3](https://uottawa-my.sharepoint.com/personal/salfu014_uottawa_ca/_layouts/15/guestaccess.aspx?share=EaSxd69UiRtMnWQnz0v3w6sB7a5hb9mAlUTRkebqHPdykw&referrer=Teams.TEAMS-ELECTRON&referrerScenario=MeetingChicletGetLink.view.view) - Building the jar file and hosting the jar

# Prerequisities

1. Install [Java SE 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or higher for your OS

2. Install Maven - [Windows](https://phoenixnap.com/kb/install-maven-windows) or [MACOS](https://www.digitalocean.com/community/tutorials/install-maven-mac-os)

# Procedure

1. Create a brand new Project in a new workspace. <br /> <br />
![image-2](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/26ea2931-b0c3-4317-815f-89c78acffe80)

2. Click on Xtext Project as shown below <br /> <br />
![image-3](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/aa5a9034-9d6f-4d21-ade8-0dc88f077c7a)

3. Edit the name and Language as in the picture below. Click next <br /> <br />
![image-4](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/536f15de-53cc-4194-8078-014f5fae3be8)

4. Set the project configuration as shown in screenshot below <br /> <br />
![image-1](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/0dc306ad-95bf-4337-b636-2b1ec5e61475)

5. You now have a brand new XText Project  <br /> <br />
![image-5](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/6cd65d43-3db8-4714-ad15-07b631d851ce)

6. Replace the contents of `ca.uottawa.csmlab.symboleo` folder with code from [main repo](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master/ca.uottawa.csmlab.symboleo)

7. Replace the contents of `ca.uottawa.csmlab.symboleo.tests` folder with code from [main repo](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master/ca.uottawa.csmlab.symboleo.tests)

8. Add the folders [ca.uottawa.csmlab.symboleo.ui](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master/ca.uottawa.csmlab.symboleo.ui) and [ca.uottawa.csmlab.symboleo.ui.tests](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master/ca.uottawa.csmlab.symboleo.ui.tests) from [main repo](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master)

9. Close Eclipse and reopen the workspace

10. After this your folder structure should look like below screenshot <br /> <br />
![image-6](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/1ff583cc-b292-48d5-ae13-27dd97d74938)

11. Replace the contents of `ca.uottawa.csmlab.symboleo.ide` folder with code from [symboleo-web-backend repo](https://github.com/Smart-Contract-Modelling-uOttawa/symboleo-web-backend/tree/master/ca.uottawa.csmlab.symboleo.ide)

12. In the `Package Explorer` panel, right click on the `Symboleo.xtext` file under `ca.uottawa.csmlab.symboleo\src\ca\uottawa\csmlab\symboleo` directory, then click on `Run as` > `Generate Xtext Artifacts` <br /> <br />
![alt text](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/blob/master/images/p1.png "Generate Xtext Artifacts")

13. Wait for the process to finish, you should see the `Done` message in the Eclipse console

14. Open up command prompt and run `mvn -v`. If you have a command not found error, go back to prerequisites and install maven

15. Navigate to `ca.uottawa.csmlab.symboleo.parent` in the command prompt

16. Run the command `mvn clean install -DskipTests` and wait.

17. If you have **Error in Step 16** like below screenshot, visit prerequisites and install Java SE 17 <br /> <br />
![image-7](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/040fa58c-e764-4054-b422-0a426d1e1421)

18. If you were successful, you will see a message as shown below  <br /> <br />
![image-8](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/99069f79-7198-41f3-bf8b-525c3c1aa69a)

19. Navigate to `ca.uottawa.csmlab.symboleo.ide` and open the target folder. 

20. You will see 2 jar files like below. The larger file **(ends with -ls)** is the jar file you require.  <br /> <br />
![image-10](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/e78ed53c-e98a-4dd3-9694-db121dd77106)

21. To test if the jar was constructed successfully, you can run the jar file. Follow the steps below to run jar file.

    A. Open command prompt. Navigate to `ca.uottawa.csmlab.symboleo.ide\target` 

    B. Run command `java -jar ca.uottawa.csmlab.symboleo.ide-1.0.0-SNAPSHOT-ls.jar`

    C. Your output should look similar to below screenshot <br /> <br />
    ![image-11](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/761d0fe3-95bd-46a5-a07f-a0a6de003186)

22. If you can see output as mentioned in `Step 21.C`, you have successfully created a jar file that can be used for the browser IDE

# Hosting the create jar

1. Replace the jar file in [Symboleo-web repo](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web) with the jar file you created. Commit your changes to the repo.

2. Ensure you whitelisted gitpod as mentioned in repo [README.md](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/blob/main/README.md)

3. Log in to [gitpod.io](https://www.gitpod.io/) using github <br /> <br />
![image-12](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/ad55c098-f627-4df5-9b21-80f649dc50ce)

4. Click on new repository <br /> <br />
![image-13](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/385fd0de-99bb-4778-91e7-f630bc2e9642)

5. Add the repository link as shown below`https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web` <br /> <br />
![image-14](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/e15d2733-b47e-46f1-8a10-c3f583fc44d9)

6. Keep the default settings and click continue

7. Wait until you get a pop-up of your symboleo-ide. If you do not get a pop-up ensure you whitelisted gitpod as mentioned in `Step 2`

8. If you whitelisted you will get your IDE as shown below <br /> <br />
![image-20](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/62669bb6-e6a2-4029-9c5e-65484233fc1c)

# Sharing this new workspace

1. Once you launch the Symboleo IDE, go back to gitpod

2. Click on Hamburger menu on top-left then click on `Gitpod: Share workspace snapshot` as shown below  <br /> <br />
![image-21](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/249f8493-0e33-40d2-8d5f-87c282cf623a)

3. You will get a notification on the bottom-right as shown below. Wait till it finishes capturing <br /> <br />
![image-17](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/4c990151-2b5c-4a17-9a9d-897ea63db780)

4. Once it has loaded, you will get notification on the bottom-right as shown below. Click on `Copy URL to clipboard` to copy the link which you can share with others <br /> <br />
![image-18](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/8c7b5a94-6508-4f55-9b0c-4aed383eafe7)

5. The link has been copied to your clipboard. You have successfully created a snapshot of the new hosted jar. Share it!

6. Replace the gitpod link in [README.md](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/blob/main/README.md) to ensure users can access this newly hosted IDE. (Highlighted in below screenshot)
![image](https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-web/assets/41239586/1a25de28-b2a7-45f9-ab6a-daff3276b86a)

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
