# myLibrary

Beispiel einer React-Komponenten-Bibliothek, die in einem Paketrepository wie npm veröffentlicht werden könnte.

## Anforderungen

### Einfache Nutzung 

Installation und Nutzung analog zu anderen 3rd-pary packages:

```shell
npm install myLibrary
```
```javascript
import { MyComponentA, MyComponentB } from 'myLibrary'
```

### Bereitstellung

Bereitstellung sowohl als Modulbibliothek (Nutzung siehe oben) als auch als modularisierte Version um bundle-sizes klein zu halten
Nutzung im letzteren Fall dann beispielsweise:
```javascript
import MyComponentA from 'myLibrary/lib/MyComponentA'
```

### Universalität
Möglichkeit der Nutzung sowohl als commonjs oder AMD-Modul aber auch als script-Tag, z.B.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js" type="text/javascript"></script>
<script src="/node_modules/kiss-react-starterkit/dist/myLibrary.js" type="text/javascript"></script>
<script type="text/javascript">
    ReactDOM.render(React.createElement(myLibrary.MyComponent), document.getElementById('root'))
</script>
```

### Abhängigkeiten gering halten und deutlich machen
- Vermeidung von Nutzungsvoraussetzungen wie ES6 / Babel / JSX, sprich Auslieferung als ES5-Kompilat
- Explizites Herausstellen von Nutzungsvoraussetzungen (Libraries wie react / react-dom), z.B. via package.json peerDependencies

### Versionierung nach [SemVer](http://semver.org/)

## Umsetzungserläuterungen

- Aufsetzen einer entsprechenden Umgebung, z.B. durch Nutzung eines enstprechenden React-Boilerplates.

- Die "main"-Eigenschaft in package.json verweist auf die gebundelte Bibliotheksdatei, damit Einbindungen wie `import {MyComponentA} from 'myLibrary'` funktionieren:
```javascript
"main": "dist/myLibrary.js"
```
- Angabe eines `prepublish` Skriptes, welches die Erstellung der compilierten und gebundelten Version und der modularisierten Version (s.u.) anstößt

- Versionserhöhungen nach Semantic Versioning sollten ebenfalls im Rahmen des `prepublish` Skriptes angestoßen werden (`npm version`, siehe https://docs.npmjs.com/cli/version)

- Veröffentlichungen über `npm publish` (vorher ggf. `npm login`). Hinweis: `npm publish` stößt `prepublish` automatisch an.


### Compilierte und gebundelte Version

Die "entry"-Eigenschaft in der entsprechenden webpack-Konfiguration ist eine Datei, welche sämtliche Komponenten re-exportiert.

```javascript
// webpack.config.js
entry: path.join(__dirname, "/src/main.js")

// /src/main.js
export { default as MyComponentA} from './MyComponentA'
export { default as MyComponentB} from './MyComponentB'
```

Das Ergebnis soll eine einzelne compilierte und gebundelte Datei werden, die UMD unterstützt um in sämtlichen Umgebungen verwendbar zu sein:

```javascript
output: {
    path: path.join(__dirname + "/dist/"),
    filename: "myLibrary.js",
    library: "myLibrary",
    libraryTarget: "umd"
}
```

### Modularisierte Version

Die "entry"-Eigenschaft in der entsprechenden webpack-Konfiguration ist ein Objekt mit Keys, die auf die Dateien verweisen, in denen die entsprechenden Komponenten definiert sind:

```javascript
entry: {
    'MyComponentA': path.join(__dirname, "/src/MyComponentA.js"),
    'MyComponentB': path.join(__dirname, "/src/MyComponentB.js"),
}
```
Das Ergebnis soll mehrere Dateien (eine pro React-Komponente) werden, die UMD unterstützt um in sämtlichen Umgebungen verwendbar zu sein:
```javascript
output: {
    path: path.join(__dirname + "/lib/"),
    filename: "[name].js",
    library: ["myLibrary", "[name]"],
    libraryTarget: "umd"
}
```

### Abhängigkeiten zu React-Bibliotheken

Für beide Versionen wird in der webpack-Konfiguration angegeben, dass eine Abhängigkeit zu React und ReactDOM besteht (wobei diese Abhängigkeiten nicht Bestandteil der Bibliothek werden).
Außerdem wird für UMD pro Variante angegeben unter welchen Namen die jeweiligen Bibiotheken zu finden sind:
```javascript
externals: {
         'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        }
    }
```

## Ausschließlich notwendige Assets veröffentlichen

Für die Nutzung nicht notwendige / hilfreiche Dateien können entweder per `.npmignore` oder per `files`-Eigenschaft in `package.json` von der Veröffentlichung ausgeschlossen werden.

Siehe auch <http://stackoverflow.com/questions/25124844/should-i-npmignore-my-tests>








