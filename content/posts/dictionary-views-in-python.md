---
title: Python dictionary views
description: Digging into one of the coolest features of the Mighty Dictionary
date: 2019-01-07
tags: ["python", "tips&tricks", "dictionary", "views", "set"]
comments: true
---

<center>
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Did you know that &quot;dict.keys()&quot; returns a view that is a set-like object? <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a> <a href="https://t.co/0zS9FgnkLL">pic.twitter.com/0zS9FgnkLL</a></p>&mdash; Christian Barra (@christianbarra) <a href="https://twitter.com/christianbarra/status/1024266442374557696?ref_src=twsrc%5Etfw">July 31, 2018</a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

Dictionary is one of the Python's greatest features and using the `keys()`, `items()` and `values()` methods is really common.

```python
first_dictionary = {"a": 1, "b": 2}
for key, value in first_dictionary.items():
    print(f"Key {key} with value {value}")

# Key a with value 1
# Key b with value 2
```

But do you know which kind of object is returned?

They all return a special object called [view](https://docs.python.org/3/library/stdtypes.html#dictionary-view-objects).

Why are __views__ useful?

* they provide a dynamic view on the underline object (you change the dictionary and the view will change as well)
* the object returned by `keys()` and `items()` behaves like a set-like object (with `items()` when the pairs are [hashable](https://docs.python.org/3/glossary.html#term-hashable))

And being a set-like object means you can use the [set operations](https://docs.python.org/3.6/library/stdtypes.html#set-types-set-frozenset).

Let's consider an example, where we want to find the common keys between 2 dictionaries.

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

This is called [simmetric difference](https://docs.python.org/3.6/library/stdtypes.html#frozenset.symmetric_difference).

__One thing that you cannot do is change the dictionary while iterating over the view object.__

```python
for key, value in first_dictionary.items():
    del first_dictionary[key]

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
RuntimeError: dictionary changed size during iteration
```
