# Práctica 9: Aplicación de procesamiento de notas de texto

[![Tests](https://img.shields.io/badge/Tests-passing-2aaf49?logo=github&labelColor=343b43&logoColor=959da5)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98)

***

## Indice

1. [Objetivos](#Object)
2. [Herramientas](#Tools)
   * [Typedoc](#TypeDoc)
   * [Mocha y Chai](#Test)
   * [Instanbul y Coveralls](#Quality)
   * [SonarCloud](#Sonar)
   * [Github Actions](#Actions)
3. [Aplicación](#dev)

***

### 1. Objetivos <a name="Object"></a>


***

### 2. Herramientas <a name="Tools"></a>

En esta practica se nos pedia usar herramientas como TypeDoc, Mocha, Chai, Instanbul, Coveralls, Sonarcloud y Github Actions.

### 2.1. TypeDoc <a name="TypeDoc"></a>

TypeDoc es una herramienta que nos permitirá documentar nuestro código a través de comentarios escrito en el mismo, esta herramienta genera una página web con toda esta información.

Para llevar a cabo la instalación de la misma, seguimos los pasos que vemos en este [video](https://drive.google.com/file/d/19LLLCuWg7u0TjjKz9q8ZhOXgbrKtPUme/view) hecho por el profesor.

### 2.2. Mocha y Chai <a name="Test"></a>

Mocha y Chai son unos framework que nos permiten realizar test a nuestro código escrito en TypeScript.

Para llevar a cabo la instalación de ambos, seguimos los pasos que vemos en este [video](https://drive.google.com/file/d/1-z1oNOZP70WBDyhaaUijjHvFtqd6eAmJ/view) hecho por el profesor.

### 2.3. Instanbul y Coveralls<a name="Quality"></a>

Instanbul y Coveralls son dos herramientas que nos permiten saber que cantidad de codigo se esta ejecutando, segun los test realizados, a traves de unos informes que se generan con Instanbul y son enviados a [Coveralls](https://coveralls.io/) generando asi un informe.

Para llevar a cabo la instalación de ambos, seguimos los pasos que vemos en este [video](https://drive.google.com/file/d/1xLDc4CpoYpsAlCFO_4DMwu7MKCtcZDnh/view) hecho por el profesor.

### 2.4. SonarCloud <a name="Sonar"></a>

Sonarcloud es una herramienta que nos permite ver la calidad del código, por ejemplo si tenemos partes de código duplicado, fracciones de códigos que no estén bien utilizadas (Code Smell).

Esta herramienta junto a Coveralls, nos brinda otra opción de cubrimiento de código más avanzado.


### 2.5. Github Actions <a name="Actions"></a>

Github Actions es una herramineta que nos permite llevar acabo la automatizaciond e tareas, como puede ser la ejecucion del los tests, coveralls y sonarcloud.

Para llevar a cabo la instalación, seguimos los pasos que vemos en este [video](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view) hecho por el profesor.

***

### 3. Aplicación <a name="dev"></a>

Lo primero que se desarrollo para esta practica fue la clase `Note` que representaria una nota, esta clase no consta con gran cosa. Un constructor muy sencillo que recibe el titulo de la nota, su contenido y el color que se quiera representar; ademas de esto tiene los getters correspondientes para obtener los valores privados.

```ts
constructor(private title: string, private body: string, private color: string) {}
```

Una cosa importante en esta clase es el método print, que nos permite escribir la nota como un JSON.

```ts
print(): string {
  return '{\n\"title\": \"' + this.title +
    '\",\n\"body\": \"' + this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
}
```

Esto es usado apra poder guardar la nota en los ficheros .json, que de esto se encarga la siguiente clase.

La clase `NoteManager` es el que permite manipular las notas guardadas. Esta clase consta con distintos métodos, los cuales nos pedian en el guion de la practica y uno extra.

<b><u>addNote</u></b>: Este método se encarga de guardar la información de la nota.

Para esto, lo primero que hacemos, es comprobar si existe la carpeta del usuario que a creado la nota, en caso que no este dicha carpeta, la creamos.
```ts
if (!fs.existsSync(`database/${user}`)) {
  console.log(`${user} directory will be created`);
  fs.mkdirSync(`database/${user}`, {
    recursive: true,
  });
}
```

A continuacion, tomamos los datos de la nota para guardarlos, comprobando previamente que el titulo de la nota, no exista antes.

```ts
if (!fs.existsSync(`database/${user}/${title}.json`)) {
  fs.writeFileSync(`database/${user}/${title}.json`, note.print());
  console.log(chalk.green("New note added!"));
  return true;
} else {
  console.log(chalk.red("Note title taken!"));
  return false;
}
```

<b><u>removeNote</u></b>: Este método se encarga de borrar una nota de un usuario.

```ts
if (fs.existsSync(`database/${user}/${title}.json`)) {
  fs.rmSync(`database/${user}/${title}.json`);
  console.log(chalk.green("Note removed!"));
  return true;
} else {
  console.log(chalk.red("Note not found"));
  return false;
}
```

Para ello, basta con comprobar que exista esa nota y borrarla.

<b><u>modifyNote</u></b>: Modifica una nota existente, para ello, comprobamos que exista la nota a modificar, y sobre escribe la nota, es una mezcla entre eliminar y crear.

```ts
if (fs.existsSync(`database/${user}/${title}.json`)) {
  const note = new Note(title, body, color);
  fs.writeFileSync(`database/${user}/${title}.json`, note.print());
  console.log(chalk.green("Modified note!"));
  return true;
} else {
  console.log(chalk.red("Note not found"));
  return false;
}
```

<b><u>listNotes</u></b>: Este método muestra los titulos de las notas en el color correspondiente a las notas, graicas al uso del modulo `chalk`, en caso que el color introducido, no sea uno de los permitidos, se pondra de color cyan.

Para ello, lo que hacemos es buscar si existe la carpeta de notas del usuario y si tiene alguna nota.

```ts
if (fs.existsSync(`database/${user}`) && fs.readdirSync(`database/${user}`).length >= 0 ) { 
  ...
}
else {
  console.log(chalk.red("User not found"));
  return false;
}
```

Una vez sabemos que existe el usuario y tiene notas, lo que hacemos es ir recorriendo todos los titulos que estan dentro de la carpeta del usuario, y obteniendo a su ves la informacion de cada nota, parseandola, gracias a la forma de guardarla. Para luego mostrarlas en consola con los colores correspondientes.

```ts
fs.readdirSync(`database/${user}`).forEach((notes) => {
  const contentNote = fs.readFileSync(`database/${user}/${notes}`);
  const JSONote = JSON.parse(contentNote.toString());
  const note = new Note(JSONote.title, JSONote.body, JSONote.color);
  try {
    console.log(chalk.keyword(note.getColor())(note.getTitle()));
  } catch (_) {
    console.log(chalk.cyan(note.getTitle()));
  }
});
```

<b><u>readNote</u></b>: Este método permite ver el contenido de una nota entera, osea titulo y cuerpo.

Para ello buscamos si existe el titulo de la nota del usuario que realiza la consulta.

```ts
if (fs.existsSync(`database/${user}/${title}.json`)) {
  ...
} else {
    console.log(chalk.red("Note not found"));
    return false;
  }
```

Si encontramos la nota, obtenemos la informacion parseandola y mostrandole al usuario su contenido, con el color de la nota, en caso de que el color no sea valido, se pondra de color cyan.

```ts
const contentNote = fs.readFileSync(`database/${user}/${title}.json`);
const JSONote = JSON.parse(contentNote.toString());
const note = new Note(JSONote.title, JSONote.body, JSONote.color);
try {
  console.log(chalk.keyword(note.getColor())(note.getTitle()));
  console.log(chalk.keyword(note.getColor())(note.getBody()));
} catch (_) {
  console.log(chalk.cyan(note.getTitle()));
  console.log(chalk.cyan(note.getBody()));
}
return true;
```

>Un dato a destacar, cuando se lee un fichero haciendo uso del fileSystem, la información entra en un buffer y para hacerla legible hay que usar el método `toString()`

<b><u>clearDataUser</u></b>: Elimina toda la informacion de ese usuario. Para ello simplemente busamos la carpeta de notas del usuario y hacemos un borrado recursivo.

```ts
if (fs.existsSync(`database/${user}`)) 
  fs.rmSync(`database/${user}`, { recursive: true });
```

Por ultimo el fichero que nos permitira ejecutar este programa desde la terminal, mandandole distintos argumentos para realizar todas estas acciones, esto se debe al uso del modulo yargs que nos permite leer losr argumentos que le pasamos a la hora de ejecutar un archivo y realizar ciertas funcionalidades.

Para esto, se define una estructura que varia muy poco, dependiendo de la cnatidad de argumentos que necesitemos, pero la mayoria son iguales en todos los casos, por eso explicare la mas compleja.

El añadir una nota desde la consola, supone la ejecucion del fichero `command` con ciertos parametros, estos parametros, los recoge el modulo yargs y dependiendo de si estan en el codigo del programa ejecuta una parte u otra, en el caso este, el de añadir, ejecutaria este fragmento de codigo.

```ts
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    ...
  },
  handler(argv) {
    ...
  },
});
```

Los sub-argumentos se expecifican dentro del _builder_, en este caso serian necesarios todos los argumentos.

```ts
user: {
  describe: 'User name',
  demandOption: true,
  type: 'string',
},
title: {
  describe: 'Note title',
  demandOption: true,
  type: 'string',
},
body: {
  describe: 'Note body',
  demandOption: true,
  type: 'string',
},
color: {
  describe: 'Note color',
  demandOption: true,
  type: 'string',
},
```

Cuando se ejecuta el fragmento del añadir al finalizar la obtencion de los argumentos y sub-argumentos, se ejecuta una función que se encuentra dentro del _handler_, que es la que realmente lleva a acabo la acción.

> Un dato a mencionar, para manejar los argumentos de forma correcta tiene que haber una comprobacion previa, que sean de tipo string o el tipo que se desee.

```ts
if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === "string") {
  ... // Accion a realizar
} else {
  console.log(chalk.red('Argument invalid'));
}
```

El resto de argumentos como el remove, modify, list, read, siguen la misma filosofia, solo que se usan menos sub-argumentos y otras acciones.