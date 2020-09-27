---
title: "Classes, instances and attributes in Python"
description: "An introduction about namespaces in Python classes"
slug: "classes-instances-and-attributes-in-python"
date: 2016-07-09
tags: ["python"]
comments: true
---

Some days ago I got a simple question.

```python
class A():
    x = 1

a = A()
b = A()

b.x = 11
a.x # ?
```

My answer was wrong but it was the good occasion to pick some books and the **[reference docs](https://docs.python.org/3.5/reference/ "Python 3.5.2 Reference")** back and spend some hours with the concepts behind: **classes**, **instances**, **attributes** and **namespaces**.

_All the things you are going to read are related to Python 3.x._

# Briefly introduction to Scope

In Python you have 2 very important concepts: **scope** and **namespace**.
They are both related but generally **scope** is related to unqualified names (X for example) and **namespace** is related to qualified attribute names (object.X).
Due to the fact that in **Python everything is an object** the difference is slight, but in general we can assume that.

Time for some code

```python
X = 20 # global X
def f():
    print(X)

def f1():
    X = 1 # local X
    print(X)
f() # 20
f1() # 1
```

Python (generally) follows the **LEGB** rule, where LEGB means **Local** -> **Enclosed** -> **Global** -> **Built-in**.

**LEGB** rule means that when you call **X** Python will look in order inside the:

1. Local scope
2. Enclosed scope
3. Global
4. Built-in.

And if Python doesn't find anything it throws an error:

```python
#X = 20
def f():
    print(X)

f() # 20

---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-2-6b47feb56ddf> in <module>()
      3     print(X)
      4
----> 5 f() # 20

<ipython-input-2-6b47feb56ddf> in f()
      1 #X = 20
      2 def f():
----> 3     print(X)
      4
      5 f() # 20

NameError: name 'X' is not defined
```

If you want to know more about **LEGB** you can start from **[here](http://stackoverflow.com/questions/291978/short-description-of-python-scoping-rules "Python LEGB Rule")**.

Let's go back to our classes.

```python
class C(): # class is a reserved keyword used to create class
    X = 10
    def f(self):
        print(X)
c = C()
```

We just defined a simple class, named **C**, **X** is defined inside **class C**, **c** is what we call an **object of C** or an **instance of C**.

**"f"** is a _function_ that accepts 1 parameter, **self**.

```python
print(C.f, c.f)
<function C.f at 0x1039aaae8> <bound method C.f of <__main__.C object at 0x103ea8e10>>
```

Now the first strange part, we called **f**, a function defined inside **C**, and we get **_2 different things_**.

A **_function_** with **C.f** and a **_method_** with **c.f**.

The keyword here is **bound** or at least it's where the main difference lives.

But let's call our function (or method in this case):

```python
c.f()
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-5-5abfb4dafb0b> in <module>()
      4         print(X)
      5 c = C()
----> 6 c.f()

<ipython-input-5-5abfb4dafb0b> in f(self)
      2     X = 10
      3     def f(self):
----> 4         print(X)
      5 c = C()
      6 c.f()

NameError: name 'X' is not defined
```

mmmm.... Python should find **X** following the **LEGB**, does the **LEGB** rule still apply or not ?

Let's try with this:

```python
X = 50
class C():
    X = 10
    def f(self):
        Y = 10
        print(X)
        def f1():
            print(Y)
        f1()
c = C()
c.f()

# Output: 50
# Output: 10
```

We have a nested function (f1) and we added X = 50 in the global scope and now the code works.

**But what about X inside class C ?**

Well **X** (inside class C) is not exactly a _variable_, it's an **attribute** and behaves in a different way from a _variable_ when we talk about **LEGB**.

```python
class C():
    X = 10
    def f(self):
        print(self.X)
c = C()
c.f() # 10
```

We just changed X with **self.X** inside the print function a now it works.

Why ?

Well.... time to explain the concept of **self** and **namespaces**.

# Self

As I said, **self** is just a parameter.

```python
class C():
    X = 10
    def f(legion):
        print(legion.X)
c = C()
c.f() # 10
```

This code works in the same way, we use **self** as a convention, it's just a reference to the **instance**, in this case to the instance **c**, that is passed to the function when we call it.

When we type **c.f()** Python is calling **C.f(c)**, where **C** is the class of our instance, **f** is our function/method and **c** is the first parameter required by **f** (self or legion).

And do you remember this ?

```python
c.f # <bound method C.f of <__main__.C object at 0x1039cf6d8>>
```

Now the meaning of **bound** is more clear, it means that when we call **f** with **c.f** we are automatically passing a reference to our instance.

So from this moment when we talk about a function that accept a self parameter we will call it **instance method**.

And yes you can also have **unbound method**, that are not related to your instances like **class method** or **static method**, but we leave this for the future.

# Namespaces

A namespace is a collection of...names.

A collection of **references** to **objects** like **name=object**.

Why **namespaces** are so important ?

Because every class has a namespace and...... every instance of a class has a namespace too.

They are completely **separated** but related _somehow_.

Let's look inside our class and instance namespaces, we have a built-in attribute for this: **\_\_dict**\_\_

```python
# I cleaned the output of C.__dict__ of all the built-in methods/attributes
C.__dict__ # mappingproxy({'f': <function C.f at 0x1039c1378>, 'X': 10})
c.__dict__ # {}
```

As you can see class namespace and instance namespace are completely different.

Class namespace is a **mappingproxy**, instance namespace is a **dict**.

A mappingproxy is a kind of **read-only** dict.

You can find why mappingproxy is used **[here](http://stackoverflow.com/questions/32720492/why-is-a-class-dict-a-mappingproxy "why-is-a-class-dict-a-mappingproxy")**.

When I said that mappingproxy is read-only I mean that you cannot assign items using the mappingproxy as a dict for example:

```python
C.__dict__['X'] # 10
C.__dict__['X'] = 10 #
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-193-ec143c56e8cd> in <module>()
      1 C.__dict__['X']
----> 2 C.__dict__['X'] = 10

TypeError: 'mappingproxy' object does not support item assignment
```

If you want to put new elements inside your class namespace you have to use other ways.

Back to **C namespace** we can find **f**, our instance method, and **X**.

**X** as we said is not properly a _variable_ and is defined in **C.\_\_dict\_\_**.

How can we call it ? **Class attribute**

And with class attribute we mean that **X** (attribute) belongs to **C** (class), because as we see **X** is inside **C namespace** (C.\_\_dict\_\_).

Can we access directly a class attribute ?

Yes, with **NameOfTheClass.AttributeName**

```python
C.X # 10
```

Just to recap:

1. C namespace contains **f** (a method) and **X** (a class attribute)
2. c namespace is empty
3. We accessed X of C with **self.X**

But before I said that **class namespaces** and **instance namespaces** are completely separated.

```python
class C():
    X = 10
    def f(self):
        print(self.X)
c = C()
c.f() # 10
```

When we type **self.X** we tell Python to "_look inside the namespace of instance **self** for **X**_".

**How can we access something that belongs to C (attribute X) from self.X (our instance) ?**

Time for the next part.

# MRO

MRO means _**Method Resolution Order**_ and is how and why from **self.X** we get **C.\_\_dict\_\_['X']**.

As I said namespace of a class and its instances are separated but somehow related.

**MRO** is behind the "_somehow related_".

When Python look for an attribute, like **self.X**, it will search in order:

1. Instance namespace
2. Class namespace
3. Parents of your class namespace
4. Object

Object is...the mother of all classes but we are not going to talk about _her_ here.

Let's look at another example

```python
class Mother():
    M = 22
class Father():
    F = 34
class Son(Mother, Father):
    S = 10
    def f(self, x):
        print(getattr(self, x))
a = Son()
a.f("M") # Output: 22
a.f("F") # Output: 34
a.f("S") # Output: 10
print(a.M) # Output: 22
print(a.F) # Output: 34
print(a.S) # Output: 10
```

With [getattr](https://docs.python.org/3/library/functions.html#getattr "getattr") we are using our instance (self) and another parameter ("M", "F" or "S") to get our class attributes.

I used [getattr](https://docs.python.org/3/library/functions.html#getattr "getattr") because I can specify dynamically the name of the attribute but is exactly like self.M (or a.M in our case).

As I said our instance is related to its class (Son) and to the superclasses of Son (Mother and Father).

The process of giving an order between your instance and its class and between your class and all its superclasses is called **linearization**.

The algorithm behind Python MRO is called **[C3](https://www.python.org/download/releases/2.3/mro/ "Python MRO")**
and the main thing to remember is this:

- children precede their parents (aka superclasses) and the order of appearance in \_\_bases\_\_ is respected.

Bases are what we put inside the parenthesis after the name of a class: class Name(bases).

- Instance **a** is a child of class **A**
- Class **A** is a child of class **Mother** and **Father**
- Class **Mother** and **Father** are both children of object

With ****bases**** we get a tuple with the parents of a class, with ****class**** we get the class of an instance:

```python
a.__class__ # __main__.A,
Son.__bases__ # (__main__.Mother, __main__.Father)
Mother.__bases__ # (object,)
Father.__bases__ # (object,)
```

Nothing new I would say, can we see the search order of MRO ?

Yes, with **\_\_mro\_\_**:

```python
Son.__mro__ # (__main__.Son, __main__.Mother, __main__.Father, object)
```

When we type the code below:

```python
a.M # 22
```

Python searches in order:

1. a.\_\_dict\_\_
2. Son.\_\_dict\_\_
3. Mother.\_\_dict\_\_
4. Father.\_\_dict\_\_
5. object.\_\_dict\_\_

With the rule first-come first-served.

```python
class Mother():
    M = 22
class Father():
    F = 34
class Son(Mother, Father):
    S = 10
    F = 50
    def f(self, x):
        print(getattr(self, x))
a = Son()
a.F # Output: 50
```

This is why we get 50 here instead of 34.

1. First Python looks inside **a** (Son's instance) namespace, but nothing is found named **"F"**
2. Then it's time to look inside the namespace of Son, class of our instance, and we found **"F"**

And what about F defined inside Father ?

As I said _first-come first-served_, and in our **\_\_mro\_\_** Son namespace is before Father namespace.

And what does it happen if you look for a reference that doesn't exist in all the \_\_mro\_\_ namespaces ?

```python
a.DXIUISD
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
<ipython-input-242-bcb50197f1e4> in <module>()
----> 1 a.DXIUISD

AttributeError: 'A' object has no attribute 'DXIUISD'
```

You get an **AttributeError**.

**But where is the tricky part ?**

MRO and all the things explained above work only when you try to **retrieve** an attribute/method and with **retrieve** I mean object.attribute or object.method in general.

When you try to **assign** an attribute/method (like object.attribute = 10) you do that in the **namespace of the object (instance/class)**.

You can change the behaviour with advanced and magic things (metaclass, inheritance, descriptor, property...) but this is how it **normally** works.

So when we type this:

```python
Son.F
```

Python looks for the attribute inside the namespaces following the \_\_mro\_\_ order.

```python
Son.F = 50
```

But with this the \_\_mro\_\_ doesn't matter, **Python will create a new attribute or change its value if exists**.

```python
class Mother():
    F = 34
class Son(Mother):
    S = 10
    F = 50

Mother.F # 34
Son.F # 50 # operation 1
del(Son.F) # remove F from Son.__dict__ # operation 2
Son.F # 34 # operation 3
Son.F = 30 # operation 4
Son.F # 30
```

Clear how it works ?

1. With Son.F we get 50 because is defined inside Son namespace
2. We delete F attribute from Son namespace
3. There is no attribute inside Son namespace called "F" and the next phase for Python is to look inside Mother namespace, where it finds F = 34
4. The assignment, Son.F = 30, is done inside the Son namespace, now we have a new occurrence for F inside Son namespace, this is why Son.F is 30

Here are the namespaces

```python
{'S': 10, 'F': 50} # After 1
{'S': 10,} # After 2
{'S': 10, 'F': 30} # After 4
```

# **\_\_init\_\_** method

Init method is a special method to customize our instance, and it's called when we create an instance.

```python
class A():
    C = 10
    def __init__(self, x):
        self.x = x
a = A(10)
b = A(50)
```

Translated it means "_when you call A(something) create a new instance of A and assign something to self.x_".

Let's look inside the namespace.

```python
A.__dict__ # (mappingproxy({'__init__': <function A.__init__ at 0x103ecab70>, 'C': 10})
a.__dict__ # {'x': 10}
b.__dict__ #  {'x': 50}
```

**A** has its attributes, C and \_\_init\_\_, **a** and **b** their own x.

The attributes of **a** and **b** are called **instance attributes**, and **they belong to their instance**.

Now it should be clear the output of this:

```python
A.C, a.C, b.C # (10, 10, 10)
```

Both **a** and **b** have no references of the attribute C in their namespaces, so Python looks inside **A** namespace to find something (following the MRO).

But what happens if we do this ?

```python
a.C = 50
a.__dict__ # {'C': 50, 'x': 10}
```

We create a new reference inside **a** namespace.

```python
A.C, a.C, b.C # (10, 50, 10)
```

This is why we get this result, because now when we look for C inside **a** we have an occurrence.

Let's see the **dict** of **A**, **a** and **b** again

```python
A.__dict__ # (mappingproxy({'__init__': <function A.__init__ at 0x103ecab70>, 'C': 10})
a.__dict__ # {'C': 50, 'x': 10}
b.__dict__ #  {'x': 10}
```

But what if we change A.C ?

```python
A.C = 20
A.C, a.C, b.C # (20, 50, 20)
```

a.C remains 50 and b.C still looks inside **A** namespace because its namespace doesn't have any value for "C".

```python
b.C = 70
A.C, a.C, b.C
(20, 50, 70)
```

Now instances **a**, **b** and the class **A** have a reference for "C" in their namespaces.

```python
A.__dict__ # (mappingproxy({'__init__': <function A.__init__ at 0x103ecab70>, 'C': 10})
a.__dict__ # {'C': 50, 'x': 10}
b.__dict__ #  {'C': 70, 'x': 50}
```

# Can I access a class attribute from an instance ?

Yes, but if you have a reference in your namespace with the same name you need to be **explicit**.

```python
class A():
    C = 10
    def __init__(self, x):
        self.x = x
    def p(self):
        print(A.C, self.x)
a = A(10)
b = A(50)
a.p() # 10 10
b.p() # 10 50
```

So we just hardcoded **A.C** inside our method.

Is there a better way ?

```python
class A():
    C = 10
    def __init__(self, x):
        self.x = x
    def p(self):
        print(type(self).C, self.x) # First
        print(self.__class__.C, self.x) # Second
a = A(10)
b = A(50)
a.p() # 10 10
b.p() # 10 50
```

Personally I prefer the second (more clear to me).

# But what if....

we have this code:

```python
class A():
    C = []
    def __init__(self, x):
        self.x = x
    def p(self):
        print(self.__class__.C, self.x)
a = A(10)
b = A(50)
```

and then we type this:

```python
A.C, a.C, b.C # ([], [], [])
a.C.append(50)
A.C, a.C, b.C # ([50], [50], [50])
b.C.append(10)
A.C, a.C, b.C # ([50, 10], [50, 10], [50, 10])
A.C.pop(0)
A.C, a.C, b.C # ([10], [10], [10])
```

The class attribute **A.C** this time seems really _shared_, but also the class attributes that we used before were _initially shared_.

So why we can append and pop elements without any kind of problem ?

**Because we didn't do any kind of assignment**.

And our instances and class are "working" on a mutable object, **accessing the object pointed by the reference (C) and changing it directly**.

```python
a.C = a.C * 2
A.C, a.C, b.C # ([10], [10, 10], [10])
```

After an assignment **a.C** has a new reference inside its namespace.

But the tricky part is this one....if instead of the last code we type this:

```python
a.C *= 2
A.C, a.C, b.C # ?
```

what would be the output ?

```python
([10, 10], [10, 10], [10, 10])
```

In this case we didn't have any new assignment, so we are still changing the referenced object.

Why ?

**Due to how augmented assignments (+=, -=, \*=, /=, ...) work**.

With list and mutable objects there isn't an _assignment_ and the operation is done "in-place", we are just updating the **referenced object** directly.

So back to the initial question...

```python
class A():
    x = 1

a = A()
b = A()

b.x = 11
a.x # ?
```

The answer is 1 because b.x = 11 creates a new attribute (instance attribute) inside **b** namespace.

The namespace of **a** remains empty, so **a.x** will look inside the namespace of **A** where **x** is still equal to 1.

If you wanto to go further with OOP in Python I think nothing is better than [Leonardo Giordani's training](https://speakerdeck.com/lgiordani/object-oriented-python-from-scratch "slides").
