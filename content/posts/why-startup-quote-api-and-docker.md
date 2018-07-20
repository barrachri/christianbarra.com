---
title: "Why, startup quote api and Docker"
description: "A little intro to my blog, docker and a good book to read"
slug: "why-startup-quote-api-and-docker"
date: 2014-04-19
tags: ["startup", "docker"]
comments: true
---

My first blog and my first post.

The reason to start a blog ? The Why ? (I've just finished reading [Start with Why by Simon Sinek](http://amzn.to/1j6vlHN "Start with Why by Simon Sinek")....)

- Share my experience and projects
- Learn about your experience and projects

Although in the last 100 years technology improve our lives quality about a 10x factor, we still study/learn in the same way of 2000 years before.
Write and read are still the best method to share knowledge.

So, here I am.

<!-- TEASER_END -->
In honour of [the Daniel Pennac's ten rules](http://www.oup.it/files/Documenti/ReadOn/RightsoftheReaderbyPennac.pdf "The rights of the Reader") I'll follow 3 simple rules to make more enjoyable reading this blog:

1. Don't write more than 900 words;
2. Be interesting ([don't try to be, remember Yoda ?](https://www.youtube.com/watch?v=BQ4yd2W50No));
3. Write for your and my fun

So I'll don't overwhelming you with hundreds of thousands of sentences about who come first between egg or chicken.
I'll figure out the best I can write about my entreprenurship plan, experience, hobbies, travel (I'm planning to see some countries) and about my strange country (Italy).

I think is always interesting to know what there is behind something, for example behind this blog.
Well, I love python and after start this blog with django I choose to use [Nikola](http://getnikola.com/ "Nikola Static Site Generator"), a simple and powerful static site generator and hosting it with github.

The dynamic part of the site is based on javascript and ajax calls to a simple django backend.
You can use this url [api.chrisbarra.me/api/quote/get](http://api.chrisbarra.me/api/quote/get "api.chrisbarra.me json") to get a random quote (json format) or [api.chrisbarra.me](http://api.chrisbarra.me "api.chrisbarra.me html") to see a simple html page.

Back to architect, I use a [Digital Ocean vps](https://www.digitalocean.com/?refcode=16e2312f412e "Digital Ocean"), with Ubuntu and Docker.
Docker is awesome, for the first 2 hours. After that I have a form of hate and love (much love than hate), but I'll talk about this in the next weeks.

I have 1 simple docker container with python, uWSGI and NGINX.

[Here](https://github.com/barrachri/dockerfiles "barrachri Repo") you can find my repo with my docker and config files.

Now ssh your digital ocean vps or whatever you want to use
<pre>ssh root@ipyourhostmachine</pre>
Change your dir
<pre>
&#35; Clone git repository of your project or change your directory with your ROOT
&#35; project directory, this is very important because this command "ADD ./ /app"
&#35; copy all your files from your current directory to the /app container's dir
cd rootprojectdir
</pre>
Download my Dockerfile
<pre>
&#35; Always from ROOT directory of your project download my Dockerfile
&#35; remember to change your uwsgi.ini if your wsgi.py is not located in api/wsgi.py dir
&#35; More information in my Dockerfile
sudo curl -o Dockerfile https://raw.githubusercontent.com/barrachri/dockerfiles/master/dockerfile/Dockerfile_app
</pre>
Build image from Dockerfile and name it appserver_image
<pre>docker build -t appserver_image .</pre>
Run a container from appserver_image and expose port 80 from the container to port 80 of the host machine and name this container appserver
<pre>docker run -d -p 80:80 --name appserver appserver_image</pre>
We looking for mount point directories between our container and host machine
<pre>docker inspect --format='{{.Volumes}}' appserver</pre>
The output will be something like this
<pre>
map[
/app:/var/lib/docker/vfs/dir/strangehashcode
/etc/nginx/sites-enabled:/var/lib/docker/vfs/dir/strangehashcode
/var/log/nginx:/var/lib/docker/vfs/dir/strangehashcode]
</pre>
If you want to stop and restart your container
<pre>
docker stop appserver
docker start appserver
</pre>
If something went wrong simple
<pre>
docker logs appserver
</pre>
After that we need to set this container to start automatically, we can do that with [supervisor](http://supervisord.org/ "Supervisord")
<pre>
sudo apt-get install supervisor
sudo nano /etc/supervisor/supervisord.conf
</pre>
And add this text at end
<pre>
[program:appserver]
command=/usr/bin/docker start -a appserver
</pre>
Save and then
<pre>sudo reboot</pre>

Now your python app should be online !

I hope this was useful for other questions I’m here !

__*Tsuduku !*__
