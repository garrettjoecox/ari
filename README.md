# ari [![Build Status](https://secure.travis-ci.org/joelcoxokc/ari.png?branch=master)](https://travis-ci.org/joelcoxokc/ari) [![NPM version](https://badge-me.herokuapp.com/api/npm/ari.png)](http://badges.enytc.com/for/npm/ari)

> Aurelia Scaffolding Command Line Interface

##Getting started

>Install ari

```bash
npm install -g ari
```

Make sure you have gulp installed as well.

```bash
npm install -g gulp
```


Lets create a new project!

Create a new directory and cd into it.

```bash
mkdir my-project && cd my-project
```

**OR** paste this is your `~/.bash_profile`

```bash
function mkd(){
    mkdir "$@" && cd "$@"
}
```

Then Run

```
mkd my-project
```

It's a little easier!

**Now for the good stuff!**

to start your project run the following

```
ari init
```

This will create a JSON file in your directory `ari-config.json`

Now, to add a project run the following.

```bash
ari add project my-project
```

This will create a directory named my-project in your projects directory. 

By default it will generate the aurelia-skeleton-navigation inside your project. 

Now lets add a plugin!

**NOTE:** Projects are different from plugins. We will discuss them later... lets keep moving. 

```bash
ari add plugin my-plugin 
```

This will create a directory named my-plugin in your plugins directory.

By default ari will generate the aurelia-skeleton-plugin inside your plugin.

Now we can simply link the two together!

```bash
ari my-project link plugin my-plugin
```

Ari has run jspm link in your plugin, and jspm install -l your-plugin. into your project.

Now we can simply develop!

```bash
ari my-project watch --plugins my-plugin
```

The only down side is that this is not as simple as running 

```bash
gulp watch
```

However, There is always a way.

```bash
ari my-project set --watch my-plugin

ari use my-project

ari watch
```


**What just happened?**

First, every time you make project you can use the name as a command. **This is not the same for plugins**

We then told my-project to watch my-plugin when being watched. 

```bash
ari my-project set --watch my-plugin
```

This is all we had to do to watch the plugin.

We can now run 

```bash
ari my-project watch
```

However. If we are only working on one project, then we can tell ari to simply use my-project

```bash
ari use my-project
```

This allows use to simply run

```bash
ari watch
```

Now you can open localhost:9000/ and the open you plugin and change stuff, and watch the browser reload, and the plugin change within you project.

###Even Better

>Ari does much more than simply create directories and watch files.

Ari is a full on generator for scaffolding not only your projects and plugins, but also each individual project and plugin... I have even gone as far as scaffolding out your code in each file. 
**Ari can do a lot!!!**

**Here are some examples**

**NOTE:** There are short command for each command I show... However, I will by typing the long commands for readability.

Lets make a plugin

```bash
ari add plugin parse-yolo
```

Now lets begin building out this plugin

Using `ari use as` will allow us to use ari commands as we please. Otherwise we would have to type 
`ari plugin my-plugin [action] [arguments]`

So lets use `use as`.

```bash
ari use plugin my-plugin as build
```

**NOTE:**  For now... there are prompts for any flag not passed.

```bash
ari build add customElement
```

We did not pass any flags so here are the prompts.

```bash
> name?: parse-yolo
```

```bash
> appendName?:(Y/n) Y
```

Any **key:value** pair in the flags or prompts are separated by a collan

**key:value,key:value**

```bash
@key    [name]
@value  [from]

> imports?: Behavior:aurelia-templating,Router:aurelia-router
```

```bash
@key    [boolean]

> view?:(Y/n) N
```

```bash
@key    [Super]

> extends?: Array
```

```bash
@key    [injected]

> inject?: Element
```

```bash
@key    [name:]
@value  [method:attribute:binding]

> metadata?: size,color
```

```bash
@key    [name]

> getters?: name,age
```

```bash
@key    [name]

> setters?: name,age
```

```bash
@key    [name]

> prototypes?: setName,getName,setAge,getAge
```

Once complete, ari will generate a file like the following.

```javascript
import {Behavior} from 'aurelia-templating'
import {Router} from 'aurelia-router'

export class ParseYoloCustomElement extends Array{

    static metadata(){
        return Behavior
            .withProperty('size')
            .withProperty('color')
            .noView()
    }

    static inject(){
        return [Element]
    }

    get name(){}
    get age(){}

    set name(value){}
    set age(value){}

    constructor(element) {}
    
    attached(){}
    bind(){}

    sizeChanged(newSize){}
    colorChanged(newColor){}

    setName(){}
    getName(){}
    setAge(){}
    getAge(){}
}
```

##add

`ai add [plugin | project] [name]` 

The **add** command allows you to add a plugin or project repository.

Once  a project is added, the project name becomes a command. 

##use 

`ai use [name]`

The **use command creates a shortcut that allows you to not have to prefix your projects with the word project like so.. `ai project my-project [action]`

After running `ai use project my-project`, all the project commands are now accessible by just typing `ai [action]`. 

##delete

>alias = ai del

`ari del [project | plugin] [name]`

Obviously deletes them. No record is kept... so make sure you have pushed or held your changes.

##hold

`ari hold [project | plugin] [name]`

Hold is great! you know how you always want to just grab a clean directory and place you code in it... or completely refresh your project to a new directory... but don't want to loose your current code. 

I myself, and I see a lot of people put like two underscores in the dir name.

    __some_plugins/
    some_plugin/

This gets annoying when there is a lot. 

Ari hold duplicates your project or plugin, 
and places it in the root `./.holding` directory. 

##restore

`ari restore [project | plugin] [name]`

Restores directories that have been held. 

**NOTE:** it will not overwrite existing code. 

If it's restore location already exists.... it will then place an underscore before it.. or more if necessary.  


##project 

The ari project command can be used in one of two ways. 

It can be considered as a selector for the projects directory. 

[**select name to perform action on next-name**]

`ari project [project-name] <add | use | delete | hold | restore> [name]`

[**used:name perform action on next-name**]

`ari [project-name] <add | use | delete | hold | restore> [name]`

##plugin

The ari plugin command can be used one of two ways

It can be considered as a selector for the plugins directory.

#More coming soon

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/joelcoxokc/ari/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/joelcoxokc/ari/issues).

## License 

The MIT License

Copyright (c) 2015, JoelCox

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

