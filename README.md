# Wortuhr

IONIC App to control the Wortuhr

## How to setup

- Clone repo
- Install Node.js
- Install [Ionic](https://ionicframework.com)
- Setup IDE

## How to develop

- Run simulation server in /dev-server with: ```python server.py 8009```
- Set DEV in Constants.ts to true
- Build Ionic app with. ``ìonic build```
- Run Ionic app with: ```ionic server```

## API Defintion

#### Request: /api/get_rgb
#### Response:
```
{"rgb": 
	{
	"r": 100,
	"g": 100,
	"b": 100,
	"br": 100
	}
}
```


#### Request: /api/set_rgb?r=100&g=100&b=100&br=100
#### Response:
```
{"rgb": 
	{
	"r": 100,
	"g": 100,
	"b": 100,
	"br": 100
	}
}
```
