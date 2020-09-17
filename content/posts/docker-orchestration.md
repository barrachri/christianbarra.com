---
title: "Docker orchestration"
description: "How to use Docker Compose to manage a simple app stack"
slug: "docker-orchestration"
date: 2015-02-09
tags: ["docker", "flask"]
comments: true
---

I've made a blog post about Docker some months ago.

During this time a lot of things changed.

The last version of Docker is **[1.5.0-rc4](https://github.com/docker/docker/releases "Docker version")** and Fig project is now **[docker-compose](https://github.com/docker/fig/releases "dcoker-compose")**.

I've tried docker-compose and I think there have been huge improvements in containers orchestration.

**Now you can manage simple or complex containers architecture with only a few lines of code.**

The only limitation is that containers need to be on the same host.

But let's start a basic project, a simple flask app with nginx as proxy and static server and postgres.

The flask app is very simple, you have an index page where your can write and read comments.

#To start

So what we need ?

In my case a [Digital Ocean](https://www.digitalocean.com/?refcode=16e2312f412e "Digital Ocean") droplet (I'm using Fedora 21).

So, first of all we connect to our vm with ssh.

```bash
$ ssh root@yourvmip
```

Now that we are inside we need to install git, Docker and docker-compose.

```bash
$ yum -y install git docker python-pip
$ pip install docker-compose==1.1.0-rc2
$ systemctl start docker
$ systemctl enable docker
```

That's all we need to play with Docker.

This is our directory tree of our project, quietly standard as you can see.

```
yourappdir/
    - nginx/
        - static/
            - put your static file here
        - sites-enabled/
            - app
        - Dockerfile
    - templates/
        - index.html
    - .gitignore
    - app.py
    - build.yml
    - Dockerfile
    - README
    - requirements.txt
```

So let's start to analyze every part, app, nginx, Dockerfiles and build.yml.

The remaining files, .gitignore, README and requirements.txt are pretty standard and I think there's not to much to say.

[Here](https://github.com/barrachri/flask_docker "flask_docker Repository") you can find the repo of this project.
#App

If you don't know [Flask](http://flask.pocoo.org/ "Flask") it's the right time to spend some hours to learn it, simple and powerful !

That's our app, we have some imports, one line config, our models and views.

```python
## yourdirapp/app.py ##

## import ##
import datetime
from flask import Flask, request, render_template, g
from peewee import PostgresqlDatabase, Model, CharField, TextField, DateTimeField, OperationalError, ProgrammingError

## config ##
DEBUG = False

## models ##
user = 'postgres'
host = 'postgres'
database = 'postgres'
psql_db = PostgresqlDatabase(database, user=user, host=host)

class Comment(Model):
    title = CharField()
    body = TextField()
    date = DateTimeField()
    author = CharField()
    class Meta:
        database = psql_db

try:
	Comment.create_table()
except (OperationalError, ProgrammingError):
	print("Comment table already exists!")

## views ##
app = Flask(__name__)
app.config.from_object(__name__)

@app.before_request
def before_request():
	g.db = psql_db
	g.db.connect()

@app.after_request
def after_request(response):
	g.db.close()
	return response

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
    	title = request.form['title']
    	author = request.form['author']
    	body = request.form['text']
    	comment = Comment.create(
    		title=title,
    		body=body,
    		author=author,
    		date=datetime.datetime.now())
    	comment.save()
    comments = Comment.select().order_by(Comment.date.desc())
    return render_template('index.html', comments=comments)

if __name__ == '__main__':
	app.run()
```

Simple right ?

We use [Peewee](http://docs.peewee-orm.com/en/latest/ "Peewee") as ORM.

And here is the index.html template, based on jinja2

```html
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flask app</title>
    <link rel="stylesheet" href="/static/css/foundation.css" />
    <script src="/static/js/vendor/modernizr.js"></script>
  </head>
  <body>
    <div class="row">
      <div class="large-12 columns">
        <h1>Welcome to Flask</h1>
      </div>
    </div>
    <div class="row">
      <div class="large-8 medium-8 columns">
        <!-- Grid Example -->
        <h5>Write something !</h5>
        <form action="." method="POST">
          <div class="row">
            <div class="large-12 columns">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder="Insert comment title"
              />
            </div>
          </div>
          <div class="row">
            <div class="large-4 medium-4 columns">
              <label>Author</label>
              <input name="author" type="text" placeholder="Your name" />
            </div>
          </div>
          <div class="row">
            <div class="large-12 columns">
              <label>Message</label>
              <textarea name="text" placeholder="Comment body"></textarea>
            </div>
          </div>
          <input type="submit" class="button" value="Submit" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="large-8 medium-8 columns">
        {% for comment in comments %}
        <hr />
        <h3>{{comment.id}} - {{comment.title}}</h3>
        <h5>{{comment.author}} - {{comment.date}}</h5>
        <!-- Grid Example -->
        <div class="row">
          <div class="large-12 columns">
            <div class="callout panel">
              <p>{{comment.body}}</p>
            </div>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
    <script src="/static/js/vendor/jquery.js"></script>
    <script src="/static/js/foundation.min.js"></script>
    <script>
      $(document).foundation()
    </script>
  </body>
</html>
```

With flask we are done.

#Nginx
We use nginx as proxy, to redirect some request to our python app and to serve our static files.

That's our sites-enabled conf

```nginx
# yourappdir/nginx/sites-enabled/app
server {
    listen 80;
    server_name yourwebsite.com;
    charset     utf-8;
    location /static {
        alias /www/static; # your project's static files
        }
    location / {
        proxy_pass http://python:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```

The only thing that can looks strange is "proxy_pass http://python:8000", when we link a container to another container Docker insert a new line inside linked container
/etc/hosts, something like "172.0.0.x python".

This is how our nginx container know our python app ip.

#Docker and docker-compose file
And now it's the time to talk about Docker and docker-compose.

This is our one line Dockerfile used to build python app container.

We use the power of [ON BUILD](https://docs.docker.com/reference/builder/#onbuild "ON BUILD") to install all requirements and copy the current directory inside the container /usr/src/app

```
# yourappdir/Dockerfile
FROM python:3.4.2-onbuild
```

This is Dockerfile for nginx container

```
# yourappdir/nginx/Dockerfile
FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
ADD sites-enabled/ /etc/nginx/sites-enabled
ADD static/ /www/static
```

For postgres we use the official image available on Docker registry.

Now it's the time for docker-compose.

I think that docker-compose it's a great tool that Docker didn't have.

Basically we have a [CLI](https://github.com/docker/fig/blob/master/docs/cli.md "CLI") and a [yml file](https://github.com/docker/fig/blob/master/docs/yml.md "yml file") that describes which containers you want to create and some options.

If you have some experience with Docker you'll see something familiar in some parameters.

In our case we create 3 containers, python, nginx and postgres

The first line (python, nginx and postgres) are just alias for the containers

```yaml
######################
## PYTHON CONTAINER ##
######################
python:
  restart: always
  build: .
  expose:
    - "8000"
  links:
    - postgres:postgres
  volumes:
    - /usr/src/app
  command: /usr/local/bin/gunicorn -w 2 -b :8000 app:app

#####################
## NGINX CONTAINER ##
#####################
nginx:
  restart: always
  build: ./nginx/
  ports:
    - "80:80"
  volumes:
    - /www/static
  links:
    - python:python

####################
## POSTGRES CONTAINER ##
####################
postgres:
  restart: always
  image: postgres
  expose:
    - "5432"
```

Cool, that's all !

now we can type this command

```bash
$ docker-compose --file build.yml up -d
```

And docker-compose will start to create and run our Docker containers.
First it tries to pull/build the image specified then it creates and runs the
Docker container with our parameters and the right order.

In our example postgres will be created before the python container and nginx will be the last created container.

How to check which containers are running ?

```bash
$ docker-compose --file build.yml ps
```

And how to see the logs of containers ?

```bash
$ docker-compose --file build.yml logs
```

#Problems
I would like to tell more about some "issues" that I've met.

###Postgres database

It is fucki\*ng hard to create a postgres database without using psql or connect directly to the database.
In my example database must exist before or at the same time that app was running, essentially because without the database you'll get some errors.

So I've tried to use pyscopg2 to check if the database exists or not and then create it, but without great results.

The best solution probably is to create a new database during image creation, but in the official Postgres image this option is still not available.

In my case I've used the default "postgres" db.

###Image and container rebuild
I think can be a good option to have the possibility to choice which containers recreate and which not and the same for the images.
For example I would like to have some data containers inside build.yml but it's risky, because with _rm_ you remove all containers inside your build.yml...

```bash
$docker-compose --file build.yml rm
# SHIT MY DATABASE DATA ARE LOST !
```

Of course you have "--no-recreate" option but is referred to existing containers.

Now it's time for my questions.

Do I miss something ? Or maybe I could make something better ?

I like to hear your experiences about how to handle Docker orchestration !
