# crowdscan_source
##Usage
### yarn
The crowdscan source is an implementation of the Basic LDES server.
The source subscribes to a MQTT data broker and transforms the data to a Linked Data Event Stream.

In order to use this implementation of the crowdscan source, you have to add a .env file with the right credentials to subscribe to the topic of your choosing. The .env file will look like:
```
CR=<credentials>
```
Afterwards you can change the configuration file in order to subscribe to the right topic.

### Config file
``` json
{
    "app": {
        "port": 3000
    },
    "db": {
        "host": "<location to sqlite db>"
    },
    "entrypoint": "https://www.example.com/"
    "sources" : [ 
        {
            "route": "/endpoint-route", //relative endpoint route
            "sourceFile": "<relative path to compiled Source implementation in dist folder>",
            "usesImportPages": <boolean>,
            "importInterval": <importPages interval> //time between calls to importPages
            "environment": "<environment>",
            "topic": "<mqtt-topic to subscribe to>",
            "username": "<mqtt username>",
            "observationsPerPage": <observations per page>
        },
         {
            "route": "/sensors",
            "sourceFile": "<relative path to compiled Source implementation in dist folder>"
        },
        {
            "route":"/catalog",
            "sourceFile":"<relative path to compiled Source implementation in dist folder>"
        }
        ...
    ]
}
```
### Development
```
yarn run start
```
