# -*- coding: utf-8 -*-

from __future__ import unicode_literals
import time

# Data about this site
BLOG_AUTHOR = "Christian Barra"
BLOG_TITLE = "chrisbarra.xyz"
SITE_URL = "https://www.chrisbarra.xyz/"
BLOG_EMAIL = "barrachri@gmail.com"
BLOG_DESCRIPTION = '''Hi ! My name is Christian and this is my blog,
                    I write about my projects, my travels and a lots of other interesting stuff'''

DEFAULT_LANG = "en"
WRITE_TAG_CLOUD = False

# What other languages do you have?
# The format is {"translationcode" : "path/to/translation" }
# the path will be used as a prefix for the generated pages location
TRANSLATIONS = {
    DEFAULT_LANG: "",

}

TRANSLATIONS_PATTERN = "{path}.{ext}.{lang}"

NAVIGATION_LINKS = {
    DEFAULT_LANG: (
        ('/categories/index.html', 'Tags'),
        ('/rss.xml', 'RSS'),
    ),
}

POSTS = (
("posts/*.md", "posts", "post.tmpl"),
("posts/*.rst", "posts", "post.tmpl"),
("posts/*.ipynb", "posts", "post.tmpl"),
("posts/*.txt", "posts", "post.tmpl"),
)
PAGES = (
("stories/*.md", "", "story.tmpl"),
("stories/*.rst", "", "story.tmpl"),
("stories/*.txt", "", "story.tmpl"),
)

COMPILERS = {
    "rest": ('.rst', '.txt'),
    "markdown": ('.md', '.mdown', '.markdown'),
    "ipynb": ('.ipynb',),
    "html": ('.html', '.htm'),
    }

TAG_PATH = "tags"

# If TAG_PAGES_ARE_INDEXES is set to True, each tag's page will contain
# the posts themselves. If set to False, it will be just a list of links.
# TAG_PAGES_ARE_INDEXES = True

# Final location for the main blog page and sibling paginated pages is
# output / TRANSLATION[lang] / INDEX_PATH / index-*.html
# INDEX_PATH = ""

# Create per-month archives instead of per-year
# CREATE_MONTHLY_ARCHIVE = False
# Create one large archive instead of per-year
# CREATE_SINGLE_ARCHIVE = False
# Final locations for the archives are:
# output / TRANSLATION[lang] / ARCHIVE_PATH / ARCHIVE_FILENAME
# output / TRANSLATION[lang] / ARCHIVE_PATH / YEAR / index.html
# output / TRANSLATION[lang] / ARCHIVE_PATH / YEAR / MONTH / index.html
# ARCHIVE_PATH = ""
# ARCHIVE_FILENAME = "archive.html"

# URLs to other posts/pages can take 3 forms:
# rel_path: a relative URL to the current page/post (default)
# full_path: a URL with the full path from the root
# absolute: a complete URL (that includes the SITE_URL)
# URL_TYPE = 'rel_path'

# Final location for the blog main RSS feed is:
# output / TRANSLATION[lang] / RSS_PATH / rss.xml
# RSS_PATH = ""

# Number of posts in RSS feeds
# FEED_LENGTH = 10

# Slug the Tag URL easier for users to type, special characters are
# often removed or replaced as well.
# SLUG_TAG_PATH = True

# A list of redirection tuples, [("foo/from.html", "/bar/to.html")].
#
# A HTML file will be created in output/foo/from.html that redirects
# to the "/bar/to.html" URL. notice that the "from" side MUST be a
# relative URL.
#
# If you don't need any of these, just set to []
# REDIRECTIONS = []

# Commands to execute to deploy. Can be anything, for example,
# you may use rsync:
# "rsync -rav --delete output/ joe@my.site:/srv/www/site"
# And then do a backup, or run `nikola ping` from the `ping`
# plugin (`nikola install_plugin ping`).
# To do manual deployment, set it to []
# DEPLOY_COMMANDS = []

# Where the output site should be located
# If you don't use an absolute path, it will be considered as relative
# to the location of conf.py
OUTPUT_FOLDER = 'public'

# Name of the theme to use.
THEME = "chrisbarra.xyz"


INDEX_TEASERS = False


# A HTML fragment describing the license, for the sidebar.
LICENSE = ""
# I recommend using the Creative Commons' wizard:
# http://creativecommons.org/choose/
# LICENSE = """
# <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/ar/">
# <img alt="Creative Commons License BY-NC-SA"
# style="border-width:0; margin-bottom:12px;"
# src="http://i.creativecommons.org/l/by-nc-sa/2.5/ar/88x31.png"></a>"""

COMMENT_SYSTEM = "disqus"
# And you also need to add your COMMENT_SYSTEM_ID which
# depends on what comment system you use. The default is
# "nikolademo" which is a test account for Disqus. More information
# is in the manual.
COMMENT_SYSTEM_ID = "chrisbarra"

PAGE_INDEX = False

PRETTY_URLS = True

# If True, publish future dated posts right away instead of scheduling them.
# Defaults to False.
FUTURE_IS_NOW = False

# If True, future dated posts are allowed in deployed output
# Only the individual posts are published/deployed; not in indexes/sitemap
# Generally, you want FUTURE_IS_NOW and DEPLOY_FUTURE to be the same value.
DEPLOY_FUTURE = False
# If False, draft posts will not be deployed

# Allows scheduling of posts using the rule specified here (new_post -s)
# Specify an iCal Recurrence Rule: http://www.kanzaki.com/docs/ical/rrule.html
# SCHEDULE_RULE = ''
# If True, use the scheduling rule to all posts by default
# SCHEDULE_ALL = False
# If True, schedules post to today if possible, even if scheduled hour is over
# SCHEDULE_FORCE_TODAY = False

# Do you want a add a Mathjax config file?
# MATHJAX_CONFIG = ""

# If you are using the compile-ipynb plugin, just add this one:
#MATHJAX_CONFIG = """
#<script type="text/x-mathjax-config">
#MathJax.Hub.Config({
#    tex2jax: {
#        inlineMath: [ ['$','$'], ["\\\(","\\\)"] ],
#        displayMath: [ ['$$','$$'], ["\\\[","\\\]"] ]
#    },
#    displayAlign: 'left', // Change this to 'center' to center equations.
#    "HTML-CSS": {
#        styles: {'.MathJax_Display': {"margin": 0}}
#    }
#});
#</script>
#"""

# Do you want to customize the nbconversion of your IPython notebook?
# IPYNB_CONFIG = {}
# With the following example configuracion you can use a custom jinja template
# called `toggle.tpl` which has to be located in your site/blog main folder:
# IPYNB_CONFIG = {'Exporter':{'template_file': 'toggle'}}

MARKDOWN_EXTENSIONS = ['fenced_code', 'codehilite']


# Show only teasers in the RSS feed? Default to True
FEED_TEASERS = False


# Additional metadata that is added to a post when creating a new_post
ADDITIONAL_METADATA = {
 'sub_title' : '',
 'img_name' : '',
 'img_name_small' : '',
 }


# If webassets is installed, bundle JS and CSS to make site loading faster
USE_BUNDLES = False


LOGGING_HANDLERS = {
    'stderr': {'loglevel': 'WARNING', 'bubble': True},
}

GLOBAL_CONTEXT = {}
