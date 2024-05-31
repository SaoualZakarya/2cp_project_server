# About the project 
This is the backend repository of the project workwave which is freelencing
platform that empowers users to engage in freelancing opportunities seamlessly build
as PROJET PLURIDISCIPLINAIRE purposes  using expressjs and mongodb for the backend

## Schema
You will find in here the schema that I use to build this project
```bash
   $ https://shorturl.at/Qr3fI
   
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

# Project Features
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

# API Reference

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

### verify user account 

#### send vefication email for user

This will allows you to send vefication email to the user account 
when the user click in it , his account will be verified succefully
with another api call 

```http
POST /api/user/send-verification-email  'require auth'
```

### logout user

```http
GET /api/auth/logout
```

### check user token

    The token will be sent via the cookie so you don't need to add in it

```http
GET /api/auth/check-login
```


## Profile

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

#### get user

```http
GET /api/user/get-single-user  'require auth'
``` 


### Forgot password

#### Forgot password token

    Will be sent via email to the user account

```http
POST /api/auth/forgot-password-token
```

| Parameter   | Type     |
| :---------- | :------- |
| `email`     | `string` |

example :

    {
        "email":"gptchat702@gmail.com"
    }

#### Reset  Password with forgot password token

    Will be sent via email to the user account

```http
PUT /api/auth/reset-password/:token
```

    Here after he clicks the link on his email he will got this link to the
        front-end page when he can update his password

| Parameter   | Type     |
| :---------- | :------- |
| `password`  | `string` |

example :

    {
        "password":"Za@#_+s@#12ka123ASqw"
    }


## Upload

#### Upload profile picture

```http
POST /api/user/profile-picture  'require auth'
```

| Parameter   | Type        |
| :---------- | :---------- |
| `image`     | `form-data` |

You will got as result the url of the image uploaded and also you will got
public_id and asset_id

#### Upload freelencer certificate

```http
POST /api/freelencer/certificate/upload  'require auth'
```

You can upload here more than image once

| Parameter    | Type        |
| :----------- | :---------- |
| `images`     | `form-data` |



#### Delete uploaded  picture

```http
DELETE /api/user/delete-image/:id 'require auth , require upload_picture'
```

id : represent the asset_id you will got after upload  picture 



## Freelencer

#### Create freelencer

```http
POST /api/freelencer/create 'require auth'
```

| Parameter     | Type     |
| :------------ | :------- |
| `certificate` | `array` |
| `skills`      | `array` |

example : 
    {
        "certificate" : [{
            "link": "https://res.cloudinary.com/dbeurnzkh/image/upload/v1712585122/qvyxddz4c2hrtllrjt3b.jpg",
            "asset_id": "af8f6888bf016f2f2f43fe318c180a9c",
            "verifiedId": "tst.jfdkls23"   // you can get this from the certificate provider 
        }] ,
        "skills" : ["ui/ux","front-end","logo design"]
    }   

#### update freelencer

```http
PUT /api/freelencer/update 'require auth'
```

| Parameter     | Type     |
| :------------ | :------- |
| `certificate` | `array` |
| `skills`      | `array` |

example : 
    {
        "certificate" : [{
            "link": "https://res.cloudinary.com/dbeurnzkh/image/upload/v1712585122/qvyxddz4c2hrtllrjt3b.jpg",
            "asset_id": "af8f6888bf016f2f2f43fe318c180a9c",
            "verifiedId": "tst.jfdkls23"   // you can get this from the certificate provider 
        }] ,
        "skills" : ["ui/ux","front-end","logo design"]
    }   

#### Get freelencer

```http
GET /api/freelencer/get 'require auth'
```

#### Apply for project

```http
PUT /apply/:id 'require auth'
```
    The id of the project here in the params of the request


#### Get the project accepted

```http
GET /get/projects/accepted 'require auth'
```

#### Get the project canceled

```http
GET /get/projects/canceled 'require auth'
```

#### Get all the project

```http
GET /api/freelencer/get/projects/exists 'require auth'
```

#### Get single project

```http
GET /api/freelencer/project/:id 'require auth'
```

    id represents the project id


#### Switch account into user

```http
PUT /api/freelencer/client 'require auth'
```

#### create service

```http
POST /api/freelencer/create/service 'require auth'
```

| Parameter      | Type                |
| :------------- | :------------------ |
| `description ` | `string`            |
| `service`      | `string`            |
| `price`        | `string` | `number` |

example :

    {
        "service":"logo design","description":"full stack design","price":120
    }


#### update service

```http
POST /api/freelencer/update/service/:id  'require auth'
```

    Here the id is the service id

| Parameter      | Type                |
| :------------- | :------------------ |
| `description ` | `string`            |
| `service`      | `string`            |
| `price`        | `string` | `number` |

example :

    {
        "service":"logo design","description":"full stack design","price":120
    }

#### accept user on service

```http
PUT /api/freelencer/service/accept/:id  'require auth'
```

    Here the id is the service id

| Parameter      | Type                |
| :------------- | :------------------ |
| `user `        | `string`            |

    Here the user is the user id that we wanna accept on the service

example :

    {
        "user":"662146a6be275abc9c8932ae"
    }






#### refuse user from service

```http
PUT /api/freelencer/service/refuse/:id  'require auth'
```

    Here the id is the service id

| Parameter      | Type                |
| :------------- | :------------------ |
| `user `        | `string`            |

    Here the user is the user id that we wanna accept on the service

example :

    {
        "user":"662146a6be275abc9c8932ae"
    }

#### Get service for freelencer

```http
GET /api/freelencer/get/service/:id  'require auth'
```

    id represent the service id

#### Get all the created services for that freelencer 

```http
GET /api/freelencer/get/services/all  'require auth'
```

#### submit project

```http
PUT /api/freelencer/submit/project/:id 'require auth'
```

    id : represent the project id 

| Parameter      | Type                |
| :------------- | :------------------ |
| `link `        | `string`            |
| `desc`         | `string`            |

example :

    {
        "link":"google drive link",
        "desc":"Description about the content of the drive"
    }

#### submit service 

```http
PUT /api/freelencer/submit/service/:id 'require auth'
```

    id : represent the service id 

| Parameter        | Type                |
| :--------------- | :------------------ |
| `link `          | `string`            |
| `desc`           | `string`            |
| `enrolledUserId` | `string`            |

example :

    {
        "link":"google drive link",
        "desc":"Description about the content of the drive",
        "enrolledUserId":"6621482abe275abc9c8932b7"
    }


## Chat

#### Get all messages

```http
GET /api/chat/message/get_all 'require auth'
```

| Parameter      | Type     |
| :------------- | :------- |
| `conversation` | `string` |


#### Create message

```http
POST /api/chat/message/create 'require auth'
```

| Parameter      | Type     |
| :------------- | :------- |
| `conversation` | `string` |
| `content`      | `string` |

    conversation id

#### Create conversation

```http
POST /api/chat/conversation/create 'require auth'
```

| Parameter      | Type     |
| :------------- | :------- |
| `participant`  | `string` |

    the participant id 


#### Get all conversations

```http
GET /api/chat/conversation/all 'require auth'
```

#### Delete conversation

```http
GET /api/chat/message/delete/:id 'require auth'
```
    Here the conversation id

## Client

#### Create project

```http
POST /api/client/project/create 'require auth'
```

| Parameter     | Type     |
| :------------ | :------- |
| `title`       | `string` |
| `description` | `string` |
| `amount`      | `integer`|

example : 
      
{
    "title":"ecommerce website",
    "description":"ecommerce website where i can put product to present them , also sell them ...",
    "amount":3000
}


#### Update project

```http
PUT /api/client/project/update/:id 'require auth'
```

| Parameter     | Type     |
| :------------ | :------- |
| `title`       | `string` |
| `description` | `string` |
| `amount`      | `integer`|

example : 
      
{
    "title":"ecommerce website 2",
    "description":"ecommerce website where i can put product to present them , also sell them ...",
    "amount":3000
}

#### Get all user projects

```http
GET /api/client/projects/all 'require auth'
```

#### Get single project for user

```http
GET /api/client/project/get/:id 'require auth'
```

#### Delete single project from the creator user

```http
DELETE /api/client/project/delete/:id 'require auth'
```

#### Update project status

```http
PUT /api/client/project/status/:id 'require auth'
```

| Parameter      | Type     |
| :------------- | :------- |
| `status`       | `string` |

#### Accept freelencer in project

```http
PUT /api/client/project/participants/accept/:id 'require auth'
```

    Here the id in the params represents the project id

| Parameter      | Type     |
| :------------- | :------- |
| `userID`       | `string` |

example :

    {
        "userId":"6621482abe275abc9c8932b7"
    }


#### Canceled freelencer from project

```http
PUT /api/client/project/participants/refuse/:id 'require auth'
```

    Here the id in the params represents the project id

| Parameter      | Type     |
| :------------- | :------- |
| `userID`       | `string` |

example :

    {
        "userId":"6621482abe275abc9c8932b7"
    }



#### Switch the account into freelencer

```http
PUT /api/client/freelencer 'require auth'
```


#### Get services

```http
GET /api/client/services 'require auth'
```
    You are allowd to add the query parameters 

        searchParam, minAmount, maxAmount

    To do filtering functionnality

Query parameters available :

*   `searchParam`: Search by    
*   `minAmount`: min amount  
*   `maxAmount`: max amount    


#### Apply for service

```http
PUT /api/client/apply/service/:id 'require auth'
```

    The " id " here represent the service id 


#### Get services accepted in 

```http
GET /api/client/services/accepted 'require auth'
```

#### Get services refused in 

```http
GET /api/client/services/refused 'require auth'
```


## Notification

#### Get all notifications 

```http
GET /api/notification 'require auth'
```

## Enquiry

#### Create Enquiry

```http
POST /api/enquiry/create 'require auth'
```

| Parameter | Type     |
| :-------- | :------- |
| `comment` | `string` |

Example :

    {
        "comment": "This is an enquiry comment."
    }


#### Update Enquiry Status

```http
PUT /api/enquiry/:id 'require auth, admin'
```

| Parameter | Type     |
| :-------- | :------- |
| `status`  | `string` |

Example :

    {
        "status": "Contacted"
    }


#### Delete Enquiry

```http
DELETE /api/enquiry/:id 'require auth, admin'
```

#### Get All Enquiries

```http
GET /api/enquiry/all 'require auth, admin'
```

#### Get Single Enquiry

```http
GET /api/enquiry/:id 'require auth, admin'
```



## Public

#### Get user profile information

    "id" represent the user id
```http
GET /api/public/:id 
```


## Last



</details>