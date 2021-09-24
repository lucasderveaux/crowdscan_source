# crowdscan_source
The crowdscan source is an implementation of the Basic LDES server.
The source subscribes to a MQTT data broker and transforms the data to a Linked Data Event Stream.

In order to use this implementation of the crowdscan source, you have to add a .env file with the right credentials to subscribe to the topic of your choosing. The .env file will look like:
```
CREDENTIALS=<credentials>
```
Afterwards you can change the configuration file in order to subscribe to the right topic.

### Config file
``` json
{
    "app": {
        "port": 3000
    },
    "db": {
        "host": "<location to sqlite db>",
        "maxCount":<maximum amount of pages the database will contain>
    },
    "entrypoint": "https://www.example.com/"
    "sources" : [ 
        {
            "route": "/endpoint-route", //relative endpoint route
            "sourceFile": "<relative path to compiled Source implementation in dist folder>",
            "environment": "<environment>",
            "topic": "<mqtt-topic to subscribe to>",
            "username": "<mqtt username>",
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
    ],
    "featureOfInterests": {
        "gent_langemunt":[
            //In the gent_langemunt there are three zones so
            "value1","value2","value3"
        ],
        "veldstraat":[
            "value1"
        ]
    }
}
```
An example of this can be found here: [ExampleConfigFile](https://github.com/lucasderveaux/crowdscan_source/blob/main/config/config.json)
### Development
```
git clone https://github.com/lucasderveaux/crowdscan_source.git
yarn install
yarn run start
```

### Deployment
In order to deploy the LDES-server, a Dockerfile is included. To build the image, Docker needs to be installed on your development machine. Before
you build the image, you'll have to create a .env file with the essential credentials: 
```
docker build -t crowdscan_ldes_server .
```
To launch the container:
```
docker run -p 3000:3000 --name crowdscan_ldes crowdscan_ldes_server
```
To stop the container:
```
docker stop crowdscan_ldes
```


