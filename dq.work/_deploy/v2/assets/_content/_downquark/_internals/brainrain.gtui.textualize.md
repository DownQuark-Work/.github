«««
METADATA: nested page metadata
Title: Python Textualize Reference
Author: @mlnck
created: 1694997815138
edited: 1694997815139
»»»

<details><summary>(G|T)UI BrainRain :: Python Textualize</summary>

## The Defacto
> This mostly continues to prove my point

The below is just "too much" without giving enough.
- we have a plethora of TUI frame and window managers

We are creating an "infinite canvas" TUI.
- yes, it will have frame and window management
  - and that is wny the below is included
- we should _leverage_ as much as makes sense when creating ours

Read below for the common/generic/done-a-hundred-times `TUI` creation|implementation(s)

> ![NOTE]
> Be sure to utilize the `FlatND Sub-Module` in this project
> >  this is what it's been waiting for it's whole life.

_**Then::**_ take a look at a much more useful piece of the library we can reference:
  - [textualize repo](https://github.com/Textualize/textual)
  - [textualize website](https://textual.textualize.io/)

## When asked to elaborate on `textualize` package
**Here's a more detailed, component-oriented Textual architecture example**, modeled after the modular style we used in the Ratatui version.

### Project Layout (Recommended)

```
my_tui/
├── __main__.py          # or app.py
├── widgets/
│   ├── __init__.py
│   ├── command_panel.py
│   └── status_bar.py
├── tcss/
│   └── style.tcss       # Optional CSS styling
└── pyproject.toml       # or requirements.txt
```

### 1. Main App (`__main__.py` or `app.py`)

```python
from textual.app import App, ComposeResult
from textual.containers import Vertical, Horizontal
from textual.widgets import Header, Footer, Button

from widgets.command_panel import CommandPanel
from widgets.status_bar import StatusBar


class MyTUI(App):
    """Main application with component-style architecture."""

    CSS_PATH = "tcss/style.tcss"   # Optional

    BINDINGS = [
        ("q", "quit", "Quit"),
        ("r", "run_command", "Run Command"),
    ]

    def __init__(self):
        super().__init__()
        self.status_bar = StatusBar()
        self.command_panel = CommandPanel()

    def compose(self) -> ComposeResult:
        yield Header()
        yield Vertical(
            self.command_panel,
            self.status_bar,
        )
        yield Footer()

    def on_mount(self) -> None:
        """Run initial command on startup."""
        self.action_run_command("df -h")

    def action_run_command(self, cmd: str = "df -h && echo '\n---\n' && ls -lh ~") -> None:
        """Trigger a background command (called by key binding or button)."""
        self.status_bar.set_status(f"Running: {cmd}")
        self.command_panel.run_command(cmd)


if __name__ == "__main__":
    app = MyTUI()
    app.run()
```

### 2. Command Panel Widget (`widgets/command_panel.py`)

```python
from textual.containers import Vertical
from textual.reactive import reactive
from textual.widget import Widget
from textual.widgets import Static, Button
import asyncio


class CommandPanel(Widget):
    """Reusable component for displaying command output."""

    output = reactive("")          # Reactive state → auto-updates UI
    is_running = reactive(False)

    def compose(self) -> ComposeResult:
        yield Static("Command Output", classes="title")
        yield Static(id="output-area", classes="output")
        yield Button("Run Default Command", id="run-btn")

    def on_button_pressed(self) -> None:
        self.run_command("df -h && echo '\n---\n' && whoami")

    def run_command(self, cmd: str) -> None:
        """Start background subprocess without blocking the UI."""
        if self.is_running:
            return
        self.is_running = True
        asyncio.create_task(self._execute(cmd))

    async def _execute(self, cmd: str) -> None:
        try:
            proc = await asyncio.create_subprocess_shell(
                cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await proc.communicate()

            output_text = stdout.decode() if stdout else stderr.decode()
            self.output = output_text.strip() or "No output"
        except Exception as e:
            self.output = f"Error: {e}"
        finally:
            self.is_running = False
            # Notify parent app via message or call if needed
            self.app.query_one(StatusBar).set_status("Ready")

    def watch_output(self) -> None:
        """Automatically called when `output` changes."""
        output_widget = self.query_one("#output-area", Static)
        output_widget.update(self.output)


# Optional: Add some styling via watch methods or CSS
```

### 3. Status Bar Widget (`widgets/status_bar.py`)

```python
from textual.widget import Widget
from textual.reactive import reactive
from textual.widgets import Static


class StatusBar(Widget):
    """Simple reusable status component."""

    status = reactive("Ready")

    def compose(self) -> ComposeResult:
        yield Static(id="status-text")

    def watch_status(self) -> None:
        """Auto-update when status changes."""
        self.query_one("#status-text", Static).update(f"Status: {self.status}")

    def set_status(self, text: str) -> None:
        self.status = text
```

### 4. Optional Styling (`tcss/style.tcss`)

```css
CommandPanel {
    height: 70%;
    border: solid $accent;
}

.output {
    height: 1fr;
    overflow-y: auto;
    background: $surface;
}

StatusBar {
    dock: bottom;
    height: 3;
    background: $boost;
}
```

### Key Architecture Highlights (Textual Style)

- **Reactive State** — `reactive()` attributes automatically trigger `watch_*` methods and UI updates when changed.
- **Custom Widgets as Components** — Each major section is a self-contained `Widget` subclass with its own `compose()`, events, and state.
- **Background Work** — Use `asyncio.create_task()` or the higher-level `self.run_worker()` (recommended for cancellable/long-running tasks).
- **Event Handling** — Actions (`action_*`), message passing, or direct method calls between components.
- **Composition** — The main `App` composes high-level widgets; widgets can contain other widgets.
- **Scalability** — Add more widgets (e.g., `Sidebar`, `DataTable`, `Tabs`, modals) and connect them via messages or a shared state object.

### Running It

```bash
pip install textual
python -m my_tui
```

Press `r` to run commands, click buttons, or `q` to quit.

This pattern scales well to complex apps (multiple screens via `Screen` classes, focus management, etc.).

--

## Advanced
> elaboration on
> - Multiple tabs / screens?
> - A data table or list view for dynamic output?

**Here's an expanded Textual architecture** incorporating **multiple tabs** (via `TabbedContent` or `Tabs`) and **a dynamic DataTable** for output. This builds directly on the previous component-style example.

### 1. Multiple Tabs / Screens

Textual offers two main approaches:

- **`TabbedContent`** — Simplest for fixed or semi-fixed tabs (most common for dashboards/monitors).
- **`Screen`** stack (`push_screen` / `pop_screen`) — Best for full modal flows, wizards, or distinct "pages".

#### Option A: TabbedContent (Recommended for most TUIs)

Update `app.py` / `__main__.py`:

```python
from textual.app import App, ComposeResult
from textual.containers import Vertical
from textual.widgets import Header, Footer, TabbedContent, TabPane

from widgets.command_panel import CommandPanel
from widgets.data_table_panel import DataTablePanel  # New
from widgets.status_bar import StatusBar


class MyTUI(App):
    CSS_PATH = "tcss/style.tcss"
    BINDINGS = [("q", "quit", "Quit"), ("r", "run_command", "Refresh")]

    def __init__(self):
        super().__init__()
        self.status_bar = StatusBar()
        self.command_panel = CommandPanel()
        self.data_panel = DataTablePanel()

    def compose(self) -> ComposeResult:
        yield Header()
        with TabbedContent(initial="commands"):
            with TabPane("Commands", id="commands"):
                yield self.command_panel
            with TabPane("Dynamic Data", id="data"):
                yield self.data_panel
        yield self.status_bar
        yield Footer()

    def action_run_command(self) -> None:
        self.status_bar.set_status("Running commands...")
        self.command_panel.run_command("df -h && echo '\n---\n' && ls -lh ~")
        # You can also trigger updates in the data tab from here
        self.data_panel.refresh_data()
```

**Styling** (`tcss/style.tcss`):

```css
TabbedContent {
    height: 1fr;
}

TabPane {
    padding: 1;
}
```

#### Option B: Full Screens (for modal or wizard-style flows)

```python
# In your App class
def action_show_details(self):
    self.push_screen(DetailsScreen())

# Define a new screen
from textual.screen import Screen

class DetailsScreen(Screen):
    def compose(self) -> ComposeResult:
        yield Header()
        # ... your widgets
        yield Footer()

    def on_key(self, event):  # or button
        self.app.pop_screen()
```

**When to choose:**
- Use **TabbedContent** for side-by-side views (e.g., Output | Processes | Logs).
- Use **Screens** for focused, temporary views (e.g., detailed item view, settings modal).

### 2. DataTable for Dynamic Output

Here's a reusable `DataTablePanel` widget that updates dynamically from subprocess results or background tasks.

```python
# widgets/data_table_panel.py
from textual.containers import Vertical
from textual.reactive import reactive
from textual.widget import Widget
from textual.widgets import DataTable, Static, Button
import asyncio


class DataTablePanel(Widget):
    """Dynamic table for parsed or structured command output."""

    rows = reactive([])   # List of tuples or lists

    def compose(self) -> ComposeResult:
        yield Static("Dynamic Data Table", classes="title")
        yield DataTable(id="main-table", zebra_stripes=True, cursor_type="row")
        yield Button("Refresh Table", id="refresh-btn")

    def on_mount(self) -> None:
        table = self.query_one("#main-table", DataTable)
        table.add_columns("Name", "Size", "Used", "Available", "Use%")

    def on_button_pressed(self) -> None:
        self.refresh_data()

    def refresh_data(self) -> None:
        """Trigger background refresh."""
        asyncio.create_task(self._load_data())

    async def _load_data(self) -> None:
        try:
            proc = await asyncio.create_subprocess_shell(
                "df -h",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, _ = await proc.communicate()
            lines = stdout.decode().strip().split("\n")[1:]  # Skip header

            parsed_rows = []
            for line in lines:
                parts = line.split()
                if len(parts) >= 5:
                    parsed_rows.append((
                        parts[0], parts[1], parts[2], parts[3], parts[4]
                    ))

            self.rows = parsed_rows
        except Exception as e:
            self.rows = [("Error", str(e), "", "", "")]

    def watch_rows(self) -> None:
        """Auto-update table when rows change."""
        table = self.query_one("#main-table", DataTable)
        table.clear()
        table.add_rows(self.rows)
```

### Bonus: Better Background Handling with `run_worker`

For long-running or cancellable tasks, use Textual's built-in workers:

```python
from textual.worker import Worker, get_current_worker

# Inside a widget or App:
@work(exclusive=True, thread=False)  # or thread=True for CPU work
async def run_command(self, cmd: str):
    # ... subprocess code
    # Update UI with self.call_from_thread or reactive attributes
```

### Overall Architecture Tips

- Keep widgets self-contained (state + rendering + events).
- Use **reactive attributes** + `watch_*` methods for automatic updates.
- Communicate between tabs/widgets via:
  - Direct method calls (`self.app.query_one(...)`).
  - Custom messages (`post_message`).
  - A shared state object injected into widgets.
- For very large tables, consider the `textual-fastdatatable` package.

---

## Combine into a single runnable file

**Here's a complete, self-contained, runnable Textual TUI example** that combines everything we've discussed:

- Multiple tabs (`TabbedContent`)
- Dynamic `DataTable`
- Background subprocess calls (`asyncio.create_subprocess_shell`)
- Reactive state + component-style widgets
- Status bar
- Key bindings

### Full Runnable Example (`my_tui.py`)

```python
#!/usr/bin/env python3
from textual.app import App, ComposeResult
from textual.containers import Vertical
from textual.reactive import reactive
from textual.widget import Widget
from textual.widgets import (
    Header, Footer, TabbedContent, TabPane, DataTable, Static, Button
)
from textual import work
import asyncio


class StatusBar(Widget):
    status = reactive("Ready")

    def compose(self) -> ComposeResult:
        yield Static(id="status-text")

    def watch_status(self) -> None:
        self.query_one("#status-text", Static).update(f" Status: {self.status} ")

    def set_status(self, text: str) -> None:
        self.status = text


class CommandPanel(Widget):
    output = reactive("")
    is_running = reactive(False)

    def compose(self) -> ComposeResult:
        yield Static("Command Output", classes="title")
        yield Static(self.output, id="output-area", classes="output")
        yield Button("Run Command", id="run-btn", variant="primary")

    def on_button_pressed(self) -> None:
        self.run_command("df -h && echo '\n---\n' && ls -lh ~")

    def run_command(self, cmd: str) -> None:
        if self.is_running:
            return
        self.is_running = True
        self.app.query_one(StatusBar).set_status(f"Running: {cmd}")
        self.run_worker(self._execute(cmd), name="command_runner")

    async def _execute(self, cmd: str) -> None:
        try:
            proc = await asyncio.create_subprocess_shell(
                cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await proc.communicate()
            result = stdout.decode() if stdout else stderr.decode()
            self.output = result.strip() or "No output"
        except Exception as e:
            self.output = f"Error: {e}"
        finally:
            self.is_running = False
            self.app.query_one(StatusBar).set_status("Ready")


class DataTablePanel(Widget):
    rows = reactive([])

    def compose(self) -> ComposeResult:
        yield Static("Dynamic Data (df -h)", classes="title")
        yield DataTable(id="main-table", zebra_stripes=True, cursor_type="row")
        yield Button("Refresh Table", id="refresh-btn", variant="primary")

    def on_mount(self) -> None:
        table: DataTable = self.query_one("#main-table", DataTable)
        table.add_columns("Filesystem", "Size", "Used", "Avail", "Use%", "Mounted on")

    def on_button_pressed(self) -> None:
        self.refresh_data()

    @work(exclusive=True, thread=False)
    async def refresh_data(self) -> None:
        self.app.query_one(StatusBar).set_status("Refreshing table...")
        try:
            proc = await asyncio.create_subprocess_shell(
                "df -h",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, _ = await proc.communicate()
            lines = stdout.decode().strip().split("\n")[1:]  # Skip header

            parsed = []
            for line in lines:
                parts = line.split()
                if len(parts) >= 6:
                    parsed.append((
                        parts[0], parts[1], parts[2], parts[3], parts[4], " ".join(parts[5:])
                    ))
            self.rows = parsed
        except Exception as e:
            self.rows = [("Error", str(e), "", "", "", "")]
        finally:
            self.app.query_one(StatusBar).set_status("Ready")

    def watch_rows(self) -> None:
        table: DataTable = self.query_one("#main-table", DataTable)
        table.clear()
        table.add_rows(self.rows)


class MyTUI(App):
    CSS_PATH = None  # We'll use inline CSS for simplicity
    TITLE = "Bash-Friendly TUI Demo"
    BINDINGS = [
        ("q", "quit", "Quit"),
        ("r", "refresh_all", "Refresh All"),
        ("t", "toggle_tab", "Next Tab"),
    ]

    def __init__(self):
        super().__init__()
        self.status_bar = StatusBar()
        self.command_panel = CommandPanel()
        self.data_panel = DataTablePanel()

    def compose(self) -> ComposeResult:
        yield Header()
        with TabbedContent(initial="commands"):
            with TabPane("Commands & Output", id="commands"):
                yield self.command_panel
            with TabPane("Dynamic Table", id="data"):
                yield self.data_panel
        yield self.status_bar
        yield Footer()

    def on_mount(self) -> None:
        """Initial data load"""
        self.data_panel.refresh_data()

    def action_refresh_all(self) -> None:
        self.command_panel.run_command("df -h && echo '\n---\n' && ls -lh ~")
        self.data_panel.refresh_data()

    def action_toggle_tab(self) -> None:
        """Simple tab cycling"""
        tabs = self.query_one(TabbedContent)
        tabs.active = "data" if tabs.active == "commands" else "commands"


if __name__ == "__main__":
    app = MyTUI()
    app.run()
```

### How to Run

```bash
pip install textual
python my_tui.py
```

### Features Included

- **Two tabs** – switch with mouse or `t` key
- **Command tab** – run shell commands in background, displays full output
- **Data tab** – dynamic `DataTable` populated from `df -h`
- **Status bar** – live updates
- **Keyboard shortcuts** (`r`, `t`, `q`)
- **`@work` decorator** – cleaner background task management (recommended in Textual)
- Reactive updates
