const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec, execSync  } = require("child_process");

const {appRootContent} = require('./appRootContent');
const {apiRequestContent} = require('./apiRequestContent');
const {headerContent}= require('./headerContent');
const {footerContent}= require('./footerContent');
const { localStorageUtilContent }= require('./localStorageUtilsContent');
const {menuContent} = require('./menuContent');
const {useMobileHookContent} = require('./useMobileHookContent');
const {colorsContent} = require('./colorsContent');
const {homeContent} = require('./homeContent');
const { userContextContent } = require("./userContextContent");
const { serverMsgContent } = require("./serverMsgContextContent");
const { serverMsgEnumContent } = require("./serverMsg.enum");
const {authApiContent} = require('./authApiContent');
const { loginDtoContent } = require("./loginDtoContent");
const { screenWrapperContent } = require("./screenWrapperContent");


const root = process.cwd();

const dir_components = `components`
const dir_utils = `utils`
const dir_pages = `pages`
const dir_api = `api`
const dir_dto = `dto`
const dir_context = `context`
const dir_enum = `enum`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function create_react_app_TS_template(projectName) {
  try {
    return new Promise(async(resolve, reject)=>{
      
      await createReactApp(projectName);
  
      await installNPM(projectName);
      
      await installLibraries(projectName);
  
      resolve()
    })

  } catch (error) {
    console.log({ error });
  }
}

const createReactApp = async (projectName) => {
  return new Promise((resolve, reject) => {
    console.log("react application starts created");

    const command = `npx create-react-app ${projectName} --template typescript`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error creating React project: ${stderr}, ${error}`);
      } else {
        console.log(`React project '${projectName}' created successfully.`);
        console.log(`stdout: ${stdout}`);
        console.error(`stderr react app: ${stderr}`);
        resolve()
      }
    })
  })
}


const installNPM = async (projectName) => {
  return new Promise((resolve, reject) => {
    console.log("installing all npm libraries");

    const projectPath = path.join(process.cwd(), projectName);
    const installCommand = `npm install @mui/styles @mui/material @mui/icons-material @emotion/styled @types/react-router-dom axios react-router-dom`;

    console.log(`path to install :${projectPath}`);

    exec(installCommand, { cwd: projectPath }, (error, stdout, stderr) => {
      
      try {
          console.log(`Dependencies installed successfully.`);
          console.log(`stdout: ${stdout}`);
          console.error(`stderr npm install: ${stderr}`);
          resolve();
      } catch (e) {
        reject(`Error installing dependencies for frontend: ${error}, ${e}`);
      }
      
    });
  });
};

// const downgradeReactVersion = ()

const installLibraries = async (projectName) => {

  return new Promise((resolve, reject)=>{
    
      const projectPath = path.join(process.cwd(), projectName);
      const installCommand = `npm install @types/react @types/react-dom --save-dev`;
    
      exec(installCommand, { cwd: projectPath }, (error, stdout, stderr) => {
          console.log({stderr})
        if (stderr) {
          // reject(`Error installing dev-dependencies for frontend: ${error}, ${error}`);
          resolve();
        } else {
          console.log(`Dependencies installed successfully.`);
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve();
        }}
    
      );
  })
};


const init_server = () => {
  return new Promise((resolve, reject)=>{
    
    exec(`npm init --yes`, (error, stdout, stderr) => {


      if(error){
        reject(`Couldn't init new package.json for server: ${error}, ${error}`);
      }else {
        console.log(`init package.json for server`);
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      }

    })

  })
}

const init_server_libraries = async (DB) => {
  return new Promise((resolve, reject) => {
    console.log("installing npm libraries");

    const DB_package = DB === "m" ? `mongoose` : `mysql2`

    const installCommand = `npm install express body-parser cors dotenv ${DB_package}`;

    exec(installCommand, (error, stdout, stderr) => {
    
      
      if (stderr) {
        reject(`Error installing dependencies for server: ${error}, ${error}`);
      } else {
        console.log(`Dependencies installed successfully.`);
        console.log(`stdout: ${stdout}`);
        console.error(`stderr npm install: ${stderr}`);
        resolve();
      }


    });

  });
};

const install_dev_server_depnedencies = () => {
  return new Promise((resolve, reject)=>{
    
    const installCommand = `npm install nodemon --save-dev`;
  
    exec(installCommand, (error, stdout, stderr) => {
        
      if (stderr) {
        reject(`Error installing dev-dependencies for server: ${error}, ${error}`);
      } else {
        console.log(`Dependencies installed successfully.`);
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      }}
  
    );


  })
}
//nodemon
const config_server_package_json = async() => {
  return new Promise((resolve, reject)=>{
    const packageJsonPath = path.join(root, "package.json");

    const newScripts = {
      "start": "node server.js",
      "dev": "nodemon index.js",
      "build": "npm install",
      "test": "echo \"Error: no test specified\" && exit 1"
    };

    fs.readFile(packageJsonPath, "utf8", (err, data) => {
      if (err) {
        console.error("❌ Error reading package.json:", err);
        return;
      }
  
      try {
        // Parse JSON and update scripts
        const packageJson = JSON.parse(data);
        packageJson.scripts = { ...packageJson.scripts, ...newScripts };
  
        // Write updated package.json
        fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8", (writeErr) => {
          if (writeErr) {
            console.error("❌ Error writing package.json:", writeErr);
            return;
          }
  
           console.log("✅ Scripts updated successfully!");
           resolve()
          });
      } catch (parseError) {
        console.error("❌ Error parsing package.json:", parseError);
      }

    });
  });
}

const create_server = async(DB, userAuth) => {
console.log(`💻 creating server...`)

  const serverContent = `const express = require("express");
${DB === 'm' ? `const mongoose = require("mongoose");` : ""}
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
${DB === 'm' ? `mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));`: `const pool = mysql.createConnection({
    host: process.env.HOST || '',
    user: process.env.DATABASE_USER_NAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    port: 3307
})`} 

${userAuth ? `
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);` : ""}

// Start server
app.listen(port, () => {
  console.log('Server running on port: port');
});`;

  // Create server.js
  const serverPath = path.join(root, "server.js");
  await fs.promises.writeFile(serverPath, serverContent);
  console.log("📄 server.js created.");

}


const setup_directories = async(projectName, auth) => {
  return new Promise(async(resolve, reject) =>{
    const src_path = `${root}/${projectName}/src`;
    const componentsDirPath = path.join(src_path, dir_components);

    //Create components directory
    await fs.promises.mkdir(componentsDirPath, { recursive: true });
    console.log(`📁 /${dir_components} directory created.`);

    const utilsDirPath = path.join(src_path, dir_utils);

    //Create Utils directory
    await fs.promises.mkdir(utilsDirPath, { recursive: true });
    console.log(`📁 /${dir_utils} directory created.`);

    const pagesDirPath = path.join(src_path, dir_pages);
    
    //Create Pages directory
    await fs.promises.mkdir(pagesDirPath, { recursive: true });
    console.log(`📁 /${dir_pages} directory created.`);
    
    const apiDirPath = path.join(src_path, dir_api);
    
    //Create api folder
    await fs.promises.mkdir(apiDirPath, { recursive: true });
    console.log(`📁 /${dir_api} directory created.`);

    const dtoDirPath = path.join(`${src_path}/api`, dir_dto);
    
    //Create api/dto folder
    await fs.promises.mkdir(dtoDirPath, { recursive: true });
    console.log(`📁 /${dir_dto} directory created.`);
    
    const enumDirPath = path.join(src_path, dir_enum);
    //Create enum folder
    await fs.promises.mkdir(enumDirPath, { recursive: true });
    console.log(`📁 /${dir_enum} directory created.`);
      
    if(auth){
      const rootDirPath = path.join(src_path, dir_context);
      //Create context folder
      await fs.promises.mkdir(rootDirPath, { recursive: true });
      console.log(`📁 /${dir_context} directory created.`);
    }

    resolve()
  })
}

const setup_frontend_files = (projectName, auth)  => {
  const src_path = `${root}/${projectName}/src`;

  const projectPath = path.join(root, `${projectName}/src`);
  const components = path.join(src_path, dir_components);
  const pages = path.join(src_path, dir_pages);
  const api = path.join(src_path, dir_api);
  const dto = path.join(`${src_path}/${dir_api}`, dir_dto);
  const context = path.join(src_path, dir_context);
 
  return new Promise(async(resolve, reject)=>{
   
    //Modify App.tsx
    const appPath = path.join(projectPath, "App.tsx");
    await fs.promises.writeFile(appPath, appRootContent(auth));
    console.log("📄 App.tsx created.");
    
    if(auth){
      const authPath = path.join(api, "auth.ts");
      await fs.promises.writeFile(authPath, authApiContent);
      console.log("📄 api/auth.ts created.");

      const loginDtoPath = path.join(dto, "Login.dto.ts");
      await fs.promises.writeFile(loginDtoPath, loginDtoContent);
      console.log("📄 api/dto/Login.dto.ts created.");
    }

    const homeComponentPath = path.join(`${pages}`, "Home.tsx");
    //Create Home.tsx component
    await fs.promises.writeFile(homeComponentPath, homeContent);
    console.log("📄 Home.tsx created.");

    const footerComponentPath = path.join(`${components}`, "Footer.tsx");
    //Create Footer.tsx component
    await fs.promises.writeFile(footerComponentPath, footerContent);
    console.log("📄 Footer.tsx created.");

    const headerComponentPath = path.join(components, "Header.tsx");
    //Create Header.tsx component
    await fs.promises.writeFile(headerComponentPath, headerContent(auth));
    console.log("📄 Header.tsx created.");

    const MenuComponentPath = path.join(components, "Menu.tsx");
    //Create Menu.tsx component
    await fs.promises.writeFile(MenuComponentPath, menuContent);
    console.log("📄 Menu.tsx created.");

    const baseUrlContent = `export default 'http://localhost:3001/api';`

    const BaseUrlPath = path.join(api, "base-url.ts");
    //Create Menu.tsx component
    await fs.promises.writeFile(BaseUrlPath, baseUrlContent);
    console.log("📄 base-url.ts created.");
    
    const apiRequestPath = path.join(api, "api-req.ts")
    //Create api-req.ts
    await fs.promises.writeFile(apiRequestPath, apiRequestContent);
    console.log("📄 api-req.ts created.");
    
    const serverMsgPath = path.join(context, "AppServerMsg.ts")
    //Create AppUserContext.tsx
    await fs.promises.writeFile(serverMsgPath, serverMsgContent);
    console.log("📄 AppUserContext.tsx created.");
    
    const serverMsgEnumPath = path.join(context, "Toast.enum.ts")
    //Create Toast.enum.ts
    await fs.promises.writeFile(serverMsgEnumPath, serverMsgEnumContent);
    console.log("📄 AppUserContext.tsx created.");
   
    const screenSrapperPath = path.join(components, "ScreenWrapper.tsx")
    //Create ScreenWrapper.tsx
    await fs.promises.writeFile(screenSrapperPath, screenWrapperContent);
    console.log("📄 ScreenWrapper.tsx created.");
    
    if(auth){
      const userContextPath = path.join(context, "AppUserContext.tsx")
      //Create userContext.tsx
      await fs.promises.writeFile(userContextPath, userContextContent);
      console.log("📄 userContext.tsx created.");
    }

    resolve()
  })
}

const setup_frontend_utils_functions = async(projectName) =>{
  const utils = path.join(`${root}/${projectName}/src`, dir_utils);

  return new Promise(async(resolve, reject)=>{
    
    const useMobileHookPath = path.join(utils, "useMobile.ts");
    //Create useMobileHome.ts hook
    await fs.promises.writeFile(useMobileHookPath, useMobileHookContent);
    console.log("📄 useMobile.ts created.");
    
    const localStoragePath = path.join(utils, "localStorage.js");
    //Create localStorage.js utile
    await fs.promises.writeFile(localStoragePath, localStorageUtilContent);
    console.log("📄 localStorage.js created.");

    const colorsPath = path.join(utils, "colors.js");
    //Create colors.js utile
    await fs.promises.writeFile(colorsPath, colorsContent);
    console.log("📄 colors.js created.");


    resolve()
  })
}

const insert_style_sheets = async(projectPath) => {
  return new Promise(async(resolve, reject)=>{

const css_content = `body {
  background-color: #F1EAE2;
}

.banner {
  text-align: center;
  font-size: 2rem;

}

*::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 100px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border-left: 0;
  border-right: 0;
  background-color: #244545;
}

.menu-btn {
  right: 0;
  position: absolute;
  margin: 10px;
  width: 45px !important;
  height: 45px !important;
  color: black;
}

.menu-btn:hover {
  color: black;
}

.screen {
  overflow-y: scroll;
  overflow-x: hidden;
}

.title {
  height: 96px;
  font-size: 42px;
  align-items: center;
  display: flex;
  background-color: white;

  justify-content: space-between;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgb(254, 205, 165);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.popup-modal {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: slideIn;
  animation-duration: 0.5s;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
};`

    //Modify App.css
    const appPath = path.join(projectPath, "App.css");
    await fs.promises.writeFile(appPath, css_content);
    console.log("📄 App.css replaced.");

    resolve()
  })
}

const zipFilesWindows = async(sourcePaths, destinationZip) => {
  return new Promise(async(resolve, reject)=> {

    try{
      let zipCommand = `powershell Compress-Archive -Path `;
      
      sourcePaths.forEach(sourcePath => {
          zipCommand += `"${sourcePath}",`;
      });
      zipCommand = zipCommand.slice(0,-1);
      zipCommand += ` -DestinationPath "${destinationZip}"`;

      execSync(zipCommand, { stdio: 'inherit' });
      console.log(`Successfully zipped files to: ${destinationZip}`);

      for (const filePath of sourcePaths) {
        try {
          const fullPath = path.resolve(filePath);
         console.log({fullPath})
          await fs.promises.rm(fullPath);
          console.log(`Removed: ${fullPath}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`File not found: ${filePath}`);
          } else {
            console.error(`Error removing ${filePath}:`, err);
          }
        }
      }

      resolve()
  } catch (error) {
      console.error(`Error zipping files: ${error}`);
  }
  
  })
  
}
const sourceFilesWindows = [
  path.join(root, `./appRootComponent.js`),
  path.join(root, './apiRequestContent.js'),
  path.join(root, './headerContent.js'),
  path.join(root, './footerContent.js'),
  path.join(root, './localStorageUtilsContent.js'),
  path.join(root, './menuContent.js'),
  path.join(root, './useMobileHookContent.js'),
  path.join(root, './colorsContent.js'),
  path.join(root, './homeContent.js'),
  
  path.join(root, './authApiContent.js'),
  path.join(root, './loginDtoContent.js'),
  path.join(root, './screenWrapperContent.js'),
  path.join(root, './serverMsg.enum.js'),
  path.join(root, './serverMsgContextContent.js'),
  path.join(root, './userContextContent.js'),
];

const destinationZipWindows = 'helpers-files.zip';

rl.question(`project name:`, async answer => {
  const projectName = answer.trim().toLowerCase();
  if (projectName) {
   
    await create_react_app_TS_template(projectName);


    rl.question(`Do you want to setup server side? (Y/n):`,  async(answer)=>{
      let DB = ''
      let userAuth = true
    
      const userInput = answer.trim().toLowerCase() || "y";
    
      if(userInput === 'y'){
    
        rl.question(`Do you want to use Mongo or Sql, type "m" for Mongo an "s" for sql? (m/s):`, async(answer) => {
    
          const dbAnswer = answer.trim().toLowerCase() || "m";
    
          DB = dbAnswer
    
          rl.question(`Is this application should include USER AUTHENTICATION? (Y/n):`, async(answer) =>{
    
            const userAuthAnswer = answer.trim().toLowerCase() || "n";
           
            if(userAuthAnswer === 'n') userAuth = false
    

            await init_server()
    
            await init_server_libraries(DB)
    
            await install_dev_server_depnedencies()
            
            await config_server_package_json()
    
            await create_server(DB, userAuth)



            rl.question(`Continue with prontend side?: (Y/n)`, 
            
            async(answer) =>{
            
            const userInput = answer.trim().toLowerCase(); 

            if(userInput === "y"){

            const projectPath = path.join(root, `${projectName}/src`);

              await setup_directories(projectName, userAuth)

              await setup_frontend_files(projectName, userAuth)

              await insert_style_sheets(projectPath)

              await setup_frontend_utils_functions(projectName)

              await zipFilesWindows(sourceFilesWindows, destinationZipWindows)


              exec(`npm start`, {cwd: `${root}/${projectName}`}, (error, stdout, stderr) => {
                
                console.log('react app is running on port 3000...')

                if (error) {
                  reject(`Error creating React project: ${stderr}, ${error}`);
                } else {
                  console.log(`React apllication is running.`);
                  console.log(`stdout: ${stdout}`);
                  console.error(`stderr react app: ${stderr}`);
                  
                }
              })
            }
          }
          ) 
    
          })
    
        })
        
    
      }else{
        rl.close()
      }
      
    })



  } else {
    console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
    rl.close();
  }
});








