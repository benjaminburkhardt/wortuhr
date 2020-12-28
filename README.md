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
- Build Ionic app with. ```ionic build```
- Run Ionic app with: ```ionic server```
- Preview webapp in browser: ```http://localhost:4200/```

## How to depoly to iOS

### A. Build and open in Xcode

```$ ionic capacitor copy ios```
```$ ionic capacitor open ios```

### B. Deploy to device automatically

```$ ionic capacitor run ios -l --external```


## API Definition

### Values & Ranges

| value | meaning    | range   |
|-------|------------|---------|
| r     | red        | 100-355 |
| g     | green      | 100-355 |
| b     | blue       | 100-355 |
| br    | brightness | 100-200 |

### Endpoints

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
