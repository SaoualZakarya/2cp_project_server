# About the project 
This is the backend repository of the project workwave which is freelencing
platform that empowers users to engage in freelancing opportunities seamlessly build
as PROJET PLURIDISCIPLINAIRE purposes  using expressjs and mongodb for the backend

## Schema
You will find in here the schema that I use to build this project
```bash
   $ the link will be here soon
```

## How to use this project

### Clone this repo Into your local machine 
```bash
   $ git clone https://github.com/zakaryaalgeria/2cp_project_server.git
```
### Make sure you have nodejs installed on your machine 
if you don't you can install it from here
```bash
   $ https://nodejs.org/
``` 
### After cloning the repo 
Open the terminal on this repository 
Run the command 
```bash
    $ npm install
```
This will install all the dependencies
```bash
    $ check .env file and add your own creadentials
```

## Run the project using the command
```bash
    $ npm run server
```

## Project Features
```bash
    $ Description will be sooner in here
```
<details>
<summary>Click to expand project features</summary>

**User Authentication :**
- [x] Signup / Registration =  using google or without google
- [x] Login = using google or without google
- [x] Update all account information 
  
</details>

## API Reference

<details>
<summary>Click to expand API refrence</summary>
    
## Auth 

### Without google

#### Signup new user

```http
POST /api/auth/sign-up 
```

| Parameter   | Type     |
| :---------- | :------- |
| `email`     | `string` |
| `password`  | `string` |
| `firstName` | `string` |
| `lastName`  | `string` |
| `mobile`    | `string` |

example :

    {
        "firstName":"zakarya",
        "email":"zakarya@gmail.com",
        "password":"Password_123",
        "lastName":"saoual",
        "mobile":"545342389"
    }

#### Login user

```http
POST /api/auth/sign-in
```

| Parameter   | Type     |
| :---------- | :------- |
| `email`     | `string` |
| `Passsword` | `string` |

example :

    {
        "email":"zakarya@gmail.com",
        "password":"Password_123"
    }

### With google

    will be added soon ...

#### verify user account 



#### logout user

```http
GET /api/auth/logout
```

## send vefication email for user

This will allows you to send vefication email to the user account 
when the user click in it , his account will be verified succefully

```http
POST /api/user/send-verification-email  'require auth'
```

## Profile

#### Upload profile picture

```http
POST /api/user/profile-picture  'require auth'
```

| Parameter   | Type        |
| :---------- | :---------- |
| `image`     | `form-data` |

You will got as result the url of the image uploaded and also you will got
public_id and asset_id

#### Delete uploaded profile picture

```http
DELETE /api/user/delete-image/:id 'require auth , require upload_profile_picture'
```

id : represent the asset_id you will got after upload profile picture 


#### Add the user information or update the profile information

```http
POST /api/user/update-profile   'require auth'
``` 

| Parameter       | Type     |
| :-------------- | :------- |
| `photo`         | `string` |
| `description`   | `string` |
| `portfolio_url` | `string` |

example :

    {
        "photo":"https://res.cloudinary.com/dbeurnzkh/image/upload/v1712579171/h2cxrcnmslnslo8sm9pf.jpg",
        "description":"I am cs student , web developer and penetration tester with more that 2 years in the fields of it",
        "portfolio_url":"https://zakaryasaoual.com"
    }


</details>