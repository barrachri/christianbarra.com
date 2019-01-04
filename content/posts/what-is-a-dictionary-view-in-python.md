---
title: What is a dictionary view in Python
description: Dictionary views is a neat feature somehow hidden under the mightyness of the Python Dictionary
date: 2018-12-30
tags: ["python", "tips&tricks", "dictionary", "views", "set"]
comments: true
---

<center>
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Did you know that &quot;dict.keys()&quot; returns a view that is a set-like object? <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a> <a href="https://t.co/0zS9FgnkLL">pic.twitter.com/0zS9FgnkLL</a></p>&mdash; Christian Barra (@christianbarra) <a href="https://twitter.com/christianbarra/status/1024266442374557696?ref_src=twsrc%5Etfw">July 31, 2018</a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

Python's dictionaries are cool but have you ever checked `keys`, `items` and `values` methods? They are special.

They all return a special object, called [views](https://docs.python.org/3/library/stdtypes.html#dictionary-view-objects).

Why views are useful?

* they provide a dynamic view on the underline objects (you change the dictionary and the view will change as well)
* in the case of `keys` and `items` they behave like a set-like (in case of items when the pairs are hashable)

The set-like property is really useful, wanna find common keys between 2 dictionaries?

Let's consider an example

```python
first_dictionary = {"a": 1, "b": 2}
second_dictionary = {"b": 2, "c": 3}

first_dictionary.keys() & second_dictionary.keys()
# {'b'}
```

`&` is the [intersection operator](https://docs.python.org/3.6/library/stdtypes.html#frozenset.intersection) and returns the common elements between our dictionaries' keys in this case.

What about the elements that are not in common?

```python
first_dictionary = {"a": 1, "b": 2}
second_dictionary = {"b": 2, "c": 3}

first_dictionary.keys() ^ second_dictionary.keys()
# {'a', 'c'}
```

This is called [simmetric difference](https://docs.python.org/3.6/library/stdtypes.html#frozenset.symmetric_difference), you can use all the [set operations](https://docs.python.org/3.6/library/stdtypes.html#set-types-set-frozenset).

One thing that you cannot do is change the dictionary while iterating over the view object

```python
for key, value in first_dictionary.items():
    del first_dictionary[key]

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
RuntimeError: dictionary changed size during iteration
```
