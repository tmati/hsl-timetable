# HSL - PYSÄKKINÄYTTÖ DOKUMENTAATIO

## KÄYTTÖTAPAUKSET

### Hakusivu

#### Toiminnot

[Kirjautumaton käyttäjä](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/kirjautuminen.PNG)| [Kirjautunut käyttäjä](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/kirjautunut.PNG)
------------------------------------------------------------------------------------------------------------------------------- | --------------------
Aikataulujen haku kirjoittamalla hakukenttään pysäkin nimi | 

### Kirjatuminen

1. Kirjautuminen avautuu painalla ["LUO KÄYTTÄJÄ | KIRJAUDU" -nappia](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/kirjautuminen.PNG)
2. Avautuva [lomake](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/kirjaudu.PNG) mahdollistaa uuden käyttäjän lisäämisen tai sisäänkirjautumisen.
3. Uloskirjautuminen tapahtuu ["Kirjaudu ulos" -napista](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/uloskirjautuminen.PNG)

### [Aikataulusivu](https://gitlab.com/tmati/hsl-timetable/blob/riina_final/client/content/documentation/aikataulu.PNG)



## TIETOKANTA
Tietokantamme nimi on hsl ja se koostuu kolmesta taulusta, jotka ovat users, stops ja favorites.
 
_HUOM: Taulut täytetty esimerkki datalla._

### users
Käyttäjän ID generoituu autmaattisesti tietokantaan lisättäessä.

Username (varchar) | UserID (int)
-------- | ------
Testi | 1  
Riina | 2

### stops
Pysäkin nimi ja ID otetaan graphql:stä.

StopName (varchar)| StopID (varchar)
-------- | ------
Bulevardi | 1210
Rautatieasema | 0302

### favorites


UserID (int) | StopID (varchar)
------ | ------
2 | 0302
1 | 1210
2 | 1210

## REST API

### Käyttäjän lisääminen
* __url__: http://localhost/server/index.php/rtmapi/user
* __method__: POST
* __body__:
    ```
    {
        "userID": int,
        "userName": string
    }
    ```
* __response__:
    * __200__: 
    ```
    {
        "message": "Adding XXX success"
    }
    ```
    * __409__:
    ```
    {
         "message": "ERROR: XXX"
    }
    ```
    
### Suosikkipysäkin lisääminen
* __url__: http://localhost/server/index.php/rtmapi/favoritestop
* __method__: POST
* __body__:
    ```
    {
        "userID": int,
        "stopID": string,
        "stopName": string
    }
    ```
* __response__:
    * __200__:
    ```
    {
        "message": "Adding XXXX success"
    }
    ```
    * __409__:
    ```
    {
         "message": "ERROR: XXX"
    }
    ```
    

### Käyttäjän id:n hakeminen
* __url__: http://localhost/server/index.php/rtmapi/users/{Username}
* __method__: GET
* __response__:
    * __200__: esim.  
    ```
    {
        "userID": 1,
        "userName": "Testi"
    }
    ```
    * __404__:
    ```
    {
        "message": "User XXX not found"
    }
    ```
    * __500__:
    ```
    {
        "message": "ERROR: XXX"
    }
    ```
  
###  Suosikkipysäkkien hakeminen
* __url__: http://localhost/server/index.php/rtmapi/stops/{UserID}
* __method__: GET
* __response__:
    * __200__: esim.
    ```
    {
        "favorites": [
            {
                "stopID": "1210",
                "stopName": "Bulevardi"
            },
            {
                 "stopID": "0302",
                 "stopName": "Rautatieasema"
            }
        ]
    }
    ```
    * __404__:
     ```
     {
         "message": "Stops for user XXX not found"
     }
     ```
     * __500__:
     ```
     {
         "message": "ERROR: XXX"
     }
     ```
    

### Suosikkipysäkin poistaminen

* __url__: http://localhost/server/index.php/rtmapi/favorite/{StopID}
* __method__: DELETE
* __response__:
    * __200__:
    ```
    {
        "message": "Deleting XXX success"
    }
    ```
    * __404__:
    ```
    {
         "message": "ERROR: XXX"
    }
    ```

## LÄHTEET
* Autocomplete - https://www.w3schools.com/howto/howto_js_autocomplete.asp
* SPA - https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475
* Rest API - https://www.restapitutorial.com/lessons/httpmethods.html
