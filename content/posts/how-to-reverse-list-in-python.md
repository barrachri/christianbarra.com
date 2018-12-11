---
title: How to reverse a list in Python
description: Reversing a sequence object in Python takes only 1 line
date: 2018-12-05
tags: ["python", "tips&tricks", "list", "slice"]
comments: true
---

<center>
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How to reverse a list using the square brackets notation with <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a>? <a href="https://twitter.com/hashtag/europython?src=hash&amp;ref_src=twsrc%5Etfw">#europython</a> <a href="https://t.co/4C4i9LWv1r">pic.twitter.com/4C4i9LWv1r</a></p>&mdash; Christian Barra (@christianbarra) <a href="https://twitter.com/christianbarra/status/1022074115476389888?ref_src=twsrc%5Etfw">July 25, 2018</a></blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

Reversing a list in Python is really, really easy.

This doesn't apply only to `list` but to [sequence](https://docs.python.org/3/glossary.html#term-sequence) in general (string and tuple for example).

```python
msg = "hello there"
print(msg[::-1])
# ereht olleh

my_tuple = (1, 2, 3)
print(my_tuple[::-1])
# (3, 2, 1)
```

The secret behind this magic? The [slice object](https://docs.python.org/3/library/functions.html#slice).

```python
name = "christian"
print(name.__getitem__(slice(None, None, -1)))
# 'naitsirhc'
```

While old I really recommend reading the [Python 2.3 What's new](https://docs.python.org/3/whatsnew/2.3.html?highlight=slice#extended-slices), when the support for built-in types was introduced.
