---
title: "Let me introduce: __slots__"
description: "The featherweight version of a Python class"
slug: "let-me-introduce-slots"
date: 2017-09-03
tags: ["python", "slots", "classes", "data structure"]
---

Hey there!

Today I'd like to talk about **__slots__**.

The inspiration for this article comes from a blog post about Python data structures published by [Dan Bader](https://dbader.org/blog/records-structs-and-data-transfer-objects-in-python) and the small iteration we then had on this [gist](https://gist.github.com/barrachri/c7922df84eb171eaa45e466b1b790bce) to check their performances.

For all the examples you are going to see I am using **Python 3.6.2**.

So what are slots? **__slots__** are a different way to define the attributes storage for classes in Python.

If this is not clear bear with me.


```python
# use getsizeof to get the size of our objects
from sys import getsizeof
from sys import version as python_version
print(python_version)
3.6.3 | packaged by conda-forge | (default, Nov  4 2017, 10:13:32)
[GCC 4.2.1 Compatible Apple LLVM 6.1.0 (clang-602.0.53)]
```

```python
class PythonClass:
    """This is a simple Python class"""

    def __init__(self, message):
        """Init method, nothing special here"""
        self.message = message
        self.capital_message = self.make_it_bigger()

    def make_it_bigger(self):
        """Do something with your attributes"""
        return self.message.upper()

    def scream_message(self):
        """Print the capital_message attribute of the instance"""
        print(self.capital_message)

my_instance = PythonClass("my message")
```

So we have a class, <code>PythonClass</code>, and 1 instance of this class, <code>my_instance</code>.

Where are <code>message</code> and <code>capital_message</code> stored?

**Python** uses a special attribute called **dict** to store the instance's attributes:

```python
[element for element in dir(my_instance) if element == '__dict__']
['__dict__']
```

```python
my_instance.__dict__
{'capital_message': 'MY MESSAGE', 'message': 'my message'}
```

```python
my_instance.new_message = "This is a new message"
my_instance.__dict__
{'capital_message': 'MY MESSAGE',
 'message': 'my message',
 'new_message': 'This is a new message'}
```

```python
my_instance.__dict__['another_new_message'] = "Yet a new message"
my_instance.__dict__
{'another_new_message': 'Yet a new message',
 'capital_message': 'MY MESSAGE',
 'message': 'my message',
 'new_message': 'This is a new message'}
```

As you can see, I can add new attributes to <code>my_instance</code> using either the <code>my_instance.name_of_the_attribute</code> notation, or the <code>my_instance.__dict__['name_of_the_attribute']</code> notation.

We can therefore say that for normal Python classes, a **dict** is used to store the instance's attributes.

### Is this bad or good?

Well, this is neither bad nor good, [**dicts** are awesome](https://www.youtube.com/watch?v=npw4s1QTmPg), but not perfect, because there is always a trade-off.

With a dict you have a consistent lookup time, so the access time is more or less O(1) (it doesn't depend on the size of the dictionary), but because it's a mutable object and it can grow, it's a lot heavier (it has to allocate space for this).

Let's look at the **__slots__** now.

```python
class PythonClassWithSlots:
    """This is a simple Python class"""

    __slots__ = ["message", "capital_message"]

    def __init__(self, message):
        """Init method, nothing special here"""
        self.message = message
        self.capital_message = self.make_it_bigger()

    def make_it_bigger(self):
        """Print the message attribute of the instance"""
        return self.message.upper()

    def scream_message(self):
        """Print the message attribute of the instance"""
        print(self.capital_message)

my_instance = PythonClassWithSlots("my message")
```

```python
[element for element in dir(my_instance) if element == '__dict__']
[]
```

So we don't have an attribute called <code>__dict__</code> inside our instance.

But we have a new attribute called **__slots__**.

```python
[element for element in dir(my_instance) if element == '__slots__']
['__slots__']
```

Can we access our attributes as we do with normal classes?
Indeed, we can.

```python
my_instance.message
'my message'
my_instance.capital_message
'MY MESSAGE'
```

Can we add new attributes?

```python
my_instance.new_message = "This is a new message"
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
<ipython-input-14-b3ae014f401d> in <module>()
----> 1 my_instance.new_message = "This is a new message"

AttributeError: 'PythonClassWithSlots' object has no attribute 'new_message'
```

**No, we can't**.

But we can use the attributes that we defined during the class declaration inside **__slots__**.

```python
my_instance.message = "Just putting something new here"
```

### But why would you need to use slots when you have a dict?

Well the answer is that __slots__ are a *lot lighter and slightly faster*.


Are *slots*-based classes lighter than normal classes?

The answer should be yes, **but getting the size of an object is not that easy**.

```python
my_instance_without_slots = PythonClass("my message")
my_instance_with_slots = PythonClassWithSlots("my message")
```

```python
getsizeof(my_instance_without_slots)
56
```

```python
getsizeof(my_instance_with_slots)
56
```

### mmm.....but normal classes should be heavier, shouldn't they?

With [**getsizeof**]("https://docs.python.org/3/library/sys.html#sys.getsizeof) we get the size in **bytes** of our object but not of all the other referenced objects.

So in our case it should be calculated in the following way:

```python
getsizeof(my_instance_without_slots.__dict__)
112
getsizeof(my_instance_with_slots)
56
```

Now it makes a lot more sense.

```python
my_instance_without_slots.new_attribute_1 = "This is a new attribute"
getsizeof(my_instance_without_slots.__dict__)
240
getsizeof(my_instance_with_slots)
56
```

As you can see, the size of **__dict__** changes when we add new elements.

```python
len(my_instance_without_slots.__dict__)
3
```

```python
getsizeof({k:v for k,v in enumerate(range(3))})
240
```

A <code>normal</code> dict, with the same number of elements, will be the same size.
What if we add 10 new elements?


```python
for i in range(10): my_instance_without_slots.__dict__[i] = str(i)
getsizeof(my_instance_without_slots.__dict__)
648
getsizeof(my_instance_without_slots)
56
```

Let's go further with our analysis of __slots__, and compare them with a normal class in a little experiment.

```python
import json

my_json = '''{
    "username": "use@python3.org",
    "country": "Poland", "website":
    "www.chrisbarra.xzy",
    "date": "2017/08/15",
    "uid": 1, "gender": "Male"
}'''
```

In this example we import a json object (think about an api call) using both a normal class and a class with __slots__

```python
class MyUserWithSlots():
    """A kind of user object"""

    __slots__ = ('username', 'country', 'website', 'date')

    def __init__ (self, username, country, website, date, **kwargs):
        self.username = username
        self.country = country
        self.website = website
        self.date = date

class MyUserWithoutSlots():
    """A kind of user object with slots"""

    def __init__ (self, username, country, website, date, **kwargs):
        self.username = username
        self.country = country
        self.website = website
        self.date = date

def get_size(instance):
    """
    If instance has __dict__
    we add the size of __dict__
    to the size of instance.

    In this way we correctly consider both
    size of the instance and of __dict__
    """
    size_dict = 0

    try:
        size_dict = getsizeof(instance.__dict__)
    except AttributeError:
        pass

    return size_dict + getsizeof(instance)
```

```python
# create 1.000.000 instances
NUM_INSTANCES = 1000000
```

```python
# create a list with the size of each instance with slots# create
with_slots = [get_size(MyUserWithSlots(**json.loads(my_json))) for _ in range(NUM_INSTANCES)]

# sum the value inside the list
size_with_slots = sum(with_slots)/1000000

print(f"The total size is {size_with_slots} MB")
The total size is 72.0 MB
```

```python
# create a list with the size of each instance without slots
without_slots = [get_size(MyUserWithoutSlots(**json.loads(my_json))) for _ in range(NUM_INSTANCES)]

# sum the value inside the list
size_without_slots = sum(without_slots)/1000000

print(f"The total size is {size_without_slots} MB")
The total size is 168.0 MB
```

```python
size_reduction = ( size_with_slots - size_without_slots ) / size_without_slots * 100
print(f"Memory footprint reduction: {size_reduction:.2f}% ")
Memory footprint reduction: -57.14%
```

### Wow! ~57% less memory usage thanks to just one line of code.

What about access time?

```python
instance_with_slots = MyUserWithSlots(**json.loads(my_json))
```

```python
%%timeit
z = instance_with_slots.username
69.5 ns ± 20.9 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
```

```python
instance_without_slots = MyUserWithoutSlots(**json.loads(my_json))
```

```python
%%timeit
z = instance_without_slots.username
61.6 ns ± 1.07 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
```

**__slots__** are also slightly faster 👍

Want to know more about **__slots__**?
Check the [official documentation](https://docs.python.org/3/reference/datamodel.html#object.__slots__)

## Questions for you

- What do you think about **__slots__**?
- Is there a use case where you have found **__slots__** extremely useful?

This blog post is a notebook, you can download it from [here](/files/)

Credits

- the picture is taken from [here](https://www.flickr.com/photos/geezaweezer/4753386960/in/photolist-kjEuwD-7dr4X-iBfQ7R-m9XzqT-k64Weg-ddpRxc-bostpX-4DLjZb-6zQjaR-pei5JY-gUnRct-mjTUpd-bsu9nZ-57FhEA-ejxXnc-qWSWoi-dX1DC1-bxHbpW-gUnSxA-rgaxET-kMGKSF-efXrc-jxuT4a-8mUREA-5aLrey-rUzhmu-gg5z-a8R2ZH-hSj2wt-fSEy3R-qDZLpQ-e6ABXa-ifXezw-6gvQGH-8HkDn-riKaDa-mjS5Y4-dpGQwC-dvEGV2-qedMiS-c5XXWU-kuHcwi-jnqsAc-h2KV8D-bdvsZe-buGSXF-8f3mkA-pRkbvg-pFsE33-3i3vw)
