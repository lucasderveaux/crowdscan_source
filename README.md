# crowdscan_source
##Usage
### yarn
```
yarn run start
```

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
##### example
``` json
{
    "app": {
        "port": 3000
    },
    "db": {
        "host": "C:/GitHub/Basic-LDES-Server-Examples/database.sqlite"
    },
    "sources": [
        {
            "route": "/langemunt",
            "sourceFile": "dist/crowdscanSource",
            "usesImportPages": true,
            "importInterval": 5000,
            "environment": "gent_langemunt",
            "topic": "/gent/gent_langemunt",
            "username": "opendata",
            "observationsPerPage": 800
        },
        {
            "route": "/sensors",
            "sourceFile": "dist/sensorsource"
        },
        {
            "route":"/catalog",
            "sourceFile":"dist/catalogSource"
        }
    ]
}
```


