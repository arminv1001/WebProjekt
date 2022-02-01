# WeatherApp

## Flussdiagramm
<img width="436" alt="image" src="https://user-images.githubusercontent.com/69273468/152060881-fb3d936d-78ef-46d7-a99d-49ca757cef90.png">

## Weather.com
Um das vorgegebene Punktelimit zu erreichen, habe ich mich für das Framework Angular entschieden und der Wetter Seite. Da die vorgegebene API ihre Texte auf Englisch zurückliefert habe ich mich zudem entschieden eine englische Webseite zu erstellen.
Die Webseite besitzt zwei Seiten:
1.	Home
<img width="454" alt="image" src="https://user-images.githubusercontent.com/69273468/152060921-4a357e15-bd72-4c91-9b38-f1b8e83fb43d.png">
Hier werden vorher festgelegte Städte angezeigt. Die Farbe der Karten hängt von der Temperatur ab, die Karten wurden auch nach Temperatur absteigend sortiert. Die Anzahl von Städten wurde nicht besonders hochgewählt, da ich Probleme mit der API vermeiden wollte. Zudem befindet sich ein Button am unteren Ende jeder Karte, welche einen weiterleitet ins Web (Link: https://google.de/search?q=stuttgart+nach+ LOCATION).
2.  Weather
<img width="454" alt="image" src="https://user-images.githubusercontent.com/69273468/152060978-f88581cb-5292-42fa-a3f5-e58a2fe7ec2f.png">
Wenn man auf den Reiter Weather klickt gelangt man auf das oben gezeigte Bild, dort ist es möglich den Namen einer Stadt einzugeben. Bestätigt man dann diese Eingabe, dann werden die folgenden Karten angezeigt.
<img width="454" alt="image" src="https://user-images.githubusercontent.com/69273468/152061021-af46b382-aee4-470b-a067-8183ccb5b224.png">
Die große Karte liefert das Wetter für den aktuellen Zeitpunkt und die fünf Karten unterhalb, sind die Vorhersagen der nächsten fünf Tage.
Ist die Eingabe jedoch falsch erscheint folgendes Pop-Up:
<img width="454" alt="image" src="https://user-images.githubusercontent.com/69273468/152061038-1aea5d0c-384a-42cb-bf1c-a6f0c9097c42.png">

## Installations Guide

1.	Install AngularCli
Folgende Zeile im Terminal eingeben
```
sudo npm install -g @angular/cli
```
2.	Git Clone
Im Folgenden wird Git vorausgesetzt. Falls Sie nicht Git besitzen laden Sie sich mit 
```
brew install git
```
herunter. Falls kein Homebrew vorhanden, dann folgen Sie den Anweisungen auf der Seite:
https://www.atlassian.com/de/git/tutorials/install-git

Nun um das Projekt zu Clonen geben Sie folgende Zeile in Ihrem Terminal ein:
```
git clone https://github.com/arminv1001/WebProjekt
```

3.	Rein navigieren
4.	Webseite installieren
```
npm install
```
5.	Starten
```
ng serve
```
Falls es zu dem Problemen kommen sollte, dass er den ng Befehl nicht kennt, dann kann das Updaten von Homebrew mit:
```
brew upgrade 
```
oder folgender Befehl helfen:
```
npm install -g npm@next
```
Hilfreiche Links:
https://angular.io/guide/setup-local	
https://stackoverflow.com/questions/46623571/angular-ng-command-not-found/49820551




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

