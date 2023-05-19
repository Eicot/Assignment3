<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
<summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-introduction">Project Introduction</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#data-source">Data Source</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#data-preparation-and-loading">Data Preparation and Loading</a></li>
        <li><a href="#setting-up-front-end">Setting Up Front-End</a></li>
        <li><a href="#setting-up-back-end">Setting Up Back-End</a></li>
      </ul>
    </li>
    <li>
      <a href="#crud-for-front-end-and-back-end">CRUD for Front-End and Back-End</a>
      <ul>
        <li><a href="#front-end-crud-setup">Front-End CRUD Setup</a></li>
        <li><a href="#back-end-crud-setup">Back-End CRUD Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-setup">Project Setup</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## Project Introduction

[Web Page Link](https://assignment2frontend.eicot.repl.co/toMain) </br>
The MOTO Land website is created for motorcycle enthusiasts to provide valuable information of various motorcycles. With so many different models and types of motorcycles available, it can be overwhelming for someone who is looking to purchase one. </br>
With the website that offers detailed and honest reviews of various motorcycles can help consumers make informed decisions about which model is right for them. Additionally, motorcycle enthusiasts often enjoy reading reviews to learn about the latest trends and features in the industry. </br>
The website can also be a great platform for connecting with like-minded individuals and building a community of motorcycle enthusiasts. By sharing your experiences and knowledge about different models, you can help others make informed decisions and foster a sense of camaraderie within the motorcycle community. </br>
Overall, creating this MOTO Land website for motorcycle reviews can be a rewarding and valuable endeavor for both the creator and the users who benefit from the information provided.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

The technologies below are used to create the MOTO Land Web;
* [Vue.js][vuejs-url]
* [MongDB][mongodb-url]
* [Express.js][Expressjs-url]
* [Axios][Axios-url]
* [Bootstrap][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Data Source

* Motorcycle Specifications Dataset from 1894 to present day. This data set is available at [Kaggle(Motorcycle Specifications Dataset)](https://www.kaggle.com/datasets/emmanuelfwerr/motorcycle-technical-specifications-19702022).


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

<!-- Data Preparation and Loading -->
### Data Preparation and Loading

* Data downloaed from Kaggle.com are availabe in csv format and filtered to 20 samples for this project.
* The sample data is uploaded to MongoDB Compass to reflect in MongoDB. MongoDB Compass can be downloaded [here](https://www.mongodb.com/try/download/shell).
    

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Setting Up Front-End -->
### Setting Up Front-End

The front-end is mainly implemented by using Vuejs, JavaScript framework for building interactrive user interface. Axios, the JavaScript library is also used for making HTTP requests from a back-end server and HTML, CSS and Bootstrap are used to create responsive and attractive user interface designs. </br>

Following setups for reference:

#### Setup for Vue
```
npm install -g @vue/cli
```
```
vue create .
```

   * Create project in current directory? Y
   * Please pick a preset. Vue3
   * Pick the package manager to use when installing dependencies: Use yarn
   
##### Create a file named vue.config.js and paste in the following lines:
```
module.exports = {
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    client: {
      webSocketURL: {
        port: process.env.GITPOD_WORKSPACE_ID ? 443 : undefined,
      },
    },
}}
![image](https://user-images.githubusercontent.com/108671817/226876898-db85c373-6eb9-495c-bda7-87a86e868e98.png)

```

#### Installing Bootstrap
```
yarn add bootstrap
```
```
yarn add bootstrap-vue
```
```
yarn add vue3-bootstrap5
```
##### Following codes to be added in main.js under src folder
```
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
```

#### Installing Axios
```
yarn add axios
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Setting Up Back-End -->
### Setting Up Back-End
The separate github repository is created to setup back-end server to connect to MongoDB server. </br>
Following setups for reference:
```
npm install express
```
```
npm install cors
```
```
npm install mongodb
```
##### Create a file named .env and paste in the following lines (to change usernamne and password accordingly):
```
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.tgaopw0.mongodb.net
```
##### Following codes to be added in index.js
```
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CRUD for Front-End and Back-End -->
## CRUD for Front-End and Back-End
CRUD stands for Create, Read, Update, and Delete, which are the basic functions required for managing data in a website or a server:
- Create: The create function enables users to add new data to server through webpage

- Read: The read function allows users to access and view data that has already been created.

- Update: The update function allows users to modify existing data.

- Delete: The delete function enables users to remove data from a server.

<!-- Front-End CRUD Setup -->
### Front-End CRUD Setup
  1. Create Data to Server from Front-End using axios.post
  ```sh
  methods: {
    processAdd: async function () {
        await axios.post(API_URL + "/specification", {
          Brand: this.Brand,
          CoolingSystem: this.CoolingSystem,
          ColorOptions: this.ColorOptions.split(","), //to add string into array
        });
    },
  }
  ```
  2. Read Data from Server at Front-End using axios.get
  ```sh
  mounted: async function () {
    let response = await axios.get(API_URL + "/specification/" + this.cycleId);
    this.allCycles = response.data;
    this.Brand = response.data.Brand;
  }
  ```
  3. Update Data to Server through Front-End using axios.patch
  ```sh
 methods: {
    processUpdate: async function (cycleId) {
      await axios.patch(API_URL + "/specification/" + this.cycleId, {
        Brand: this.Brand,
        Model: this.Model,
        ColorOptions: this.ColorOptions.split(","), //to update string to array
      });
    },
  }
  ```
   4. Delete Data from Server using axios.delete
  ```sh
 methods: {
    remove: async function (cycleId) {
      this.$emit("remove-cycle", cycleId);
      await axios.delete(API_URL + "/specification/" + this.cycleId);
    }
    }
  ```
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Back-End CRUD Setup -->
### Back-End CRUD Setup
#### Connecting to MongoDB server
```sh
  async function connect() {
  const mongo_url = process.env.MONGO_URI;
  let client = await MongoClient.connect(mongo_url, {
    "useUnifiedTopology": true
  })
  let db = client.db("motorcycle");
  console.log("database connected");
  return db;
}
  ```

  1. Create Data to MongoDB using app.post
  ```sh
  app.post('/specification', async (req, res) => {
    let items = await db.collection('specification').insertOne({
      Brand: req.body.Brand,
      Engine: {//to create new objects dataset 
        Bore_mm: req.body.Bore,
        CoolingSystem: req.body.CoolingSystem}
    })
    res.json(items);
  })
  ```
  2. Read Data from MongoDB using app.patch
  ```sh
  app.get('/specification', async (req, res) => {
    let items = await db.collection('specification').find().toArray();
    res.json(items)

  })
  ```
  3. Update particualr Data to MongoDB using app.patch
  ```sh
 app.patch('/specification/:id', async (req, res) => {
    let results = await db.collection('specification').updateOne({
      '_id': new ObjectId(req.params.id),
    }, {
      '$set': {
        Brand: req.body.Brand,
        'Engine.Bore_mm': req.body.Bore, //to update object data
        'Engine.CoolingSystem': req.body.CoolingSystem,
        '
      }
    })
    res.json({
      'status': true
    })
  })
  ```
   4. Delete Data from MongoDB using app.delete
  ```sh
 app.delete('/specification/:id', async (req, res) => {
    let results = await db.collection('specification').deleteOne({
      '_id': new ObjectId(req.params.id)
    })
    res.json({
      'message': 'Success'
    })
  })
  ```
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
  [Web Page Link](https://assignment2frontend.eicot.repl.co/toMain)
  
  The MOTO Land motorcycle review website is categorised into 4 parts:
   1. Home Page: This is the main page of the website and contains an overview of the website's content and purpose. The home page features a selection of the most popular motorcycle models and have links to the other pages of the website.
   <img width="1111" alt="homepage" src="https://user-images.githubusercontent.com/108671817/226785347-fce60c47-10b0-4f14-8802-5a42a4d0aa90.png">

   2. Detailed Specification Page: This page contains in-depth technical specifications of a particular motorcycle model. It includes details such as the engine type, displacement, horsepower, torque, transmission, fuel system, suspension, brakes, wheels and tires, dimensions, weight, and more. The page also includes photo of the motorcycle along with user reviews, edit and delete button.
   <img width="1111" alt="detailspage" src="https://user-images.githubusercontent.com/108671817/226785805-54d625a7-587a-4a36-bcb2-5c1e9cfb420e.png">


   3. Edit Page: This page allows user to modify the content of the website, such as adding or editing motorcycle technical information and specification. The edit page also includes a form for entering new content, as well as options for adding images, and more.
   <img width="1111" alt="editpage" src="https://user-images.githubusercontent.com/108671817/226786183-69145aa3-eb5a-4e68-bc07-37f3c69d1035.png">


   4. Add New Page: This page is similar to the Edit Page, but instead of modifying existing content, it allows users to add new content to the website. Users is able to submit their own motorcycle technical specification.
  <img width="1111" alt="addpage" src="https://user-images.githubusercontent.com/108671817/226786494-6ca6772c-0976-4b27-bec4-119ff623ed27.png">


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Project Setup -->
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Please ensure to run the separate Back-End Server to run the webpage. The link is available [here](https://github.com/Eicot/Assignment2/tree/main).


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- URLS -->
[vuejs-url]: https://vuejs.org
[mongodb-url]: https://www.mongodb.com
[Axios-url]: https://axios-http.com
[Bootstrap-url]:https://getbootstrap.com
[Expressjs-url]: https://expressjs.com






To start mysql, in the terminal, type in `mysql -u root`

# Create a new database user
In the MySQL CLI:
```
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
```

```
grant all privileges on *.* to 'foo'@'%';
```

```
FLUSH PRIVILEGES;
```

```
create database shop;
```

```
npm run migrate -- up;
```

```
npm run migrate start;
```


## Dependencies
* `express`
* `hbs`
* `wax-on`
* `dotenv`
* `knex`
* `bookshelf`
* `forms`
* `express-session`
* `session-file-store`
* `connect-flash`
* `csurf`
* `cloudinary`
* `dotenv`
* `stripe`
* `jsonwebtoken`
