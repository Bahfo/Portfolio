# B-Sharp Project
## *The B-Sharp Programming Language Official Source Code*

This repository contains all source codes for the B-Sharp Programming Language. 

## Table of Contents
1. Getting Started.
2. Downloading the Source Code.
3. Using B-Sharp.
4. The Standard Libraries.
5. Environments.
6. Packages Support and SDKs.
7. A Word to Users.

## Getting Started
Welcome to the Official Repository for the B-Sharp Programming Language!
B-Sharp is a project maintained by EXcellent TechStacks and aims to implement a syntax-clean and simple programming language that serves four objectives:
- An easy-to-learn syntax that is not too hard, but still covers all parts of a scripted language.
- A complete standard library containing math, file I/O, regular expressions support, and more.
- Support within DreamStudio. 
- A syntax that looks similar to other programming languages, but with powerful additional features that make B-Sharp usable and unique.

For this repository, you will find several folders: 
- The implementation for B-Sharp is inside the B-Sharp/ folder, this contains all source codes for B-Sharp (Used Languages: Python, The D Programming Language, The C Programming Language, and of course, B-Sharp itself).
- The standard library for B-Sharp is within StdLib folder. This contains all codes for the B-Sharp standard library.
- The standard library contains the following modules: 
`StdIO`: Standard `<stdio>` library.
`StdFile`: File Operations.
`StdNet`: Networking Support.
`StdMath`: Math Library.
`StdComplex`: Complex Math Support (Calculus and Linear Algebra).
`StdRegEx`: Regular Expression Engine for the B-Sharp Programming Language.
- Several examples for B-Sharp are listed within (Examples) folder.

## Introduction to B-Sharp
The raise of B-Sharp (B# for short) was the need for an easy to run and build language, which can be interpreted and compiled, similar to the GoLang philosophy, but with clean usable syntax similar to JavaScript and Python, in addition to raw memory usage just like C and C++. In addition to many design critical choices that made B# Unique and powerful such as foreign calls, type enforcements, caller macros, and more. 

The name of the language itself is derived into two parts: `B` which was the great father of `C` Programming Language, and the `#` (Sharp), because the creator's first language he learnt at his school days was C-Sharp. A combination then araised from the two different concepts and thus the name was born. 

B-Sharp in syntax does not feel any different from other programming languages (although it has its own set of additional keywords, definitions, and vocabularies) and it doesn't differentiate for beginners from other higher level languages such as Python and JavaScript. However, what makes B-Sharp different is that it can be compiled into a native source code. This allows for producing native executables, in addition to interpretation (so B# is transpiled) and with the help of the **StandardSDK**. B-Sharp has all tools needed to produce production-ready projects and codes that can be used for enterprise projects.

It doesn't stop there, that is B# can be also very precise. It has special types of macros called *Caller Macros* which define a set of functionalities or features that can be used with B# during runtime or compilation time. Examples of these include `!PRAGMA optimize` which tries to optimize the source code as much as possible. Works for both interpretation and compilation of your source code.

## Using B-Sharp

To use B-Sharp. Please follow the accompanying instructions: 

#### 1. Download B-Sharp SDK, or Download The Source Code: 

You can download B-Sharp using the official website, which includes the Software Development Kit (BSharpSDK) in addition to optimization tools (StdOpt), the standard library (StdLib), documentations, and the developer's manual for B-Sharp. 

Or, download the source code from GitHub directly, using `git`: 

```bash
git clone https://github.com/Bahfo/B-Sharp-Programming-Language.git
cd B-Sharp-Programming-Language
./build.sh
```

This downloads B-Sharp and builds it on your machine.

#### 2. Initialize a Script or a Project
You can directly initialize an empty B-Sharp file (`example.bsharp`) and run it directly using `bsharp run example.bsharp` or build it using `bsharp build example.bsharp` to produce an executable.

Or, you can initialize an empty project like: 
```bash
bsharp init <project_name>
```
Which initializes you a project with all of what you need. 

#### 3. Download Any Packages for Your Project: 
Using the commands: `bsharp install <package_name>` to install a package, `bsharp uninstall <package_name>` to uninstall it, and `bsharp list` to list all available packages.

## A Word to Users
We want to thank you very much for using B-Sharp! we appreciate your support. If you want to report an issue, a bug, or give your feedback, we are always listening. Please head to `Contributing`, `Security`, and `Feedback` for more info.

*The B-Sharp Project Team*
