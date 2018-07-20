---
title: "The code review that never happened"
description: "AKA try/except properly and log!"
slug: "the-code-review-that-never-happened"
date: 2017-11-03
tags: ["python", "try except", "logging"]
comments: true
---

I am currently working as consultant for a mid-sized company in Europe, where my goal is to try to keep their old Django application alive (running Django 1.5.5).

<br />

A few weeks ago, it became clear to me that the server running the application was down.
Something wasn't working properly, and yet the logs were completely silent.

<br/>

So I said… well, there must be an <code>except: pass</code> somewhere and I started looking for it (so much for my Friday night…)

<br \>


![screaming code](/images/the-code-review-that-never-happened/code.png "screaming code")


This code was running somewhere in production.

So I just removed the comments and the code inside each block - everything else I left just as it was.

<br/>

_So, let's imagine for a second that we went back 4 years (November 2013), and that my colleague, named <code>Charlie</code> (random name), had just made a PR to add this code to our codebase._


## Let's begin.

Hey Charlie, thanks for the PR.

The code logic looks ok, but **there are a few things that I would definitely change**.

### 1. Did you forget the docstring?

Charlie have you read **[this](https://www.python.org/dev/peps/pep-0257/)**?

<br/>

I think it's always  **good practice to add docstrings**: to at least try to explain, even just briefly how your function behaves, and maybe also add something  about its parameters.

It could be invaluable for your  colleagues or, indeed, anyone who is going to be working on the code in the future (.......).

<br/>

The name of the function really does not tell us that much about the ‘story’ of your code.
A general explanation about how your are **dehydrating** your data would be very much appreciated!


### 2. Don't <code>except: pass</code>

Charlie, I see from the PR that you worked on this very late in the evening..... perhaps this explains it.

Nonetheless, what were you trying to do with **except: pass**

**You are silently catching all the errors, without even logging them.**


```python
try:
    1/0
except:
    pass
```

Do you see?

No error is raised, even if we are dividing by zero.

```python
try:
    1/0
    CONSTANT = 0
    CONSTANT["DON-T-EXIST"] = 0
except:
    pass
```

Same goes here - you are silently catching every kind of exception.

So please:

- remove **pass**
- log this exception somehow, the [https://docs.python.org/3/library/logging.html](logging module) is a good place to start.
- **be more specific about the exception you want to catch (check the example)**
- don't **except: pass**


```python
# example for Charlie

import logging

log = logging.getLogger(__name__)

try:
    1/0
except ZeroDivisionError:
    log.error("Division by Zero")

Division by Zero
```

In any case - great job. Keep up the hard work.

<br />

And, just in case you have forgotten: - please *don't except: pass*.

<br />

_Sincerely, your colleague and a future reader of your code._


## Takeaways for the *current* readers

### 1. Code Reviews

Do code reviews: - they are extremely useful, not only to pick up on bad practice.

### 2. Docstrings

Use docstrings: - they will be extremely useful in the future.

### 3. Catch errors

<code>Try/Except</code> is really powerful, but use it properly: - to catch specific errors and log them.


### 4. Feedback

**Proper** feedback is fundamental if you want to grow, both in technical skills and in what are generally called **soft skills**.

I say **proper** feedback, because feedback given in the wrong way is probably more harmful than not giving a feedback at all.

If you want to know more about how to give proper feedback, here’s a good starting point: [http://www.ustream.tv/recorded/102892183](http://www.ustream.tv/recorded/102892183)
