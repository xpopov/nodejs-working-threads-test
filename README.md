## About

This is to prove Node.js multi-threading capabilities.
You can see that Node.js run 10 threads per each HTTP thread and they are not blocking each others.


## Building and running

`npm install`

`npm start`

Server will start listening on 8080 port


## Testing

You can test in the browser, or with multi-thread URL request tool like Siege. For example, 

`siege -c 3 -v http://localhost:8080`


## Conclusion

It works. Need to take care about long time operations. Probably need to return processing Id and refresh its status via API, then show the results of processing.
