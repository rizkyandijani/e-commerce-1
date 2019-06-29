# BAJUAL


## A. Installation
1. clone this repository
2. open the `/server` folder of this repository on the terminal an then run `npm install` on the terminal to install all of the dependencies
3. `npm run start` on the terminal
4. open the `/client` folder of this repository on the terminal an then run `npm install` on the terminal to install all of the dependencies
5. run the `parcel index.html` or `npm run start` on the terminal to run the client on local host **port 1234**


## B. API Documentation

### How to use the REST API
if you are running the server on local host **port 3000** then the base URL is = http://localhost:3000
**Example** : if you want to register new user, the URL should be : `http://localhost:3000/register`
The Formula is : `BASE_URL` + `routes` + `?` + `query`

## B.1. Register new user
	

 - Method & Route - `POST` / register
 - Request 
	 - HEADERS
	 - BODY
		
		
		    {
		        firstName : String,
		        lastName : String,
		        password : String
		    }
	
	 - QUERY
 - Response
	 - ON SUCCESS : HTTP RESPONSE `201`
		 

		    {
			    _id : ObjectId
			    firstName : String
			    lastName: String
			    email : String
			    hashedPassword : String
		    }
	

	 - ON ERROR: HTTP RESPONSE `500` if server database error

		    {
			    message : String
		    }

## B.2. Log in

 - Method & Route - `POST` / login
 - Request 
	 - HEADERS
	 - BODY
		
		
		    {
		        email : String,
		        password : String
		    }
	
	 - QUERY
 - Response
	 - ON SUCCESS : HTTP RESPONSE `200`
		 

		    {
			    _id : ObjectId
			    firstName : String
			    lastName: String
			    email : String
		    }
	

	 - ON ERROR: HTTP RESPONSE `500` if server database error

		    {
			    message : String
		    }
