«««
METADATA: document metadata
Title: (G|T)UI
Author: @mlnck
created: 1701160633780
edited: 1701160633780
category: FOSS
»»»
<hgroup>
  <h1>(G|T)UI</h1>
  <h2>pronounced "gooey tooey"</h2>
</hgroup>

A product primarily focused on <mark>DevX</mark> enhancement.

This project revolves around creating a user-friendly GUI that allows you to effortlessly define the layout of a Text-Based User Interface, commonly known as TUI. 

### Project Causation
Time and effort.

The overhead involved in scaffolding customizable, command line, shell based, <mark>TUI</mark> experiences.

### Applicable Solution

We levarage a `GUI` to provide a seamless and intuitive end user experience.  You'll find simple yet powerful input fields, a read-only textarea for displaying output, an interactive canvas element, and even helpful instructional content.

#### 1: Utilize the GUI
The input fields allow you to define the grid for your TUI effortlessly. You have the freedom to customize layouts, ensuring user-readable identifiers. As you make updates, the output field will dynamically reflect your changes. And that's not all—copying the content to your clipboard or downloading it as a TOML file for your TUI is just a click away.

#### 2: Parse the TOML
Using a simple command-line script, you can seamlessly incorporate the output from our GUI. Simply paste the copied output directly or pass the generated file as a parameter—the choice is yours.

Once you run the script, a magical directory will come to life, containing everything you need for your customized TUI. The templated architecture will be created, and all the necessary files will be imported and initialized automatically

#### Build _your_ integration
You can now write customized shell scripts just as you would without involving a TUI. Thanks to the generated files, you won't have to worry about text wrapping, pane scrolling, or any other TUI-related challenges. We've got you covered!


##### references
- A much more thorough writeup is available on our [blog](https://qrx.downquark.work/qore/g-t-ui).
- The current, working version, of the source code is available in [github](https://github.com/DownQuark-Work/downquark.applicationFoss.GuiTui)

### Product Progression
Source Code:

We always attempt to update the status of projects as they proceed through our development process. But we make no guarantees. In this instance please refer to the github link provided above for the most accurate information.

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-foss ]" />
  <hr><hr>

  <footer>
  <h6>/[gt]ui/</h6>
</footer>