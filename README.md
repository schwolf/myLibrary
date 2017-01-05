# myLibrary

Eine beispielhafte React-Komponenten-Bibliothek, die in einem Paketrepository wie npm veröffentlicht werden könnte.

Anforderungen

Die Anforderungen an die Nutzung stellen sich im Groben folgendermaßen dar:

1. Einfache Nutzung analog zu anderen 3rd-pary packages, also

Installation:
`npm install myLibrary`

Nutzung (ES6)
`import {MyComponentA, MyComponentB} from 'myLibrary'`

2. Bereitstellung sowohl als Modulbibliothek (also) als auch als modularisierte Version um bundle-sizes klein zu halten
Nutzung im letzteren Fall dann beispielsweise:
`import MyComponentA from 'myLibrary/lib/MyComponentA'`

3. Möglichkeit der Nutzung sowohl als commonjs oder AMD-Modul aber auch als <script>-Tag, z.B.
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js" type="text/javascript"></script>
<script src="/node_modules/kiss-react-starterkit/dist/myLibrary.js" type="text/javascript"></script>
<script type="text/javascript">
    ReactDOM.render(React.createElement(myLibrary.MyComponent), document.getElementById('root'))
</script>

4. Explizites Herausstellen von Nutzungsvoraussetzungen (Libraries wie react / react-dom), z.B. via package.json peerDependencies

5. Vermeidung von Nutzungsvoraussetzungen wie ES6 / Babel / JSX, sprich Auslieferung als compiliertes bundle.


Umsetzungshinweise

- Aufsetzen einer entsprechenden Umgebung, z.B. durch Nutzung eines enstprechenden React-Boilerplates.

- Die "main"-Eigenschaft in package.json verweist auf die gebundelte Bibliotheksdatei
"main": "dist/myLibrary.js"





