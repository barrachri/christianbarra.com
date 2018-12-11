---
title: Discovering the pathlib module
description: Moving with elegance through the filesystem
date: 2018-12-11
tags: ["python", "tips&tricks", "pathlib", "file system"]
comments: true
---

<center>
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The more I use <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a> pathlib, the more I love it. <a href="https://twitter.com/hashtag/EuroPython?src=hash&amp;ref_src=twsrc%5Etfw">#EuroPython</a> <a href="https://t.co/GENcbk76ne">pic.twitter.com/GENcbk76ne</a></p>&mdash; Christian Barra (@christianbarra) <a href="https://twitter.com/christianbarra/status/1022436417887248384?ref_src=twsrc%5Etfw">July 26, 2018</a></blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

The [Python Standard Library](https://docs.python.org/3/library/index.html) is like a gold mine, and the [pathlib](https://docs.python.org/3/library/pathlib.html#module-pathlib) module is really a gem.

`pathlib` provides an useful abstraction on top of different filesystems (posix and Windows).

But that's just a small part of the very friendly user experience that you can have.

```bash
# files in my folder
README.md  example.py subfolder/README.md
```

We can import `Path` from `pathlib`

```python
from pathlib import Path

path = Path(".")
# PosixPath('.')

files = [file for file in path.iterdir()]
# [PosixPath('subfolder'), PosixPath('README.md'), PosixPath('example.py')]
```

`Path()` returns (in this case) a `pathlib.PosixPath` object with a very handy `iterdir`, a useful generator for when you have a lot of files in your folder.

```python
path.iterdir()
<generator object Path.iterdir at 0x10aca2cf0>
```

Do you want to get only the files with a specific format?

```python
md_files = [
    file for file in path.iterdir() if file.suffix == '.md'
    ]
# [PosixPath('README.md')]
```

You can get a similar result using `glob`

```python
md_files = [file for file in path.glob("*.md")]
# [PosixPath('README.md')]
```

`glob` is quite powerful, using the `**` pattern you can search recursively

```python
md_files = [file for file in path.glob("**/*.md")]
# [PosixPath('README.md'), PosixPath('subfolder/README.md')]
```

If you want to learn more about the `pathlib` module the [PEP 428](https://www.python.org/dev/peps/pep-0428/) and the [official documentation](https://docs.python.org/3/library/pathlib.html#module-pathlib) are the right places where to start.
