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


